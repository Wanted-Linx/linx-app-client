import { DateTime } from 'luxon';

export const defaultFormat = (dateString: string) => DateTime.fromISO(dateString).toFormat('yyyy년 MM월 dd일');

export const calDateDiff = (end: string, start: string) => {
  const t1 = DateTime.fromISO(end);
  const t2 = DateTime.fromISO(start);
  return t1.diff(t2, 'days').days;
};

export const calDateName = (dateString: string) => {
  switch (DateTime.fromISO(dateString).toFormat('c')) {
    case '1':
      return '월요일';
    case '2':
      return '화요일';
    case '3':
      return '수요일';
    case '4':
      return '목요일';
    case '5':
      return '금요일';
    case '6':
      return '토요일';
    case '7':
      return '일요일';
  }
};
