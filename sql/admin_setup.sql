-- Criar tabela de administradores
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Criar política de segurança RLS (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir apenas leitura de dados próprios
CREATE POLICY "Users can view own data" ON admin_users
    FOR SELECT
    USING (auth.uid() = id);

-- Criar política para permitir atualização apenas dos próprios dados
CREATE POLICY "Users can update own data" ON admin_users
    FOR UPDATE
    USING (auth.uid() = id);

-- Criar política para site_content
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Permitir que administradores leiam o conteúdo do site
CREATE POLICY "Allow admins to read site content" ON site_content
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE id = auth.uid()
        )
    );

-- Permitir que administradores atualizem o conteúdo do site
CREATE POLICY "Allow admins to update site content" ON site_content
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE id = auth.uid()
        )
    );