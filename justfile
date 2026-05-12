default: serve

serve:
    cd site && hugo server -D

publish:
    cd site && HUGO_ENV=production hugo --gc --minify

preview:
    cd site && HUGO_ENV=production hugo --gc --minify -D
