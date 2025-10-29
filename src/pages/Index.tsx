import { useState, useMemo } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PatternCard, CodePattern } from "@/components/PatternCard";
import { PatternModal } from "@/components/PatternModal";
import { codePatterns } from "@/data/codePatterns";
import { Code2, TrendingUp } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<CodePattern | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Extract unique categories and difficulties
  const categories = useMemo(
    () => [...new Set(codePatterns.map((p) => p.category))],
    []
  );
  const difficulties = ["beginner", "intermediate", "advanced"];

  // Filter patterns
  const filteredPatterns = useMemo(() => {
    return codePatterns.filter((pattern) => {
      const matchesSearch =
        searchQuery === "" ||
        pattern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.commonPattern.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(pattern.category);

      const matchesDifficulty =
        selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(pattern.difficulty);

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, selectedCategories, selectedDifficulties]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSearchQuery("");
  };

  const handlePatternClick = (pattern: CodePattern) => {
    setSelectedPattern(pattern);
    setModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        categories={categories}
        difficulties={difficulties}
        selectedCategories={selectedCategories}
        selectedDifficulties={selectedDifficulties}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCategoryToggle={handleCategoryToggle}
        onDifficultyToggle={handleDifficultyToggle}
        onClearFilters={handleClearFilters}
      />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Code2 className="h-8 w-8 text-primary" />
                Code Patterns Library
              </h1>
              <p className="text-muted-foreground">
                Master {filteredPatterns.length} of {codePatterns.length} essential patterns
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">
                  {codePatterns.length} Patterns
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Pattern Grid */}
        <div className="p-8">
          {filteredPatterns.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Code2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No patterns found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPatterns.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  onClick={() => handlePatternClick(pattern)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <PatternModal
        pattern={selectedPattern}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default Index;
