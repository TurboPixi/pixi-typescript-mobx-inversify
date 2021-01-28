#!/bin/bash
rm -rf lib
webpack --config build/webpack.config.js
mv lib/src/* lib/
rm -rf lib/src
