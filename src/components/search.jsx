import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Navigation } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

export function SearchBar({ onSearch, className }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const containerRef = useRef(null);
  const fromInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isExpanded && fromInputRef.current) {
      setTimeout(() => fromInputRef.current?.focus(), 150);
    }
  }, [isExpanded]);

  const handleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromValue.trim() && toValue.trim()) {
      onSearch?.(fromValue, toValue);
      setIsExpanded(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative transition-all duration-300 ease-out",
        isExpanded ? "w-[480px] h-[120px]" : "w-[320px] h-12",
        className
      )}
      onKeyDown={handleKeyDown}
    >
      {/* Container with background and shadow */}
      <div
        className={cn(
          "absolute inset-0 bg-search-background border border-search-border rounded-xl transition-all duration-300 ease-out",
          isExpanded
            ? "shadow-search-expanded"
            : "shadow-search hover:shadow-search-expanded"
        )}
      >
        {!isExpanded ? (
          // Collapsed state - single search bar
          <button
            onClick={handleExpand}
            className="w-full h-full flex items-center px-4 gap-3 text-left group"
            type="button"
          >
            <Search className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-muted-foreground group-hover:text-foreground transition-colors">
              Search destinations...
            </span>
          </button>
        ) : (
          // Expanded state - from/to inputs with submit
          <form
            onSubmit={handleSubmit}
            className="p-4 space-y-3 animate-fade-in"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={fromInputRef}
                  placeholder="From"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="pl-10 bg-input/50 border-search-border focus:border-primary"
                />
              </div>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="To"
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                  className="pl-10 bg-input/50 border-search-border focus:border-primary"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-200"
              disabled={!fromValue.trim() || !toValue.trim()}
            >
              <Search className="h-4 w-4 mr-2" />
              Search Routes
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
