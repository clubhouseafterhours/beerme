![build](https://travis-ci.org/clubhouseafterhours/beerme.svg?branch=master)

# BeerMe
A Slack bot that tracks 🍺(kudos) you give to other members of your workspace 🕺🏻💃🏻

## Getting Started
These instructions will get you a copy of the project up and running on your local machine.

## Prerequisites
You'll need the following to run the project:

```
node v9.8.0 or higher
npm v5.6.0 or higher
mongodb
```

- A Slack API token

*TODO: give instructions on adding your bot to your workspace*

### Setup

- Clone the project then run `npm i`

- Create a local data store for the mongodb database `mkdir -p /data/db`

- Create .env file and add the following:
  - `SLACK_BOT_TOKEN='put your token here`
  - `DATABASE=mongodb://localhost/database_name`

- Create .env.production.local to use production db with the following:
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `DATABASE`

## Running

To run the project, run `npm start`. You can test if it's working by sending a message with the :beer: emoji in a public channel and tag someone.

Example: `🍺 @jprevite for being awesome`
