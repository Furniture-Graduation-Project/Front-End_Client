import * as React from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { useTranslate } from '@/hooks/useTranslate'

type Checked = DropdownMenuCheckboxItemProps['checked']

const LanguageMenu = () => {
  const { i18n, setLocale } = useTranslate()
  const [language, setLanguage] = React.useState<Checked>(() => (i18n.language === 'en' ? true : false))
  const handleLanguage = async (change: boolean) => {
    setLanguage(change)
    await setLocale(language ? 'vi' : 'en')
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Globe className='hover:cursor-pointer' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuCheckboxItem
          className={language ? '' : 'text-red'}
          checked={!language}
          onCheckedChange={() => handleLanguage(false)}
        >
          Tiếng Việt
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className={language ? 'text-red' : ''}
          checked={language}
          onCheckedChange={() => handleLanguage(true)}
        >
          English
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageMenu
