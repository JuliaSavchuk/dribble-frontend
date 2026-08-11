import { useState } from 'react'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { Toggle } from '../../components/ui/Toggle'
import { Button } from '../../components/ui/Button'
import { Alert } from '../../components/ui/Alert'

// Так само, як інші нові сторінки — немає бекенд-підтримки для приватності
// (стан activity/read receipts) чи видалення акаунта. Кнопка видалення
// НІКОЛИ не виконує запит наосліп: вона лише показує чесне повідомлення,
// оскільки на бекенді немає відповідного ендпоінта (і акаунт користувача
// не повинен випадково "видалятись" через незавершену функцію).
export const PrivacySecurityPage = () => {
  const [activityStatus, setActivityStatus] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)
  const [notice, setNotice] = useState('')

  const handleDeleteClick = () => {
    setNotice(
      'Видалення акаунта поки не реалізоване на бекенді — ця дія навмисно нічого не робить, щоб не пошкодити ваші дані.'
    )
  }

  return (
    <SettingsLayout title="Privacy & Security">
      <div className="flex flex-col gap-9">
        {notice && <Alert type="info" message={notice} />}

        <h2 className="text-xl font-semibold text-black">Activity Privacy</h2>

        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 pb-6 border-b border-black">
            <Toggle
              checked={activityStatus}
              onChange={setActivityStatus}
              label="Activity Status"
            />
            <div className="flex flex-col gap-1">
              <span className="text-base text-black">Activity Status</span>
              <span className="text-sm text-black">
                Let others see when you're active or when you were last active
              </span>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Toggle checked={readReceipts} onChange={setReadReceipts} label="Read Receipts" />
            <div className="flex flex-col gap-1">
              <span className="text-base text-black">Read Receipts</span>
              <span className="text-sm text-black">
                Show when messages have been read. If you turn this off, you won't see read
                receipts from others
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-black">
          <h2 className="text-xl font-semibold text-black">Delete Voxel Account</h2>
          <p className="text-base text-black max-w-166.5">
            Deleting your account will permanently remove your Voxel profile and all associated
            content. This action cannot be reversed
          </p>
          <Button type="button" variant="danger" onClick={handleDeleteClick} className="w-fit">
            Delete Account
          </Button>
        </div>
      </div>
    </SettingsLayout>
  )
}
