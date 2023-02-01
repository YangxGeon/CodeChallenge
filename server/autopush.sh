#!/bin/sh
cd codefile/$1_pipeline
git add .
git commit -m "auto push for code file"
git push