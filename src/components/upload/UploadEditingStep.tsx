import { useRef } from 'react'
import { Type, Image as ImageIcon, Video as VideoIcon, GalleryHorizontalEnd, X } from 'lucide-react'
import { Button } from '../ui/Button'
import { useT } from '../../i18n'
export type ExtraBlock =
  | { id: string; kind: 'image'; preview: string }
  | { id: string; kind: 'video'; preview: string }
  | { id: string; kind: 'gallery'; previews: string[] }

interface UploadEditingStepProps {
  imagePreview: string
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  showDescriptionBlock: boolean
  setShowDescriptionBlock: (show: boolean) => void
  extraBlocks: ExtraBlock[]
  onAddImageBlock: (files: FileList) => void
  onAddVideoBlock: (files: FileList) => void
  onAddGalleryBlock: (files: FileList) => void
  onRemoveBlock: (id: string) => void
  onCancel: () => void
  onContinue: () => void
}

export const UploadEditingStep = ({
  imagePreview,
  title,
  setTitle,
  description,
  setDescription,
  showDescriptionBlock,
  setShowDescriptionBlock,
  extraBlocks,
  onAddImageBlock,
  onAddVideoBlock,
  onAddGalleryBlock,
  onRemoveBlock,
  onCancel,
  onContinue,
}: UploadEditingStepProps) => {
  const t = useT()
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
        {/* Основна колонка: назва + превʼю + усі додані блоки по порядку */}
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.upload.editing.titlePlaceholder}
            className="w-full max-w-2xl text-center text-4xl md:text-5xl font-bold text-ink placeholder:text-black/35 bg-transparent focus:outline-none mb-10"
          />

          <div className="w-full max-w-2xl aspect-square rounded-[20px] overflow-hidden border border-border bg-surface-alt">
            <img src={imagePreview} alt={t.upload.editing.coverAlt} className="w-full h-full object-cover" />
          </div>

          {showDescriptionBlock && (
            <EditorBlockShell
              label={t.upload.editing.textBlockLabel}
              onRemove={() => setShowDescriptionBlock(false)}
              removeLabel={t.upload.editing.removeBlock}
            >
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.upload.editing.descriptionPlaceholder}
                rows={4}
                autoFocus
                className="w-full rounded-2xl bg-surface border border-border px-4 py-3 text-sm text-ink focus:outline-none focus:border-primary"
              />
            </EditorBlockShell>
          )}

          {extraBlocks.map((block) => (
            <EditorBlockShell
              key={block.id}
              label={
                block.kind === 'image'
                  ? t.upload.editing.imageBlockLabel
                  : block.kind === 'video'
                    ? t.upload.editing.videoBlockLabel
                    : t.upload.editing.galleryBlockLabel
              }
              onRemove={() => onRemoveBlock(block.id)}
              removeLabel={t.upload.editing.removeBlock}
            >
              {block.kind === 'image' && (
                <img src={block.preview} alt="" className="w-full max-h-125 rounded-2xl object-cover" />
              )}
              {block.kind === 'video' && (
                <video src={block.preview} controls className="w-full max-h-125 rounded-2xl bg-black" />
              )}
              {block.kind === 'gallery' && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {block.previews.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-36 h-36 shrink-0 rounded-xl object-cover border border-border"
                    />
                  ))}
                </div>
              )}
            </EditorBlockShell>
          ))}
        </div>

        {/* Бокова панель "Insert block" */}
        <aside className="bg-white border border-border rounded-2xl shadow-lg p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-lg font-bold text-ink mb-6">{t.upload.editing.insertBlockTitle}</h2>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setShowDescriptionBlock(true)}
              disabled={showDescriptionBlock}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-alt transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed text-left"
            >
              <Type className="w-5 h-5 text-ink shrink-0" />
              <span className="text-sm font-bold text-ink">{t.upload.editing.blockText}</span>
            </button>

            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-alt transition-colors cursor-pointer text-left"
            >
              <ImageIcon className="w-5 h-5 text-ink shrink-0" />
              <span className="text-sm font-bold text-ink">{t.upload.editing.blockImages}</span>
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) onAddImageBlock(e.target.files)
                e.target.value = ''
              }}
            />

            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-alt transition-colors cursor-pointer text-left"
            >
              <VideoIcon className="w-5 h-5 text-ink shrink-0" />
              <span className="text-sm font-bold text-ink">{t.upload.editing.blockVideo}</span>
            </button>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) onAddVideoBlock(e.target.files)
                e.target.value = ''
              }}
            />

            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-alt transition-colors cursor-pointer text-left"
            >
              <GalleryHorizontalEnd className="w-5 h-5 text-ink shrink-0" />
              <span className="text-sm font-bold text-ink">{t.upload.editing.blockGallery}</span>
            </button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) onAddGalleryBlock(e.target.files)
                e.target.value = ''
              }}
            />
          </div>

          <p className="text-xs text-muted mt-4 leading-relaxed">{t.upload.editing.sidebarHint}</p>
        </aside>
      </div>

      {/* Дії кроку */}
      <div className="flex items-center justify-center gap-4 mt-12">
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t.common.cancel}
        </Button>
        <Button type="button" variant="dark" onClick={onContinue} disabled={!title.trim()}>
          {t.common.continue}
        </Button>
      </div>
    </div>
  )
}

// Спільна "рамка" блоку в композиції: підпис типу блоку + кнопка видалення,
// однаковий стиль для тексту/зображення/відео/галереї.
const EditorBlockShell = ({
  label,
  onRemove,
  removeLabel,
  children,
}: {
  label: string
  onRemove: () => void
  removeLabel: string
  children: React.ReactNode
}) => (
  <div className="w-full max-w-2xl mt-6 flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <label className="text-xs font-semibold text-muted tracking-wider uppercase">{label}</label>
      <button
        type="button"
        onClick={onRemove}
        className="text-muted hover:text-red-500 cursor-pointer"
        aria-label={removeLabel}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
    {children}
  </div>
)
