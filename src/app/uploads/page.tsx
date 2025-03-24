"use client"

import React, { useState } from "react"
import { FileUploader } from "../../components/ui/fileUploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const categories = ["Incident", "Children", "Benefits", "Immigration", "Other"];

const UploadedFilesDisplay = ({
  images,
  documents,
  onDeleteImage,
  onDeleteDocument,
  fileCategories,
  onCategoryChange
}: {
  images: File[]
  documents: File[]
  onDeleteImage: (file: File) => void
  onDeleteDocument: (file: File) => void
  fileCategories: Map<File, string>
  onCategoryChange: (file: File, category: string) => void
}) => {
  return (
    <div className="space-y-10">
      {images.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Uploaded Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((file, index) => (
              <Card key={index} className="overflow-hidden shadow">
                <CardContent className="p-2 space-y-2">
                  {/* Category Label */}
                  {fileCategories.has(file) && (
                    <div className="bg-blue-800 text-white w-fit text-sm font-semibold py-1 px-2 rounded-sm mb-2">
                      {fileCategories.get(file)}
                    </div>
                  )}
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-auto rounded"
                  />
                  <p>Uploaded on: {formatDate(file.lastModified)}</p>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteImage(file)}
                    className="w-full"
                  >
                    Delete
                  </Button>

                  <div>
                    <label htmlFor={`category-doc-${index}`} className="block text-sm font-semibold">
                      Category
                    </label>
                    <select
                      id={`category-doc-${index}`}
                      className="mt-1 p-1 border rounded"
                      onChange={(e) => onCategoryChange(file, e.target.value)}
                    >
                      {categories.map((category, idx) => (
                        <option key={idx} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {documents.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Uploaded Documents</h2>
          <Card>
            <CardContent className="space-y-2 p-4">
              {documents.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline truncate"
                  >
                    {file.name}
                  </a>
                  <p>Uploaded on: {formatDate(file.lastModified)}</p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:underline"
                    onClick={() => onDeleteDocument(file)}
                  >
                    Delete
                  </Button>

                  <div className="space-y-2">
                    <label htmlFor={`category-doc-${index}`} className="block text-sm font-semibold">
                      Category
                    </label>
                    <select
                      id={`category-doc-${index}`}
                      className="mt-1 p-1 border rounded"
                      onChange={(e) => onCategoryChange(file, e.target.value)}
                    >
                      {categories.map((category, idx) => (
                        <option key={idx} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                       {/* Category Label */}
                       {fileCategories.has(file) && (
                    <div className="bg-blue-800 text-white text-sm w-fit font-semibold py-1 px-2 rounded-sm mb-2">
                      {fileCategories.get(file)}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function UploadViewerPage() {
  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])
  const [fileCategories, setFileCategories] = useState<Map<File, string>>(new Map())

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
    setFileCategories((prev) => {
      const newCategories = new Map(prev);
      newCategories.delete(fileToDelete);
      return newCategories;
    });
  }

  const handleDeleteDocument = (fileToDelete: File) => {
    setDocuments((prev) => prev.filter((file) => file !== fileToDelete))
    setFileCategories((prev) => {
      const newCategories = new Map(prev);
      newCategories.delete(fileToDelete);
      return newCategories;
    });
  }

  const handleCategoryChange = (file: File, category: string) => {
    setFileCategories((prev) => new Map(prev).set(file, category));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Upload Documents
          </h1>
          <FileUploader onFilesUploaded={handleFileChange} />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <UploadedFilesDisplay
          images={images}
          documents={documents}
          onDeleteImage={handleDeleteImage}
          onDeleteDocument={handleDeleteDocument}
          fileCategories={fileCategories}
          onCategoryChange={handleCategoryChange}
        />
      </main>
    </div>
  )
}
