import { Link } from 'react-router'
import { Button } from '../components/ui/Button'

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-extrabold text-[#EA4C89]/30 mb-4 select-none">404</p>
      <h1 className="text-2xl font-bold text-white mb-2">Сторінку не знайдено</h1>
      <p className="text-[#8E8EA0] mb-8 max-w-sm">
        Здається, ця сторінка не існує або була переміщена.
      </p>
      <Link to="/login">
        <Button>Повернутися на головну</Button>
      </Link>
    </div>
  )
}
