import { Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { SearchBar } from "./search";

export const Navbar = () => {
  return (
    <nav className="h-16 bg-nav-background border-b border-nav-border px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
        </div>
        <span className="text-xl font-semibold text-foreground">MapNexus</span>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <SearchBar onSearch={() => {}} />
      </div>
      {/* Right side - Profile and Notifications */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-hover-subtle"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-hover-subtle">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};
