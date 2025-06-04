import React from "react";
import { ThemeModeToggle } from "../Theme/theme-mode-toggle";
import { NotebookPen } from "lucide-react";

const Header = () => {
  return (
    <header className="border-y flex justify-between items-center p-4 gap-4">
      <div className="flex justify-center items-center gap-4">
        <NotebookPen />
        <h1 className="text-2xl font-bold text-center">Personal Notes</h1>
      </div>

      <ThemeModeToggle />
    </header>
  );
};

export default Header;
