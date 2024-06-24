import { createWorker, Worker } from 'tesseract.js';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

// Function to extract text from a PDF
// Function to extract text from a PDF
async function extractTextFromPdf(fileBuffer: Buffer): Promise<string> {
  const data = await pdf(fileBuffer);
  const numPages = data.numpages;
  let text = '';
  for (let i = 1; i <= numPages; i++) {
    const pageData = await pdf(fileBuffer, { firstPage: i, lastPage: i });
    text += pageData.text.trim() + '\n'; // Append text from each page
  }
  return text.trim();
}


// Function to extract text from a DOCX
async function extractTextFromDocx(fileBuffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer: fileBuffer });
  const text = result.value.trim();
  
  // Split text based on a marker for new pages (e.g., heading or section break)
  const pages = text.split('EOF');

  // Remove any empty or whitespace-only pages
  const filteredPages = pages.filter(page => page.trim() !== '');

  // Join the pages into a single string
  const concatenatedText = filteredPages.join('');

  return concatenatedText.trim();
}



// Function to perform OCR on an image
async function extractTextFromImage(lang: string, imageBuffer: Buffer): Promise<string> {
  
  const worker: Worker = await createWorker(lang);
  await worker.load();
  // await worker.loadLanguage(lang);
  // await worker.initialize(lang);
  const { data: { text}} = await worker.recognize(imageBuffer, { rotateAuto: true })

  await worker.terminate();

  return text.trim();
}

// Main function to handle different file types and perform OCR
export async function recognize(lang: string, buffer: Buffer, ext: string): Promise<string> {
  let text = '';
  switch (ext) {
    case '.pdf':
      text = await extractTextFromPdf(buffer);
      break;
    case '.docx':
      text = await extractTextFromDocx(buffer);
      break;
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.bmp':
    case '.tiff':
      text = await extractTextFromImage(lang, buffer);
      break;
    default:
      throw new Error('Unsupported file type');
  }

  return text;
}
