import { ThemeModeToggle } from "@/components/Theme/theme-mode-toggle";

const ThemeController = () => {
  return (
    <div className="absolute top-4 right-4 z-50">
      <ThemeModeToggle />
    </div>
  );
};

export default ThemeController;
