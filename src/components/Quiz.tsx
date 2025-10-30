import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import { quizQuestions, QuizQuestion } from "@/data/quizQuestions";
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizProps {
  selectedCategory?: string[];
  selectedDifficulty?: string[];
}

export const Quiz = ({ selectedCategory, selectedDifficulty }: QuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  // Filter questions based on category and difficulty
  const filteredQuestions = quizQuestions.filter(q => {
    const matchesCategory = !selectedCategory ||  selectedCategory.includes(q.category);
    const matchesDifficulty = !selectedDifficulty || selectedDifficulty.includes(q.difficulty);
    return matchesCategory && matchesDifficulty;
  });

  const currentQuestion = filteredQuestions[currentIndex];
  const totalQuestions = filteredQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizComplete(false);
  };

  if (filteredQuestions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No quiz questions available
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to see quiz questions
        </p>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = percentage === 100;
    const isGood = percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto p-8">
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className={`h-10 w-10 ${isPerfect ? 'text-primary animate-pulse' : 'text-primary'}`} />
            </div>
            <CardTitle className="text-3xl mb-2">Quiz Complete!</CardTitle>
            <CardDescription className="text-lg">
              {isPerfect && "Perfect score! You're a code pattern master! 🎉"}
              {isGood && !isPerfect && "Great job! You know your patterns well! 👏"}
              {!isGood && "Keep practicing - you'll get better! 💪"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-2xl text-muted-foreground">
                {percentage}% Correct
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Your Score</span>
                <span>{percentage}%</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-primary/5 rounded-lg p-4 text-center border border-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{score}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center border border-border">
                <XCircle className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalQuestions - score}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
            </div>

            <Button onClick={handleRestart} size="lg" className="w-full">
              <RotateCcw className="mr-2 h-5 w-5" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              Question {currentIndex + 1} of {totalQuestions}
            </Badge>
            <Badge className="capitalize">{currentQuestion.difficulty}</Badge>
            <Badge variant="secondary">{currentQuestion.category}</Badge>
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Score: {score}/{answeredQuestions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="mb-6 border-border shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Code Block */}
          <div className="rounded-lg overflow-hidden border border-border">
            <div className="bg-code-bg rounded-lg">
              <div className="flex items-center gap-2 px-4 py-2 bg-code-bg/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                  <div className="w-3 h-3 rounded-full bg-warning/60"></div>
                  <div className="w-3 h-3 rounded-full bg-success/60"></div>
                </div>
                <span className="ml-auto text-xs text-code-comment font-mono">
                  JavaScript
                </span>
              </div>
              <pre className="bg-code-bg text-code-text p-4 overflow-x-auto font-mono text-sm leading-relaxed">
                <code>{currentQuestion.code}</code>
              </pre>
            </div>
          </div>

          {/* Answer Options */}
          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrectness = showExplanation;
                
                let borderClass = "border-border";
                let bgClass = "bg-card hover:bg-accent/50";
                
                if (showCorrectness) {
                  if (isCorrect) {
                    borderClass = "border-primary";
                    bgClass = "bg-primary/5";
                  } else if (isSelected && !isCorrect) {
                    borderClass = "border-destructive";
                    bgClass = "bg-destructive/5";
                  }
                }

                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${borderClass} ${bgClass} ${!showExplanation && 'cursor-pointer'}`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showExplanation} />
                    <Label
                      htmlFor={`option-${index}`}
                      className={`flex-1 cursor-pointer font-medium ${showCorrectness && isCorrect ? 'text-primary' : ''} ${showCorrectness && isSelected && !isCorrect ? 'text-destructive' : ''}`}
                    >
                      {option}
                    </Label>
                    {showCorrectness && isCorrect && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                    {showCorrectness && isSelected && !isCorrect && (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                );
              })}
            </div>
          </RadioGroup>

          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-lg p-4 border-2 ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-primary/5 border-primary/20' : 'bg-muted border-border'}`}>
              <div className="flex items-start gap-3">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <p className="text-sm text-foreground/90">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {!showExplanation ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                size="lg"
                className="flex-1"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNextQuestion} size="lg" className="flex-1">
                {currentIndex < totalQuestions - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  'View Results'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
