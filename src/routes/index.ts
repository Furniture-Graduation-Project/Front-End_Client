import { IRoute } from '@/interface/route'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import SignIn from '@/pages/(auth)/SignIn'
import SignUp from '@/pages/(auth)/SignUp'
import AboutPage from '@/pages/(site)/about/AboutPage'
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
import AccountOrder from '@/pages/(user)/AccountOrder.tsx/AccountOrder'
import AccountPage from '@/pages/(user)/AccountPage'
import AccountSetting from '@/pages/(user)/AccountSetting/AccountSetting'
import AccountWishlist from '@/pages/(user)/AccountWishlist/AccountWishlist'
import AddressForm from '@/pages/(user)/Address/_components/AddressForm'
import AddressDetailPage from '@/pages/(user)/Address/AddressDetail/page'
import AddressPage from '@/pages/(user)/Address/page'

const routes: IRoute[] = [
  { path: '/signin', component: SignIn, layout: AuthLayout },
  { path: '/signup', component: SignUp, layout: AuthLayout },
  { path: '/', component: HomePage, layout: MainLayout },
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
  { path: '/about', component: AboutPage, layout: MainLayout },
  { path: '/contact', component: ContactPage, layout: MainLayout },
  {
    path: '/account',
    component: AccountPage,
    layout: MainLayout,
    children: [
      { path: '', component: AccountSetting },
      { path: 'order', component: AccountOrder },
      { path: 'wishlist', component: AccountWishlist },
      {
        path: 'address',
        component: AddressPage,
        children: [
          { path: 'add', component: AddressForm },
          { path: 'edit/:id', component: AddressDetailPage }
        ]
      }
    ]
  },

  { path: '/order/:id', component: OrderPage, layout: MainLayout }
]

export default routes
