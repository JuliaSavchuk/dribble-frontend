import { Logo } from '../ui/Logo'
import { cn } from '../../utils/cn'

interface VoxelLogoProps {
  className?: string
}

export const VoxelLogo = ({ className }: VoxelLogoProps) => {
  return (
    <Logo
      className={cn('flex-col items-center', className)}
      imgClassName="h-12 w-auto"
      textClassName="text-voxel-black -mt-1"
    />
  )
}