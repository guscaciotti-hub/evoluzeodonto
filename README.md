# Evoluze Odonto — funil odontológico

Clone estrutural do site médico (`guscaciotti-hub/SITE-LOCAL`, evoluzemarketingmedico.com.br), para virar a versão odontológica: **mesmo layout, design e componentes; só copy e parte das imagens mudam.**

## Estado atual

Estrutura do site médico com a **primeira rodada de copy odonto aplicada** (hero, bloco de dor, método, serviços, depoimentos, formulário, pós-formulário). O que ainda falta de texto, imagem e vídeo está em `referencia/COPY-PENDENTE.md`. Antes de publicar, todos os pontos do item 10 do dossiê precisam ser trocados (domínio, IDs de rastreamento, Supabase, webhook, branch do deploy).

## O que tem aqui

| Caminho | O que é |
|---|---|
| `public/` | O site inteiro (HTML único, sem build). É o que vai pro ar |
| `referencia/COPY-PENDENTE.md` | O que da copy odonto já entrou, o que foi troca mecânica e o que ainda falta |
| `referencia/DOSSIE-SITE-MEDICO.md` | Dossiê completo: código, hospedagem, design system, inventário de imagens, copy seção por seção, VSL, formulário, rastreamento, dependências e o que quebra ao copiar |
| `referencia/EVOLUZE_Guia_Clonagem.*` | Guia antigo de clonagem do design |
| `.github/workflows/` | Deploy na Hostinger (FTPS), preview no Pages, screenshots de validação |
| `netlify.toml` | Preview no Netlify publicando só `public/` |

## Publicar

Igual ao site médico: criar os segredos `FTP_HOST`, `FTP_USERNAME` e `FTP_PASSWORD` no repositório, ajustar a branch em `.github/workflows/deploy-hostinger.yml` e rodar "Publicar na Hostinger" uma vez na aba Actions. Depois disso, cada push em `public/` publica sozinho.
