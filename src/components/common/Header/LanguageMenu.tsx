import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const LanguageMenu = () => {
  const { language, setLanguage } = useLanguage()
  const [isEnglish, setIsEnglish] = React.useState(language === 'en')

  const handleLanguage = (change: boolean) => {
    setIsEnglish(change)
    setLanguage(change ? 'en' : 'vi')
  }

  React.useEffect(() => {
    setIsEnglish(language === 'en')
  }, [language])

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Globe className='hover:cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuCheckboxItem
          className={isEnglish ? '' : 'text-red'}
          checked={!isEnglish}
          onCheckedChange={() => handleLanguage(false)}
        >
          Tiếng Việt
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className={isEnglish ? 'text-red' : ''}
          checked={isEnglish}
          onCheckedChange={() => handleLanguage(true)}
        >
          English
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageMenu
