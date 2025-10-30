import { useState } from "react";
import { Search, Filter, X, BookOpen, Brain } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  categories: string[];
  difficulties: string[];
  selectedCategories: string[];
  selectedDifficulties: string[];
  searchQuery: string;
  mode: "patterns" | "quiz";
  onSearchChange: (query: string) => void;
  onCategoryToggle: (category: string) => void;
  onDifficultyToggle: (difficulty: string) => void;
  onClearFilters: () => void;
  onModeChange: (mode: "patterns" | "quiz") => void;
}

export function Sidebar({
  categories,
  difficulties,
  selectedCategories,
  selectedDifficulties,
  searchQuery,
  mode,
  onSearchChange,
  onCategoryToggle,
  onDifficultyToggle,
  onClearFilters,
  onModeChange,
}: SidebarProps) {
  const hasActiveFilters = selectedCategories.length > 0 || selectedDifficulties.length > 0;

  return (
    <aside className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      <div className="p-6 border-b border-sidebar-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CP</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">CodePatterns</h1>
            <p className="text-xs text-muted-foreground">Learn better code</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => onModeChange("patterns")}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              mode === "patterns"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Patterns
          </button>
          <button
            onClick={() => onModeChange("quiz")}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              mode === "quiz"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Brain className="h-4 w-4" />
            Quiz
          </button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patterns..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 bg-muted/50 border-border/50"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full"
            >
              <X className="h-3 w-3 mr-2" />
              Clear Filters
            </Button>
          )}

          {/* Categories */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Categories
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <Badge
                    key={category}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    onClick={() => onCategoryToggle(category)}
                  >
                    {category}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Difficulty
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => {
                const isSelected = selectedDifficulties.includes(difficulty);
                const colorClass =
                  difficulty === "beginner"
                    ? "border-success/50 hover:bg-success/10"
                    : difficulty === "intermediate"
                    ? "border-warning/50 hover:bg-warning/10"
                    : "border-destructive/50 hover:bg-destructive/10";
                return (
                  <Badge
                    key={difficulty}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer capitalize transition-all ${
                      isSelected
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : colorClass
                    }`}
                    onClick={() => onDifficultyToggle(difficulty)}
                  >
                    {difficulty}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-sidebar-border">
        

        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-md p-6 flex flex-col align-top items-center space-x-4">
        <p className="text-xs text-muted-foreground text-center">
          100 patterns to master
        </p>
        <div>
          <div className="text-xl font-medium text-black">By: Afsar Ahmed</div>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.linkedin.com/in/afsarahmed/" target="_blank" rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 19h-3v-9h3v9zm-1.5-10.268c-.967 0-1.75-.783-1.75-1.75s.783-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.25 10.268h-3v-4.5c0-1.071-.93-1.5-1.25-1.5s-1.75.429-1.75 1.5v4.5h-3v-9h3v1.4c.472-.9 2-.95 2.75 0 0 0 1.25 1.7 1.25 3.1v4.5z"/>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://afsarzan.github.io/" target="_blank" rel="noopener noreferrer"
              className="text-gray-800 hover:text-black flex items-center space-x-1">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12 0a12 12 0 00-3.793 23.418c.6.11.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.084 1.838 1.238 1.838 1.238 1.07 1.834 2.805 1.304 3.49.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.335-5.466-5.933 0-1.31.467-2.382 1.235-3.22-.125-.303-.535-1.523.115-3.176 0 0 1.005-.322 3.3 1.23a11.496 11.496 0 013.003-.403c1.02.005 2.046.138 3.003.403 2.29-1.552 3.292-1.23 3.292-1.23.653 1.653.243 2.873.12 3.176.77.838 1.234 1.91 1.234 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.814 1.1.814 2.22 0 1.602-.014 2.894-.014 3.286 0 .322.22.694.825.576A12 12 0 0012 0z"/>
              </svg>
              <span className="sr-only">Portfolio</span>
            </a>
          </div>
        </div>
      </div>

      </div>
    </aside>
  );
}
