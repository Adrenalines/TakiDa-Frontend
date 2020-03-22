export const LANGUAGES = {
  ru: 'RUS',
  ua: 'UKR',
  en: 'ENG'
};

export const locales = Object.keys(LANGUAGES);
export const defaultLocale =
  localStorage.getItem('language') ||
  navigator.language.slice(0, 2) ||
  navigator.languages[0].slice(0, 2) ||
  locales[0];

export const calendarLocales = {
  [locales[0]]: {
    firstDayOfWeek: 1,
    dayNamesMin: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
    monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
    dateFormat: 'dd.mm.yy'
  }, [locales[1]]: {
    firstDayOfWeek: 1,
    dayNamesMin: [ 'Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
    monthNames: [ 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень' ],
    dateFormat: 'dd.mm.yy'
  }, [locales[2]]: {
    firstDayOfWeek: 0,
    dayNamesMin: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
    monthNames: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    dateFormat: 'mm/dd/yy'
  }
};
