import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Linking, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { DEFAULT_LOCATION } from '../constants/location';
import { getLocationErrorMessage, mapAndroidPermissionResult, mapGeolocationError, type LocationStatus } from '../utils/location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface UseLocationResult {
  coords: LocationCoords | null;
  status: LocationStatus;
  errorMessage: string | null;
  retry: () => void;
  openSettings: () => void;
  isUsingFallback: boolean;
  activeCoords: LocationCoords;
}

export function useLocation(): UseLocationResult {
  const [coords, setCoords] = useState<LocationCoords | null>(null);
  const [status, setStatus] = useState<LocationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mounted = useRef(true);
  const running = useRef(false);
  const statusRef = useRef(status);
  statusRef.current = status;

  const setLocationStatus = useCallback((next: LocationStatus) => {
    statusRef.current = next;
    if (mounted.current) {
      setStatus(next);
      setErrorMessage(next === 'granted' || next === 'requesting' ? null : getLocationErrorMessage(next) || null);
    }
  }, []);

  const locate = useCallback(async () => {
    if (running.current || !mounted.current) return;
    running.current = true;
    setLocationStatus('requesting');
    try {
      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        const fine = mapAndroidPermissionResult(result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ?? '');
        const coarse = mapAndroidPermissionResult(result[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ?? '');
        if (fine !== 'granted' && coarse !== 'granted') {
          setLocationStatus(fine === 'blocked' || coarse === 'blocked' ? 'blocked' : 'denied');
          return;
        }
      } else if (Platform.OS === 'ios') {
        await new Promise<void>((resolve, reject) => {
          Geolocation.requestAuthorization(
            () => resolve(),
            () => reject({ code: 1 }),
          );
        });
      }

      await new Promise<void>((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            if (mounted.current) {
              setCoords({ latitude: position.coords.latitude, longitude: position.coords.longitude });
              setLocationStatus('granted');
            }
            resolve();
          },
          error => {
            if (mounted.current) setLocationStatus(mapGeolocationError(error));
            reject(error);
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 },
        );
      });
    } catch (error) {
      if (!mounted.current) return;
      const locationError = error as { code?: number };
      if (statusRef.current === 'requesting') {
        setLocationStatus(locationError.code === 1 ? 'denied' : 'error');
      }
    } finally {
      running.current = false;
    }
  }, [setLocationStatus]);

  const retry = useCallback(() => {
    locate();
  }, [locate]);

  const openSettings = useCallback(() => {
    Linking.openSettings().catch(() => undefined);
  }, []);

  useEffect(() => {
    mounted.current = true;
    retry();
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active' && ['blocked', 'denied', 'gps_off'].includes(statusRef.current)) retry();
    });
    return () => {
      mounted.current = false;
      subscription.remove();
    };
  }, [retry]);

  const isUsingFallback = status !== 'granted' && status !== 'requesting';
  const activeCoords = coords && status === 'granted'
    ? coords
    : { latitude: DEFAULT_LOCATION.latitude, longitude: DEFAULT_LOCATION.longitude };

  return { coords, status, errorMessage, retry, openSettings, isUsingFallback, activeCoords };
}
