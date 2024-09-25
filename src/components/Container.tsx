import { IContainer } from '@/interface/container'
import { cn } from '@/utils/classUtils'

const Container = ({ children, className }: IContainer) => {
  return <div className={cn('w-100 mx-auto px-[1rem] xl:max-w-[1250px] 2xl:max-w-[1530px]', className)}>{children}</div>
}

export default Container
