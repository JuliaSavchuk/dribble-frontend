import { useProfile } from '../../hooks/useAuth'
import { SettingsLayout } from '../../components/settings/SettingsLayout'
import { Spinner } from '../../components/ui/Spinner'
import { useT } from '../../i18n'


export const GeneralPage = () => {
  const t = useT()
  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <SettingsLayout title={t.settings.general.title}>
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout title={t.settings.general.title}>
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-black">{t.settings.general.username}</span>
          <div className="w-full h-12.75 rounded-[20px] border border-voxel-gray-dark bg-black/2 flex items-center px-6 text-base text-black">
            {profile?.username}
          </div>
          <span className="text-sm text-black/38">
            {t.settings.general.voxelUrl}<b className="text-black">{profile?.username}</b>
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold text-black">{t.settings.general.accountEmail}</span>
          <div className="w-full h-12.75 rounded-[20px] border border-voxel-gray-dark bg-black/2 flex items-center px-6 text-base text-black">
            {profile?.email}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-105 pt-2">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold text-black">{profile?.shots_count ?? 0}</span>
            <span className="text-sm text-black/38">{t.settings.general.shots}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold text-black">{profile?.followers_count ?? 0}</span>
            <span className="text-sm text-black/38">{t.settings.general.followers}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold text-black">{profile?.following_count ?? 0}</span>
            <span className="text-sm text-black/38">{t.settings.general.following}</span>
          </div>
        </div>

      </div>
    </SettingsLayout>
  )
}