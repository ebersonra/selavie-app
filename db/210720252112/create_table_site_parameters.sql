CREATE TABLE site_parameters (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

-- Exemplo de inserção do modo coming soon
INSERT INTO site_parameters (key, value, description) VALUES ('coming_soon', 'false', 'Se true, ativa a página coming soon'); 