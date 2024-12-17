import { IRoute } from '@/interface/route'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import AuthCallback from '@/pages/(auth)/AuthCallBack'
import Logout from '@/pages/(auth)/Logout'
import SignIn from '@/pages/(auth)/SignIn'
import SignUp from '@/pages/(auth)/SignUp'
import NotFoundPage from '@/pages/(site)/404/404'
import BlogDetailPage from '@/pages/(site)/blog-detail/BlogDetailPage'
import BlogPage from '@/pages/(site)/blog/BlogPage'
import CartPage from '@/pages/(site)/cart/CartPage'
import CheckoutPage from '@/pages/(site)/checkout/CheckoutPage'
import ContactPage from '@/pages/(site)/contact/ContactPage'
import HomePage from '@/pages/(site)/home/HomePage'
import OrderPage from '@/pages/(site)/order/OrderComplete'
import ProductDetail from '@/pages/(site)/product-detail/ProductDetail'
import ProductList from '@/pages/(site)/product-list/ProductList'
import ShopPage from '@/pages/(site)/shop/ShopPage'
import AccountOrderDetail from '@/pages/(user)/AccountOrder.tsx/_component/AccountOrderDetail'
import AccountOrderList from '@/pages/(user)/AccountOrder.tsx/_component/AccountOrderList'
import AccountOrderRequest from '@/pages/(user)/AccountOrder.tsx/_component/AccountOrderRequest/AccountOrderRequest'
import AccountOrder from '@/pages/(user)/AccountOrder.tsx/AccountOrder'
import AccountPage from '@/pages/(user)/AccountPage'
import AccountSetting from '@/pages/(user)/AccountSetting/AccountSetting'
import AccountWishlist from '@/pages/(user)/AccountWishlist/AccountWishlist'
import AddressPage from '@/pages/(user)/Address/AddressPage'
import ChangePassPages from '@/pages/(user)/ChangePass.tsx/ChangePassPages'
import ForgotPassPage from '@/pages/(user)/ForgotPass/ForgotPassPage'
import NewPassPage from '@/pages/(user)/ForgotPass/NewPassPage'
import VerifyOtp from '@/pages/(user)/ForgotPass/VerifyOtp'

const routes: IRoute[] = [
  { path: '/', component: HomePage, layout: MainLayout },
  { path: '/signin', component: SignIn, layout: AuthLayout },
  { path: '/signup', component: SignUp, layout: AuthLayout },
  { path: '/logout', component: Logout, layout: MainLayout },
  { path: '/shop', component: ShopPage, layout: MainLayout },
  {
    path: '/products',
    component: ProductList,
    layout: MainLayout
  },
  { path: '/products/:id', component: ProductDetail, layout: MainLayout },
  { path: '/cart', component: CartPage, layout: MainLayout },
  { path: '/checkout', component: CheckoutPage, layout: MainLayout },
  { path: '/blog', component: BlogPage, layout: MainLayout },
  { path: '/blog/:id', component: BlogDetailPage, layout: MainLayout },
  { path: '/contact', component: ContactPage, layout: MainLayout },
  {
    path: '/account',
    component: AccountPage,
    layout: MainLayout,
    children: [
      { path: '', component: AccountSetting },
      {
        path: 'order',
        component: AccountOrder,
        children: [
          {
            path: '',
            component: AccountOrderList
          },
          {
            path: ':id',
            component: AccountOrderDetail
          },
          { path: 'request/:id', component: AccountOrderRequest }
        ]
      },
      { path: 'wishlist', component: AccountWishlist },
      {
        path: 'address',
        component: AddressPage
      },
      {
        path: 'change-password',
        component: ChangePassPages
      },
      {
        path: 'forgot-password',
        component: ForgotPassPage
      }
    ]
  },
  { path: '/forgot-password/verify-otp', component: VerifyOtp, layout: AuthLayout },
  { path: '/new-password', component: NewPassPage, layout: AuthLayout },
  { path: '/order/:id', component: OrderPage, layout: MainLayout },
  { path: '/auth/callback', component: AuthCallback, layout: MainLayout },
  { path: '*', component: NotFoundPage, layout: MainLayout }
]

export default routes
