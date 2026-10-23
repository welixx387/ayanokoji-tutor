// Пароли, сессии, ограничение частоты запросов.
import { scrypt, randomBytes, timingSafeEqual, createHash } from 'node:crypto';
import { q } from './db.js';

const SESSION_DAYS = 60;
export const COOKIE = 'ayk_s';

const scryptAsync = (pw, salt) => new Promise((ok, fail) =>
  scrypt(pw, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (e, key) => (e ? fail(e) : ok(key))));

export async function hashPassword(pw) {
  const salt = randomBytes(16);
  const key = await scryptAsync(pw, salt);
  return `s1$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function checkPassword(pw, stored) {
  const [v, salt, hash] = String(stored || '').split('$');
  if (v !== 's1' || !salt || !hash) return false;
  const key = await scryptAsync(pw, Buffer.from(salt, 'base64'));
  const want = Buffer.from(hash, 'base64');
  return want.length === key.length && timingSafeEqual(want, key);
}

const sha = s => createHash('sha256').update(s).digest('hex');

export async function createSession(res, userId) {
  const token = randomBytes(32).toString('base64url');
  await q(`insert into ayk_sessions (token_hash, user_id, expires_at) values ($1, $2, now() + interval '${SESSION_DAYS} days')`, [sha(token), userId]);
  setCookie(res, token, SESSION_DAYS * 86400);
}

export function readToken(req) {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === COOKIE) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

export async function currentUser(req) {
  const token = readToken(req);
  if (!token) return null;
  const rows = await q(
    `select u.* from ayk_sessions s join ayk_users u on u.id = s.user_id where s.token_hash = $1 and s.expires_at > now()`,
    [sha(token)]);
  return rows[0] || null;
}

export async function dropSession(req, res) {
  const token = readToken(req);
  if (token) await q(`delete from ayk_sessions where token_hash = $1`, [sha(token)]);
  setCookie(res, '', 0);
}

export function setCookie(res, value, maxAge) {
  const secure = process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`);
}

export function clientIp(req) {
  const xf = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return xf || String(req.headers['x-real-ip'] || '') || 'local';
}

// Не больше limit событий kind с одного адреса за windowMin минут
export async function rateLimit(req, kind, limit, windowMin) {
  const key = `${kind}:${clientIp(req)}`;
  const rows = await q(`select count(*)::int as n from ayk_hits where key = $1 and at > now() - ($2::int * interval '1 minute')`, [key, windowMin]);
  if ((rows[0] && rows[0].n) >= limit) return false;
  await q(`insert into ayk_hits (key) values ($1)`, [key]);
  if (Math.random() < 0.02) await q(`delete from ayk_hits where at < now() - interval '1 day'`);
  return true;
}
