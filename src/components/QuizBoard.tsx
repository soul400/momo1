
import React from "react";
import { cn } from "@/lib/utils";
import { useQuiz } from "@/context/QuizContext";
import { useNavigate } from "react-router-dom";

const QuizBoard: React.FC = () => {
  const { selectedNumbers, setSelectedNumbers, questions } = useQuiz();
  const navigate = useNavigate();

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) return;
    
    // Find the corresponding question
    const question = questions.find(q => q.id === number);
    if (question) {
      setSelectedNumbers((prev) => [...prev, number]);
      navigate(`/question/${number}`);
    } else {
      console.error(`No question found for number ${number}`);
    }
  };

  return (
    <div className="grid grid-cols-8 gap-2 md:gap-4 w-full max-w-5xl mx-auto">
      {Array.from({ length: 80 }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => handleNumberClick(number)}
          disabled={selectedNumbers.includes(number) || !questions.some(q => q.id === number)}
          className={cn(
            "aspect-square flex items-center justify-center text-lg md:text-2xl font-bold rounded-md transition-all duration-300",
            "hover:scale-105 active:scale-95",
            selectedNumbers.includes(number)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
              : questions.some(q => q.id === number)
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default QuizBoard;
