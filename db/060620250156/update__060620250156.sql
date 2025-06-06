-- Atualizar a coluna EMDR para incluir os cards
UPDATE site_content
SET emdr = jsonb_set(
    emdr,
    '{cards}',
    '[
        {
            "title": "Reprocessamento Cerebral",
            "description": "Estimulação bilateral que ajuda o cérebro a processar memórias traumáticas de forma natural e eficiente."
        },
        {
            "title": "Alívio Emocional",
            "description": "Redução significativa do impacto emocional negativo associado a experiências traumáticas."
        },
        {
            "title": "Resultados Comprovados",
            "description": "Método reconhecido pela OMS e eficaz no tratamento de TEPT e outros transtornos de ansiedade."
        }
    ]'::jsonb
)
WHERE emdr IS NOT NULL; 