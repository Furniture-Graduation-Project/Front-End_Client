import { Mail, Phone, Store } from 'lucide-react'

const ContactSection = () => {
  return (
    <div className='mt-12'>
      <h1 className='font-medium text-[40px] text-center mb-10'>Contact Us</h1>
      <div className='grid md:grid-cols-3 gap-x-6 gap-y-4'>
        <div className='py-4 px-12 bg-[#F3F5F7] flex flex-col items-center'>
          <Store className='h-8 w-8' />
          <h2 className='text-[#6C7275] uppercase font-bold mt-4 mb-2'>Address</h2>
          <p className='text-neutral-900 text-xl font-medium text-center'>234 Hai Trieu, Ho Chi Minh City, Viet Nam</p>
        </div>
        <div className='py-4 px-12 bg-[#F3F5F7] flex flex-col items-center'>
          <Phone className='h-8 w-8' />
          <h2 className='text-[#6C7275] uppercase font-bold mt-4 mb-2'>Contact Us</h2>
          <p className='text-neutral-900 text-xl font-medium text-center'>+84 234 567 890</p>
        </div>
        <div className='py-4 px-12 bg-[#F3F5F7] flex flex-col items-center'>
          <Mail className='h-8 w-8' />
          <h2 className='text-[#6C7275] uppercase font-bold mt-4 mb-2'>Email</h2>
          <p className='text-neutral-900 text-xl font-medium text-center'>hello@3legant.com</p>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
