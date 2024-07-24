import { CarouselSize } from './_components/Arrivals'
import Articles from './_components/Articles'
import Banner from './_components/Banner'
import BannerGrid from './_components/BannerGrid'
import Newsletter from './_components/Newsletter'
import Sale from './_components/Sale'
import Values from './_components/Values'

const HomePage = () => {
  return (
    <>
      <Banner />
      <BannerGrid />
      <CarouselSize />
      <Values bgColor='' />
      <Sale />
      <Articles />
      <Newsletter />
    </>
  )
}

export default HomePage
