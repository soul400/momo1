
import React from "react";
import QuizBoard from "@/components/QuizBoard";
import ParticipantPanel from "@/components/ParticipantPanel";
import FileUploader from "@/components/FileUploader";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const Index = () => {
  const { backgroundImage, resetQuiz, questions } = useQuiz();

  const containerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(to right, #4a6cf7, #24bddf)' };

  return (
    <div
      className="min-h-screen flex flex-col p-4 md:p-8"
      style={containerStyle}
    >
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-center flex-1">
            مسابقة رسلان و المهرة الرمضانية
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={resetQuiz}
          >
            <RefreshCw className="h-4 w-4" />
            إعادة تعيين
          </Button>
        </div>

        <FileUploader />

        {questions.length > 0 ? (
          <QuizBoard />
        ) : (
          <div className="text-center bg-white/80 p-6 rounded-lg shadow-lg">
            <p className="text-lg font-medium">
              قم بتحميل ملف الأسئلة لبدء المسابقة
            </p>
          </div>
        )}
        
        <div className="mt-8 w-full">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-4">
            <h2 className="text-xl font-bold text-center mb-4">المشاركون</h2>
            <ParticipantPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
