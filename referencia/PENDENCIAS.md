# Pendências da versão nova (arquivo único `public/index.html`)

## Vídeos
- **Dra. Eveline (feito)**: original `eveline.editado.mp4` na release `video-eveline` (41 MB, HEVC 10-bit). No site: `public/assets/video/eveline-web.mp4`, 720×1280, CRF 24, faststart, 10 MB. Capa `eveline-capa.jpg` é um frame real. Começa mudo ao abrir, com botão de som (decisão do Gustavo; o brief pedia sem autoplay).
- **Dra. Joyce (falta o arquivo)**: subir o MP4 numa release, como foi feito com a Eveline. Vai no lugar do card de texto dela nos depoimentos, marcado `[VIDEO_JOYCE]` no HTML, com o mesmo tratamento 9:16, poster, sem autoplay.

## Blocos [INSERIR] que continuam abertos
- **Case odontológico** (`<!-- CASE -->`): título, texto (antes / o que foi estruturado / o que mudou) e os 3 números. Não tenho dados de nenhuma clínica odontológica pra preencher sem inventar. O da Adissi é cirurgia plástica e não entra.

## Lead: destino ainda não ligado
`enviar()` só dá `console.log` e mostra a tela "Recebido". A conversão (Pixel Lead, Google Ads, `dataLayer`) já dispara ali. Falta o `fetch()` pro webhook/CRM do odonto (o site médico usa Evoluze Chat + Supabase com credenciais próprias, listadas no item 10 do dossiê).

## Rastreamento portado do site médico (IDs compartilhados)
- GTM `GTM-NLB9HGKB`, Pixel `1596531545529516`, Google Ads `AW-18428282557` com o rótulo de conversão `HXZuCNGd0e0cEL2NpdNE`.
- Fora do domínio final (github.io, vercel.app, netlify.app, localhost) nada disso carrega e a página recebe `noindex`.
- Criar IDs próprios do odonto quando for separar os dados.

## Faixa de prova social (só odontologia)
- Hoje: Dra. Eveline Leite (CRO-MG 45408) e Dra. Fernanda Albejante (falta o CRO dela).
- Faltam: CRO e foto da Dra. Joyce Carvalho; clínicas odontológicas com nome e logo (nenhuma das logos herdadas do site médico é odonto confirmada). Slot marcado `[ADICIONAR]` no HTML.

## Depoimentos
- Dra. Eveline entrou com o áudio 1 (`depoimento-eveline-1.mp3`); os áudios 2 e 3 estão na pasta. Se preferir texto, transcrever.
- `privacidade.html` e `painel.html` continuam do site médico; o link "Privacidade" do rodapé ainda aponta pra `#`.
