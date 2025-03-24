
import { DiaryLog } from './diaryLog';
import { FileUploader } from './fileUploader';
import { MonthCalendar } from './monthCalendar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/80 border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Personal Journal
          </h1>
            <FileUploader />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <DiaryLog />
          </div>

          <div className="space-y-6">
            <div className="sticky top-24">
             <MonthCalendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

