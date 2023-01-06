#!/usr/bin/env bash
# exit on error
set -o errexit

npm install 
npm install typescript -D 
npx tsc 
npx prisma migrate