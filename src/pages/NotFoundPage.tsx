import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { useT } from '../i18n'

export const NotFoundPage = () => {
  const t = useT()

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-extrabold text-primary/25 mb-4 select-none">404</p>
      <h1 className="text-2xl font-bold text-ink mb-2">{t.notFound.title}</h1>
      <p className="text-muted mb-8 max-w-sm">
        {t.notFound.description}
      </p>
      <Link to="/feed">
        <Button>{t.notFound.backHome}</Button>
      </Link>
    </div>
  )
}
