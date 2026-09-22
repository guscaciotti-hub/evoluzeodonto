# Pendências (arquivo único `public/index.html`)

Posicionamento atual: **Gustavo Scaciotti, gestor de tráfego individual**, primeira pessoa do singular. Domínio novo: `gustavogestordetrafego.com.br` (canonical e og:url já apontam pra ele; DNS e hospedagem ainda por configurar). "Evoluze" só aparece no depoimento da Dra. Joyce.

## Vídeos
- **Dra. Eveline (feito)**: original `eveline.editado.mp4` na release `video-eveline` (41 MB, HEVC 10-bit). No site: `public/assets/video/eveline-web.mp4`, 720×1280, CRF 24, faststart, 10 MB. Capa `eveline-capa.jpg` é um frame real. Começa mudo ao abrir, com botão de som (decisão do Gustavo; o brief pedia sem autoplay).
- **Dra. Joyce (falta o arquivo)**: subir o MP4 numa release, como foi feito com a Eveline. Vai no lugar do card de texto dela nos depoimentos, marcado `[VIDEO_JOYCE]` no HTML, com o mesmo tratamento 9:16, poster, sem autoplay.

## Case (feito)
- Case da Dra. Eveline Leite com os números autorizados por ela (R$4 mil/mês em tráfego, R$80 mil+ de faturamento, 100% particular). Sem vídeo no case; o dela já está no hero.

## Lead: ligado ao agente Evoluze Comercial (falta colar o token)
`enviar()` faz POST em `https://evoluzechat.com.br/webhook/lead` com nome, whatsapp (55+DDD), papel/tamanho/verba em valores curtos (dono_clinica, 2a4, 1k_5k...), `origem: "site-odonto"` e `classificacao` (quente/morno/frio, derivada no site). Sem cidade/area. Tela final: quente vê botão da agenda pré-preenchida; morno/frio só o aviso do WhatsApp. Conversão (Pixel Lead, Google Ads, dataLayer) dispara depois do POST responder, com fallback de 5 s. Erro do POST só no console; o lead sempre vê a tela final. Em prévia (github.io) o POST não sai.
- Token do webhook já colado (mesmo do site médico).
- O agente precisa tratar papel, tamanho e verba como já respondidos (não perguntar de novo) — ajuste do lado do Evoluze Chat.

## Rastreamento portado do site médico (IDs compartilhados)
- GTM `GTM-NLB9HGKB`, Pixel `1596531545529516`, Google Ads `AW-18428282557` com o rótulo de conversão `HXZuCNGd0e0cEL2NpdNE`.
- Fora do domínio final (github.io, vercel.app, netlify.app, localhost) nada disso carrega e a página recebe `noindex`.
- Criar IDs próprios do odonto quando for separar os dados.

## Faixa de prova social
- Em destaque: Dra. Eveline Leite (CRO-MG 45408), Dra. Joyce Carvalho (CRO-MG 66793) e Dra. Fernanda Albejante (falta o CRO dela).
- Médicos e clínicas do site médico viraram uma menção discreta em texto ("Entre outros clientes da saúde..."), por decisão do Gustavo antes do tráfego frio.

## Depoimentos
- Dra. Eveline entrou com o áudio 1 (`depoimento-eveline-1.mp3`); os áudios 2 e 3 estão na pasta. Se preferir texto, transcrever.
- `privacidade.html` e `painel.html` continuam do site médico; o link "Privacidade" do rodapé ainda aponta pra `#`.
