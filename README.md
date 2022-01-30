# Magic Boost

## 1. Introduction

What this project is about

## 2. Instalation

How to configure your local environment

## 3. Development Workflow

dev > staging > prod

1. Developer branches out against develop
1. Developer makes changes needed to new feature. May include DB changes
1. Developer opens a PR against develop
1. PR review <> feedback happens
1. On merge to develop 
    1. Vercel publishes a new version on staging.magicboost.net
    1. Vercel triggers all migrations unto magical_creatures_staging

After multiple changes land on develop (e.g. a sprint ends, or a new release is created)

1. A new PR is opened from develop to master
1. Bump current version number
1. The changelog is updated
1. On merge 
    1. Vercel publishes a new version on magicboost.net
    1. Vercel triggers all migrations unto magical_creatures