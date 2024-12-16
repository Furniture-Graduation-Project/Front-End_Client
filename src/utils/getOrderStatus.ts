export const getOrderStatus = (status: string, language: string) => {
  switch (status) {
    case 'all':
      return language === 'en' ? 'All' : 'Tất cả'
    case 'pending':
      return language === 'en' ? 'Pending' : 'Chờ xử lý'
    case 'unpaid':
      return language === 'en' ? 'Payment pending' : 'Chờ thanh toán'
    case 'confirmed':
      return language === 'en' ? 'Confirmed' : 'Đã xác nhận'
    case 'processing':
      return language === 'en' ? 'Processing' : 'Chờ lấy hàng'
    case 'shipped':
      return language === 'en' ? 'Shipped' : 'Đã gửi hàng'
    case 'delivered':
      return language === 'en' ? 'Delivered' : 'Đang giao hàng'
    case 'received':
      return language === 'en' ? 'Received' : 'Đã nhận hàng'
    case 'cancelled':
      return language === 'en' ? 'Cancelled' : 'Đã hủy'
    case 'return':
      return language === 'en' ? 'Return' : 'Trả hàng'
    default:
      return ''
  }
}
