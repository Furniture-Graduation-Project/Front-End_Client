import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import AccountPage from '@/pages/(user)/AccountPage'
import CartPage from '@/pages/(site)/CartPage'
import CheckoutPage from '@/pages/(site)/CheckoutPage'
import HomePage from '@/pages/(site)/HomePage'
import ShopPage from '@/pages/(site)/ShopPage'
import SignIn from '@/pages/(auth)/SignIn'
import SignUp from '@/pages/(auth)/SignUp'
import BlogPage from '@/pages/(site)/BlogPage'
import ContactPage from '@/pages/(site)/ContactPage'

const routes = [
  { path: '/signin', component: SignIn, layout: AuthLayout },
  { path: '/signup', component: SignUp, layout: AuthLayout },
  { path: '/', component: HomePage, layout: MainLayout },
  { path: '/shop', component: ShopPage, layout: MainLayout },
  { path: '/cart', component: CartPage, layout: MainLayout },
  { path: '/checkout', component: CheckoutPage, layout: MainLayout },
  { path: '/blog', component: BlogPage, layout: MainLayout },
  { path: '/contact', component: ContactPage, layout: MainLayout },
  { path: '/account', component: AccountPage, layout: ProtectedLayout }
]

export default routes
