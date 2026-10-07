import { getPressureLabel, getUvLevel, getVisibilityLabel, getWindLevel } from '../src/utils/metrics';

describe('mức chỉ số thời tiết và giá trị biên', () => {
  it('phân loại UV đúng tại các ngưỡng', () => {
    expect(getUvLevel(2)).toBe('Thấp');
    expect(getUvLevel(3)).toBe('Trung bình');
    expect(getUvLevel(5)).toBe('Trung bình');
    expect(getUvLevel(5.4)).toBe('Trung bình');
    expect(getUvLevel(5.6)).toBe('Cao');
    expect(getUvLevel(6)).toBe('Cao');
    expect(getUvLevel(7)).toBe('Cao');
    expect(getUvLevel(8)).toBe('Rất cao');
    expect(getUvLevel(10)).toBe('Rất cao');
    expect(getUvLevel(11)).toBe('Cực cao');
  });

  it('phân loại áp suất và tầm nhìn tại ngưỡng', () => {
    expect(getPressureLabel(999)).toBe('Thấp');
    expect(getPressureLabel(1000)).toBe('Bình thường');
    expect(getPressureLabel(1020)).toBe('Bình thường');
    expect(getPressureLabel(1021)).toBe('Cao');
    expect(getVisibilityLabel(1.9)).toBe('Kém');
    expect(getVisibilityLabel(2)).toBe('Trung bình');
    expect(getVisibilityLabel(5)).toBe('Trung bình');
    expect(getVisibilityLabel(5.1)).toBe('Tốt');
    expect(getVisibilityLabel(10)).toBe('Tốt');
    expect(getVisibilityLabel(10.1)).toBe('Rất tốt');
  });

  it('phân loại tốc độ gió', () => {
    expect(getWindLevel(0)).toBe('Lặng');
    expect(getWindLevel(1)).toBe('Nhẹ');
    expect(getWindLevel(20)).toBe('Vừa');
    expect(getWindLevel(40)).toBe('Mạnh');
    expect(getWindLevel(60)).toBe('Rất mạnh');
  });
});
