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
    - [x] User authentication
    - [ ] Chess notes and annotations
    - [ ] UI Overhaul

- Phase 2
    - [ ] Theory annotation
    - [ ] Opening/Endgame anlysis
    - [ ] Notes Sharing

- Phase 3
    - [ ] Collaborative notes
    - [ ] Chess studies
    - [ ] Notes sharing

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
- [x] Restructure chess router to include user auth 
- [x] Handle games query when users are logged in
- [x] Display games as a list on the user home page
- [x] Understand NextJS dynamic routing (for anlysis boards)
- [ ] Create an "Analysis" that connects a notebook, chess game, and notes
    - [ ] Create analysis types
        - [x] New Anlysis
        - [ ] From a previous game (using games table)
        - [x] From a FEN/PGN
            - [x] Verifies validity of FEN and PGN
    - [ ] Create notes section
        - [ ] Notes must use markdown to edit them
        - [ ] Notes view must have a chessboard and current notes

## What Needs to be done before Phase 1 release
- [x] Basic user auth and management
- [x] User search for Chess.com
- [ ] Analysis creation and editing
    - [x] Creating analysis
    - [ ] Editing analysis
    - [x] Deleting analysis
- [ ] API endpoints
    - [x] Creating a new analysis
    - [x] Signing up user with Clerk and Chess.com
    - [x] Downloading most recent games from Chess.com
    - [x] Fetchtching all analysis from user
    - [ ] Editing an analysis
    - [x] Deleting analysis 
        - [ ] Modal to confirm deletion
- [ ] UI overhaul 
- [ ] Refactoring (making sure names are consistent between front and backend)
- [ ] Testing 
    - [ ] Choosing a testing framework