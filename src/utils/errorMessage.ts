import { WeatherApiError } from '../api/weatherApi';

export function getErrorMessage(error: Error | null): string {
  if (error instanceof WeatherApiError) {
    switch (error.code) {
      case 'NETWORK':
        return 'Không có kết nối mạng. Hãy kiểm tra mạng rồi thử lại.';
      case 'TIMEOUT':
        return 'Máy chủ phản hồi quá lâu. Vui lòng thử lại.';
      case 'HTTP':
        return 'Máy chủ thời tiết đang gặp sự cố. Vui lòng thử lại.';
      case 'PARSE':
        return 'Dữ liệu thời tiết không hợp lệ. Vui lòng thử lại.';
    }
  }
  return 'Đã có lỗi xảy ra, vui lòng thử lại';
}
