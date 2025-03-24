"use client"

import type React from "react"
import { FileUploader } from '../components/ui/fileUploader';

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, File, X, Check, AlertCircle, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type FileStatus = "idle" | "uploading" | "success" | "error"

interface FileItem {
  file: File
  progress: number
  status: FileStatus
  id: string
}

export function FileUploader() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files))
    }
  }

  const addFiles = (newFiles: File[]) => {
    const newFileItems = newFiles.map((file) => ({
      file,
      progress: 0,
      status: "idle" as FileStatus,
      id: crypto.randomUUID(),
    }))

    setFiles((prev) => [...prev, ...newFileItems])

    // Simulate upload for each file
    newFileItems.forEach((fileItem) => {
      simulateUpload(fileItem.id)
    })
  }

  const simulateUpload = (id: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "uploading" } : f)))

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)

        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress, status: "success" } : f)))
      } else {
        setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress } : f)))
      }
    }, 300)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files))
      setIsDialogOpen(false)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="icon" className="rounded-full h-10 w-10 shadow-md">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Upload files</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Upload Files</DialogTitle>
                  <DialogDescription>Drag and drop files or click to browse</DialogDescription>
                </DialogHeader>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                    isDragging
                      ? "border-primary bg-primary/5 scale-[0.98]"
                      : "border-muted-foreground/25 hover:border-primary/50",
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={openFileDialog}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-1">Drag & drop files here</h3>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                  <Button variant="secondary">Select Files</Button>
                  <p className="text-xs text-muted-foreground mt-4">Supports all file types</p>
                </div>

                {files.length > 0 && (
                  <div className="space-y-4 mt-4 max-h-[200px] overflow-y-auto pr-2">
                    {files.map((fileItem) => (
                      <div key={fileItem.id} className="flex items-center p-3 border rounded-lg bg-background">
                        <div className="mr-3">
                          {fileItem.status === "success" ? (
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : fileItem.status === "error" ? (
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <File className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-medium truncate">{fileItem.file.name}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFile(fileItem.id)
                              }}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{(fileItem.file.size / 1024).toFixed(2)} KB</span>
                            <span className="mx-2">•</span>
                            <span>{fileItem.file.type || "Unknown type"}</span>
                          </div>
                          {fileItem.status === "uploading" && (
                            <Progress value={fileItem.progress} className="h-1 mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <DialogFooter className="sm:justify-start">
                  <Button type="button" variant="secondary" onClick={() => setIsDialogOpen(false)}>
                    Done
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload Files</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}

