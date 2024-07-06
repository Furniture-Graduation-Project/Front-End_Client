import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LocaleCodeName } from '@/interface/LocaleCodeName'

import commonEN from '../locales/common/en.json'
import commonVI from '../locales/common/vi.json'

import commonCardEN from '../locales/site/commonCard/en.json'
import commonCardVI from '../locales/site/commonCard/vi.json'

import signInEN from '../locales/auth/signin/en.json'
import signInVI from '../locales/auth/signin/vi.json'

import signUpEN from '../locales/auth/signup/en.json'
import signUpVI from '../locales/auth/signup/vi.json'

import homeEN from '../locales/site/home/en.json'
import homeVI from '../locales/site/home/vi.json'

export const currentLocales: LocaleCodeName[] = [
  { code: 'vi', name: 'Tiếng Việt' },
  { code: 'en', name: 'English' }
]

export const localizationResources = {
  en: {
    common: commonEN,
    commonCard: commonCardEN,
    singin: signInEN,
    singup: signUpEN,
    home: homeEN
  },
  vi: {
    common: commonVI,
    commonCard: commonCardVI,
    singin: signInVI,
    singup: signUpVI,
    home: homeVI
  }
} as const

export type Locales = keyof typeof localizationResources
export type LocalizationResources = keyof typeof localizationResources.en | keyof typeof localizationResources.vi
export type LocalizationNames = keyof typeof commonEN | keyof typeof commonVI

export const defaultLanguage: Locales = 'vi'
const fallbackLng: Locales = 'en'

void i18n.use(initReactI18next).init({
  resources: localizationResources,
  lng: defaultLanguage,
  fallbackLng: fallbackLng
})

export default i18n
