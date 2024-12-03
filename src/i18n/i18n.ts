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

import contactEN from '../locales/site/contact/en.json'
import contactVI from '../locales/site/contact/vi.json'

import cartEN from '../locales/site/cart/en.json'
import cartVI from '../locales/site/cart/vi.json'

import checkoutEN from '../locales/site/checkout/en.json'
import checkoutVI from '../locales/site/checkout/vi.json'

import orderEN from '../locales/site/order/en.json'
import orderVI from '../locales/site/order/vi.json'

import accountEN from '../locales/site/account/en.json'
import acconntVI from '../locales/site/account/vi.json'

import productEN from '../locales/site/product/en.json'
import productVI from '../locales/site/product/vi.json'

import productMobileEN from '../locales/site/productMobile/en.json'
import productMobileVI from '../locales/site/productMobile/vi.json'

import productGridEN from '../locales/site/productGrid/en.json'
import productGridVI from '../locales/site/productGrid/vi.json'

import blogEN from '../locales/site/blog/en.json'
import blogVI from '../locales/site/blog/vi.json'

import blogDetailEN from '../locales/site/blogDetail/en.json'
import blogDetailVI from '../locales/site/blogDetail/vi.json'

import blogBannerEN from '../locales/site/blogBanner/en.json'
import blogBannerVI from '../locales/site/blogBanner/vi.json'

import postEN from '../locales/site/blogPost/en.json'
import postVI from '../locales/site/blogPost/vi.json'

import blogBannerPageEN from '../locales/site/blogBannerPage/en.json'
import blogBannerPageVI from '../locales/site/blogBannerPage/vi.json'

import productDetailEN from '../locales/site/productDetail/en.json'
import productDetailVI from '../locales/site/productDetail/vi.json'

import notFoundEN from '../locales/site/error/en.json'
import notFoundVI from '../locales/site/error/vi.json'

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
    home: homeEN,
    contact: contactEN,
    cart: cartEN,
    checkout: checkoutEN,
    order: orderEN,
    account: accountEN,
    product: productEN,
    productMobile: productMobileEN,
    productGrid: productGridEN,
    blog: blogEN,
    blogDetail: blogDetailEN,
    blogBanner: blogBannerEN,
    blogPost: postEN,
    blogBannerPage: blogBannerPageEN,
    productDetail: productDetailEN,
    notFound: notFoundEN
  },
  vi: {
    common: commonVI,
    commonCard: commonCardVI,
    singin: signInVI,
    singup: signUpVI,
    home: homeVI,
    contact: contactVI,
    cart: cartVI,
    checkout: checkoutVI,
    order: orderVI,
    account: acconntVI,
    product: productVI,
    productMobile: productMobileVI,
    productGrid: productGridVI,
    blog: blogVI,
    blogDetail: blogDetailVI,
    blogBanner: blogBannerVI,
    blogPost: postVI,
    blogBannerPage: blogBannerPageVI,
    productDetail: productDetailVI,
    notFound: notFoundVI
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
