default: check

dev:
  cd site && hugo server -D

check: build

build:
    cd site && HUGO_ENV=production hugo --gc --minify --panicOnWarning --printPathWarnings -b https://iaingalloway.com

publish:
    cd site && HUGO_ENV=production hugo --gc --minify

preview:
    cd site && HUGO_ENV=production hugo --gc --minify -D

clean:
    rm -rf -- site/public
