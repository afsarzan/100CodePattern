import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Code2 } from "lucide-react";

export interface CodePattern {
  id: number;
  category: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  badCode: string;
  issues: string[];
  goodCode: string;
  improvements: string[];
  commonPattern: string;
}

interface PatternCardProps {
  pattern: CodePattern;
  onClick: () => void;
}

const difficultyColors = {
  beginner: "bg-success/10 text-success border-success/20",
  intermediate: "bg-warning/10 text-warning border-warning/20",
  advanced: "bg-destructive/10 text-destructive border-destructive/20",
};

export function PatternCard({ pattern, onClick }: PatternCardProps) {
  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 p-6 border-border/50 bg-card animate-fade-in"
      onClick={onClick}
    >
      

      
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {pattern.category}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {pattern.title}
          </h3>
        </div>
        <Badge
          variant="outline"
          className={`${difficultyColors[pattern.difficulty]} border font-medium`}
        >
          {pattern.difficulty}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Issues */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Issues</span>
          </div>
          <div className="bg-warning/5 border border-warning/20 rounded-lg p-3">
            <ul className="space-y-1">
              {pattern.issues.slice(0, 2).map((issue, idx) => (
                <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="text-warning mt-0.5">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Improvements */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-accent">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">Improvements</span>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
            <ul className="space-y-1">
              {pattern.improvements.slice(0, 2).map((improvement, idx) => (
                <li key={idx} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <p className="text-xs text-muted-foreground italic">
          💡 {pattern.commonPattern}
        </p>
        <span className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-xs font-semibold px-2.5 py-0.5 rounded-full">{pattern.id}</span>
      </div>
    </Card>
  );
}
