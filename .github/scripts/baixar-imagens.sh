#!/usr/bin/env bash
# Baixa a única imagem externa que o site usa (foto do hero) para dentro do
# repositório, eliminando dependência de CDN de terceiros. Logos de plataforma
# viraram texto e os cards de serviço viraram gradiente — nada mais a baixar.
set -euo pipefail

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
mkdir -p public/assets/img/fotos

curl -fsSL --retry 3 --retry-delay 2 -A "$UA" \
  -o public/assets/img/fotos/hero-dashboard.jpg \
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=90"

echo "ok: hero-dashboard.jpg ($(du -h public/assets/img/fotos/hero-dashboard.jpg | cut -f1))"
