export interface SavedReadings {
  [user: string]: import('../App').Reading[];
}

const READINGS_KEY = 'tm_readings';

export function getReadings(user: string): import('../App').Reading[] {
  const data = localStorage.getItem(READINGS_KEY);
  if (!data) return [];
  const all: SavedReadings = JSON.parse(data);
  return all[user] || [];
}

export function saveReading(user: string, reading: import('../App').Reading): void {
  const data = localStorage.getItem(READINGS_KEY);
  const all: SavedReadings = data ? JSON.parse(data) : {};
  if (!all[user]) all[user] = [];
  all[user].push(reading);
  localStorage.setItem(READINGS_KEY, JSON.stringify(all));
}

export function exportReadingToPdf(reading: import('../App').Reading): void {
  const win = window.open('', '_blank');
  if (!win) return;
  const style = `body{font-family:serif;background:#1e1b4b;color:#e0d8ff;padding:2rem;}h1{color:#fcd34d;}h2{color:#ddd6fe;}p{margin-bottom:1rem;} .card{border:1px solid #a78bfa;padding:0.5rem;margin-bottom:0.5rem;border-radius:0.5rem;} .position{color:#fcd34d;font-weight:bold;}`;
  const cardsHtml = reading.cards.map(c => `<div class="card"><h3>${c.name}</h3><p class="position">${c.position}${c.reversed ? ' (Invertida)' : ''}</p><p>${c.meaning}</p></div>`).join('');
  const html = `<html><head><title>Lectura</title><style>${style}</style></head><body><h1>Tarot Místico</h1><h2>Pregunta</h2><p>${reading.question}</p><h2>Cartas</h2>${cardsHtml}<h2>Interpretación</h2>${reading.interpretation.split('\n').map(p=>`<p>${p}</p>`).join('')}</body></html>`;
  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
}
