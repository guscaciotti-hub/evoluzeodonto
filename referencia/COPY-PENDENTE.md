# Copy odonto: o que já entrou e o que ainda falta

Referência: `public/index.html`. A copy recebida foi aplicada slot a slot, sem mudar estrutura. Este arquivo lista o que ficou fora dela.

## Aplicado (copy recebida)

| Slot | Onde |
|---|---|
| Tagline "Dentista não vende. Dentista se posiciona." | `#funil`, H2 |
| Hero: headline, subheadline, CTA | `section.hero` (a palavra em teal é "convênio") |
| CTA "Quero minha agenda de particular" | hero, VSL, CTA final e sticky mobile (os 4 botões eram idênticos no original) |
| Legenda do vídeo "Dra. Eveline Leite, ortodontista — cliente Evoluze" | `#vsl`, abaixo do player |
| Bloco de dor | `#dor`, seção nova logo abaixo do vídeo, usando o componente `.objection` já existente. Para estrutura 100% idêntica, apagar a `<section id="dor">` inteira |
| Método Convênio Zero: texto | `#metodo`, `.metodo-intro`. A arte "MÉTODO / CONVÊNIO ZERO" já equivale a "O Método Convênio Zero" |
| Serviços: 6 cards | `#servicos`, na ordem enviada |
| Depoimentos: headline "Quem já saiu da lógica do convênio" | `#prova`. Áudios intocados |
| Formulário: 4 opções de formação | `STEPS[0]` |
| Pós-formulário: headline e texto da agenda | `doneAgendaHTML()` |

## Trocas mecânicas que eu fiz (só "médico" → "odontológico", sem reescrever)

Revisar ou mandar reescrever:

| Trecho | Como ficou |
|---|---|
| `<title>` | Evoluze — Marketing Odontológico para Clínicas \| Paciente Particular sem Depender de Convênio |
| `meta description` | Estruturamos a aquisição de paciente particular para clínicas odontológicas. Sem depender de convênio, sem desconto, sem promoção — operado com rigor, do anúncio à cadeira. |
| `og:title` / `og:description` | Evoluze — Marketing Odontológico para Clínicas / Sua agenda cheia não significa nada se o convênio leva a maior parte. Aquisição de paciente particular para clínicas odontológicas. |
| Eyebrow do hero | Assessoria especializada em marketing odontológico |
| Linha de nicho (hero e CTA final) | Assessoria exclusiva para clínicas odontológicas |
| Cargo do Gustavo | Especialista em Marketing Odontológico |
| Seção do conselho | "(CFO e conselhos relacionados)". A imagem ainda é o logo do CFM |
| Rodapé | Evoluze — Assessoria especializada em marketing odontológico para clínicas e consultórios. |
| Tela de desqualificação ("Outro") | "atende exclusivamente dentistas e clínicas odontológicas" |
| Pergunta da etapa 2 do form | "Qual a principal área da clínica?" (a lista de áreas é a que já existia para odonto: Implantodontia, Ortodontia, Odontologia estética, Harmonização orofacial, Reabilitação oral / prótese, Clínica geral, Outra especialidade) |

## Slots que a copy não cobriu (ainda com o texto do site médico)

Nenhum diz "médico" no texto visível, mas foram escritos pro médico:

1. **VSL, cabeçalho**: eyebrow "Assista antes de qualquer coisa" e H2 "Como construir um fluxo previsível de pacientes particulares no seu consultório".
2. **3 dores (cards)**: "Três coisas que acontecem quando você para de depender da sorte" + Previsibilidade / O paciente certo / Um novo patamar.
3. **Método, pílula e 4 pilares**: "Sistema de captação, conversão e escala de pacientes particulares." + Captação / Conversão / Acompanhamento / Escala + ponte "jornada do paciente".
4. **Funil (3 etapas)**: sub, Descoberta / Consideração / Decisão, fechamento e nota. Só a tagline mudou.
5. **Depoimentos, intro**: "O que mais importa pra nós é o resultado real de quem confia no nosso trabalho. Ouça abaixo." e as identificações dos cards ("Cliente Evoluze", "Clínica Adissi").
6. **Clientes**: eyebrow "Médicos e clínicas de referência", H2, sub, e as 7 fotos + 7 logos (depende das imagens odonto).
7. **Estudo de caso**: Clínica Adissi inteira (depende do case odonto).
8. **Gustavo, bio**.
9. **Diferencial (4 checks)**: "A maioria entrega lead. Nós entregamos paciente na cadeira." + 4 linhas.
10. **Serviços, sub e nota**: "Tudo o que a sua clínica ou consultório precisa..." e "O que entra no seu plano é definido na reunião de diagnóstico...".
11. **Conselho**: H2 "Marketing dentro das regras do seu conselho" + parágrafo.
12. **Objeção**: "Você cuida dos pacientes. Da máquina de aquisição, cuidamos nós." + parágrafo.
13. **CTA final**: H2 "Este é o momento de tirar a sua agenda da dependência da sorte." + lead + escassez.
14. **Formulário**: perguntas 3 a 9, tela "morno" ("Recebemos suas respostas!") e tela de erro.
15. **Hero, pílulas de credencial**: Google Ads Certified · Meta Ads · +15 clientes atendidos · Operação 100% pessoal. E o microtrust "Análise gratuita · cada conta é operada pessoalmente" (o CTA não fala mais em análise).
16. **privacidade.html**: texto genérico de saúde, cita "clínica ou consultório".

## Pendências que não são copy

- **Vídeo da Eveline**: `CONFIG.vslEmbed` está vazio (a página mostra "Vídeo em breve"). Colar o embed do YouTube ali.
- **Depoimentos**: a copy cita Valquíria, Lilian, Vagner e Yuri, mas os áudios que existem no site são Dra. Cíntia, Lívia (Adissi), Bruna (Adissi) e Dra. Eveline (3 áudios). Se os quatro novos existirem, mandar os MP3 e as fotos.
- **Imagens**: logo do CFO, fotos e logos de clientes odonto, case odonto, `og-evoluze.png` com a copy nova.
- **Webhook do Evoluze Chat**: a opção "Sou dentista e trabalho em clínica de terceiros" agora envia `formacao: "dentista_terceiros"` (as outras seguem `medico_dentista` e `dono_clinica`). Conferir se o chatbot trata esse valor novo. O painel já mostra o rótulo "Dentista (clínica de terceiros)".
- Tudo do item 10 do `DOSSIE-SITE-MEDICO.md` (domínio, IDs de rastreamento, Supabase, token, branch do deploy).
