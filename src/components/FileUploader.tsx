
import React, { useRef, useState } from "react";
import { readExcelFile, generateExcelTemplate } from "@/utils/fileUtils";
import { useQuiz } from "@/context/QuizContext";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Upload, Download, Image, Music } from "lucide-react";
import { toast } from "sonner";

const FileUploader: React.FC = () => {
  const { 
    setQuestions, 
    setBackgroundImage, 
    setCorrectSound, 
    setIncorrectSound 
  } = useQuiz();
  const [loading, setLoading] = useState(false);
  const excelInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const correctSoundInputRef = useRef<HTMLInputElement>(null);
  const incorrectSoundInputRef = useRef<HTMLInputElement>(null);

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setLoading(true);
    
    try {
      const questions = await readExcelFile(file);
      setQuestions(questions);
      toast.success(`تم تحميل ${questions.length} سؤال بنجاح`);
    } catch (error) {
      console.error("Error uploading Excel file:", error);
      toast.error("حدث خطأ أثناء تحميل ملف الأسئلة");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      setBackgroundImage(event.target?.result as string);
      toast.success("تم تحميل الخلفية بنجاح");
    };
    
    reader.readAsDataURL(file);
  };

  const handleSoundUpload = (e: React.ChangeEvent<HTMLInputElement>, isCorrect: boolean) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const audio = new Audio(URL.createObjectURL(file));
    
    if (isCorrect) {
      setCorrectSound(audio);
      toast.success("تم تحميل صوت الإجابة الصحيحة");
    } else {
      setIncorrectSound(audio);
      toast.success("تم تحميل صوت الإجابة الخاطئة");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-center w-full my-4">
      <input
        type="file"
        ref={excelInputRef}
        onChange={handleExcelUpload}
        accept=".xlsx,.xls"
        className="hidden"
      />
      <Button
        onClick={() => excelInputRef.current?.click()}
        disabled={loading}
        variant="outline"
        className="w-full md:w-auto"
      >
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        تحميل الأسئلة
      </Button>

      <Button
        onClick={generateExcelTemplate}
        variant="outline"
        className="w-full md:w-auto"
      >
        <Download className="mr-2 h-4 w-4" />
        تنزيل نموذج الأسئلة
      </Button>

      <input
        type="file"
        ref={imageInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
      <Button
        onClick={() => imageInputRef.current?.click()}
        variant="outline"
        className="w-full md:w-auto"
      >
        <Image className="mr-2 h-4 w-4" />
        تحميل خلفية
      </Button>

      <input
        type="file"
        ref={correctSoundInputRef}
        onChange={(e) => handleSoundUpload(e, true)}
        accept="audio/*"
        className="hidden"
      />
      <Button
        onClick={() => correctSoundInputRef.current?.click()}
        variant="outline"
        className="w-full md:w-auto"
      >
        <Music className="mr-2 h-4 w-4" />
        صوت إجابة صحيحة
      </Button>

      <input
        type="file"
        ref={incorrectSoundInputRef}
        onChange={(e) => handleSoundUpload(e, false)}
        accept="audio/*"
        className="hidden"
      />
      <Button
        onClick={() => incorrectSoundInputRef.current?.click()}
        variant="outline"
        className="w-full md:w-auto"
      >
        <Music className="mr-2 h-4 w-4" />
        صوت إجابة خاطئة
      </Button>
    </div>
  );
};

export default FileUploader;
