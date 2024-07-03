import { Locales, LocalizationResources, localizationResources } from '@/i18n/i18n'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

const resourceArray: LocalizationResources[] = Object.keys(localizationResources['vi']) as LocalizationResources[]

export type LocalizeFunction = (
  name: string,
  defaultValue?: string,
  params?: Record<string, unknown>,
  escapeValue?: boolean
) => string

export const useTranslate = (key?: string) => {
  const { t: translate, i18n } = useTranslation(resourceArray)

  const t: LocalizeFunction = React.useMemo(
    () => (name, fallbackValue, params, escapeValue) => {
      const options = { interpolation: { escapeValue: escapeValue ?? true } }
      const mergedParams = { ...params, ...options }
      const fullKey = key ? `${key}.${name}` : name
      return translate(fullKey, { ns: resourceArray, defaultValue: fallbackValue ?? name, ...mergedParams })
    },
    [translate, key]
  )

  const setLocale = React.useCallback(
    async (locale: Locales) => {
      await i18n.changeLanguage(locale)
    },
    [i18n]
  )

  return { t, i18n, setLocale }
}
