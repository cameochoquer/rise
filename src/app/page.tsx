import { DiaryLog } from "../components/ui/diaryLog";
import { FileUploader } from "../components/ui/fileUploader";
import { MonthCalendar } from "../components/ui/monthCalendar";
//import Login from "../components/ui/loginForm";
import LoginPage from "./login/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="lg:col-span-2 space-y-6">
        <LoginPage />
      </div>
     
    </div>
  );
}
