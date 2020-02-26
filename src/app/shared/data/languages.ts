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
