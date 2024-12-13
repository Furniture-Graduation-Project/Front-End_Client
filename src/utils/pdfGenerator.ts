import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { formatCurrency } from './formatCurrency'
import { formatDate } from './formatDate'
import { LogoBlack } from '@/assets'
import { imageToBase64 } from './urlToBase64'
;(pdfMake as any).vfs = pdfFonts.pdfMake?.vfs

const translations: any = {
  vi: {
    brand: 'Cửa hàng nội thất River',
    address: 'Tòa nhà FPT Polytechnic, 13 phố Trịnh Văn Bô, phường Phương Canh, quận Nam Từ Liêm, TP Hà Nội',
    date: 'Ngày đặt',
    customerName: 'Tên khách hàng',
    itemName: 'Tên mặt hàng',
    status: 'Trạng thái thanh toán',
    paid: 'Đã thanh toán',
    unpaid: 'Chưa thanh toán',
    quantity: 'Số lượng',
    orderPhone: 'Số điện thoại khách hàng',
    orderAddress: 'Địa chỉ',
    amount: 'Giá',
    total: 'Tổng cộng',
    totalAmount: 'Tổng số tiền cần thanh toán',
    page: 'Trang'
  },
  en: {
    brand: 'River Interior Store',
    address: 'FPT Polytechnic Building, 13 Trinh Van Bo Street, Phuong Canh Ward, Nam Tu Liem District, Hanoi City',
    date: 'Date order',
    customerName: 'Customer name',
    itemName: 'Item name',
    quantity: 'Quantity',
    status: 'Payment status',
    paid: 'Paid',
    unpaid: 'Unpaid',
    orderPhone: 'Customer phone',
    orderAddress: 'Customer address',
    amount: 'Amount',
    total: 'Total',
    totalAmount: 'Total amount to be paid',
    page: 'Page'
  }
}

export const generatePDF = (data: any, language: string) => {
  const translate: any = translations[language] || translations['en']

  if (data && data.data && data.data.items) {
    const items = data.data.items.map((item: any, index: number) => [
      { text: index + 1, alignment: 'center' },
      item.productId?.name || 'N/A',
      { text: item.quantity, alignment: 'right' },
      { text: formatCurrency(item.unitPrice), alignment: 'right' },
      { text: formatCurrency(item.quantity * item.unitPrice), alignment: 'right' }
    ])

    imageToBase64(LogoBlack)
      .then((base64Image) => {
        const status: 'paid' | 'unpaid' = data.data.payment?.paymentStatus
        const statusColor = status === 'paid' ? '#4CAF50' : '#FF6347'

        const docDefinition = {
          content: [
            {
              columns: [
                {
                  image: base64Image,
                  width: 170,
                  alignment: 'start'
                },
                {
                  text: translate.brand,
                  style: 'header',
                  alignment: 'center',
                  margin: [0, 0, 0, 10]
                }
              ]
            },
            {
              columns: [
                {
                  text: '',
                  alignment: 'start'
                },
                {
                  text: translate.address,
                  alignment: 'center',
                  margin: [0, 0, 0, 10]
                }
              ]
            },

            {
              columns: [
                {
                  text: `${translate.customerName}: ${data.data.orderName}`,
                  alignment: 'left'
                },
                {
                  text: `${translate.date}: ${formatDate(data.data.createdAt, language)}`,
                  alignment: 'right'
                }
              ],
              margin: [0, 0, 0, 10]
            },
            {
              text: `${translate.status}: ${translate[status]}`,
              alignment: 'left',
              color: statusColor,
              margin: [0, 10, 0, 10]
            },
            {
              text: `${translate.orderPhone}: ${data.data.orderPhone}`,
              alignment: 'left',

              margin: [0, 10, 0, 10]
            },
            {
              text: `${translate.orderAddress}: ${data.data.orderAddress}`,
              alignment: 'left',

              margin: [0, 0, 0, 10]
            },
            {
              table: {
                headerRows: 1,
                widths: ['auto', '*', 'auto', 'auto', 'auto'],
                body: [
                  [
                    { text: 'S.no', style: 'tableHeader', alignment: 'center' },
                    { text: translate.itemName, style: 'tableHeader' },
                    { text: translate.quantity, style: 'tableHeader', alignment: 'right' },
                    { text: translate.amount, style: 'tableHeader', alignment: 'right' },
                    { text: translate.total, style: 'tableHeader', alignment: 'right' }
                  ],
                  ...items
                ]
              },
              layout: {
                fillColor: (rowIndex: any) => (rowIndex % 2 === 0 ? '#f2f2f2' : null),
                hLineColor: () => '#cccccc',
                vLineColor: () => '#cccccc'
              },
              margin: [0, 10, 0, 10]
            },
            {
              text: `${translate.totalAmount}: ${formatCurrency(data.data.totalPrice || 0)}`,
              style: 'total',
              alignment: 'right',
              margin: [0, 20, 0, 0]
            }
          ],
          footer: (currentPage: number, pageCount: number) => ({
            text: `${translate.page} ${currentPage} ${translate.page} ${pageCount}`,
            alignment: 'center',
            margin: [0, 10, 0, 0],
            style: 'footer'
          }),
          styles: {
            header: {
              fontSize: 20,
              bold: true,
              color: '#4CAF50'
            },
            tableHeader: {
              fontSize: 12,
              bold: true,
              fillColor: '#d3d3d3'
            },
            total: {
              fontSize: 14,
              bold: true
            },
            footer: {
              fontSize: 10,
              color: '#888888'
            }
          }
        }
        pdfMake.createPdf(docDefinition).download(`Bill-${data.data.code}.pdf`)
      })
      .catch((error) => {
        console.error('Error converting image to base64:', error)
      })
  }
}
