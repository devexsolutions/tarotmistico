export interface User {
  username: string;
  passwordHash: string;
  email?: string;
}

const USER_KEY = 'tm_users';
const SESSION_KEY = 'tm_session';

function getUsers(): Record<string, User> {
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

export async function register(username: string, password: string, email?: string): Promise<void> {
  const users = getUsers();
  if (users[username]) {
    throw new Error('El usuario ya existe');
  }
  const hash = await hashPassword(password);
  users[username] = { passwordHash: hash, email };
  localStorage.setItem(USER_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, username);
}

export async function login(username: string, password: string, remember = true): Promise<void> {
  const users = getUsers();
  const user = users[username];
  const hash = await hashPassword(password);
  if (!user || user.passwordHash !== hash) {
    throw new Error('Credenciales inválidas');
  }
  if (remember) {
    localStorage.setItem(SESSION_KEY, username);
  } else {
    sessionStorage.setItem(SESSION_KEY, username);
  }
}

export function logout(): void {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): string | null {
  return localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
}
