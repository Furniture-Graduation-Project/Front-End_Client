import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import SignIn from '@/pages/(auth)/SignIn'
import SignUp from '@/pages/(auth)/SignUp'
import BlogPage from '@/pages/(site)/blog/BlogPage'
import CartPage from '@/pages/(site)/cart/CartPage'
import CheckoutPage from '@/pages/(site)/checkout/CheckoutPage'
import ContactPage from '@/pages/(site)/contact/ContactPage'
import HomePage from '@/pages/(site)/home/HomePage'
import ShopPage from '@/pages/(site)/shop/ShopPage'
import AccountPage from '@/pages/(user)/AccountPage'

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
