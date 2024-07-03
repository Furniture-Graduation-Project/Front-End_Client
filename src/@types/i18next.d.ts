import 'i18next'
import { localizationResources, defaultLanguage } from '@/i18n/i18n'
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultLanguage
    resources: (typeof localizationResources)['vi']
  }
}
