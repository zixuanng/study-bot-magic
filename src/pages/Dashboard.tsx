import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Play, 
  TrendingUp, 
  Flame, 
  Target, 
  Clock,
  BookOpen,
  Brain
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // Mock data - will be replaced with real data from backend
  const stats = {
    streak: 7,
    cardsReviewed: 142,
    accuracy: 87,
    upcomingReviews: 15
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Brain className="w-6 h-6 text-primary" />
            StudyMate
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload Notes
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">Ready for your daily practice session?</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 shadow-card hover:shadow-elevated transition-all animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/10">
                <Flame className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
            <p className="text-3xl font-bold">{stats.streak} days</p>
          </Card>

          <Card className="p-6 shadow-card hover:shadow-elevated transition-all animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Cards Reviewed</span>
            </div>
            <p className="text-3xl font-bold">{stats.cardsReviewed}</p>
          </Card>

          <Card className="p-6 shadow-card hover:shadow-elevated transition-all animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-success/10">
                <Target className="w-5 h-5 text-success" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
            </div>
            <p className="text-3xl font-bold">{stats.accuracy}%</p>
          </Card>

          <Card className="p-6 shadow-card hover:shadow-elevated transition-all animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Due Today</span>
            </div>
            <p className="text-3xl font-bold">{stats.upcomingReviews}</p>
          </Card>
        </div>

        {/* Main action cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Start session card */}
          <Card className="p-8 shadow-elevated bg-gradient-primary text-white animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">Daily Practice</h3>
                <p className="text-white/80 mb-4">
                  {stats.upcomingReviews} cards ready for review
                </p>
              </div>
              <Play className="w-8 h-8" />
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Today's Progress</span>
                <span>5/15 cards</span>
              </div>
              <Progress value={33} className="bg-white/20" />
            </div>

            <Button 
              size="lg" 
              className="w-full bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/session">
                Start Session
              </Link>
            </Button>
          </Card>

          {/* Progress card */}
          <Card className="p-8 shadow-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Your Progress</h3>
                <p className="text-muted-foreground">Keep up the great work!</p>
              </div>
              <TrendingUp className="w-6 h-6 text-success" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Beginner</span>
                  <span className="font-medium">45 cards</span>
                </div>
                <Progress value={45} className="bg-muted" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Learning</span>
                  <span className="font-medium">67 cards</span>
                </div>
                <Progress value={67} className="bg-muted" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Mastered</span>
                  <span className="font-medium">30 cards</span>
                </div>
                <Progress value={30} className="bg-muted" />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent courses placeholder */}
        <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-2xl font-bold mb-4">Your Courses</h2>
          <Card className="p-8 shadow-card text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload your first set of notes to get started
            </p>
            <Button asChild>
              <Link to="/upload">
                <Upload className="w-4 h-4 mr-2" />
                Upload Notes
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
