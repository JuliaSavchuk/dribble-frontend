import { useState } from 'react'
import { cn } from '../../utils/cn'
import { getAvatarColor, getAvatarInitial } from '../../utils/avatarColor'

interface AvatarProps {
  /** URL аватара з бекенду. Може бути null/undefined/порожній рядок — якщо 
   * бекенд ще не має фото користувача, компонент сам покаже заглушку з
   *  ініціалом імені (без звернення до зовнішніх сервісів-заглушок). */
  src?: string | null
  username: string
  shape?: 'circle' | 'square'
  className?: string
  textClassName?: string
}

export const Avatar = ({
  src,
  username,
  shape = 'circle',
  className,
  textClassName = 'text-sm',
}: AvatarProps) => {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl'

  // Посилання на фото може бути "мертвим" (видалений файл, недоступний
  // зовнішній хост тощо — саме так поводиться посилання на Unsplash у
  // мокових даних). Без обробки onError браузер показував би стандартну
  // зламану іконку замість заглушки з ініціалом.
  const [failedToLoad, setFailedToLoad] = useState(false)

  // Якщо src змінився (наприклад, користувач завантажив нове фото замість
  // зламаного) — скидаємо прапорець помилки. Порівнюємо з попереднім
  // значенням прямо під час рендеру (офіційно рекомендований React-патерн
  // для скидання стану при зміні пропса), а не в useEffect — так уникаємо
  // зайвого проміжного рендеру зі старим станом.
  const [prevSrc, setPrevSrc] = useState(src)
  if (src !== prevSrc) {
    setPrevSrc(src)
    setFailedToLoad(false)
  }

  if (src && !failedToLoad) {
    return (
      <img
        src={src}
        alt={username}
        onError={() => setFailedToLoad(true)}
        className={cn('object-cover bg-surface-alt shrink-0', shapeClass, className)}
      />
    )
  }

  // Немає завантаженого фото (або воно не завантажилось) — показуємо
  // заглушку з першою літерою юзернейму на пастельному фоні (детермінований
  // колір, окремий для кожного юзернейму — за зразком Gmail).
  const { bg, text } = getAvatarColor(username)

  return (
    <div
      className={cn('flex shrink-0 items-center justify-center font-bold', shapeClass, className)}
      style={{ backgroundColor: bg, color: text }}
      aria-label={username}
      role="img"
    >
      <span className={cn('leading-none', textClassName)}>{getAvatarInitial(username)}</span>
    </div>
  )
}