import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock data - will be replaced with real data
const mockCards = [
  {
    id: 1,
    type: "mcq",
    prompt: "What is the SI unit of force?",
    options: ["Joule", "Newton", "Watt", "Pascal"],
    correctAnswer: 1,
    explanation: "The Newton (N) is the SI unit of force, named after Sir Isaac Newton."
  },
  {
    id: 2,
    type: "short",
    prompt: "Define acceleration in physics.",
    correctAnswer: "The rate of change of velocity with respect to time",
    explanation: "Acceleration is a vector quantity that describes how quickly velocity changes."
  }
];

export default function Session() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const currentCard = mockCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / mockCards.length) * 100;
  const isLastCard = currentCardIndex === mockCards.length - 1;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === currentCard.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    toast({
      title: isCorrect ? "Correct! 🎉" : "Not quite",
      description: isCorrect 
        ? "Great job! Keep it up." 
        : "Don't worry, you'll get it next time.",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNext = () => {
    if (isLastCard) {
      // Session complete
      toast({
        title: "Session Complete! 🎉",
        description: `You scored ${score}/${mockCards.length}. Great work!`,
      });
      return;
    }
    
    setCurrentCardIndex(currentCardIndex + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Brain className="w-6 h-6 text-primary" />
              StudyMate
            </Link>
            <div className="text-sm text-muted-foreground">
              {currentCardIndex + 1} / {mockCards.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card className="p-8 shadow-elevated animate-scale-in">
          {/* Card type badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {currentCard.type === "mcq" ? "Multiple Choice" : "Short Answer"}
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold mb-8">
            {currentCard.prompt}
          </h2>

          {/* MCQ Options */}
          {currentCard.type === "mcq" && (
            <div className="space-y-3 mb-8">
              {currentCard.options?.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentCard.correctAnswer;
                const showCorrectness = showExplanation;

                let className = "p-4 rounded-xl border-2 transition-all cursor-pointer hover:border-primary/50";
                
                if (showCorrectness) {
                  if (isCorrect) {
                    className += " border-success bg-success/5";
                  } else if (isSelected && !isCorrect) {
                    className += " border-destructive bg-destructive/5";
                  } else {
                    className += " border-border";
                  }
                } else {
                  className += isSelected 
                    ? " border-primary bg-primary/5" 
                    : " border-border";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation}
                    className={className}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showCorrectness && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      )}
                      {showCorrectness && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <Card className="p-6 bg-muted/50 border-0 mb-6 animate-slide-up">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Explanation
              </h3>
              <p className="text-muted-foreground">{currentCard.explanation}</p>
            </Card>
          )}

          {/* Next button */}
          {showExplanation && (
            <Button 
              size="lg" 
              className="w-full animate-fade-in"
              onClick={handleNext}
              asChild={isLastCard}
            >
              {isLastCard ? (
                <Link to="/dashboard">
                  Complete Session
                </Link>
              ) : (
                <>
                  Next Question
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </Card>

        {/* Session stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <Card className="p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-primary">{score}</p>
            <p className="text-sm text-muted-foreground">Correct</p>
          </Card>
          <Card className="p-4 text-center shadow-card">
            <p className="text-2xl font-bold">{currentCardIndex + 1}</p>
            <p className="text-sm text-muted-foreground">Current</p>
          </Card>
          <Card className="p-4 text-center shadow-card">
            <p className="text-2xl font-bold">{mockCards.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
