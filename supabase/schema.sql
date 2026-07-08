-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Tasks Table
create table public.tasks (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    title text not null,
    description text,
    status text not null check (status in ('pending', 'in_progress', 'completed')),
    cycle_id uuid, -- Foreign key added after cycles table creation
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    deleted_at timestamp with time zone,
    version integer default 1 not null
);

-- 2. Cycles Table
create table public.cycles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    name text not null,
    recurrence_rule text not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    deleted_at timestamp with time zone,
    version integer default 1 not null
);

-- Add foreign key constraint to tasks
alter table public.tasks add constraint fk_tasks_cycle_id foreign key (cycle_id) references public.cycles(id) on delete set null;

-- 3. Task Dependencies Table (Bidirectional)
create table public.task_dependencies (
    task_id uuid references public.tasks(id) on delete cascade not null,
    depends_on_task_id uuid references public.tasks(id) on delete cascade not null,
    primary key (task_id, depends_on_task_id)
);

-- 4. Logs Table
create table public.logs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    task_id uuid references public.tasks(id) on delete set null,
    action text not null,
    details jsonb,
    created_at timestamp with time zone default now() not null
);

-- 5. Attachments Table
create table public.attachments (
    id uuid primary key default uuid_generate_v4(),
    task_id uuid references public.tasks(id) on delete cascade not null,
    file_url text not null,
    file_type text not null,
    created_at timestamp with time zone default now() not null,
    updated_at timestamp with time zone default now() not null,
    deleted_at timestamp with time zone,
    version integer default 1 not null
);

-- Trigger to update 'updated_at' automatically
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    -- Optionally auto-increment version if we want server to handle it, 
    -- but usually OCC is handled by checking the provided version from client.
    return new;
end;
$$ language plpgsql;

create trigger tr_tasks_updated_at before update on public.tasks for each row execute procedure update_updated_at_column();
create trigger tr_cycles_updated_at before update on public.cycles for each row execute procedure update_updated_at_column();
create trigger tr_attachments_updated_at before update on public.attachments for each row execute procedure update_updated_at_column();

-- Enable RLS (Row Level Security)
alter table public.tasks enable row level security;
alter table public.cycles enable row level security;
alter table public.task_dependencies enable row level security;
alter table public.logs enable row level security;
alter table public.attachments enable row level security;

-- RLS Policies (Users can only access their own data)
create policy "Users can view their own tasks" on public.tasks for select using (auth.uid() = user_id);
create policy "Users can insert their own tasks" on public.tasks for insert with check (auth.uid() = user_id);
create policy "Users can update their own tasks" on public.tasks for update using (auth.uid() = user_id);
create policy "Users can delete their own tasks" on public.tasks for delete using (auth.uid() = user_id);

create policy "Users can view their own cycles" on public.cycles for select using (auth.uid() = user_id);
create policy "Users can insert their own cycles" on public.cycles for insert with check (auth.uid() = user_id);
create policy "Users can update their own cycles" on public.cycles for update using (auth.uid() = user_id);
create policy "Users can delete their own cycles" on public.cycles for delete using (auth.uid() = user_id);

create policy "Users can view their own task dependencies" on public.task_dependencies for select using (
    exists (select 1 from public.tasks where tasks.id = task_dependencies.task_id and tasks.user_id = auth.uid())
);
create policy "Users can manage their own task dependencies" on public.task_dependencies for all using (
    exists (select 1 from public.tasks where tasks.id = task_dependencies.task_id and tasks.user_id = auth.uid())
);

create policy "Users can view their own logs" on public.logs for select using (auth.uid() = user_id);
create policy "Users can insert their own logs" on public.logs for insert with check (auth.uid() = user_id);

create policy "Users can view their own attachments" on public.attachments for select using (
    exists (select 1 from public.tasks where tasks.id = attachments.task_id and tasks.user_id = auth.uid())
);
create policy "Users can manage their own attachments" on public.attachments for all using (
    exists (select 1 from public.tasks where tasks.id = attachments.task_id and tasks.user_id = auth.uid())
);
