"use client"

import React, { useState } from "react"
import { FileUploader } from '../../components/ui/fileUploader'



const UploadedFilesDisplay = ({
  images,
  documents,
  onDeleteImage,
  onDeleteDocument,
}: {
  images: File[]
  documents: File[]
  onDeleteImage: (file: File) => void
  onDeleteDocument: (file: File) => void
}) => {


  return (
    <div className="space-y-10">
      <h2 className="text-xl font-semibold mb-4">Uploaded Images</h2>

      {/* Images Section */}
      {images.length > 0 && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((file, index) => (
              <div key={index}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-auto rounded shadow"
                />
                <button
                  onClick={() => onDeleteImage(file)}
                  className=" text-xs px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>))}
          </div>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>

      {/* Documents Section */}
      {documents.length > 0 && (
        <div>
          <ul className="list-disc list-inside space-y-2">
            {documents.map((file, index) => (
              <li key={index}>
                <a
                  href={URL.createObjectURL(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {file.name}
                </a>
                <button
                  onClick={() => onDeleteDocument(file)}
                  className="ml-4 text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function UploadViewerPage() {
  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])

  const handleFileChange = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    const docFiles = files.filter((file) =>
      ["application/pdf", "text/plain"].includes(file.type)
    )
    setImages((prev) => [...prev, ...imageFiles])
    setDocuments((prev) => [...prev, ...docFiles])
  }
  const handleDeleteImage = (fileToDelete: File) => {
    setImages((prev) => prev.filter((file) => file !== fileToDelete))
  }

  const handleDeleteDocument = (fileToDelete: File) => {
    setDocuments((prev) => prev.filter((file) => file !== fileToDelete))
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Upload documents
          </h1>
          <FileUploader onFilesUploaded={handleFileChange} />        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <UploadedFilesDisplay
          images={images}
          documents={documents}
          onDeleteImage={handleDeleteImage}
          onDeleteDocument={handleDeleteDocument}
        />      </main>
    </div>
  )
}