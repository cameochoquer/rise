
"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

export default function UploadViewerPage() {
  const [images, setImages] = useState<File[]>([])
  const [documents, setDocuments] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))
    const docFiles = files.filter((file) =>
      ["application/pdf", "text/plain"].includes(file.type)
    )
    setImages((prev) => [...prev, ...imageFiles])
    setDocuments((prev) => [...prev, ...docFiles])
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Upload & View Files</h1>
      <div className="mb-6">
        <Label htmlFor="file-upload" className="block mb-2">
          Upload Images or Documents
        </Label>
        <Input
          id="file-upload"
          type="file"
          multiple
          accept="image/*,.pdf,.txt"
          onChange={handleFileChange}
        />
      </div>

      <Tabs defaultValue="images" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="images">
          {images.length === 0 ? (
            <p>No images uploaded.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, idx) => (
                <Card key={idx}>
                  <CardContent className="p-2">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${idx}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents">
          {documents.length === 0 ? (
            <p>No documents uploaded.</p>
          ) : (
            <ul className="space-y-4">
              {documents.map((doc, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <p className="font-semibold">{doc.name}</p>
                    <a
                      href={URL.createObjectURL(doc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Document
                    </a>
                  </CardContent>
                </Card>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
