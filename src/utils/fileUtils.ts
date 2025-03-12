
import * as XLSX from 'xlsx';
import { Question } from '@/types/quiz';

export const readExcelFile = (file: File): Promise<Question[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Assuming the first sheet contains the data
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Map to our Question type
        const questions = jsonData.map((row: any, index) => ({
          id: index + 1,
          questionText: row.Question || '',
          answerText: row.Answer || '',
        }));
        
        resolve(questions);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const generateExcelTemplate = (): void => {
  // Create a worksheet
  const ws = XLSX.utils.json_to_sheet([
    { Question: 'ما هي عاصمة اليابان؟', Answer: 'طوكيو' },
    { Question: 'كم عدد لاعبي كرة القدم في الفريق الواحد؟', Answer: '11 لاعب' },
  ]);
  
  // Create a workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Questions');
  
  // Generate & save the file
  XLSX.writeFile(wb, 'quiz_template.xlsx');
};
