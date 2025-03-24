"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronLeft, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState([
    {
      id: "documents",
      title: "Important Documents",
      items: [
        { id: "id", label: "Identification (ID, passport, birth certificate)", checked: false },
        { id: "financial", label: "Financial documents (bank statements, tax returns)", checked: false },
        { id: "insurance", label: "Insurance information", checked: false },
        { id: "medical", label: "Medical records and prescriptions", checked: false },
        { id: "housing", label: "Housing/property documents (lease, mortgage)", checked: false },
      ],
    },
    {
      id: "emergency",
      title: "Emergency Planning",
      items: [
        { id: "contacts", label: "Create list of emergency contacts", checked: false },
        { id: "escape", label: "Plan escape routes from home", checked: false },
        { id: "code", label: "Establish code word with trusted friends/family", checked: false },
        { id: "bag", label: "Pack emergency bag with essentials", checked: false },
        { id: "money", label: "Set aside emergency money if possible", checked: false },
      ],
    },
    {
      id: "digital",
      title: "Digital Safety",
      items: [
        { id: "passwords", label: "Change passwords on important accounts", checked: false },
        { id: "location", label: "Turn off location services on devices", checked: false },
        { id: "accounts", label: "Create new email account for sensitive communications", checked: false },
        { id: "devices", label: "Check devices for tracking software", checked: false },
        { id: "social", label: "Review privacy settings on social media", checked: false },
      ],
    },
    {
      id: "support",
      title: "Support Network",
      items: [
        { id: "trusted", label: "Identify trusted friends and family", checked: false },
        { id: "local", label: "Research local support services", checked: false },
        { id: "legal", label: "Connect with legal resources if needed", checked: false },
        { id: "counseling", label: "Find counseling or therapy options", checked: false },
        { id: "community", label: "Identify community resources (housing, financial aid)", checked: false },
      ],
    },
  ])

  const toggleItem = (sectionId: string, itemId: string) => {
    setChecklist(
      checklist.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            items: section.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, checked: !item.checked }
              }
              return item
            }),
          }
        }
        return section
      }),
    )
  }

  const getProgress = (section: (typeof checklist)[0]) => {
    const completed = section.items.filter((item) => item.checked).length
    return `${completed}/${section.items.length}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Safety Checklist</h1>
      </div>

      <div className="mb-6 p-4 bg-muted rounded-lg">
        <p className="text-sm">
          This checklist helps you prepare important items and steps for your safety plan. Check off items as you
          complete them. Your progress is saved automatically.
        </p>
      </div>

      <div className="space-y-6">
        {checklist.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>Progress: {getProgress(section)}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`${section.id}-${item.id}`}
                      checked={item.checked}
                      onCheckedChange={() => toggleItem(section.id, item.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <div className="flex items-center">
                        <Label
                          htmlFor={`${section.id}-${item.id}`}
                          className={`${item.checked ? "line-through text-muted-foreground" : ""}`}
                        >
                          {item.label}
                        </Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                <Info className="h-3 w-3" />
                                <span className="sr-only">More info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Tips for this item will appear here.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

