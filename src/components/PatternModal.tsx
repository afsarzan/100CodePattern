import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "./CodeBlock";
import { AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import { CodePattern } from "./PatternCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PatternModalProps {
  pattern: CodePattern | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const difficultyColors = {
  beginner: "bg-success/10 text-success border-success/20",
  intermediate: "bg-warning/10 text-warning border-warning/20",
  advanced: "bg-destructive/10 text-destructive border-destructive/20",
};

export function PatternModal({ pattern, open, onOpenChange }: PatternModalProps) {
  if (!pattern) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border/50">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {pattern.category}
                </span>
              </div>
              <DialogTitle className="text-2xl">{pattern.title}</DialogTitle>
            </div>
            <Badge
              variant="outline"
              className={`${difficultyColors[pattern.difficulty]} border font-medium`}
            >
              {pattern.difficulty}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Common Pattern */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm font-medium text-foreground">
                💡 <span className="font-semibold">Key Pattern:</span> {pattern.commonPattern}
              </p>
            </div>

            {/* Issues */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Common Issues</h3>
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

            {/* Bad Code */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="text-warning">❌</span> Problematic Code
              </h3>
              <CodeBlock code={pattern.badCode} type="bad" />
            </div>

            {/* Improvements */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Improvements</h3>
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

            {/* Good Code */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="text-accent">✅</span> Better Code
              </h3>
              <CodeBlock code={pattern.goodCode} type="good" />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
