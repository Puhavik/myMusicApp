# MyMusicApp

A React Native (Expo) mobile app for discovering music artists and their releases using the **MusicBrainz API** and **Cover Art Archive**.

## Overview

MyMusicApp allows users to:
- Search for bands and musicians.
- View artist details and release groups (albums/singles/etc.).
- See cover art (when available).
- Save favorite artists in a local in-memory favorites list during the current app session.

The project is built as a multi-screen mobile app with React Navigation and a shared context for favorites management.

## Features

- **Artist Search**
  - Search by artist name via MusicBrainz.
- **Search Results Screen**
  - Displays a list of matching artists.
- **Artist Details Screen**
  - Loads full artist details by MBID.
  - Shows release groups, release year, and primary type.
  - Fetches cover art per release group from Cover Art Archive.
- **Favorites Management**
  - Add artist to favorites from the details screen.
  - Remove artists from favorites on the home screen.
- **Navigation**
  - Stack-based navigation between Home, Search Results, and Artist Details.

## Tech Stack

- **React Native** + **Expo**
- **React Navigation** (`@react-navigation/native`, `@react-navigation/stack`)
- **Axios** for HTTP requests
- **MusicBrainz API** for artist and release-group data
- **Cover Art Archive API** for album artwork

## Project Structure

```text
.
├── App.js
├── api/
│   └── musicBrainz.js
├── screens/
│   ├── ArtistDetailsScreen.js
│   ├── FavoriteArtistsContext.js
│   ├── HomeScreen.js
│   └── SearchResultsScreen.js
├── assets/
├── app.json
├── babel.config.js
└── package.json
```

## Getting Started

### Prerequisites

- **Node.js** 16+ (recommended for Expo SDK 46 compatibility)
- **npm**
- **Expo Go** app on your mobile device (optional for device testing)

### Installation

```bash
npm install
```

### Run the App

```bash
npm start
```

Then choose one of the Expo targets:
- `a` for Android emulator/device
- `i` for iOS simulator (macOS)
- `w` for web

You can also run directly with:

```bash
npm run android
npm run ios
npm run web
```

## API Notes

- `searchArtist(name)` queries MusicBrainz artists endpoint.
- `getArtist(mbid)` loads artist details including release groups.
- For each release group, the app attempts to fetch cover art from Cover Art Archive.
- If no image is available, the app gracefully shows the release item without artwork.

## Known Limitations

- Favorites are stored only in React state and reset when the app restarts.
- There is no offline cache.
- Error handling is minimal for network failures and API rate limiting.
- Some UI texts are currently in German.

## Future Improvements

- Persist favorites with AsyncStorage.
- Add robust loading/error states and retry actions.
- Improve localization (EN/DE language switch).
- Add filtering/sorting for release groups.
- Add unit/integration tests.

## Author

- **Vikentiy Pukhaev**
- Student ID: **01547637**

## License

This project is intended for educational use.
