export interface WeatherInfo {
  icon: string;
  condition: string;
}

export function getWeatherInfo(code: number, isDay: boolean): WeatherInfo {
  if (code === 0) {
    return { icon: isDay ? '☀️' : '🌙', condition: 'Quang đãng' };
  }
  if (code === 1) return { icon: '🌤️', condition: 'Ít mây' };
  if (code === 2) return { icon: '⛅', condition: 'Có mây' };
  if (code === 3) return { icon: '☁️', condition: 'Nhiều mây' };
  if (code === 45 || code === 48) return { icon: '🌫️', condition: 'Sương mù' };
  if (code >= 51 && code <= 55) return { icon: '🌦️', condition: 'Mưa phùn' };
  if (code === 56 || code === 57) return { icon: '🌧️', condition: 'Mưa phùn lạnh' };
  if (code === 61) return { icon: '🌧️', condition: 'Mưa nhỏ' };
  if (code === 63) return { icon: '🌧️', condition: 'Mưa vừa' };
  if (code === 65) return { icon: '🌧️', condition: 'Mưa to' };
  if (code === 66 || code === 67) return { icon: '🌧️', condition: 'Mưa lạnh' };
  if (code === 71 || code === 73 || code === 75 || code === 77) {
    return { icon: '🌨️', condition: 'Tuyết' };
  }
  if (code === 85 || code === 86) return { icon: '🌨️', condition: 'Mưa tuyết' };
  if (code >= 80 && code <= 82) return { icon: '🌧️', condition: 'Mưa rào' };
  if (code === 95) return { icon: '⛈️', condition: 'Dông' };
  if (code === 96 || code === 99) return { icon: '⛈️', condition: 'Dông kèm mưa đá' };
  return { icon: '🌡️', condition: 'Không xác định' };
}
