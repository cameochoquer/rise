'use client'
import { FC } from "react";

const SafeExitButton: FC = () => {

  const handleExit = () => {
    // Redirect to Google
    window.location.href = "https://www.google.com";
  };

  return (
    <button
      onClick={handleExit}
      className="fixed bottom-4 right-4 p-5 rounded-full bg-red-500 text-white shadow-md  hover:bg-red-600 focus:outline-none"
    >
      Exit
    </button>
  );
};

export default SafeExitButton;
