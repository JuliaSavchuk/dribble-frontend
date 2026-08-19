interface CompressOptions {
  maxSizeBytes?: number
  maxDimension?: number
  initialQuality?: number
  minQuality?: number
}

const DEFAULT_OPTIONS: Required<CompressOptions> = {
  maxSizeBytes: 2 * 1024 * 1024,
  maxDimension: 2560,
  initialQuality: 0.85,
  minQuality: 0.4,
}

const SKIP_TYPES = new Set(['image/gif', 'image/svg+xml'])

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Не вдалося декодувати зображення для стиснення'))
    }
    img.src = url
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality))
}


export async function compressImageFile(file: File, options: CompressOptions = {}): Promise<File> {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  if (SKIP_TYPES.has(file.type) || file.size <= opts.maxSizeBytes) {
    return file
  }

  try {
    const img = await loadImage(file)

    let width = img.naturalWidth || img.width
    let height = img.naturalHeight || img.height
    if (width > opts.maxDimension || height > opts.maxDimension) {
      const scale = opts.maxDimension / Math.max(width, height)
      width = Math.round(width * scale)
      height = Math.round(height * scale)
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return file

    ctx.drawImage(img, 0, 0, width, height)

    const outputType = 'image/jpeg'
    let quality = opts.initialQuality
    let blob = await canvasToBlob(canvas, outputType, quality)

    while (blob && blob.size > opts.maxSizeBytes && quality > opts.minQuality) {
      quality = Math.round((quality - 0.1) * 100) / 100
      blob = await canvasToBlob(canvas, outputType, quality)
    }

    if (!blob) return file

    const newName = file.name.replace(/\.[^./\\]+$/, '') + '.jpg'
    return new File([blob], newName, { type: outputType, lastModified: Date.now() })
  } catch {
    return file
  }
}