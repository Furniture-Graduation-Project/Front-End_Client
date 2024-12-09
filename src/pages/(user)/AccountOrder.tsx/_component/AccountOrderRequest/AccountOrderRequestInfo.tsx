import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { ArrowLeft } from 'lucide-react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslate } from '@/hooks/useTranslate'

const AccountOrderRequestInfo = ({ data }: any) => {
  const { language } = useLanguage()
  const { t } = useTranslate('account.order.request')
  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold'>{t('returnRequest')}</h2>
            <Link className='flex items-center gap-2 whitespace-nowrap' to={`/account/order/${data?.data._id}`}>
              <ArrowLeft size={16} /> {t('back')}
            </Link>
          </div>
        </CardHeader>
        <CardContent className='space-y-2'>
          <h3>{t(`status.${data.data.returnInfo?.status || 'unknown'}`)}</h3>
          <div>
            <h3>
              {t('requestDate')}{' '}
              {data?.data.returnInfo?.dateRequested && formatDate(data?.data.returnInfo?.dateRequested, language)}
            </h3>
            <h3>
              {t('resolvedDate')}{' '}
              {data?.data.returnInfo?.dateResolved && formatDate(data?.data.returnInfo?.dateResolved, language)}
            </h3>
          </div>
          <p>
            <strong>{t('reason')}</strong>
            {data.data.returnInfo?.reason}
          </p>
        </CardContent>
      </Card>
      <Card className='mt-6'>
        <CardHeader>
          <h3 className='font-semibold'>{t('products.header')}</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className='text-left whitespace-nowrap min-w-[300px]'>{t('products.product')}</TableCell>
                <TableCell className='text-center whitespace-nowrap'>{t('products.quantity')}</TableCell>
                <TableCell className='text-center whitespace-nowrap'>{t('products.price')}</TableCell>
                <TableCell className='text-center whitespace-nowrap'>{t('products.status')}</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.returnInfo.items.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell className='flex items-center gap-5'>
                    <img
                      src={item.productOptionId?.image || ''}
                      alt={item.productId?.name}
                      className='w-32 h-32 object-cover'
                    />
                    <div className='flex flex-col gap-2'>
                      <h4 className='text-lg font-semibold'>{item.productId?.name}</h4>
                      <div className='text-sm text-gray-500'>
                        {item.productOptionId?.variants &&
                          item.productOptionId.variants.map((variant: any, id: number) => (
                            <h4 className='whitespace-nowrap' key={id}>
                              {variant.variant}: {variant.value}
                            </h4>
                          ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-center'>{item.quantity}</TableCell>
                  <TableCell className='text-center'>{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                  <TableCell className='text-center whitespace-nowrap'>{t(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountOrderRequestInfo
