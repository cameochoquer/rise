"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalendarProps {
  onSelectDate?: (date: Date) => void
  highlightedDates?: Date[]
}

export function MonthCalendar({ onSelectDate, highlightedDates = [] }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Sample highlighted dates (in a real app, these would come from your diary entries)
  const [sampleHighlightedDates] = useState([
    new Date(),
    new Date(Date.now() - 86400000), // yesterday
    new Date(Date.now() - 86400000 * 2), // 2 days ago
    new Date(Date.now() - 86400000 * 5), // 5 days ago
    new Date(Date.now() + 86400000 * 2), // 2 days from now
  ])

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    if (onSelectDate) {
      onSelectDate(date)
    }
  }

  const isDateHighlighted = (date: Date) => {
    return sampleHighlightedDates.some(
      (highlightedDate) =>
        highlightedDate.getDate() === date.getDate() &&
        highlightedDate.getMonth() === date.getMonth() &&
        highlightedDate.getFullYear() === date.getFullYear(),
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    return (
      selectedDate !== null &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const highlighted = isDateHighlighted(date)
      const today = isToday(date)
      const selected = isSelected(date)

      days.push(
        <Button
          key={day}
          variant="ghost"
          className={cn(
            "h-10 w-10 p-0 font-normal rounded-full relative",
            highlighted && !selected && !today && "bg-primary/10 text-primary-foreground",
            today && !selected && "border border-primary",
            selected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          )}
          onClick={() => handleDateClick(date)}
        >
          {day}
          {highlighted && !selected && (
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></span>
          )}
        </Button>,
      )
    }

    return days
  }

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous month</span>
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">{renderCalendarDays()}</div>

        <div className="mt-6 space-y-2">
          <div className="text-sm font-medium">Legend</div>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary/10 mr-1"></div>
              <span>Has entries</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full border border-primary mr-1"></div>
              <span>Today</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

