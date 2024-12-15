import AvatarAccount from '@/components/auth/AvatarAccount'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuthContext } from '@/context/AuthContext'
import useAccountMutation from '@/hooks/mutations/useUserMutation'
import { toast } from '@/hooks/use-toast'
import { useTranslate } from '@/hooks/useTranslate'
import { uploadFileCloudinary } from '@/utils/upload-cloudinary'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const SidebarAccount = () => {
  const { user } = useAuthContext()
  const { t } = useTranslate('account.sidebar')
  const navigate = useNavigate()
  const location = useLocation()
  const [preview, setPreview] = useState<string | null>(user?.avatar || null)
  const [loading, setLoading] = useState(false)
  const { mutate } = useAccountMutation({ action: 'UPDATE' })
  const form = useForm<FieldValues>({
    defaultValues: {
      image: ''
    }
  })

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setLoading(true)
    const urls = await Promise.all(Array.from(files).map(uploadFileCloudinary))
    setPreview(URL.createObjectURL(files[0]))
    form.setValue('image', urls[0])
    setLoading(false)
  }

  const onSubmit = async (data: FieldValues) => {
    try {
      mutate({
        _id: user?._id || '',
        email: user?.email || '',
        password: user?.password || '',
        locations: user?.locations || [],
        avatar: data.image
      })
      toast({
        title: 'Cập nhật avatar thành công!',
        variant: 'success'
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Có lỗi xảy ra!',
        description: 'Không thể cập nhật',
        variant: 'destructive'
      })
    }
  }

  return (
    <aside className='py-10 px-4 bg-[#f3f5f7] rounded-lg w-full h-fit  mb-24 sm:sticky sm:top-32'>
      <div className='relative'>
        <AvatarAccount src={user?.avatar || '/images/avatar.png'} className='h-20 w-20 mx-auto' />
        <div className='bg-black border-[2px] border-white rounded-full w-[30px] h-[30px] flex justify-center items-center absolute top-14 right-20 hover:opacity-80 transition transform duration-200'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size={'icon'} variant={'null'}>
                <Camera className='text-white h-4 w-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t('image')}</AlertDialogTitle>
              </AlertDialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                <div className='flex justify-center items-center gap-x-6'>
                  {loading ? (
                    <Skeleton className='h-20 w-20 rounded-full' />
                  ) : (
                    <AvatarAccount src={preview || ''} className='h-20 w-20' />
                  )}
                  <div>
                    <Input
                      disabled={loading}
                      id='avatarUpload'
                      type='file'
                      className='hidden'
                      onChange={onChangeImage}
                    />
                    <Label
                      htmlFor='avatarUpload'
                      className='cursor-pointer text-sm border p-3 rounded-md border-zinc-400'
                    >
                      {t('upload')}
                    </Label>
                  </div>
                </div>
                <Separator />
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction type='submit'>{t('save')}</AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className='text-xl font-semibold text-center mt-2'>{user?.name}</p>
      </div>
      <div className='mt-10'>
        <ul className='*:text-base *:font-semibold hidden md:flex flex-col gap-y-6'>
          <li className='*:flex'>
            <NavLink
              to='/account'
              end
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('account')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/account/change-password'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('changePass')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/account/address'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('address')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/account/order'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('orders')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/account/wishlist'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('wishlist')}
            </NavLink>
          </li>
          <li className='*:flex'>
            <NavLink
              to='/logout'
              className={({ isActive }) =>
                isActive
                  ? 'text-black font-bold border-b-[1.5px] border-black'
                  : 'text-neutral-400 hover:text-black transition'
              }
            >
              {t('logout')}
            </NavLink>
          </li>
        </ul>
        <Select
          defaultValue={
            location.pathname.split('/').length >= 3
              ? location.pathname.split('/').slice(0, 3).join('/')
              : location.pathname
          }
          onValueChange={(value) => navigate(value)}
        >
          <SelectTrigger className='w-full flex md:hidden'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='/account'>{t('account')}</SelectItem>
              <SelectItem value='/account/address'>{t('address')}</SelectItem>
              <SelectItem value='/account/order'>{t('orders')}</SelectItem>
              <SelectItem value='/account/wishlist'>{t('wishlist')}</SelectItem>
              <SelectItem value='/logout'>{t('logout')}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </aside>
  )
}

export default SidebarAccount
