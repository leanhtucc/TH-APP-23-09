import { useCallback, useEffect, useRef, useState } from 'react';
import { getWeatherByCoords } from '../api';
import { WeatherApiError } from '../api/weatherApi';
import type { WeatherData } from '../types/weather';

export interface WeatherCoords {
  latitude: number;
  longitude: number;
}

export interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  refreshing: boolean;
  error: WeatherApiError | Error | null;
  updatedAt: number | null;
  refetch: () => Promise<void>;
}

function coordsKey(coords: WeatherCoords | null): string | null {
  return coords ? `${coords.latitude.toFixed(3)},${coords.longitude.toFixed(3)}` : null;
}

export function useWeather(coords: WeatherCoords | null): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<WeatherApiError | Error | null>(null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef(0);
  const mountedRef = useRef(true);
  const coordsRef = useRef(coords);
  const key = coordsKey(coords);
  coordsRef.current = coords;

  const request = useCallback(async (target: WeatherCoords, keepData: boolean): Promise<void> => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const requestId = ++requestIdRef.current;
    if (keepData) {
      setRefreshing(true);
    } else {
      setLoading(true);
      setData(null);
      setUpdatedAt(null);
    }
    setError(null);
    try {
      const result = await getWeatherByCoords(target.latitude, target.longitude, controller.signal);
      if (!mountedRef.current || requestId !== requestIdRef.current || controller.signal.aborted) return;
      setData(result);
      setUpdatedAt(Date.now());
    } catch (requestError) {
      if (!mountedRef.current || requestId !== requestIdRef.current || controller.signal.aborted) return;
      setError(requestError instanceof Error ? requestError : new Error('Đã có lỗi xảy ra'));
    } finally {
      if (mountedRef.current && requestId === requestIdRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const target = coordsRef.current;
    if (!target || key === null) {
      controllerRef.current?.abort();
      requestIdRef.current += 1;
      setData(null);
      setUpdatedAt(null);
      setLoading(false);
      setRefreshing(false);
      setError(null);
      return;
    }
    request(target, false).catch(() => undefined);
    return () => {
      controllerRef.current?.abort();
    };
  }, [key, request]);

  useEffect(() => () => {
    mountedRef.current = false;
    controllerRef.current?.abort();
    requestIdRef.current += 1;
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    if (coords) await request(coords, data !== null);
  }, [coords, data, request]);

  return {
    data: coords === null ? null : data,
    loading: coords === null ? false : loading,
    refreshing: coords === null ? false : refreshing,
    error: coords === null ? null : error,
    updatedAt: coords === null ? null : updatedAt,
    refetch,
  };
}
