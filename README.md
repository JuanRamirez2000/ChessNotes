# An app inspired by Kamryn's youtube video on how to improve at chess

## Description

Currently the app is supposed to showcase full stack knowledge by 
"hopefully" devloping something that will allow me to improve at 
my chess. This app will hopefully be iteratively added on by 
creating new features focused on analyzing games and theory


The app is made around the chess.com web-api, however support for LiChess is under consideration

## The phases

- Phase 1
    Revolved around getting the basic groundwork for an individual to annotate their previous games
    - User authentication
    - Chess notes and annotations

- Phase 2
    - Theory annotation
    - Opening/Endgame anlysis
    - Notes Sharing

- Phase 3
    - Collaborative notes
    - Chess studies
    - Notes sharing

## The Stack

This project currently works under the t3 stack. For specifics

### Frontend tech

- ReactJS + TypescriptJS
- TailwindCSS


### Backend tech

- PrismaDB
- TRPC
- Clerk (auth)

### Infra

- Vercel
- PlanetScale

## Current plans

- [x] Handle authentication
- [x] Understand database management
- [x] Understand how to query the database efficiently
- [x] Query the Chess.com webapi
- [ ] Restructure chess router to include user auth 
- [ ] Handle games query when users are logged in
- [ ] Display games as a list on the user home page
- [ ] Understand NextJS dynamic routing
- [ ] Create an "Analysis" that connects a notebook, chess game, and notes