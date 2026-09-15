# Dossiê do site médico (base para o funil odontológico)

Fonte: repositório `guscaciotti-hub/SITE-LOCAL`, branch `claude/exciting-maxwell-dlctrc`, commit `d1f5b27` (09/09/2026, "Formulario: 3 personas").
Site no ar: https://evoluzemarketingmedico.com.br/

> Atenção: na outra sessão do Claude Code (SITE-LOCAL) existe uma alteração **não commitada** chamada `enviaPainel` (envio do lead para o painel Vercel, +34 −11 linhas). Ela **não está** neste pacote porque nunca entrou no Git. Se você quiser esse envio no funil odonto, precisa colar o trecho de lá.

---

## 1. Código-fonte

Site estático, **sem build e sem framework**. Um único `index.html` com CSS e JS inline. Nada de npm, bundler ou dependência local.

| Caminho | O que é | Vai pro ar? |
|---|---|---|
| `public/index.html` | A landing page inteira (1.347 linhas: 430 de CSS, 400 de HTML, 500 de JS) | Sim |
| `public/painel.html` | Painel interno de acessos e leads (protegido por senha, `noindex`) | Sim |
| `public/privacidade.html` | Política de privacidade (LGPD), linkada no rodapé | Sim |
| `public/CNAME` | Domínio customizado do GitHub Pages | Sim |
| `public/assets/img/` | 32 imagens (ver inventário no item 4) | Sim |
| `public/assets/audio/` | 6 depoimentos em MP3 | Sim |
| `.github/workflows/deploy-hostinger.yml` | Deploy automático por FTPS | Não (CI) |
| `.github/workflows/pages.yml` | Preview opcional no GitHub Pages | Não (CI) |
| `.github/workflows/validar-site.yml` + `scripts/screenshots.mjs` | Screenshots desktop e mobile com Playwright | Não (CI) |
| `.github/workflows/baixar-imagens.yml` + `scripts/baixar-imagens.sh` | Baixa a foto do Unsplash para o repo (uso pontual) | Não (CI) |
| `netlify.toml` | Diz ao Netlify para publicar só `public/` | Não |
| `referencia/EVOLUZE_Guia_Clonagem.{docx,pdf}` | Guia antigo de clonagem do design | Não |

Arquivo que ficou de fora de propósito: `referencia/evoluze_v7_original.html` (5,8 MB). É a versão institucional antiga, anterior ao site médico. Está no zip, mas não no repositório odonto.

Estrutura do `index.html`, na ordem:

```
<head>  meta/OG/canonical → GTM → Meta Pixel → gtag Google Ads → Google Fonts → <style>
<body>  GTM noscript
        header (só logo)
        section.hero
        section#vsl
        div.divider
        section "3 dores" (.alt)
        section#metodo (.dark)
        section#funil
        section#prova (.alt) — cards gerados por JS
        section#clientes
        section#case-adissi
        section "Gustavo" (.alt)
        section "Diferencial"
        section#servicos (.dark)
        section "CFM" (.alt)
        section "Objeção"
        section.cta-final (.dark)
        footer
        div.sticky-cta (só mobile)
        div#formModal (formulário multi-step)
        <script> CONFIG + toda a lógica (VSL, depoimentos, formulário, envio)
        <script> analytics próprio (Supabase)
```

---

## 2. Hospedagem e deploy

| Item | Valor |
|---|---|
| Hospedagem definitiva | **Hostinger** (hPanel), pasta `public_html/` |
| Domínio atual | `evoluzemarketingmedico.com.br` (canonical, OG e `CNAME`) |
| Deploy | GitHub Actions `Publicar na Hostinger`: a cada push em `public/**` na branch `claude/exciting-maxwell-dlctrc`, envia `public/` para `public_html/` via **FTPS** (action `SamKirkland/FTP-Deploy-Action@v4.3.5`) |
| Segredos necessários no repo | `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD` (Settings → Secrets → Actions) |
| Preview alternativo | GitHub Pages (workflow `pages.yml`, precisa habilitar Pages com source "GitHub Actions") e Netlify (`netlify.toml`) |
| SSL | Let's Encrypt gratuito da Hostinger, com "forçar HTTPS" |

Para o funil odonto, o processo é o mesmo: criar conta FTP na Hostinger para o novo domínio, cadastrar os três segredos no repositório `evoluzeodonto`, trocar a branch no `on.push.branches` do workflow e rodar "Run workflow" uma vez.

Observação: o `README.md` do SITE-LOCAL está desatualizado (fala de "Baixada Santista" e do domínio `evoluzemarketing.com.br`). Ignore o texto dele; as instruções de deploy continuam válidas.

---

## 3. Design system

### Cores (tokens em `:root`, linhas 51 a 64)

| Token | Hex | Uso |
|---|---|---|
| `--branco` | `#FFFFFF` | Fundo padrão, cards |
| `--off-white` | `#F6FAFA` | Fundo das seções `.alt`, barra de progresso do modal |
| `--teal` | `#00D4C6` | Cor de destaque: botões, `.hl`, ícones em fundo escuro, linhas decorativas |
| `--teal-fundo` | `#053B37` | Fundo das seções `.dark`, hero, serviços, CTA final, favicon |
| `--teal-escuro` | `#04736B` | Eyebrows, ícones em fundo claro, links, foco |
| `--tinta` | `#0B1F1D` | Texto principal, fundo do footer, texto dos botões |
| `--cinza` | `#5B6B68` | Texto secundário (`.lead`, parágrafos de card) |

Cores fora dos tokens (hardcoded):

| Hex / valor | Onde |
|---|---|
| `#16e0d2` | hover do `.btn` |
| `#374845` | texto de `.funil-desc` e parágrafos da privacidade |
| `#c0392b` | erro do formulário (`.step-err`) e badge "quente" no painel |
| `#e9f2f1` | hover do botão fechar do modal |
| `#eefaf9` | gradiente da 2ª camada do funil |
| `#063f3a → #04302c` | gradiente do card de case e da camada final do funil |
| `#0a2e2b → #053b37 → #021f1c` | gradiente do frame da VSL |
| `#0e2329 → #091b21 → #040d11` | fundo radial da seção `#metodo` |
| `#0a1c22` | fundo dos ícones dos pilares |
| `rgba(5,59,55,.09 / .1 / .12 / .16)` | bordas sutis (cards, campos, separadores) |
| `rgba(0,212,198,.1 / .12 / .13)` | fundos de ícone teal em seção clara |
| `rgba(255,255,255,.04 a .84)` | textos e cards translúcidos nas seções escuras |

### Tipografia

- Família: **Inter**, pesos 400/500/600/700/800, carregada do Google Fonts (`preconnect` + `<link>` na linha 48). Fallback `sans-serif`.
- `body`: 1rem, `line-height:1.6`, `-webkit-font-smoothing:antialiased`.
- `h1, h2, h3`: peso 800, `letter-spacing:-.02em`, `line-height:1.08`.

Escala (todas com `clamp`):

| Elemento | Tamanho |
|---|---|
| `.hero h1` | `clamp(2.6rem, 6vw, 4.7rem)`, line-height 1.05 |
| `.metodo-name` (arte "Convênio Zero") | `clamp(2.2rem, 8.5vw, 6rem)`, uppercase, line-height .98 |
| `.cta-final h2` | `clamp(2rem, 4vw, 3rem)` |
| `h2.title` | `clamp(1.9rem, 3.6vw, 2.7rem)` |
| `.gus-text h2` | `clamp(1.8rem, 3vw, 2.4rem)` |
| `.cfm .title` | `clamp(1.5rem, 2.6vw, 2rem)` |
| `.caso-title` | `clamp(1.45rem, 2.3vw, 2rem)` |
| `.step h3` (modal) | `clamp(1.3rem, 3vw, 1.7rem)` |
| `.hero-sub` | `clamp(1.05rem, 1.7vw, 1.3rem)` |
| `.lead` | `clamp(1rem, 1.4vw, 1.12rem)` |
| `.card h3` | 1.18rem |
| `.funil-quote` | 1.14rem, peso 600 |
| `.eyebrow` | .72rem, peso 600, uppercase, `letter-spacing:.12em` |
| `.metodo-kicker` | .8rem, peso 700, uppercase, `letter-spacing:.34em` |
| `.cred` (pílulas do hero) | .74rem |
| `.hero-microtrust` | .84rem |
| Texto de card / parágrafo | .87 a .98rem |
| `.copy` (rodapé) | .76rem |

### Espaçamento

| Token / regra | Valor |
|---|---|
| `--container` | 1140px, padding lateral 24px |
| `.section` | 104px vertical (72px abaixo de 560px) |
| `.hero` | `min-height:92vh`, padding 130px 0 96px (120px 0 84px no mobile) |
| Gap dos grids | 24px (cards3), 22px (pilares, prova), 20px (serviços), 60px (Gustavo) |
| Padding dos cards | 38px 32px (card), 32px 28px (serviço), 26px (áudio), 26px 34px (camada do funil) |
| Modal `.stage` | 54px 44px 46px (46px 26px 38px no mobile) |

### Border-radius

| Valor | Uso |
|---|---|
| `--radius: 14px` | Botões, cards, cards de serviço |
| 12px | Campos e opções do formulário, ícone de card (13px), caixa do logo no case |
| 16px | Cards de áudio, camadas do funil, KPIs do painel |
| 18px | Frame da VSL, foto do Gustavo |
| 20px | Modal |
| 22px | Card do case |
| 999px | Pílulas (`.cred`, `.caso-chip`, `.intro-pill`, `.metodo-support`) |
| 50% | Avatares, ícones circulares, botão play |

### Sombras

| Token | Valor |
|---|---|
| `--shadow` | `0 10px 40px rgba(5,59,55,.08)` |
| `--shadow-md` | `0 16px 50px rgba(5,59,55,.14)` |
| Botão | `0 8px 24px rgba(0,212,198,.28)`; hover `0 12px 30px rgba(0,212,198,.4)` |
| Botão play da VSL | `0 10px 40px rgba(0,212,198,.45)` |
| Card do case | `0 26px 60px rgba(5,59,55,.28)` |
| Camada final do funil | `0 18px 46px rgba(5,59,55,.24)` |
| Modal | `0 30px 90px rgba(0,0,0,.4)` |
| Número do pilar | `0 6px 22px rgba(5,59,55,.16)` |

### Animação e interação

- Easing global `--ease: cubic-bezier(.16,.84,.44,1)`.
- `.reveal` (fade + translateY 22px em .7s) ativado por `IntersectionObserver` com threshold .12; variações `.d1/.d2/.d3` atrasam .1/.2/.3s.
- Hero: `.hero-rv` com `@keyframes heroIn`, atrasos escalonados `.s2` a `.s6`.
- Hover de card: `translateY(-5px)` + `--shadow`. Botão: `translateY(-2px)`.
- Seta do hero: `@keyframes bob` (2.1s infinito).
- `prefers-reduced-motion`: desliga tudo.
- Foco visível: `outline 2.5px solid --teal-escuro`, offset 3px.

### Breakpoints

| Largura | Mudanças |
|---|---|
| ≤ 920px | Grid do Gustavo vira 1 coluna, pilares 2×2, cards3 1 coluna, serviços 2 colunas, CFM empilha |
| ≤ 900px | Funil e grids de clientes mais compactos |
| ≤ 820px | Case vira 1 coluna, foto com 230px |
| ≤ 640px | Camadas do funil 100% e empilhadas, logos menores |
| ≤ 560px | Seções 72px, sticky CTA aparece, botões 100%, prova e serviços 1 coluna, logo 56px |

### Componentes reutilizáveis (classes)

`.btn` / `.btn-lg`, `.eyebrow`, `h2.title`, `.lead`, `.section` (+ `.alt`, `.dark`), `.card` + `.card-ic`, `.pilar` + `.pilar-ic` + `.pilar-n`, `.funil-layer` (+ `--2`, `--final`), `.audio-card`, `.med-card`, `.logo-tile`, `.caso`, `.check`, `.servico-card`, `.cred`, `.caso-chip`, `.sticky-cta`, `.modal` + `.step` + `.opt` + `.field`, `.done`.

Ícones: todos **SVG inline** de traço (stroke), sem biblioteca. Favicon é um SVG em data URI (quadrado `#053B37` com círculo `#00D4C6`).

---

## 4. Inventário de imagens

### 4a. Genéricas / reaproveitáveis

| Arquivo | Tamanho | Onde aparece | Observação |
|---|---|---|---|
| `assets/img/evoluze-logo.png` | 646×427 | Header e footer | Logo Evoluze Marketing "Do marketing à venda", fundo transparente |
| `assets/img/og-evoluze.png` | 1200×630 | `og:image` / `twitter:image` | **Tem copy médica gravada na arte** ("Uma agenda previsível de pacientes particulares · marketing médico"). Precisa de versão odonto |
| Favicon (SVG inline, linha 8) | 32×32 | Aba do navegador | Genérico |
| SVG "linha de previsibilidade" (linhas 451 a 462) | inline | Fundo do hero | Genérico |
| SVG divisória (linha 512) | inline | Entre VSL e 3 dores | Genérico |
| SVG gráfico de barras (linha 546) | inline | Fundo direito da seção método | Genérico |
| SVG linha pontilhada (linha 557) | inline | Liga os 4 pilares | Genérico |
| Ruído em SVG data URI (`.hero-noise`) | inline | Textura do hero | Genérico |
| Ícones SVG de traço (cards, pilares, serviços, checks, setas, play, calendário) | inline | Todas as seções | Genéricos |

Imagens **presentes na pasta mas não usadas** por nenhum HTML (sobras da versão institucional, podem ser apagadas):
`academie-marsaud.png`, `cedus.png`, `costa-atacadao.png`, `ethera-labs.png` (1,1 MB), `evoluze-marketing.png`, `evoluze-marketing-2.png`, `fotos/hero-dashboard.jpg`, `gustavo-scaciotti.png`, `sr-imobiliaria.png`, `task.png`, `uai-shopping.png`.

### 4b. Contextuais de nicho (pessoa, jaleco, consultório, conselho, cliente médico)

| Arquivo | Tamanho | Seção | O que mostra | Para odonto |
|---|---|---|---|---|
| `assets/img/hero-bg.jpg` | 1672×941 | Hero (fundo, com scrim escuro) | Mulher de blazer branco num notebook, escritório escuro | Pode manter (não é jaleco) ou trocar por dentista/consultório |
| `assets/img/metodo-bg.jpg` | 1672×941 | Método (fundo esquerdo, 40% de opacidade) | A mesma foto do hero espelhada | Idem |
| `assets/img/gustavo.jpg` | 760×950 | "Quem conduz" | Foto do Gustavo | Manter |
| `assets/img/cfm.png` | 600×179 | "Ética e conformidade" | Logo do Conselho Federal de Medicina | **Trocar por CFO** (Conselho Federal de Odontologia) |
| `assets/img/case-adissi.jpg` | 1200×900 | Estudo de caso | Fachada da Clínica Adissi (cirurgia plástica) | Trocar por case odonto |
| `assets/img/logo-clinica-adissi.png` | 520×272 | Case + parede de logos | Logo da clínica | Trocar |
| `assets/img/med-isis-minami.jpg` | 680×680 | Clientes (card) | Dra. Isis Minami, dermatologista, com CRM | Trocar |
| `assets/img/med-nicole-vargas.jpg` | 680×680 | Clientes (card) | Dr. Nicole Vargas, endocrinologista | Trocar |
| `assets/img/med-eberson-coimbra.jpg` | 680×680 | Clientes (card) | Dr. Eberson Coimbra, cirurgião plástico | Trocar |
| `assets/img/med-martim-marcondes.jpg` | 680×680 | Clientes (card) | Dr. Martim Marcondes, ortopedista | Trocar |
| `assets/img/med-pedro-adissi.jpg` | 680×680 | Clientes (card) | Dr. Pedro Adissi, cirurgião plástico | Trocar |
| `assets/img/med-fernanda-albejante.jpg` | 680×680 | Clientes (card) | Dra. Fernanda Albejante, **ortodontia e odontopediatria** | **Reaproveitar** (já é odonto) |
| `assets/img/med-ortodontista.jpg` | 680×680 | Clientes (card) | Ortodontista, **CRO-MG 45408** | **Reaproveitar** (já é odonto) |
| `assets/img/logo-high-line.png` | 492×520 | Parede de logos | Clínica High Line | Avaliar |
| `assets/img/logo-reviva.png` | 520×268 | Parede de logos | REVIVA Clínica Médica | Trocar |
| `assets/img/logo-ibap.png` | 520×228 | Parede de logos | IBAP, escola de oftalmologia | Trocar |
| `assets/img/logo-dermafast.png` | 520×96 | Parede de logos | dermafast | Trocar |
| `assets/img/logo-nicole-vargas.png` | 520×101 | Parede de logos | Dr. Nicole Vargas, medicina integrada | Trocar |
| `assets/img/logo-solusono.png` | 520×224 | Parede de logos | SoluSono | Avaliar |

Áudios (todos contextuais, clientes médicos):

| Arquivo | Quem | Card |
|---|---|---|
| `assets/audio/depoimento-cintia.mp3` (372 KB) | Dra. Cíntia Braghrolli, "Cliente Evoluze" | 1 |
| `assets/audio/depoimento-livia.mp3` (260 KB) | Lívia, Clínica Adissi | 2 |
| `assets/audio/depoimento-bruna.mp3` (632 KB) | Bruna, Clínica Adissi | 3 |
| `assets/audio/depoimento-eveline-1/2/3.mp3` | Dra. Eveline, "Cliente Evoluze" | 4, 5, 6 |

Referências **quebradas** (o HTML aponta, o arquivo não existe, cai no avatar de iniciais): `assets/img/depo-cintia.jpg`, `assets/img/depo-livia.jpg`, `assets/img/depo-bruna.jpg`.

---

## 5. Estrutura de copy, seção por seção

### 5.1 `<head>` (SEO)

- **Title**: Evoluze — Marketing Médico para Clínicas e Consultórios | Pacientes Particulares Previsíveis
- **Description**: Assessoria especializada em marketing médico para clínicas e consultórios. Um fluxo previsível de pacientes particulares — tráfego operado com rigor, do anúncio à cadeira, sem depender de indicação ou convênio.
- **og:title**: Evoluze — Marketing Médico para Clínicas e Consultórios
- **og:description**: Um fluxo constante do paciente certo, sem depender de indicação ou convênio. Operado com rigor, do anúncio à cadeira.

### 5.2 Header
Função: só marca, sem navegação (não dá rota de fuga no funil). Logo centralizado.

### 5.3 Hero (`section.hero`)
Função: promessa central + CTA primário + prova de autoridade rápida.

- **Eyebrow**: Assessoria especializada em marketing médico
- **H1**: Uma agenda **previsível** de pacientes particulares — sem depender de indicação ou convênio. *(palavra em teal: "previsível")*
- **Linha de nicho** (`.hero-nicho`): Assessoria exclusiva para clínicas médicas e odontológicas
- **Subheadline**: Sem depender de indicação. Sem depender de convênio. Um fluxo constante do paciente certo — operado com rigor, do anúncio à cadeira.
- **CTA**: Quero uma análise gratuita →
- **Microtrust**: Análise gratuita · cada conta é operada pessoalmente
- **Credenciais (pílulas)**: Google Ads Certified · Meta Ads · +15 clientes atendidos *(vem de `CONFIG.clinicasAtendidas`)* · Operação 100% pessoal
- Seta animada para `#vsl`.

### 5.4 VSL (`#vsl`)
Função: vídeo de vendas, aquece antes do conteúdo.

- **Eyebrow**: Assista antes de qualquer coisa
- **H2**: Como construir um fluxo previsível de pacientes particulares no seu consultório
- Placeholder sem vídeo: "Vídeo em breve"
- Overlay de som: 🔊 Seu vídeo já começou — clique para ativar o som
- **CTA**: Quero uma análise gratuita

### 5.5 Três dores / benefícios (`section.alt`)
Função: transformar dor em promessa, 3 cards.

- **Eyebrow**: O que muda no seu dia a dia
- **H2**: Três coisas que acontecem quando você para de depender da sorte
- **Card 1 — Previsibilidade**: Pare de depender de indicação e de convênio. Tenha um fluxo constante de pacientes particulares que você consegue prever e planejar mês a mês.
- **Card 2 — O paciente certo**: Não é sobre mais gente. É sobre o paciente que valoriza o seu trabalho e está pronto para pagar o valor cheio pelo seu procedimento — não o que pechincha.
- **Card 3 — Um novo patamar**: Deixe de brigar por volume. O seu atendimento cresce com margem, com a agenda cheia do tipo de paciente que faz o negócio realmente lucrar.

### 5.6 Método (`#metodo`, escura)
Função: mecanismo único nomeado + 4 pilares. O nome vem de `NOME_METODO` no JS (1ª palavra vira kicker, última fica em teal).

- **Kicker**: Método
- **Nome**: Convênio **Zero**
- **Suporte (pílula)**: Sistema de captação, conversão e escala de pacientes particulares.
- **Intro**: A maioria trata tráfego como ligar um anúncio e esperar. O resultado é lead barato que não vira paciente. O Método Convênio Zero é o oposto: um sistema operado de ponta a ponta, com rigor diário, para transformar investimento em procedimento realizado — de forma previsível.
- **01 Captação**: Tráfego pago operado com rigor (Meta e Google), atraindo o paciente particular certo — não volume, não curioso.
- **02 Conversão**: O paciente não se perde depois do clique: atendimento ágil (IA ou treinamento da equipe) e processo comercial que transforma interesse em agendamento.
- **03 Acompanhamento**: Cada real rastreado até virar procedimento. CRM, métricas e análise de ROI — você sabe exatamente o que entra e o que volta.
- **04 Escala**: Com a máquina medida e funcionando, um plano de crescimento para elevar o seu atendimento a um novo patamar.
- **Ponte**: E isso só funciona porque respeita a **jornada do paciente** — do primeiro contato à decisão.

### 5.7 Funil / jornada (`#funil`)
Função: educar sobre o método e diferenciar de "anúncio de oferta".

- **Eyebrow**: Como trabalhamos diferente
- **H2**: Médico não vende. Médico se posiciona.
- **Sub**: A maioria dispara anúncio de oferta e espera o paciente decidir sozinho. Nós construímos o caminho inteiro: primeiro a sua clínica aparece e é reconhecida, depois conquista a confiança, e só então faz o convite. A venda vira consequência da autoridade — não de pressão.
- **Etapa 1 · Descoberta** — "Ah, então isso tem tratamento?" — A sua clínica aparece para muitas pessoas certas. Conteúdo que apresenta e educa — sem preço, sem "agende". A pessoa te conhece pela primeira vez.
- **Etapa 2 · Consideração** — "Será que funciona pra mim?" — Conteúdo que responde as dúvidas e mostra a sua autoridade e os seus resultados. A confiança nasce. Você deixa de ser "uma opção" e se torna a escolha certa.
- **Etapa 3 · Decisão** — "Quero agendar." — O convite direto, para quem já confia e está pronto. O paciente agenda — e chega muito mais preparado e decidido do que um contato frio.
- **Fechamento**: **Muita gente entra em cima. As pessoas certas agendam embaixo.** E como o paciente chega aquecido, cada agendamento tende a custar menos do que abordar um estranho do zero.
- **Nota**: ✦ Cada clínica recebe esse plano montado sob medida, com peças pensadas para cada etapa da jornada do seu paciente.

### 5.8 Prova / depoimentos em áudio (`#prova`, `.alt`)
Função: prova social. Cards gerados de `CONFIG.depoimentos`; lista vazia esconde a seção.

- **Eyebrow**: Resultados reais
- **H2**: O que dizem as clínicas que já têm previsibilidade
- **Intro**: O que mais importa pra nós é o resultado real de quem confia no nosso trabalho. Ouça abaixo.
- 6 cards: nome, identificação, player `<audio controls>`.

### 5.9 Clientes (`#clientes`)
Função: autoridade por logos e fotos de clientes.

- **Eyebrow**: Médicos e clínicas de referência
- **H2**: Quem já confia na Evoluze
- **Sub**: Especialistas e clínicas de diferentes áreas que confiam à Evoluze o crescimento das suas agendas de pacientes particulares.
- 7 cards de profissionais (alt: nome, especialidade, CRM/CRO)
- **Separador**: Clínicas & instituições
- 7 logos.

### 5.10 Estudo de caso (`#case-adissi`)
Função: case âncora com resultado.

- **Eyebrow**: Estudo de caso
- **H2**: Nosso maior case de sucesso
- **Tag**: Clínica Adissi · Cirurgia Plástica
- **Título**: Do tráfego de uma unidade à operação completa da matriz
- **Local**: Poços de Caldas (MG) · São João da Boa Vista (SP)
- **P1**: Começamos com o tráfego pago na unidade de São João da Boa Vista. O resultado abriu as portas da matriz, em Poços de Caldas — onde assumimos a assessoria **completa**, de marketing e comercial.
- **P2**: Cuidamos de tudo: campanhas, funil, estratégia e posicionamento médico; e, no comercial, contratação, treinamento de equipe, alinhamento, definição de metas e acompanhamento de resultados.
- **Chips**: Marketing completo · Comercial completo · 2 unidades
- **Destaque**: Hoje, a Clínica Adissi vive praticamente **100% de resultados vindos do online**.

### 5.11 Quem conduz (`.alt`)
Função: autoridade pessoal.

- **Eyebrow**: Quem conduz
- **H2**: Gustavo Scaciotti
- **Cargo**: Especialista em Marketing Médico
- **Bio**: Sou o Gustavo, à frente da Evoluze. Operamos o tráfego de cada cliente de perto — do anúncio ao paciente na cadeira. Não trabalhamos com volume nem com marketing de vaidade: trabalhamos com previsibilidade e retorno mensurável. Atendemos um número limitado de clientes justamente porque resultado de alto padrão exige atenção de alto padrão.

### 5.12 Diferencial (checks)
Função: contraste com concorrência.

- **Eyebrow**: A diferença
- **H2**: A maioria entrega lead. Nós entregamos paciente na cadeira.
- ✓ Operação conduzida de perto, do início ao fim — você não cai na mão de um estagiário.
- ✓ Foco em paciente particular de alto valor, não em volume de lead barato.
- ✓ Cada real rastreado até o procedimento. Você sempre sabe o retorno.
- ✓ Cuidamos do caminho inteiro: do anúncio ao agendamento, não só do anúncio.

### 5.13 Serviços (`#servicos`, escura)
Função: escopo da oferta.

- **Eyebrow**: O que entregamos
- **H2**: Nossos Serviços
- **Sub**: Tudo o que a sua clínica ou consultório precisa para atrair, converter e escalar pacientes particulares.
- **Google Ads**: Apareça para quem já está procurando pelo seu procedimento, no momento da decisão.
- **Meta Ads**: Alcance o paciente particular certo no Instagram e Facebook, com criativos que geram demanda.
- **Atendimento com IA**: Atendimento ágil que responde e qualifica o paciente na hora, para não perder oportunidade.
- **CRM e Gestão de Leads**: Organização de cada contato e acompanhamento do paciente do primeiro clique ao agendamento.
- **Treinamento de Equipe Comercial**: Sua equipe preparada para converter o interesse em consulta e procedimento.
- **Processo Comercial**: Estruturação do caminho de vendas para que nenhum paciente se perca depois do anúncio.
- **Nota**: O que entra no seu plano é definido na reunião de diagnóstico, conforme a necessidade da sua clínica. Você não paga por solução que não vai usar.

### 5.14 Ética / conselho (`.alt`)
Função: quebrar objeção de risco regulatório.

- **Eyebrow**: Ética e conformidade
- **H2**: Marketing dentro das regras do seu conselho
- **P**: Toda a comunicação é feita com responsabilidade e dentro das diretrizes de publicidade da área da saúde (CFM e conselhos relacionados). Crescimento sem expor a sua reputação.
- Imagem: logo CFM.

### 5.15 Objeção "não tenho tempo"
Função: tirar o peso operacional do cliente.

- **H2**: Você cuida dos pacientes. Da máquina de aquisição, cuidamos nós.
- **P**: Você não precisa virar especialista em tráfego, nem montar equipe de marketing, nem aprender ferramenta nenhuma. Você precisa de uma agenda previsível de pacientes particulares e de um time que opere isso com rigor, todo dia. Essa parte é com a gente.

### 5.16 CTA final (`.cta-final`, escura)
Função: fechamento com escassez.

- **Eyebrow**: O próximo passo
- **H2**: Este é o momento de tirar a sua agenda da dependência da sorte.
- **Lead**: Nós não fazemos marketing de vaidade. Fazemos paciente particular chegar, de forma previsível e mensurável. Se você está pronto para isso, faça a análise gratuita.
- **Linha de nicho**: Assessoria exclusiva para clínicas médicas e odontológicas
- **CTA**: Quero uma análise gratuita →
- **Escassez**: Atendo um número limitado de clientes por vez.

### 5.17 Footer
- Logo
- Evoluze — Assessoria especializada em marketing médico para clínicas e consultórios.
- © 2026 Evoluze. Todos os direitos reservados. *(ano via JS)*
- Link: Política de Privacidade

### 5.18 Sticky CTA (mobile, ≤ 560px)
- Quero uma análise gratuita

### 5.19 Formulário (modal), textos das etapas

Ver item 7 para campos e lógica. Textos:

1. Qual a sua formação?
   - Sou médico(a) ou dentista e tenho consultório ou clínica próprios
   - Sou dono(a) ou sócio(a) de uma clínica ou centro de saúde
   - Sou profissional de saúde e atendo por conta própria
   - Outro *(desqualifica)*
2. Qual a sua área de atuação? *(opções dependem da resposta 1)*
   - Médico/dentista: Dermatologia, Ginecologia, Ortopedia, Cardiologia, Endocrinologia, Oftalmologia, Nutrologia, Medicina estética e harmonização, Implantodontia, Ortodontia, Odontologia estética, Harmonização orofacial, Clínica geral, Outra especialidade
   - Dono/sócio: Clínica médica, Clínica odontológica, Clínica de estética avançada, Policlínica ou multiespecialidades, Centro de reabilitação / fisioterapia, Outro tipo de clínica
   - Profissional de saúde: Psicologia, Fisioterapia, Nutrição, Fonoaudiologia, Estética / Biomedicina estética, Terapias integrativas, Outra área da saúde
3. Qual o nome do seu consultório ou clínica? *(placeholder: Ex.: Clínica São Lucas)*
4. Quanto você fatura por mês, aproximadamente? — Até R$ 10 mil / R$ 10 mil a R$ 30 mil / R$ 30 mil a R$ 50 mil / R$ 50 mil a R$ 100 mil / Acima de R$ 100 mil
5. Vocês já investem em anúncio hoje? — Não, nunca investimos / Já investimos, mas sem resultado claro / Sim, investimos e queremos escalar
6. Qual o maior desafio hoje? — Agenda imprevisível / depende de indicação · Dependência de convênio (queremos mais particular) · Já vamos bem, queremos escalar · Atraímos paciente errado / que pechincha
7. O investimento faz sentido? — *sub:* Um trabalho sério de aquisição envolve um investimento mensal a partir de R$ 1.997 de honorário, mais uma verba de anúncio a partir de R$ 1.000 (investida diretamente na plataforma de anúncios). Faz sentido para o seu momento? — Sim, faz sentido / Ainda não tenho certeza
8. Qual o seu nome? *(placeholder: Seu nome completo)*
9. Qual o seu melhor WhatsApp? — *sub:* É por onde você recebe a análise e os próximos passos. *(placeholder: (00) 00000-0000)*

Botões: Continuar · ← Voltar · Enviando... Só um instante.

Telas finais:
- **Qualificado** (respondeu "Sim, faz sentido"): "Recebemos suas informações! 🎉" — O próximo passo é agendar a sua reunião de diagnóstico gratuita. Escolha o melhor horário agora: — [📅 Agendar minha reunião de diagnóstico] — Se preferir, nossa atendente também te chama no WhatsApp para combinarmos.
- **Morno** ("Ainda não tenho certeza"): "Recebemos suas respostas!" — Em breve você recebe uma mensagem no seu WhatsApp com os próximos passos.
- **Desqualificado** ("Outro" na etapa 1): "Obrigado pelo seu interesse! 🙏" — No momento, a nossa assessoria atende **exclusivamente profissionais e clínicas da área da saúde** — por isso ainda não conseguimos te atender da melhor forma agora. — Agradecemos de verdade o seu contato e desejamos muito sucesso no seu trabalho!
- **Erro** (todos os destinos falharam): "Ops, algo falhou no envio." — Tente novamente em instantes. — [Tentar de novo]

Erros de validação: "Por favor, preencha este campo." · "Confira o número — parece estar incompleto ou incorreto."

---

## 6. Vídeo do hero (VSL)

| Item | Valor |
|---|---|
| Plataforma | YouTube (domínio `youtube-nocookie.com`), vídeo não listado |
| ID atual | `aAWsZDoQw0U` |
| Config | `CONFIG.vslEmbed = "https://www.youtube-nocookie.com/embed/aAWsZDoQw0U?autoplay=1&rel=0&modestbranding=1&playsinline=1"` (linha 850) |
| Container | `.vsl-frame`: `aspect-ratio 16/9`, `max-width 880px`, `border-radius 18px`, sombra `--shadow-md`, fundo gradiente teal escuro |
| Autoplay | Sim, **mudo** ao carregar a página (`mute=1`). Overlay 🔊 "Seu vídeo já começou — clique para ativar o som": ao clicar, recarrega o iframe **do início** com som (`mute=0`) |
| Thumbnail | `https://i.ytimg.com/vi/<ID>/maxresdefault.jpg`, com fallback para `hqdefault.jpg`. Some quando o iframe carrega |
| Permissões do iframe | `autoplay; fullscreen; picture-in-picture; encrypted-media`, `allowfullscreen` |
| Sem vídeo | Se `CONFIG.vslEmbed` estiver vazio, mostra a capa com botão play e o texto "Vídeo em breve" |

**Para trocar por outro vídeo do YouTube**: só mudar o ID dentro de `CONFIG.vslEmbed`. O JS extrai o ID com a regex `/embed\/([^?&\/]+)/` e monta o resto sozinho.

**Para usar Vimeo, Panda, VTurb ou MP4 próprio**: precisa reescrever o bloco IIFE das linhas 913 a 938, porque ele assume YouTube em três pontos: a extração do ID, a URL da thumbnail (`i.ytimg.com`) e a função `src(mute)` que monta a URL do embed.

---

## 7. Formulários e destino dos leads

### Campos (9 etapas, um por tela, com barra de progresso)

| # | `key` | Tipo | Validação |
|---|---|---|---|
| 1 | `formacao` | escolha | "Outro" encerra sem enviar nada |
| 2 | `area` | escolha | opções dependem de `formacao` |
| 3 | `clinica` | texto | obrigatório |
| 4 | `faturamento` | escolha | |
| 5 | `investe` | escolha | |
| 6 | `desafio` | escolha | |
| 7 | `budget` | escolha | define `orcamento`: "sim" ou "duvida" |
| 8 | `nome` | texto | obrigatório |
| 9 | `whatsapp` | tel | máscara `(99) 99999-9999`; DDD real (lista de 67 DDDs); celular começa com 9; rejeita dígitos repetidos e sequências; aceita colar `+55`; normalizado para `55DDDNÚMERO` |

Não coleta e-mail (`email` vai vazio). Enter avança. Esc e clique fora fecham o modal.

### Destinos (disparam em paralelo; sucesso se qualquer um responder OK)

1. **Evoluze Chat (webhook)** — `POST https://evoluzechat.com.br/webhook/lead`, header `Authorization: Bearer <CONFIG.chatWebhookToken>`. Payload: nome, whatsapp, email, clinica, area, faturamento, investe, desafio, orcamento, `origem:"site-performance"`, `formacao` (código: `medico_dentista` / `dono_clinica` / `profissional_saude`), `classificacao` (`quente` / `morno` / `frio`).
2. **Formspree (e-mail)** — `POST https://formspree.io/f/<CONFIG.formspreeId>`. **Não está configurado** (valor é o placeholder `[FORMSPREE_ID]`, então o código pula esse envio e só loga um aviso). `_subject`: "Novo lead — Evoluze (Análise gratuita)".
3. **Supabase (tabela `leads`)** — `POST https://gmycqvvvglexbtbqkjzi.supabase.co/rest/v1/leads` com a chave anon. Além dos campos do form, grava `source`, `medium`, `campaign`, `device`, `referrer`, `visitor_id` (de `window.__evOrigin`). Alimenta o `painel.html`.

Regra de classificação (igual no site e no painel): `orcamento != sim` → frio; faturamento ≥ R$ 30 mil → quente; Implantodontia ou Harmonização orofacial na faixa 10 a 30 mil → quente; senão morno.

### Depois do envio
- Dispara conversão (item 8).
- Registra evento `submit` na tabela `form_events`.
- Qualificado (`orcamento == sim`) vê botão para a agenda: `https://evoluzechat.com.br/agenda/public/12?nome=...&whatsapp=...` (parâmetros de `CONFIG.agendaParams`).
- Morno vê só o agradecimento; a IA nutre no WhatsApp.

### Funil interno do formulário
`window.__evForm(step, index)` grava em `form_events` cada abertura (`open`), cada etapa respondida (pela `key`), `submit` e `desqualificado`.

---

## 8. Rastreamento

| Ferramenta | ID | Onde no código | Eventos |
|---|---|---|---|
| Google Tag Manager | `GTM-NLB9HGKB` | `<head>` linha 26; `<noscript>` linha 434 | recebe `dataLayer.push({event:'lead_form_submit'})` no envio |
| Meta Pixel | `1596531545529516` | linhas 29 a 34 (`fbevents.js`) | `PageView` no load; `Lead` no envio com sucesso |
| Google Ads (gtag) | `AW-18428282557` | linhas 37 a 43 (`gtag.js`) | conversão `AW-18428282557/HXZuCNGd0e0cEL2NpdNE` (nome "LEAD - Médico/Dentista/Dono"), com `transaction_id` único por lead para deduplicar |
| GA4 | nenhum direto | | se existir, está dentro do container GTM |
| Analytics próprio | Supabase `gmycqvvvglexbtbqkjzi` | linhas 1299 a 1345 | `page_events` (path, referrer, source, utm, device, visitor_id, is_bot) em cada acesso; `form_events` no funil do form |

Tudo isso está na função `fireConversion()` (linhas 872 a 878). A conversão só dispara se pelo menos um destino recebeu o lead, e nunca para "Outro".

Detecção de origem quando não há `utm_source`: referrer com facebook/instagram → `meta`; google → `google`; bing → `bing`; outro domínio → o hostname; sem referrer → `direto`. `visitor_id` fica em `localStorage._ev_vid`.

Painel (`painel.html`): senha gateada por RPC no Supabase (`analytics_stats`, `leads_list`, `form_funnel`, todas recebem `p_token`). Token fica em `sessionStorage.ev_token`.

Para o odonto: criar container GTM, pixel, conta/conversão do Google Ads e, se quiser separar o painel, um projeto Supabase novo (ou pelo menos uma tabela ou uma coluna `origem` diferente).

---

## 9. Dependências e integrações

Externas em runtime (todas via CDN ou API, nada instalado):

| Dependência | URL | Uso |
|---|---|---|
| Google Fonts | `fonts.googleapis.com` / `fonts.gstatic.com` | Inter 400 a 800 |
| Google Tag Manager | `googletagmanager.com/gtm.js` | container |
| Meta Pixel | `connect.facebook.net/en_US/fbevents.js` | pixel |
| Google Ads | `googletagmanager.com/gtag/js` | conversão |
| YouTube | `youtube-nocookie.com/embed/` e `i.ytimg.com` | VSL e thumbnail |
| Evoluze Chat | `evoluzechat.com.br/webhook/lead` e `/agenda/public/12` | webhook de lead e agenda pública |
| Supabase REST | `gmycqvvvglexbtbqkjzi.supabase.co/rest/v1/` | leads, analytics, painel |
| Formspree | `formspree.io/f/<id>` | e-mail (desligado) |
| Unsplash | `images.unsplash.com` | só no script `baixar-imagens.sh`; a imagem baixada não é usada |

Sem jQuery, sem framework CSS, sem biblioteca de ícones, sem widget de chat, sem plugin de agendamento embutido (a agenda é um link externo). Só em CI: Playwright 1.60 (screenshots) e a action de FTP.

---

## 10. O que quebra se copiar direto

Lista de tudo que está amarrado ao site médico, com a linha em `public/index.html` salvo indicação.

**Domínio e SEO**
- `og:url`, `og:image`, `twitter:image` e `canonical` com `https://evoluzemarketingmedico.com.br/` (linhas 14, 15, 19, 20).
- `public/CNAME` = `evoluzemarketingmedico.com.br`. Se o GitHub Pages for habilitado no repo odonto, vai tentar reivindicar esse domínio. Trocar ou apagar.
- Title, description, OG e a arte `og-evoluze.png` têm copy médica.

**Rastreamento (IDs compartilhados, misturam dados)**
- `GTM-NLB9HGKB` (linhas 26 e 434).
- Pixel `1596531545529516` (linhas 31 e 34).
- `AW-18428282557` (linhas 37 e 42) e o label `HXZuCNGd0e0cEL2NpdNE` (linha 876).

**Supabase (mesmo projeto, mesmas tabelas)**
- URL e chave anon aparecem **três vezes**: `index.html` linhas 1255 a 1256 e 1302 a 1303, `painel.html` linhas 125 a 126. Se manter o mesmo projeto, os leads e acessos do odonto caem no mesmo painel do médico.
- `origem:'site-performance'` (linhas 1222, 1243 e 1264): é a etiqueta que o Evoluze Chat e o painel usam para saber de onde veio o lead. Trocar para algo como `site-odonto`.

**Evoluze Chat**
- `chatWebhookToken` (linha 864) é um Bearer token real, exposto no HTML público. Gerar outro para o odonto se quiser separar.
- `linkAgenda` aponta para a agenda `/agenda/public/12` (linha 865).

**Deploy**
- `deploy-hostinger.yml` e `pages.yml` só rodam na branch `claude/exciting-maxwell-dlctrc`. No repo odonto, mudar para a branch de produção.
- Segredos `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD` precisam ser criados no repo novo, com a conta FTP do novo domínio.
- `server-dir: public_html/` assume a raiz da conta FTP; se a conta já abrir em `public_html`, usar `./`.

**Placeholders que nunca foram preenchidos**
- `CONFIG.whatsapp = "[WHATSAPP]"`, `formspreeId = "[FORMSPREE_ID]"`, `emailLeads = "[EMAIL_LEADS]"` (linhas 845 a 847). O código trata `[` como "não configurado", então não quebra, mas o Formspree fica mudo.
- `privacidade.html`: "Última atualização: [MÊS/ANO]".

**Referências quebradas**
- Fotos `depo-cintia.jpg`, `depo-livia.jpg`, `depo-bruna.jpg` não existem (cai no avatar com iniciais, sem erro visível).

**Copy amarrada ao nicho médico (além das seções do item 5)**
- `NOME_METODO = "Método Convênio Zero"` (linha 884).
- `CONFIG.faixaInvestimento` (linha 848) com o valor da oferta.
- `CONFIG.clinicasAtendidas = "+15 clientes atendidos"` (linha 849).
- Opções do formulário (`AREA_OPCOES`, linhas 970 a 974, e `STEPS`, 975 a 991) e a regra de "quente" para Implantodontia/Harmonização (linha 1192).
- `_subject` do Formspree "Novo lead — Evoluze (Análise gratuita)" (linha 1244).
- Texto da tela de desqualificação e da política de privacidade citam "clínica ou consultório".
- Logo do CFM e o texto "CFM e conselhos relacionados".
- `painel.html`: rótulos de formação e a mesma régua de classificação (se mudar no site, mudar lá).

**Não quebra, mas confunde**
- `README.md` do SITE-LOCAL descreve a versão Baixada Santista.
- 11 imagens órfãs em `assets/img` (item 4a), 1,1 MB delas só no `ethera-labs.png`.
