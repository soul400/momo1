
import React, { createContext, useContext, useState, useEffect } from "react";
import { Question, Participant } from "@/types/quiz";

interface QuizContextType {
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  selectedNumbers: number[];
  setSelectedNumbers: React.Dispatch<React.SetStateAction<number[]>>;
  backgroundImage: string | null;
  setBackgroundImage: React.Dispatch<React.SetStateAction<string | null>>;
  correctSound: HTMLAudioElement | null;
  setCorrectSound: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  incorrectSound: HTMLAudioElement | null;
  setIncorrectSound: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [participants, setParticipants] = useState<Participant[]>(
    Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `مشارك ${i + 1}`,
      score: 0,
    }))
  );
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(null);
  const [incorrectSound, setIncorrectSound] = useState<HTMLAudioElement | null>(null);

  const resetQuiz = () => {
    setSelectedNumbers([]);
    setParticipants(
      Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        name: `مشارك ${i + 1}`,
        score: 0,
      }))
    );
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        setQuestions,
        participants,
        setParticipants,
        selectedNumbers,
        setSelectedNumbers,
        backgroundImage,
        setBackgroundImage,
        correctSound,
        setCorrectSound,
        incorrectSound,
        setIncorrectSound,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
