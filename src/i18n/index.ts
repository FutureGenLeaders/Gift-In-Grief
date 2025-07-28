
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

// For now, we'll use English as fallback for new languages
// In production, you would create proper translation files for each language
const createPlaceholderTranslations = (lang: string) => ({
  ...enTranslations,
  // Add language-specific overrides here when translations are available
});

i18n
  .use(initReactI18next)
  .init({
    resources: {
      // Tier 1 - Priority Languages
      en: { translation: enTranslations },
      zh: { translation: createPlaceholderTranslations('zh') },
      es: { translation: esTranslations },
      hi: { translation: createPlaceholderTranslations('hi') },
      
      // Tier 2 - Asian Focus
      ja: { translation: createPlaceholderTranslations('ja') },
      ko: { translation: createPlaceholderTranslations('ko') },
      th: { translation: createPlaceholderTranslations('th') },
      vi: { translation: createPlaceholderTranslations('vi') },
      id: { translation: createPlaceholderTranslations('id') },
      
      // Tier 3 - Global
      fr: { translation: frTranslations },
      pt: { translation: createPlaceholderTranslations('pt') },
      ar: { translation: createPlaceholderTranslations('ar') },
      ru: { translation: createPlaceholderTranslations('ru') },
      de: { translation: createPlaceholderTranslations('de') },
      
      // Tier 4 - Additional Asian
      tl: { translation: createPlaceholderTranslations('tl') },
      ms: { translation: createPlaceholderTranslations('ms') },
      bn: { translation: createPlaceholderTranslations('bn') },
      ta: { translation: createPlaceholderTranslations('ta') },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
