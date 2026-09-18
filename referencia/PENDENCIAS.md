# Pendências da versão nova (arquivo único `public/index.html`)

## Arquivos que faltam
- `public/assets/video/eveline.mp4` — vídeo vertical 9:16 da Dra. Eveline (H.264/AAC, 1080×1920). O `<video>` já aponta pra esse caminho; até o arquivo chegar o player mostra a capa e não toca.
- `public/assets/img/eveline-capa.jpg` — hoje é uma arte provisória com o nome dela. Trocar por um frame real do vídeo.

## Blocos [INSERIR] que continuam abertos
- **Case odontológico** (`<!-- CASE -->`): título, texto (antes / o que foi estruturado / o que mudou) e os 3 números. Não tenho dados de nenhuma clínica odontológica pra preencher sem inventar. O da Adissi é cirurgia plástica e não entra.

## Lead: destino ainda não ligado
`enviar()` só dá `console.log` e mostra a tela "Recebido". A conversão (Pixel Lead, Google Ads, `dataLayer`) já dispara ali. Falta o `fetch()` pro webhook/CRM do odonto (o site médico usa Evoluze Chat + Supabase com credenciais próprias, listadas no item 10 do dossiê).

## Rastreamento portado do site médico (IDs compartilhados)
- GTM `GTM-NLB9HGKB`, Pixel `1596531545529516`, Google Ads `AW-18428282557` com o rótulo de conversão `HXZuCNGd0e0cEL2NpdNE`.
- Fora do domínio final (github.io, vercel.app, netlify.app, localhost) nada disso carrega e a página recebe `noindex`.
- Criar IDs próprios do odonto quando for separar os dados.

## Faixa de prova social
- Dentistas: Dra. Eveline Leite (CRO-MG 45408) e Dra. Fernanda Albejante (sem CRO na arte).
- Os médicos e as clínicas de outras áreas estão no bloco marcado `[PROVISÓRIO]`; apagar esse bloco quando a faixa for só odonto.

## Depoimentos
- Dra. Eveline entrou com o áudio 1 (`depoimento-eveline-1.mp3`); os áudios 2 e 3 estão na pasta. Se preferir texto, transcrever.
- `privacidade.html` e `painel.html` continuam do site médico; o link "Privacidade" do rodapé ainda aponta pra `#`.
