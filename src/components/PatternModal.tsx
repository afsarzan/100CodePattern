import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "./CodeBlock";
import { AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import { CodePattern } from "./PatternCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PatternModalProps {
  pattern: CodePattern | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext?: () => void;
  hasNext?: boolean;
  onPrev?: () => void;
  hasPrev?: boolean;
}

const difficultyColors = {
  beginner: "bg-success/10 text-success border-success/20",
  intermediate: "bg-warning/10 text-warning border-warning/20",
  advanced: "bg-destructive/10 text-destructive border-destructive/20",
};

export function PatternModal({
  pattern,
  open,
  onOpenChange,
  onNext,
  hasNext,
  onPrev,
  hasPrev,
}: PatternModalProps) {
  if (!pattern) return null;
  const canGoNext = Boolean(onNext && (hasNext ?? true));
  const canGoPrev = Boolean(onPrev && (hasPrev ?? true));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 flex flex-col bg-background/95 backdrop-blur-md shadow-2xl border border-border/60 rounded-xl">
        <DialogHeader className="p-6 pb-5 border-b border-border/50 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="flex items-center justify-between mt-2 mr-[25px]">
            <div className="dialog-title w-[80%]">
              <div className="dialog-tile flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <Badge
                    variant="default"
                    className="h-5 px-2 text-[10px] font-semibold uppercase tracking-wide shadow-sm"
                  >
                    {pattern.id}
                  </Badge>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {pattern.category}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-semibold tracking-tight text-center flex-1">
                  {pattern.title}
                </DialogTitle>
              </div>
            </div>
            <Badge
              variant="outline"
              className={`${difficultyColors[pattern.difficulty]} border font-medium shadow-sm`}
            >
              {pattern.difficulty}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 space-y-8">
            <div className="grid gap-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border/40 rounded-xl border border-border/50 bg-card/50 p-4 md:p-6">
              {/* Issues */}
              <div className="space-y-3 md:px-6 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  <h3 className="text-lg font-semibold tracking-tight">Common Issues</h3>
                </div>
                <ul className="space-y-2">
                  {pattern.issues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="text-warning font-bold mt-0.5">•</span>
                      <span className="text-foreground/80">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="space-y-3 md:px-6 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle className="h-5 w-5" />
                  <h3 className="text-lg font-semibold tracking-tight">Improvements</h3>
                </div>
                <ul className="space-y-2">
                  {pattern.improvements.map((improvement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span className="text-foreground/80">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border/40 rounded-xl border border-border/50 bg-card/50 p-4 md:p-6">
              {/* Bad Code */}
              <div className="space-y-3 md:px-6 md:first:pl-0 md:last:pr-0">
                <h3 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
                  <span className="text-warning">❌</span> Problematic Code
                </h3>
                <CodeBlock code={pattern.badCode} type="bad" />
              </div>

              {/* Good Code */}
              <div className="space-y-3 md:px-6 md:first:pl-0 md:last:pr-0">
                <h3 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
                  <span className="text-accent">✅</span> Better Code
                </h3>
                <CodeBlock code={pattern.goodCode} type="good" />
              </div>
            </div>

            {/* Common Pattern */}
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-5 shadow-sm">
              <p className="text-sm font-medium text-foreground">
                💡 <span className="font-semibold">Key Pattern:</span> {pattern.commonPattern}
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between border-t border-border/50 bg-background/80 backdrop-blur-sm p-4">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={!canGoPrev}
            className="min-w-[120px]"
          >
            Previous
          </Button>
          <Button onClick={onNext} disabled={!canGoNext} className="min-w-[120px]">
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
