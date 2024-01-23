# Fakebook personal project

Welcome to Fakebook - a fun and lighthearted take on a popular social networking site.

## Table of Contents

- [Existing Functionality](#existing-functionality)
- [Backlogged Functionality](#backlogged-functionality)
- [Technologies Used](#technologies-used)
- [Fakebook API](#fakebook-api)
- [Getting Started](#getting-started)

## Existing Functionality

- [x] User signup and login
- [x] Create posts in the timeline with text and images/gifs
- [x] All posts visible on the timline, user-specific posts viewed in user profile
- [x] Like posts
- [x] Comment on post
- [x] Expand posts to view full comment history and use more screen space
- [x] Limit API call to 10 posts on timeline (i.e., infinite scrolling)
- [x] Users have profile page
- [x] Ability to add/update a profile picture
- [x] Friends page that shows friend requests or existing friends
- [x] Send friend requests to other users
- [x] Accept friend requests
- [x] Responsive to both mobile and desktop screen sizes

## Backlogged Functionality

- [ ] Notifications of friend requests
- [ ] Ability to search for other Fakebook users (Currently all users can see any existing post on the timeline, not just their friends)
- [ ] Limit timeline posts to only posts created by existing friends

## Technologies Used

- HTML, CSS, TypeScript
- React
- VITE
- Material UI

## Fakebook API

This client-side application relies on the [Fakebook API](https://github.com/fjuren/fakebook-api) for server-side functionalities. Make sure to set up and run the API server before using this client. Note that I'm using the same database for both development and production environments to simplify this personal project a bit.

## Getting Started

1. Clone the repository: `git clone https://github.com/fjuren/fakebook-frontend.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open your browser and navigate to `http://localhost:5173`
