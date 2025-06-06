-- Adicionar novas colunas para EMDR e TCC
ALTER TABLE site_content
ADD COLUMN IF NOT EXISTS emdr jsonb,
ADD COLUMN IF NOT EXISTS tcc jsonb;

-- Atualizar registros existentes com valores padrão
UPDATE site_content
SET 
    emdr = '{
        "title": "EMDR - Terapia de Reprocessamento",
        "description": "A Terapia EMDR (Eye Movement Desensitization and Reprocessing) é uma abordagem terapêutica eficaz para o tratamento de traumas e transtornos de ansiedade. Através de movimentos oculares bilaterais, ajudamos seu cérebro a processar memórias traumáticas de forma natural e eficiente.",
        "cta": {
            "text": "Agende uma sessão de EMDR",
            "url": "https://api.whatsapp.com/send?phone=5541999999999&text=Olá,%20gostaria%20de%20agendar%20uma%20sessão%20de%20EMDR"
        }
    }'::jsonb,
    tcc = '{
        "title": "TCC - Terapia Cognitivo-Comportamental",
        "description": "A Terapia Cognitivo-Comportamental (TCC) é uma abordagem estruturada e focada em objetivos, que ajuda a identificar e modificar padrões de pensamento e comportamento que causam sofrimento emocional.",
        "cta": {
            "text": "Agende uma sessão de TCC",
            "url": "https://api.whatsapp.com/send?phone=5541999999999&text=Olá,%20gostaria%20de%20agendar%20uma%20sessão%20de%20TCC"
        }
    }'::jsonb
WHERE emdr IS NULL OR tcc IS NULL;

-- Tornar as colunas NOT NULL após a atualização
ALTER TABLE site_content
ALTER COLUMN emdr SET NOT NULL,
ALTER COLUMN tcc SET NOT NULL; 