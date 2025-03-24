"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Edit, Trash2, Smile, Image, Paperclip } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface DiaryEntry {
  id: string
  content: string
  date: Date
  mood?: string
  attachments?: string[]
}

export function DiaryLog() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      content: "Today I started working on my new project. I'm excited about the possibilities!",
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      mood: "happy",
    },
    {
      id: "2",
      content: "Had a productive day. Managed to solve that bug that was bothering me for days.",
      date: new Date(Date.now() - 86400000), // 1 day ago
      mood: "productive",
    },
    {
      id: "3",
      content: "Just uploaded some important files to my new app. The upload feature works great!",
      date: new Date(),
      mood: "excited",
      attachments: ["/placeholder.svg?height=200&width=300"],
    },
  ])

  const [newEntry, setNewEntry] = useState("")
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const addEntry = () => {
    if (newEntry.trim()) {
      const entry: DiaryEntry = {
        id: crypto.randomUUID(),
        content: newEntry,
        date: new Date(),
      }
      setEntries([entry, ...entries])
      setNewEntry("")
    }
  }

  const updateEntry = () => {
    if (editingEntry && editingEntry.content.trim()) {
      setEntries(entries.map((entry) => (entry.id === editingEntry.id ? editingEntry : entry)))
      setEditingEntry(null)
    }
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const filteredEntries = selectedDate
    ? entries.filter(
        (entry) =>
          entry.date.getDate() === selectedDate.getDate() &&
          entry.date.getMonth() === selectedDate.getMonth() &&
          entry.date.getFullYear() === selectedDate.getFullYear(),
      )
    : entries

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border-2 border-primary/20">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind today?"
                className="min-h-[120px] mb-4 border-none bg-muted/50 focus-visible:ring-primary/30 resize-none transition-all"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Smile className="h-4 w-4" />
                    <span className="sr-only">Add mood</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Image className="h-4 w-4" />
                    <span className="sr-only">Add image</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Paperclip className="h-4 w-4" />
                    <span className="sr-only">Add attachment</span>
                  </Button>
                </div>
                <Button onClick={addEntry} disabled={!newEntry.trim()} className="rounded-full px-6">
                  Add Entry
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <div className="flex items-center justify-between">
          <h3 className="font-medium flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Entries for {formatDate(selectedDate)}
          </h3>
          <Button variant="ghost" onClick={() => setSelectedDate(null)}>
            Show all entries
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
              <div className="rounded-full bg-muted p-3 mb-4">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium mb-2">No entries yet</h3>
              <p>Start writing your thoughts for {selectedDate ? formatDate(selectedDate) : "today"}!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card
                key={entry.id}
                className={cn(
                  "overflow-hidden transition-all hover:shadow-md",
                  entry.mood === "happy" && "border-l-4 border-l-green-500",
                  entry.mood === "productive" && "border-l-4 border-l-blue-500",
                  entry.mood === "excited" && "border-l-4 border-l-purple-500",
                )}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm font-medium">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{formatDate(entry.date)}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{formatTime(entry.date)}</span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setEditingEntry(entry)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit entry</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Entry</DialogTitle>
                            <DialogDescription>
                              {formatDate(entry.date)} at {formatTime(entry.date)}
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea
                            className="min-h-[150px]"
                            value={editingEntry?.content || ""}
                            onChange={(e) =>
                              setEditingEntry((prev) => (prev ? { ...prev, content: e.target.value } : null))
                            }
                          />
                          <DialogFooter>
                            <Button onClick={updateEntry}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                            <span className="sr-only">Delete entry</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your diary entry.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteEntry(entry.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap mb-4">{entry.content}</p>

                  {entry.attachments && entry.attachments.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {entry.attachments.map((attachment, index) => (
                        <div key={index} className="relative rounded-md overflow-hidden">
                          <img
                            src={attachment || "/placeholder.svg"}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

