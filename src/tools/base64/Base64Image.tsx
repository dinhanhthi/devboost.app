'use client'

import { useRef, useState } from 'react'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonDownload from '../../components/ui/ButtonDownload'
import ButtonSample from '../../components/ui/ButtonSample'
import ButtonUpload from '../../components/ui/ButtonUpload'
import { Textarea } from '../../components/ui/Textarea'

export default function Base64Image() {
  const stringInputRef = useRef<HTMLTextAreaElement>(null)
  const [stringValue, setStringValue] = useState('')
  const [imageError, setImageError] = useState('')
  const [preview, setPreview] = useState<any>(null)

  const clearAll = () => {
    setStringValue('')
    setImageError('')
    setPreview(null)
  }

  const handleClearStringClicked = () => {
    clearAll()
    stringInputRef.current?.focus()
  }

  const handleClearImageClicked = () => {
    clearAll()
  }

  const handleOnChangeStringInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStringValue(event.target.value)
    if (!event.target.value) {
      setImageError('')
      setPreview(null)
      return
    }
    checkImage(
      event.target.value,
      () => {
        setImageError('')
        setPreview(event.target.value)
      },
      () => {
        setImageError('Invalid base64 string!')
      }
    )
  }

  function checkImage(url: string, good: () => void, bad: () => void) {
    var img = new Image()
    img.onload = good
    img.onerror = bad
    img.src = url
  }

  const handleClipboardString = (text: string) => {
    setStringValue(text)
    setImageError('')
    setPreview(text)
  }

  const handleClipboardImage = async () => {
    try {
      await handleClipboard()
    } catch (error) {
      setImageError('Error getting image from clipboard: ' + error)
    }
  }

  const handleClipboard = async () => {
    const clipboardItems = await navigator.clipboard.read()
    const blobOutput = await clipboardItems[0].getType('image/png')
    const blobUrl = URL.createObjectURL(blobOutput)
    setPreview(blobUrl)
    fetch(blobUrl)
      .then(response => response.blob())
      .then(blobData => {
        let reader = new FileReader()
        reader.onload = () => {
          let base64String = reader?.result as any
          setStringValue(base64String)
        }
        reader.readAsDataURL(blobData)
      })
      .catch(error => {
        throw `Error fetching the blob data: ${error}`
      })
  }

  const handleOnPasteImage = async (event: any) => {
    event.preventDefault()
    clearAll()
    try {
      const clipboardData = event.clipboardData || (window as any).clipboardData
      const item = clipboardData.items?.[0]
      if (item?.type?.indexOf('image') !== -1) {
        const imageFile = item.getAsFile()
        const reader = new FileReader()
        reader.onload = (e: any) => {
          setPreview(e.target.result)
          setStringValue(e.target.result)
        }
        reader.readAsDataURL(imageFile)
      } else {
        await handleClipboard()
      }
    } catch (error) {
      setImageError(`Error when pasting image: ${error}`)
    }
  }

  const handleOnPastString = (event: any) => {
    event.preventDefault()
    const clipboardData = event.clipboardData || (window as any).clipboardData
    const pastedData = clipboardData.getData('Text')
    setStringValue(stringValue + pastedData)
    setPreview(stringValue + pastedData)
  }

  const handleSampleStringClicked = () => {
    setPreview(null)
    setStringValue(sampleBase64)
    setPreview(sampleBase64)
  }

  const handleSampleImageClicked = () => {
    setPreview(sampleBase64)
    setStringValue(sampleBase64)
  }

  const handleDownloadImage = () => {
    const url = preview as string
    const a = document.createElement('a')
    a.href = url
    a.download = 'image_decoded_by_DevBoost.app.png'
    a.click()
    a.remove()
  }

  const handleUploadFile = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (event: any) => {
      const file = event.target.files[0]
      if (!file) return
      if (file.size > 50 * 1024 * 1024) {
        setImageError('Image size must be less than 50MB')
      }
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result)
        setStringValue(reader.result as string)
      }
      reader.onerror = e => {
        setImageError(`Error: ${e}`)
        setStringValue('')
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  const sampleBase64 = `data:image/png;base64,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`

  return (
    <div className="flex flex-col w-full h-full gap-4 2xl:flex-row">
      {/* Image */}
      <div className="flex flex-col flex-1 gap-4 max-h-[50%] 2xl:max-h-none">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="font-medium">Image</div>
          <ButtonUpload onClick={handleUploadFile} />
          <ButtonClipboard handleClipText={handleClipboardImage} />
          <ButtonSample onClick={handleSampleImageClicked} />
          <ButtonDownload onClick={handleDownloadImage} disabled={!preview} />
          <ButtonClear onClick={handleClearImageClicked} disabled={!preview && !imageError} />
        </div>
        <div className="flex-1 min-h-0">
          <div
            onPaste={handleOnPasteImage}
            className="flex items-center justify-center w-full h-full border rounded-lg bg-background"
          >
            {!preview && !imageError && (
              <span className="text-sm opacity-70">
                You can use buttons "Upload", "Clipboard" or just paste an image here...
              </span>
            )}
            {preview && !imageError && (
              <div className="flex items-center justify-center h-full p-8">
                <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </div>
            )}
            {imageError && (
              <div className="max-w-lg text-sm text-center text-danger">{imageError}</div>
            )}
          </div>
        </div>
      </div>

      {/* String */}
      <div className="flex flex-col flex-1 gap-4">
        <div className="flex flex-row flex-wrap items-center gap-2">
          <div className="font-medium">String</div>
          <ButtonClipboard handleClipText={handleClipboardString} />
          <ButtonSample onClick={handleSampleStringClicked} />
          <ButtonCopy text={stringValue} />
          <ButtonClear onClick={handleClearStringClicked} disabled={!stringValue} />
        </div>
        <div className="flex-1 min-h-0">
          <Textarea
            onPaste={handleOnPastString}
            className="h-full max-h-full resize-none db-scrollbar"
            ref={stringInputRef}
            value={stringValue}
            onChange={handleOnChangeStringInput}
            placeholder="Type base64 string here..."
          />
        </div>
      </div>
    </div>
  )
}
