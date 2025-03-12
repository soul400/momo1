
import React, { useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const ParticipantPanel: React.FC = () => {
  const { participants, setParticipants } = useQuiz();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");

  const handleScoreChange = (id: number, amount: number) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, score: p.score + amount } : p
      )
    );
  };

  const startEditing = (id: number, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const saveEdit = (id: number) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name: editName } : p))
    );
    setEditingId(null);
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 w-full">
      {participants.map((participant) => (
        <div
          key={participant.id}
          className="bg-white/90 rounded-lg p-2 text-center flex flex-col items-center shadow-md"
        >
          {editingId === participant.id ? (
            <div className="flex flex-col gap-1 w-full">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="text-sm border rounded p-1 text-center w-full"
                autoFocus
              />
              <Button 
                size="sm" 
                onClick={() => saveEdit(participant.id)}
                className="text-xs h-6"
              >
                حفظ
              </Button>
            </div>
          ) : (
            <div 
              className="font-semibold text-sm mb-1 truncate w-full cursor-pointer"
              onClick={() => startEditing(participant.id, participant.name)}
            >
              {participant.name}
            </div>
          )}
          
          <div className="text-xl font-bold mb-1">{participant.score}</div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0"
              onClick={() => handleScoreChange(participant.id, 10)}
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0"
              onClick={() => handleScoreChange(participant.id, -10)}
            >
              <Minus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantPanel;
