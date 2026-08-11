import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { useProfile } from '../../hooks/useAuth'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { SettingsField } from '../../components/settings/SettingsField'
import { Avatar } from '../../components/ui/Avatar'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'
import { Spinner } from '../../components/ui/Spinner'

// ВАЖЛИВО: на бекенді (apps/users) наразі немає жодної моделі чи ендпоінта
// для даних компанії - це не Фаза 0 API контракту. Сторінка повністю
// готова за макетом дизайнерів і робоча на рівні UI (поля, вибір логотипу),
// але "Save change" не відправляє запит на неіснуючий ендпоінт, а чесно
// повідомляє про це користувачу, замість того щоб імітувати збереження.
export const CompanyPage = () => {
  const { data: profile, isLoading } = useProfile()

  const [companyName, setCompanyName] = useState('')
  const [companyUrl, setCompanyUrl] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [notice, setNotice] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setNotice(
      'Розділ «Company» ще не підключений до бекенду — ендпоінт для даних компанії поки не реалізований. Зміни не збережуться на сервері.'
    )
  }

  if (isLoading) {
    return (
      <SettingsLayout title="Company">
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout title="Company">
      <form onSubmit={handleSubmit} className="flex flex-col gap-9">
        {notice && <Alert type="info" message={notice} />}

        <SettingsField
          label="Company name"
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        {/* Логотип компанії — перевикористовуємо Avatar (пастельна заглушка
            з першою літерою назви компанії, поки логотип не завантажено). */}
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-black">Company Logo</span>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar
              src={logoPreview}
              username={companyName || profile?.username || '?'}
              shape="square"
              className="w-23.5 h-23.5 border border-border shrink-0"
              textClassName="text-2xl"
            />
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-1.5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-ink/90 transition-colors cursor-pointer w-fit"
              >
                Choose Logo
              </button>
              <span className="text-sm font-semibold text-black/38">
                {logoFile ? logoFile.name : 'JPG, GIF or PNG, Max size of 5mb'}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/gif"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <SettingsField
          label="Company URL"
          type="url"
          placeholder="https://mycompany.com"
          value={companyUrl}
          onChange={(e) => setCompanyUrl(e.target.value)}
        />

        <div className="flex justify-end">
          <Button type="submit" variant="dark">
            Save change
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}
