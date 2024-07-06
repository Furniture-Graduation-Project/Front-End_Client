import { CarouselSize } from './_component/Arrivals'
import Articles from './_component/Articles'
import Banner from './_component/Banner'
import BannerGrid from './_component/BannerGrid'
import Newsletter from './_component/Newsletter'
import Sale from './_component/Sale'
import Values from './_component/Values'

const HomePage = () => {
  return (
    <>
      <Banner />
      <BannerGrid />
      <CarouselSize />
      <Values />
      <Sale />
      <Articles />
      <Newsletter />
    </>
  )
}

export default HomePage
