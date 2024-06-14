export function formatDate(dateTimeString: Date | string): string {
  const date = new Date(dateTimeString);
  const options: Intl.DateTimeFormatOptions = {
    // year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    // second: '2-digit',
    // timeZoneName: 'short',
  };

  const formatter = new Intl.DateTimeFormat('vi-VN', options);

  const formattedDate = formatter.format(date);

  const [time, DM] = formattedDate.split(' ');

  const [day, month] = DM.split('-');

  // return formattedDate;

  return `${day}/${month} ${time}`;
}

export function getStartAndEndOfWeek(date = new Date()) {
  const startTime = new Date(date);
  const endTime = new Date(date);

  // Điều chỉnh để startOfWeek là thứ Hai
  const dayOfWeek = date.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  startTime.setDate(date.getDate() + diffToMonday);
  startTime.setHours(0, 0, 0, 0);

  // Điều chỉnh để endOfWeek là Chủ Nhật
  const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  endTime.setDate(date.getDate() + diffToSunday);
  endTime.setHours(23, 59, 59, 999);

  return { startTime, endTime };
}

export function getStartAndEndOfMonth(
  year: number = new Date().getFullYear(),
  month: number,
): { startTime: Date; endTime: Date } {
  const startTime = new Date(year, month - 1, 1);
  const endTime = new Date(year, month, 0);
  endTime.setHours(23, 59, 59, 999);

  return { startTime, endTime };
}

export function getStartAndEndOfYear(year: number) {
  const startTime = new Date(year, 0, 1); // Lưu ý: Tháng trong JavaScript bắt đầu từ 0
  const endTime = new Date(year, 11, 31);

  // Đặt thời gian của ngày cuối cùng của năm
  endTime.setHours(23, 59, 59, 999);

  return { startTime, endTime };
}
