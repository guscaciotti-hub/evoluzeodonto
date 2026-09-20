# Pendências (arquivo único `public/index.html`)

Posicionamento atual: **Gustavo Scaciotti, gestor de tráfego individual**, primeira pessoa do singular. Domínio novo: `gustavogestordetrafego.com.br` (canonical e og:url já apontam pra ele; DNS e hospedagem ainda por configurar). "Evoluze" só aparece no depoimento da Dra. Joyce.

## Vídeos
- **Dra. Eveline (feito)**: original `eveline.editado.mp4` na release `video-eveline` (41 MB, HEVC 10-bit). No site: `public/assets/video/eveline-web.mp4`, 720×1280, CRF 24, faststart, 10 MB. Capa `eveline-capa.jpg` é um frame real. Começa mudo ao abrir, com botão de som (decisão do Gustavo; o brief pedia sem autoplay).
- **Dra. Joyce (falta o arquivo)**: subir o MP4 numa release, como foi feito com a Eveline. Vai no lugar do card de texto dela nos depoimentos, marcado `[VIDEO_JOYCE]` no HTML, com o mesmo tratamento 9:16, poster, sem autoplay.

## Case (feito)
- Case da Dra. Eveline Leite com os números autorizados por ela (R$4 mil/mês em tráfego, R$80 mil+ de faturamento, 100% particular). Sem vídeo no case; o dela já está no hero.

## Lead: ligado ao agente Evoluze Comercial (falta colar o token)
`enviar()` faz POST em `https://evoluzechat.com.br/webhook/lead` (mesmo endpoint do site médico) com nome, whatsapp (55+DDD), cidade, area, papel, tamanho, verba e `origem: "site-odonto"`. Conversão (Pixel Lead, Google Ads, dataLayer) dispara depois do POST responder, com fallback de 5 s. Erro do POST só no console; o lead sempre vê a tela final. Em prévia (github.io) o POST não sai.
- **Pendente**: trocar `[COLAR_TOKEN_DO_EVOLUZE_CHAT]` no fim do script pelo Bearer token do site médico (`CONFIG.chatWebhookToken` no index.html do SITE-LOCAL). A trava de segurança do ambiente não deixa esse valor entrar num commit feito daqui.
- O agente precisa tratar papel, tamanho e verba como já respondidos (não perguntar de novo) — ajuste do lado do Evoluze Chat.

## Rastreamento portado do site médico (IDs compartilhados)
- GTM `GTM-NLB9HGKB`, Pixel `1596531545529516`, Google Ads `AW-18428282557` com o rótulo de conversão `HXZuCNGd0e0cEL2NpdNE`.
- Fora do domínio final (github.io, vercel.app, netlify.app, localhost) nada disso carrega e a página recebe `noindex`.
- Criar IDs próprios do odonto quando for separar os dados.

## Faixa de prova social
- Dentistas: Dra. Eveline Leite (CRO-MG 45408) e Dra. Fernanda Albejante (falta o CRO dela).
- "Outros profissionais e clínicas atendidos": médicos e clínicas do site médico, mantidos por decisão do Gustavo. Só sair quando ele mandar.
- Faltam: CRO e foto da Dra. Joyce Carvalho; clínicas odontológicas com nome e logo. Slot marcado `[ADICIONAR]` no HTML.

## Depoimentos
- Dra. Eveline entrou com o áudio 1 (`depoimento-eveline-1.mp3`); os áudios 2 e 3 estão na pasta. Se preferir texto, transcrever.
- `privacidade.html` e `painel.html` continuam do site médico; o link "Privacidade" do rodapé ainda aponta pra `#`.
