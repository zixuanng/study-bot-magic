import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Upload as UploadIcon, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [courseTitle, setCourseTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !courseTitle) {
      toast({
        title: "Missing information",
        description: "Please provide both a course title and a file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // TODO: Implement actual file upload and processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Processing complete!",
        description: "Your notes have been processed and cards are ready.",
      });
      navigate("/dashboard");
    }, 3000);
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
          <Button variant="outline" asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Upload Your Notes</h1>
          <p className="text-muted-foreground">
            Upload your study materials and let AI generate practice cards for you
          </p>
        </div>

        <Card className="p-8 shadow-elevated animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Course title */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Course Title
              </label>
              <Input
                placeholder="e.g., Physics Chapter 1: Mechanics"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                required
              />
            </div>

            {/* File upload area */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Upload File
              </label>
              <div
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center transition-all
                  ${isDragOver 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="animate-scale-in">
                    <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                    <p className="font-medium mb-1">{file.name}</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <>
                    <UploadIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">
                      Drop your file here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports PDF, TXT, DOCX (Max 10MB)
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.txt,.docx"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Processing status */}
            {isProcessing && (
              <Card className="p-6 bg-primary/5 border-primary/20 animate-scale-in">
                <div className="flex items-center gap-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <div>
                    <p className="font-medium mb-1">Processing your notes...</p>
                    <p className="text-sm text-muted-foreground">
                      AI is generating practice cards. This may take a minute.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Submit button */}
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isProcessing || !file || !courseTitle}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generate Practice Cards
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            { title: "Step 1", desc: "Upload your notes or syllabus" },
            { title: "Step 2", desc: "AI generates practice questions" },
            { title: "Step 3", desc: "Start your daily learning sessions" }
          ].map((step, idx) => (
            <Card 
              key={idx} 
              className="p-4 text-center shadow-card animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <p className="font-semibold text-primary mb-1">{step.title}</p>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
