#!/bin/bash
docker run --rm -it -v $(pwd)/site:/src -p 1313:1313 --user $(id -u):$(id -g) klakegg/hugo:ext-ubuntu server -D