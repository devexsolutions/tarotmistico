export interface User {
  username: string;
  passwordHash: string;
}

const USER_KEY = 'tm_users';
const SESSION_KEY = 'tm_session';

function getUsers(): Record<string, string> {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : {};
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function register(username: string, password: string): Promise<void> {
  const users = getUsers();
  if (users[username]) {
    throw new Error('El usuario ya existe');
  }
  const hash = await hashPassword(password);
  users[username] = hash;
  localStorage.setItem(USER_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, username);
}

export async function login(username: string, password: string): Promise<void> {
  const users = getUsers();
  const hash = await hashPassword(password);
  if (users[username] !== hash) {
    throw new Error('Credenciales inválidas');
  }
  localStorage.setItem(SESSION_KEY, username);
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): string | null {
  return localStorage.getItem(SESSION_KEY);
}
