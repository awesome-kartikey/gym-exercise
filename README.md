# Awesome Kartikey Gym Exercise Finder

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen)](https://kk-gold-gym.netlify.app/)

A React-based web application for finding and exploring gym exercises. Users can search for exercises, browse by body part, view detailed exercise information including GIFs and instructions, and find related YouTube videos.

## Description

This application provides a comprehensive database of gym exercises fetched from the ExerciseDB API via RapidAPI. It allows users to easily discover exercises based on body parts, target muscles, or required equipment. Detailed views provide visual guides (GIFs) and instructions, along with related exercise videos from YouTube and suggestions for similar exercises.

## Features

- **Exercise Search:** Search exercises by name, target muscle, equipment, or body part.
- **Browse by Body Part:** Filter exercises using a horizontal scrolling menu of body part categories.
- **Detailed Exercise View:** View comprehensive details for each exercise, including name, description, GIF animation, target muscle, and equipment used.
- **Related YouTube Videos:** Watch relevant exercise tutorial videos fetched from YouTube.
- **Similar Exercises:** Discover exercises targeting the same muscle group or using the same equipment.
- **Pagination:** Efficiently browse through large lists of exercises.
- **Responsive Design:** Adapts to different screen sizes for accessibility on various devices.
- **Loading States:** Visual indicators while data is being fetched.

## Tech Stack

- **Frontend:**
  - React (v18.2.0)
  - React Router DOM (v6.3.0) for routing
  - Material UI (MUI v5.6.1) for UI components and styling
  - `react-horizontal-scrolling-menu` for category/exercise carousels
  - `react-loader-spinner` for loading indicators
- **APIs:**
  - ExerciseDB (via RapidAPI) for exercise data
  - YouTube Search and Download (via RapidAPI) for related videos
- **Styling:**
  - CSS (`App.css`)
  - Material UI (`sx` prop, styled components implicitly via MUI)
- **Build Tool:**
  - Create React App (`react-scripts` v5.0.1)

## Setup Instructions

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd gym-exercise
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure API Keys:**

    - This project uses external APIs (ExerciseDB and YouTube Search) hosted on RapidAPI.
    - **IMPORTANT:** The API keys are currently **hardcoded** in `src/utils/fetchData.js`. This is **not secure** for production or public repositories.
    - **Recommended:**

      - Sign up for accounts on [RapidAPI](https://rapidapi.com/).
      - Subscribe to the [ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) and the [YouTube Search and Download API](https://rapidapi.com/h0p3rwe/api/youtube-search-and-download).
      - Create a `.env` file in the root of your project.
      - Add your keys to the `.env` file:
        ```env
        REACT_APP_RAPID_API_KEY=your_rapidapi_key
        ```
      - Modify `src/utils/fetchData.js` to use these environment variables:

        ```javascript
        // src/utils/fetchData.js

        export const exerciseOptions = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY, // Use environment variable
          },
        };

        export const youtubeOptions = {
          method: "GET",
          headers: {
            "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY, // Use environment variable
          },
        };

        // ... rest of the file
        ```

    - _Alternatively, for quick local testing only, you can replace the hardcoded keys in `src/utils/fetchData.js` directly with your own keys._

4.  **Start the development server:**
    ```bash
    npm start
    ```
    The application should now be running on `http://localhost:3000`.

## Usage

1.  **Landing Page:** The home page displays a hero banner and a search section.
2.  **Search:** Enter an exercise name, target muscle, equipment type, or body part into the search bar and click "Search".
3.  **Browse Categories:** Click on a body part category in the horizontal scrollbar below the search bar to filter exercises.
4.  **View Exercises:** Search results or category exercises are displayed as cards below the search/category section. Use the pagination controls at the bottom if necessary.
5.  **View Details:** Click on an exercise card to navigate to the detail page. Here you will find:
    - A GIF demonstrating the exercise.
    - Detailed information (target muscle, equipment).
    - Related YouTube video tutorials.
    - Lists of similar exercises based on target muscle and equipment.
