import { useRef, type ChangeEvent, type DragEvent } from 'react'
import { ImageIcon } from 'lucide-react'
import { useT } from '../../i18n'

interface UploadDropzoneStepProps {
  onFileSelected: (file: File) => void
  dragActive: boolean
  setDragActive: (active: boolean) => void
}

export const UploadDropzoneStep = ({ onFileSelected, dragActive, setDragActive }: UploadDropzoneStepProps) => {
  const t = useT()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) onFileSelected(file)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelected(file)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-ink mb-12">{t.upload.dropzone.heading}</h1>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full aspect-2/1 max-h-150 rounded-[30px] border border-dashed flex flex-col items-center justify-center gap-6 cursor-pointer transition-all ${
          dragActive ? 'border-primary bg-primary/5' : 'border-ink bg-surface-alt/30 hover:bg-surface-alt/60'
        }`}
      >
        <input type="file" ref={fileInputRef} onChange={handleChange} accept="image/*,video/*,.gif" className="hidden" />
        <ImageIcon className="w-24 h-24 text-voxel-gray-dark" strokeWidth={1.2} />
        <p className="text-2xl font-semibold text-ink">{t.upload.dropzone.dropHint}</p>
      </div>
    </div>
  )
}
