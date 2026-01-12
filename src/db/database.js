import sqlite3 from 'sqlite3';
import { open } from 'sqlite'; 

sqlite3.verbose();  

export const db = await open({
  filename: './data.db',
  driver: sqlite3.Database
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    completed INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP 
  );
`);

console.log('Database initialized satisfactorily.');