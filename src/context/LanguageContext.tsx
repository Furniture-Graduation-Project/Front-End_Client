import { createContext, useContext, useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'


type LanguageContextType = {
  language: string
  setLanguage: (language: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(i18n.language || 'vi')

  const handleSetLanguage = (newLanguage: string) => {
    setLanguage(newLanguage)
    i18n.changeLanguage(newLanguage) 
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}


export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('UseLanguge phải được sử dụng trong LanguageProvider')
  }
  return context
}
