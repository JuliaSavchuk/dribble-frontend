import logo from '../../assets/voxel.svg'
import { cn } from '../../utils/cn'

interface LogoProps {
  className?: string
  imgClassName?: string
  textClassName?: string
}

export const Logo = ({ className, imgClassName, textClassName }: LogoProps) => {
  return (
    <div className={cn('flex items-center', className)}>
      <img src={logo} alt="" className={cn('select-none', imgClassName)} draggable={false} />
      <span className={cn('font-script text-2xl', textClassName)}>Voxel</span>
    </div>
  )
}