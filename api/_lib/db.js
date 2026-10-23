// Доступ к базе: на Vercel — Neon Postgres (DATABASE_URL), в тестах — подменяемый исполнитель запросов.
import { neon } from '@neondatabase/serverless';

let run = null;
let ready = null;

// Для локальных тестов: передать функцию (text, params) => rows
export function setRunner(fn) { run = fn; ready = null; }

function runner() {
  if (!run) {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!url) throw Object.assign(new Error('DATABASE_URL is not set'), { status: 503 });
    const sql = neon(url);
    run = (text, params) => sql.query(text, params);
  }
  return run;
}

const SCHEMA = [
  `create table if not exists ayk_users (
    id bigserial primary key,
    nick text not null,
    nick_key text not null unique,
    email text unique,
    pass text not null,
    state jsonb not null default '{}'::jsonb,
    pp integer not null default 0,
    rank text not null default 'D',
    iq integer not null default 0,
    lessons integer not null default 0,
    fails integer not null default 0,
    locked_until timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )`,
  `create index if not exists ayk_users_pp on ayk_users (pp desc)`,
  `create table if not exists ayk_sessions (
    token_hash text primary key,
    user_id bigint not null references ayk_users (id) on delete cascade,
    expires_at timestamptz not null
  )`,
  `create index if not exists ayk_sessions_user on ayk_sessions (user_id)`,
  `create table if not exists ayk_hits (
    key text not null,
    at timestamptz not null default now()
  )`,
  `create index if not exists ayk_hits_key on ayk_hits (key, at)`
];

// Таблицы создаются при первом обращении к базе после холодного старта функции
async function ensureSchema() {
  if (!ready) {
    ready = (async () => { for (const s of SCHEMA) await runner()(s, []); })();
    ready.catch(() => { ready = null; });
  }
  return ready;
}

export async function q(text, params = []) {
  await ensureSchema();
  return runner()(text, params);
}
