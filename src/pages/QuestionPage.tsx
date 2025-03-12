
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { Eye } from "lucide-react";

const QuestionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { questions, backgroundImage } = useQuiz();
  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundQuestion = questions.find(q => q.id === parseInt(id));
      
      if (foundQuestion) {
        setQuestion(foundQuestion);
      } else {
        // Question not found, go back to home
        navigate("/");
      }
      
      setIsLoading(false);
    }
  }, [id, questions, navigate]);

  const handleShowAnswer = () => {
    if (id) {
      navigate(`/answer/${id}`);
    }
  };

  const handleTimerEnd = () => {
    handleShowAnswer();
  };

  const containerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(to right, #4a6cf7, #24bddf)' };

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={containerStyle}
      >
        <div className="animate-pulse-scale bg-white/90 p-8 rounded-xl shadow-xl">
          <p className="text-2xl font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

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
      <div className="bg-white/90 p-6 md:p-10 rounded-xl shadow-xl w-full max-w-3xl relative">
        <div className="absolute left-4 top-4">
          <Timer seconds={20} delay={5} onTimerEnd={handleTimerEnd} />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-10 mt-4">
          السؤال رقم {question.id}
        </h1>
        
        <div className="bg-blue-50 p-6 md:p-8 rounded-lg mb-8 shadow-inner min-h-[150px] flex items-center justify-center">
          <p className="text-xl md:text-2xl font-medium text-center">
            {question.questionText}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button 
            size="lg"
            className="px-8 gap-2"
            onClick={handleShowAnswer}
          >
            <Eye className="h-5 w-5" />
            عرض الإجابة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
