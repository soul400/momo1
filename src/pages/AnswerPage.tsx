
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Check, X, Home } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CarAnimation from "@/components/CarAnimation";

const AnswerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    questions, 
    participants, 
    setParticipants, 
    backgroundImage,
    correctSound,
    incorrectSound
  } = useQuiz();
  const [question, setQuestion] = useState<any>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<string>("");
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (id) {
      const foundQuestion = questions.find(q => q.id === parseInt(id));
      if (foundQuestion) {
        setQuestion(foundQuestion);
      } else {
        // Question not found
        navigate("/");
      }
    }
  }, [id, questions, navigate]);

  const handleCorrectAnswer = () => {
    if (selectedParticipant) {
      const participantId = parseInt(selectedParticipant);
      
      // Update participant score
      setParticipants(prev => 
        prev.map(p => 
          p.id === participantId ? { ...p, score: p.score + 10 } : p
        )
      );
      
      // Play sound
      if (correctSound) {
        correctSound.currentTime = 0;
        correctSound.play();
      }
      
      // Return to home after delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const handleWrongAnswer = () => {
    // Play sound
    if (incorrectSound) {
      incorrectSound.currentTime = 0;
      incorrectSound.play();
    }
    
    // Return to home after delay
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const containerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(to right, #4a6cf7, #24bddf)' };

  if (!question) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={containerStyle}
      >
        <div className="bg-white/90 p-8 rounded-xl shadow-xl">
          <p className="text-2xl font-bold text-red-500">السؤال غير موجود</p>
          <Button 
            className="mt-4 w-full" 
            onClick={() => navigate("/")}
          >
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={containerStyle}
    >
      {showAnimation && <CarAnimation onAnimationEnd={() => setShowAnimation(false)} />}
      
      <div className="bg-white/90 p-6 md:p-10 rounded-xl shadow-xl w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-1"
          >
            <Home className="h-4 w-4" />
            الرئيسية
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-center flex-1">
            الإجابة
          </h1>
          <div className="w-[68px]"></div> {/* Spacer for centering */}
        </div>
        
        <div className="bg-amber-50 p-6 md:p-8 rounded-lg mb-8 shadow-inner min-h-[150px] flex items-center justify-center">
          <p className="text-xl md:text-2xl font-medium text-center">
            {question.answerText}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select onValueChange={setSelectedParticipant} value={selectedParticipant}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="اختر المتسابق" />
            </SelectTrigger>
            <SelectContent>
              {participants.map(participant => (
                <SelectItem key={participant.id} value={participant.id.toString()}>
                  {participant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            size="lg"
            onClick={handleCorrectAnswer}
            disabled={!selectedParticipant}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <Check className="h-5 w-5" />
            إجابة صحيحة
          </Button>
          
          <Button 
            size="lg"
            onClick={handleWrongAnswer}
            className="bg-red-600 hover:bg-red-700 gap-2"
          >
            <X className="h-5 w-5" />
            إجابة خاطئة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerPage;
