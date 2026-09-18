# Evoluze Odonto — funil odontológico

Clone estrutural do site médico (`guscaciotti-hub/SITE-LOCAL`, evoluzemarketingmedico.com.br), para virar a versão odontológica: **mesmo layout, design e componentes; só copy e parte das imagens mudam.**

## Estado atual

Versão nova em arquivo único (`public/index.html`, sem framework, sem build), com GTM, Pixel e Google Ads portados do site médico, foto do Gustavo, faixa de clientes, vídeo da Dra. Eveline (arquivo pendente) e conversão disparando dentro de `enviar()`. O que falta está em `referencia/PENDENCIAS.md`.

Prévia: https://guscaciotti-hub.github.io/evoluzeodonto/ (GitHub Pages, publica sozinho a cada push em `public/`). Em domínios de prévia o rastreamento fica desligado.

## O que tem aqui

| Caminho | O que é |
|---|---|
| `public/` | O site inteiro (HTML único, sem build). É o que vai pro ar |
| `referencia/PENDENCIAS.md` | O que ainda falta na versão nova (vídeo, case, destino do lead, IDs) |
| `referencia/DOSSIE-SITE-MEDICO.md` | Dossiê completo: código, hospedagem, design system, inventário de imagens, copy seção por seção, VSL, formulário, rastreamento, dependências e o que quebra ao copiar |
| `referencia/EVOLUZE_Guia_Clonagem.*` | Guia antigo de clonagem do design |
| `.github/workflows/` | Deploy na Hostinger (FTPS), preview no Pages, screenshots de validação |
| `netlify.toml` | Preview no Netlify publicando só `public/` |

## Publicar

Igual ao site médico: criar os segredos `FTP_HOST`, `FTP_USERNAME` e `FTP_PASSWORD` no repositório, ajustar a branch em `.github/workflows/deploy-hostinger.yml` e rodar "Publicar na Hostinger" uma vez na aba Actions. Depois disso, cada push em `public/` publica sozinho.
