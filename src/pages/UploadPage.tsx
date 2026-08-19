import { useState } from 'react'
import { useCreateShotMutation } from '../hooks/useShots'
import { Alert } from '../components/ui/Alert'
import { getErrorMessage } from '../utils/errors'
import { UploadDropzoneStep } from '../components/upload/UploadDropzoneStep'
import { UploadEditingStep, type ExtraBlock } from '../components/upload/UploadEditingStep'
import { UploadFinalTouchesStep } from '../components/upload/UploadFinalTouchesStep'
import { compressImageFile } from '../utils/compressImage'

type UploadStep = 'dropzone' | 'editing' | 'final'

const filesToPreviews = (files: FileList): string[] => Array.from(files).map((f) => URL.createObjectURL(f))

export const UploadPage = () => {
  const [step, setStep] = useState<UploadStep>('dropzone')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showDescriptionBlock, setShowDescriptionBlock] = useState(false)
  const [extraBlocks, setExtraBlocks] = useState<ExtraBlock[]>([])
  const [tags, setTags] = useState<string[]>([])

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [isPreparingUpload, setIsPreparingUpload] = useState(false)

  const createMutation = useCreateShotMutation()

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith('image/')) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setStep('editing')
  }

  const handleAddTag = (tag: string) => setTags((prev) => [...prev, tag])
  const handleRemoveTag = (index: number) => setTags((prev) => prev.filter((_, idx) => idx !== index))

  // Додаткові блоки композиції (зображення/відео/галерея) — суто
  // редакторський прев'ю-шар, див. коментар у UploadEditingStep.tsx.
  const handleAddImageBlock = (files: FileList) => {
    const [preview] = filesToPreviews(files)
    setExtraBlocks((prev) => [...prev, { id: crypto.randomUUID(), kind: 'image', preview }])
  }

  const handleAddVideoBlock = (files: FileList) => {
    const [preview] = filesToPreviews(files)
    setExtraBlocks((prev) => [...prev, { id: crypto.randomUUID(), kind: 'video', preview }])
  }

  const handleAddGalleryBlock = (files: FileList) => {
    const previews = filesToPreviews(files)
    setExtraBlocks((prev) => [...prev, { id: crypto.randomUUID(), kind: 'gallery', previews }])
  }

  const handleRemoveBlock = (id: string) => {
    setExtraBlocks((prev) => {
      const block = prev.find((b) => b.id === id)
      if (block) {
        const urls = block.kind === 'gallery' ? block.previews : [block.preview]
        urls.forEach((url) => URL.revokeObjectURL(url))
      }
      return prev.filter((b) => b.id !== id)
    })
  }

  const handleCancelEditing = () => {
    setImageFile(null)
    setImagePreview(null)
    setExtraBlocks([])
    setStep('dropzone')
  }

  const handlePublish = async () => {
    if (!title || !imageFile) return

    setIsPreparingUpload(true)
    try {
      // Стискаємо/масштабуємо зображення на клієнті перед відправкою.
      // Бекенд падає з 500 (TypeError: cannot pickle 'BufferedRandom'
      // instances) на файлах, більших за поріг Django
      // FILE_UPLOAD_MAX_MEMORY_SIZE (2.5 МБ за замовчуванням) — тоді файл
      // потрапляє в request.data як файловий дескриптор на диску, а не як
      // об'єкт у пам'яті, і `data.copy()` у serializers.py падає. Оскільки
      // змінювати бекенд не можна, тримаємо файл під цим порогом ще до
      // POST-запиту. Деталі та причина — в src/utils/compressImage.ts.
      const uploadFile = await compressImageFile(imageFile)

      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('tags', tags.join(','))
      formData.append('image', uploadFile)

      createMutation.mutate(formData)
    } finally {
      setIsPreparingUpload(false)
    }
  }

  return (
    <div className="min-h-[70vh]">
      {createMutation.isError && (
        <div className="max-w-3xl mx-auto px-4 pt-8">
          <Alert type="error" message={getErrorMessage(createMutation.error)} />
        </div>
      )}

      {step === 'dropzone' && (
        <UploadDropzoneStep
          onFileSelected={handleFileSelected}
          dragActive={dragActive}
          setDragActive={setDragActive}
        />
      )}

      {step === 'editing' && imagePreview && (
        <UploadEditingStep
          imagePreview={imagePreview}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          showDescriptionBlock={showDescriptionBlock}
          setShowDescriptionBlock={setShowDescriptionBlock}
          extraBlocks={extraBlocks}
          onAddImageBlock={handleAddImageBlock}
          onAddVideoBlock={handleAddVideoBlock}
          onAddGalleryBlock={handleAddGalleryBlock}
          onRemoveBlock={handleRemoveBlock}
          onCancel={handleCancelEditing}
          onContinue={() => setStep('final')}
        />
      )}

      {step === 'final' && imagePreview && (
        <UploadFinalTouchesStep
          imagePreview={imagePreview}
          tags={tags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
          onBack={() => setStep('editing')}
          onPublish={handlePublish}
          isPublishing={isPreparingUpload || createMutation.isPending}
        />
      )}
    </div>
  )
}