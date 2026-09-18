# Pendências da versão nova (arquivo único `public/index.html`)

## Vídeo da Dra. Eveline (feito)
- Original: `eveline.editado.mp4` na release `video-eveline` (41 MB, HEVC 10-bit, não toca em todo navegador).
- No site: `public/assets/video/eveline.mp4`, recodificado em H.264/AAC 1080×1920, 14 MB. Capa `eveline-capa.jpg` é um frame real. A release pode ser apagada quando quiser.

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
