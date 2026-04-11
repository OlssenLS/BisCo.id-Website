create table if not exists public.app_users (
  id bigserial primary key,
  username text not null unique,
  email text not null unique,
  type text not null check (type in ('Business', 'Content Creator')),
  password_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists app_users_type_idx on public.app_users (type);
