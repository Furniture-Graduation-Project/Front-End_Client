/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from '@/components/Container'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useAuthContext } from '@/context/AuthContext'
import useAddressMutation from '@/hooks/mutations/useAddressMutation'
import { useAllAddressQuery, useOneAddressQuery } from '@/hooks/queries/useAddressQuery'
import { toast } from '@/hooks/use-toast'
import { useTranslate } from '@/hooks/useTranslate'
import { IDistrict, ILocation, IWard } from '@/interface/location'
import { cn } from '@/utils/classUtils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  addressName: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(10),
  country: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  street: z.string().min(1),
  default: z.boolean().optional()
})

const AddressForm = ({ update, locationId }: { update?: boolean; locationId?: string }) => {
  const { user } = useAuthContext()
  const [currentDistrict, setCurrentDistrict] = useState<IDistrict[]>([])
  const [currentWard, setCurrentWard] = useState<IWard[]>([])
  const { data } = useAllAddressQuery()
  const { mutate } = useAddressMutation({ action: 'CREATE' })
  const { mutate: updateAddress } = useAddressMutation({ action: 'UPDATE' })
  const { data: locationData } = useOneAddressQuery(user?._id as string, locationId as string)

  const { t } = useTranslate('checkout.form')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressName: '',
      firstName: '',
      lastName: '',
      phone: '',
      country: 'Việt Nam',
      city: '',
      district: '',
      ward: '',
      street: ''
    }
  })

  useEffect(() => {
    if (update && locationData) {
      form.reset(locationData.data.location)
    }
  }, [form, locationData, update])

  const isLoading = form.formState.isSubmitting

  const handleChangeDistrict = (value: string, field: any) => {
    field.onChange(value)
    const selectedCity = data?.data.find((city) => city.name === value)
    setCurrentDistrict(selectedCity ? selectedCity.districts : [])
  }
  const handleChangeWard = (value: string, field: any) => {
    field.onChange(value)
    const selectedWard = currentDistrict?.find((ward) => ward.name === value)
    setCurrentWard(selectedWard ? selectedWard.wards : [])
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (update) {
      updateAddress({ userId: user?._id as string, query: locationId as string, data })
      try {
        toast({
          title: t('successTitle'),
          description: t('updateDes'),
          variant: 'success'
        })
      } catch (error) {
        console.log(error)
        toast({
          title: t('errorTitle'),
          description: t('updateError'),
          variant: 'destructive'
        })
      }
      return
    }
    try {
      mutate({ userId: user?._id as string, query: '', data })
      toast({
        title: t('successTitle'),
        description: t('successDes'),
        variant: 'success'
      })
    } catch (error) {
      console.log(error)
      toast({
        title: t('errorTitle'),
        description: t('errorDes'),
        variant: 'destructive'
      })
    }
  }

  return (
    <Container>
      <Form {...form}>
        <form
          id='addressFormId'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit(onSubmit)(e)
          }}
        >
          <div className='gap-x-6 flex'>
            <div className='px-6 py-10 border rounded-md flex flex-col gap-y-6 border-black'>
              <h1 className='font-medium text-xl'>{t('title1')}</h1>
              <div className='grid grid-cols-2 gap-x-6'>
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('lastName')}</FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type='text' {...field} placeholder={t('lastName')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(`uppercase text-[#6C7275] font-bold text-[12px]`)}>
                        {t('firstName')}
                      </FormLabel>
                      <FormControl>
                        <Input disabled={isLoading} type='text' {...field} placeholder={t('firstName')} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('phone')}</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type='text' {...field} placeholder={t('phone')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name='default'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>{t('setDefault')}</FormLabel>
                      <FormDescription className='w-80'>{t('setDefaultDes')}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='px-6 py-10 border border-black rounded-md flex flex-col gap-y-6 w-full'>
              <h1 className='font-medium text-xl'>{t('title2')}</h1>
              <FormField
                control={form.control}
                name='addressName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('addressName')}</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type='text' {...field} placeholder={t('addressName')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('country')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className='placeholder-gray-400' placeholder='Country' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Việt Nam'>Việt Nam</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('city')}</FormLabel>
                    <Select onValueChange={(value) => handleChangeDistrict(value, field)} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className='placeholder-gray-400' placeholder={t('city')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.data && data.data.length > 0 ? (
                          data.data.map((item: ILocation) => (
                            <SelectItem key={item.codename} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem key='-1' value='-1'>
                            Trống
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>

              <div className='grid grid-cols-2 gap-x-6'>
                <FormField
                  control={form.control}
                  name='district'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('district')}</FormLabel>
                      <Select onValueChange={(value) => handleChangeWard(value, field)} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue className='placeholder-gray-400' placeholder={t('district')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentDistrict && currentDistrict.length > 0 ? (
                            currentDistrict.map((item: IDistrict) => (
                              <SelectItem key={item.codename} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem key='-1' value='-1'>
                              Trống
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name='ward'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('ward')}</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue className='placeholder-gray-400' placeholder={t('ward')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currentWard && currentWard.length > 0 ? (
                              currentWard.map((item: IWard) => (
                                <SelectItem key={item.codename} value={item.name}>
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem key='-1' value='-1'>
                                Trống
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormField
                control={form.control}
                name='street'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='uppercase text-[#6C7275] font-bold text-[12px]'>{t('street')}</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type='text' {...field} placeholder={t('street')} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </Container>
  )
}

export default AddressForm
