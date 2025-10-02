import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingHero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Gradient glow background */}
      <div className="absolute inset-0 bg-gradient-glow" />
      
      {/* Animated floating elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Brain className="w-16 h-16 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Sparkles className="w-20 h-20 text-secondary animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Learning</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
          Learn Smarter,
          <br />
          Not Harder
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Upload your notes and let AI generate personalized practice cards.
          Master any subject with intelligent spaced repetition.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="text-lg h-14 px-8 shadow-glow" asChild>
            <Link to="/auth">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
            <Link to="/dashboard">
              View Demo
            </Link>
          </Button>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: Brain,
              title: "AI-Generated Cards",
              description: "Automatically create MCQs, cloze, and short answer questions"
            },
            {
              icon: TrendingUp,
              title: "Spaced Repetition",
              description: "Review at optimal intervals for maximum retention"
            },
            {
              icon: Sparkles,
              title: "Daily Practice",
              description: "Just 5-10 minutes a day to master any topic"
            }
          ].map((feature, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 mx-auto">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
