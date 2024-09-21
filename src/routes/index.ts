import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import SignIn from '@/pages/(auth)/SignIn'
import SignUp from '@/pages/(auth)/SignUp'
import AboutPage from '@/pages/(site)/about/AboutPage'
import BlogPage from '@/pages/(site)/blog/BlogPage'
import CartPage from '@/pages/(site)/cart/CartPage'
import CheckoutPage from '@/pages/(site)/checkout/CheckoutPage'
import ContactPage from '@/pages/(site)/contact/ContactPage'
import HomePage from '@/pages/(site)/home/HomePage'
import ShopPage from '@/pages/(site)/shop/ShopPage'
import AccountPage from '@/pages/(user)/AccountPage'
import AddressForm from '@/pages/(user)/Address/_components/AddressForm'
import AddressDetailPage from '@/pages/(user)/Address/AddressDetail/page'
import AddressPage from '@/pages/(user)/Address/page'

const routes = [
  { path: '/signin', component: SignIn, layout: AuthLayout },
  { path: '/signup', component: SignUp, layout: AuthLayout },
  { path: '/', component: HomePage, layout: MainLayout },
  { path: '/shop', component: ShopPage, layout: MainLayout },
  { path: '/cart', component: CartPage, layout: MainLayout },
  { path: '/checkout', component: CheckoutPage, layout: MainLayout },
  { path: '/blog', component: BlogPage, layout: MainLayout },
  { path: '/about', component: AboutPage, layout: MainLayout },
  { path: '/contact', component: ContactPage, layout: MainLayout },
  { path: '/account', component: AccountPage, layout: ProtectedLayout },
  { path: '/account/settings/address', component: AddressPage, layout: MainLayout },
  { path: '/account/settings/address/add', component: AddressForm, layout: MainLayout },
  { path: '/account/settings/address/:id', component: AddressDetailPage, layout: MainLayout }
]

export default routes
