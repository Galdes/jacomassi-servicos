import Tesseract from 'tesseract.js';
Tesseract.recognize(
  'c:\\\\Users\\\\Usuário\\\\Desktop\\\\Projetos\\\\Jacomassi\\\\Páginas\\\\screencapture-jacomassi-ind-br-2026-03-26-08_28_02.png',
  'por',
  { logger: m => console.log(m.status + ' ' + Math.round(m.progress * 100) + '%') }
).then(({ data: { text } }) => {
  console.log('--- OCR RESULT ---');
  console.log(text);
});
