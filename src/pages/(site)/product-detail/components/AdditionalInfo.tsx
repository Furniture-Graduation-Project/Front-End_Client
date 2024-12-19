import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useTranslate } from '@/hooks/useTranslate'
import { CheckCircle, Info } from 'lucide-react'

const AdditionalInfo = ({ data }: any) => {
  const { t } = useTranslate('productDetail')
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>{t('additionalInfo')}</CardTitle>
      </CardHeader>
      <CardContent>
        {data?.data.materialDetail && (
          <div className='mb-6'>
            <h3 className='font-medium text-lg mb-2'>{t('materialDetail')}</h3>
            <p className='text-gray-600'>{data?.data.materialDetail}</p>
          </div>
        )}
        <Separator className='my-4' />
        <h2 className='text-2xl font-semibold mb-4'>{t('warranty')}</h2>
        <div className='space-y-6'>
          <WarrantyItem icon={<CheckCircle className='text-green' />} text={t('warrantyItems.item1')} />
          <WarrantyItem icon={<CheckCircle className='text-green' />} text={t('warrantyItems.item2')} />
          <WarrantyItem
            icon={<CheckCircle className='text-green' />}
            text={
              <>
                {t('warrantyItems.item3')} <strong>088 6024 065</strong>
              </>
            }
          />
          <WarrantyItem icon={<CheckCircle className='text-green' />} text={t('warrantyItems.item4')} />
        </div>
        <h3 className='text-lg font-bold my-4'>{t('nonWarranty')}</h3>
        <ul className='space-y-6'>
          <NonWarrantyItem text={t('nonWarrantyItems.item1')} />
          <NonWarrantyItem text={t('nonWarrantyItems.item2')} />
          <NonWarrantyItem text={t('nonWarrantyItems.item3')} />
          <NonWarrantyItem text={t('nonWarrantyItems.item4')} />
          <NonWarrantyItem text={t('nonWarrantyItems.item5')} />
        </ul>
      </CardContent>
    </Card>
  )
}

const WarrantyItem = ({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) => (
  <div className='flex items-start gap-3'>
    {icon}
    <p className='text-gray-700'>{text}</p>
  </div>
)

const NonWarrantyItem = ({ text }: { text: string }) => (
  <li className='flex items-start gap-2'>
    <Info className='text-red w-5 h-5 flex-shrink-0' />
    <span className='text-gray-700'>{text}</span>
  </li>
)

export default AdditionalInfo
