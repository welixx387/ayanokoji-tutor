#!/usr/bin/env sh
# Собирает статическую версию сайта для GitHub Pages в папку _site.
# index.html хранится фрагментом (так его публикует Claude), поэтому здесь
# он оборачивается в полный HTML-документ с тем же базовым сбросом стилей.
set -e
cd "$(dirname "$0")/.."
rm -rf _site
mkdir -p _site
cp -r app.js iq.js data img _site/
{
  printf '%s' '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  printf '%s' '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>'
  cat index.html
  printf '%s\n' '</body></html>'
} > _site/index.html
touch _site/.nojekyll
echo "built _site"
