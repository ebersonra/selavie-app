-- Atualizar a coluna TCC para incluir os cards
UPDATE site_content
SET tcc = jsonb_set(
    tcc,
    '{cards}',
    '[
        {
            "title": "Identificação de Padrões",
            "description": "Ajudamos você a identificar padrões de pensamento e comportamento que podem estar causando sofrimento emocional."
        },
        {
            "title": "Técnicas Práticas",
            "description": "Utilizamos técnicas específicas e exercícios práticos para desenvolver habilidades de enfrentamento e resolução de problemas."
        },
        {
            "title": "Resultados Mensuráveis",
            "description": "Acompanhamento constante do progresso com metas claras e resultados mensuráveis ao longo do tratamento."
        }
    ]'::jsonb
)
WHERE tcc IS NOT NULL; 