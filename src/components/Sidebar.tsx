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
        <p className="text-xs text-muted-foreground text-center">
          100 patterns to master
        </p>
      </div>
    </aside>
  );
}
