import { useState, type KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'
import { Button } from '../ui/Button'
import { useT } from '../../i18n'

interface UploadFinalTouchesStepProps {
  imagePreview: string
  tags: string[]
  onAddTag: (tag: string) => void
  onRemoveTag: (index: number) => void
  onBack: () => void
  onPublish: () => void
  isPublishing: boolean
}

const MAX_TAGS = 10
const SUGGESTED_TAGS = ['flowers', 'photo', 'anime', 'ui', 'branding']

export const UploadFinalTouchesStep = ({
  imagePreview,
  tags,
  onAddTag,
  onRemoveTag,
  onBack,
  onPublish,
  isPublishing,
}: UploadFinalTouchesStepProps) => {
  const t = useT()
  const [tagInput, setTagInput] = useState('')
  const [wantsFeedback, setWantsFeedback] = useState(false)

  const handleAdd = () => {
    const clean = tagInput.trim().toLowerCase()
    if (clean && tags.length < MAX_TAGS && !tags.includes(clean)) {
      onAddTag(clean)
      setTagInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold text-ink mb-10 text-center md:text-left">{t.upload.finalTouches.heading}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Мініатюра */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-ink">{t.upload.finalTouches.thumbnailPreview}</h2>
          <div className="aspect-square rounded-2xl overflow-hidden border border-border bg-surface-alt">
            <img src={imagePreview} alt={t.upload.finalTouches.thumbnailAlt} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Теги + опції */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-ink">{t.upload.finalTouches.tagsLabel}</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.upload.finalTouches.tagsPlaceholder}
                disabled={tags.length >= MAX_TAGS}
                className="flex-1 rounded-2xl border border-voxel-gray-dark px-4 py-3 text-sm text-ink focus:outline-none focus:border-primary disabled:opacity-50"
              />
              <Button type="button" variant="secondary" onClick={handleAdd} disabled={tags.length >= MAX_TAGS}>
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-ink/80">{t.upload.finalTouches.suggestedLabel} {SUGGESTED_TAGS.join(', ')}</p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-alt border border-border text-xs text-ink rounded-full"
                  >
                    #{tag}
                    <button type="button" onClick={() => onRemoveTag(idx)} className="hover:text-red-500 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink">{t.upload.finalTouches.feedbackTitle}</h2>
              <p className="text-sm text-ink/70">{t.upload.finalTouches.feedbackDescription}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={wantsFeedback}
              onClick={() => setWantsFeedback((v) => !v)}
              className={`relative inline-flex h-7 w-16 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer ${
                wantsFeedback ? 'bg-primary' : 'bg-black/30'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  wantsFeedback ? 'translate-x-9' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Дії кроку */}
      <div className="flex items-center justify-center md:justify-end gap-4 mt-16">
        <Button type="button" variant="secondary" onClick={onBack}>
          {t.upload.finalTouches.back}
        </Button>
        <Button type="button" variant="dark" onClick={onPublish} isLoading={isPublishing}>
          {t.upload.finalTouches.publish}
        </Button>
      </div>
    </div>
  )
}
