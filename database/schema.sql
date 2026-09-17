-- DDRT MUSIC GPT BACKEND v1.0
-- Database Foundation
-- PostgreSQL / Supabase

create extension if not exists pgcrypto;

-- =========================================
-- 1. ARTISTS
-- =========================================

create table if not exists artists (
    artist_id uuid primary key default gen_random_uuid(),
    name text not null,
    email text unique not null,
    google_id text unique,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================
-- 2. TOKEN WALLETS
-- =========================================

create table if not exists token_wallets (
    artist_id uuid primary key
        references artists(artist_id)
        on delete cascade,

    balance integer not null default 0
        check (balance >= 0),

    updated_at timestamptz not null default now()
);

-- =========================================
-- 3. SONGS
-- =========================================

create table if not exists songs (
    song_id uuid primary key default gen_random_uuid(),

    artist_id uuid not null
        references artists(artist_id)
        on delete cascade,

    title text not null,
    lyrics text,
    music_prompt text,

    genre text,
    rhythm text,
    bpm integer,
    musical_key text,

    vocal_type text not null default 'vocal',

    provider text not null default 'suno',

    status text not null default 'draft'
        check (
            status in (
                'draft',
                'queued',
                'generating',
                'completed',
                'failed'
            )
        ),

    audio_url text,
    drive_file_id text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================
-- 4. GENERATION JOBS
-- =========================================

create table if not exists generation_jobs (
    job_id uuid primary key default gen_random_uuid(),

    song_id uuid not null
        references songs(song_id)
        on delete cascade,

    artist_id uuid not null
        references artists(artist_id)
        on delete cascade,

    provider text not null default 'suno',

    provider_task_id text,

    status text not null default 'queued'
        check (
            status in (
                'queued',
                'processing',
                'completed',
                'failed'
            )
        ),

    error_message text,

    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- =========================================
-- 5. TOKEN TRANSACTIONS
-- =========================================

create table if not exists token_transactions (
    transaction_id uuid primary key default gen_random_uuid(),

    artist_id uuid not null
        references artists(artist_id)
        on delete cascade,

    transaction_type text not null
        check (
            transaction_type in (
                'purchase',
                'generation',
                'refund',
                'bonus',
                'adjustment'
            )
        ),

    tokens integer not null,

    reference_id uuid,

    description text,

    created_at timestamptz not null default now()
);

-- =========================================
-- 6. INDEXES
-- =========================================

create index if not exists idx_songs_artist
    on songs(artist_id);

create index if not exists idx_songs_status
    on songs(status);

create index if not exists idx_generation_jobs_artist
    on generation_jobs(artist_id);

create index if not exists idx_generation_jobs_song
    on generation_jobs(song_id);

create index if not exists idx_generation_jobs_status
    on generation_jobs(status);

create index if not exists idx_token_transactions_artist
    on token_transactions(artist_id);

