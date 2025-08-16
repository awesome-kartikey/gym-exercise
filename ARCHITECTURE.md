# Application Architecture

This document outlines the architecture of the Awesome Kartikey Gym Exercise Finder application.

## 1. Overview

The application is a **Single Page Application (SPA)** built using **React**. It follows a component-based architecture typical of React applications created with Create React App (CRA). The frontend fetches data dynamically from external APIs (ExerciseDB and YouTube Search via RapidAPI) and renders the UI on the client-side.

## 2. Technology Stack

- **Core Library:** React v18
- **Routing:** React Router DOM v6
- **UI Components:** Material UI (MUI) v5
- **API Client:** Native `fetch` API (within `src/utils/fetchData.js`)
- **External APIs:** ExerciseDB, YouTube Search & Download (via RapidAPI)
- **Styling:** Material UI (`sx` prop), Custom CSS (`src/App.css`)
- **State Management:** React `useState` Hook, Prop Drilling
- **Development/Build:** Create React App (`react-scripts`)

## 3. Folder Structure

The project uses a standard CRA structure, organized as follows:

```
gym-exercise/
├── public/               # Static assets, index.html template
│   ├── index.html
│   └── ...
├── src/                  # Main application source code
│   ├── assets/           # Static assets (images, icons) used by components
│   │   ├── icons/
│   │   └── images/
│   ├── components/       # Reusable UI components
│   │   ├── BodyPart.js
│   │   ├── Detail.js
│   │   ├── ExerciseCard.js
│   │   ├── Exercises.js
│   │   ├── ExerciseVideos.js
│   │   ├── Footer.js
│   │   ├── HeroBanner.js
│   │   ├── HorizontalScrollbar.js
│   │   ├── Loader.js
│   │   ├── Navbar.js
│   │   ├── SearchExercises.js
│   │   └── SimilarExercises.js
│   ├── pages/            # Page-level components holding multiple components
│   │   ├── ExerciseDetail.js
│   │   └── Home.js
│   ├── utils/            # Utility functions, API interaction logic
│   │   └── fetchData.js
│   ├── App.css           # Global and component-specific styles
│   ├── App.js            # Root component, routing setup
│   ├── index.js          # Application entry point
│   └── ...
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation (this file)
```

- **`public/`**: Contains the `index.html` shell, manifest files, and other static assets not processed by Webpack.
- **`src/`**: Contains the core React application code.
- **`src/assets/`**: Stores images and icons used within the components.
- **`src/components/`**: Houses reusable UI pieces. These components are generally focused on presentation or specific functionality (e.g., `ExerciseCard`, `Loader`).
- **`src/pages/`**: Contains components that represent distinct application pages or views (e.g., `Home`, `ExerciseDetail`). These often compose multiple smaller components.
- **`src/utils/`**: Includes helper functions, particularly the `fetchData` utility for interacting with external APIs.
- **`App.js`**: The main application component, responsible for setting up the overall layout (Navbar, Footer) and defining routes using `react-router-dom`.
- **`index.js`**: The entry point that renders the `App` component into the DOM, wrapped with `BrowserRouter`.

## 4. Major Components & Responsibilities

- **`App.js`**: Sets up routing using `<Routes>` and `<Route>`. Renders `Navbar`, `Footer`, and the current page component (`Home` or `ExerciseDetail`).
- **`Navbar.js`**: Displays the site logo and navigation links (Home, Exercises anchor).
- **`Footer.js`**: Displays closing remarks and attribution.
- **`Home.js` (Page):**
  - Acts as the main container for the landing page.
  - Manages the core state: `exercises` (list of exercises to display) and `bodyPart` (currently selected filter).
  - Renders `HeroBanner`, `SearchExercises`, and `Exercises`.
  - Passes state and state-setting functions down as props.
- **`ExerciseDetail.js` (Page):**
  - Acts as the container for the exercise detail view.
  - Fetches detailed data for a specific exercise using the `id` from the URL (`useParams`).
  - Fetches related videos and similar exercises based on the details.
  - Manages state for the fetched data (`exerciseDetail`, `exerciseVideos`, etc.).
  - Renders `Detail`, `ExerciseVideos`, and `SimilarExercises`.
- **`SearchExercises.js`**:
  - Provides the search input field and button.
  - Fetches the list of body parts for the category filter.
  - Handles search logic by filtering fetched exercises based on user input.
  - Renders the `HorizontalScrollbar` for body parts.
  - Updates the `exercises` state in the parent (`Home`) component upon search.
- **`Exercises.js`**:
  - Displays the list of `ExerciseCard` components based on the `exercises` prop received from `Home`.
  - Handles pagination using MUI's `Pagination` component.
  - Manages the `currentPage` state for pagination.
  - Fetches exercises based on the `bodyPart` prop if it changes.
- **`ExerciseCard.js`**: A presentation component displaying summary info for one exercise and linking to its `ExerciseDetail` page.
- **`Detail.js`**: Displays the main details (GIF, name, description, target/equipment icons) for a single exercise on the `ExerciseDetail` page.
- **`ExerciseVideos.js`**: Displays YouTube video links related to the exercise.
- **`SimilarExercises.js`**: Displays two `HorizontalScrollbar`s containing exercises similar by target muscle or equipment.
- **`HorizontalScrollbar.js`**: A reusable component using `react-horizontal-scrolling-menu` to display items (like body parts or exercise cards) horizontally with navigation arrows.
- **`BodyPart.js`**: Represents a single clickable body part category within the `HorizontalScrollbar`.
- **`Loader.js`**: A simple component displaying a loading spinner.
- **`fetchData.js` (Utility):**
  - Contains API configurations (headers, keys - **currently insecurely hardcoded**).
  - Provides a reusable async function (`fetchData`) to make GET requests to specified URLs with given options.

## 5. Data Flow

1.  **Initial Load (Home Page):**

    - `index.js` renders `App`.
    - `App.js` renders `Navbar`, `Footer`, and `Home` (default route `/`).
    - `Home` renders `HeroBanner`, `SearchExercises`, and `Exercises`.
    - `SearchExercises` fetches the list of body parts (`exercises/bodyPartList`) via `fetchData` and displays them in `HorizontalScrollbar`.
    - `Exercises` (initially with `bodyPart='all'`) triggers a fetch for all exercises (`/exercises`) via `fetchData`. `Loader` shows until data arrives.
    - Fetched exercises are stored in `Home`'s state and passed to `Exercises`.
    - `Exercises` renders the first page of `ExerciseCard`s.

2.  **Searching:**

    - User types in `SearchExercises` input field.
    - User clicks "Search".
    - `handleSearch` in `SearchExercises` fetches _all_ exercises (if not already cached, though this implementation fetches them again).
    - It filters the `exercisesData` locally based on the search term.
    - Calls `setExercises` (passed from `Home`) to update the state.
    - `Home` re-renders, passing the new `exercises` list to the `Exercises` component.
    - `Exercises` displays the filtered results.

3.  **Selecting Body Part:**

    - User clicks a `BodyPart` card in `SearchExercises`.
    - `onClick` in `BodyPart` calls `setBodyPart` (passed from `Home`).
    - `Home` state updates. The `useEffect` hook in `Exercises` detects the change in the `bodyPart` prop.
    - `Exercises` fetches exercises specific to that body part (`exercises/bodyPart/{bodyPart}`) via `fetchData`. `Loader` shows.
    - Fetched data updates the state in `Home` via `setExercises`.
    - `Exercises` displays the new list of exercises.

4.  **Viewing Exercise Details:**
    - User clicks an `ExerciseCard`.
    - React Router navigates to `/exercise/:id`.
    - `App.js` renders the `ExerciseDetail` component.
    - `ExerciseDetail` uses `useParams` to get the `id`.
    - Its `useEffect` hook triggers multiple fetches via `fetchData`:
      - Exercise details (`exercises/exercise/{id}`)
      - Related YouTube videos (`youtube/search?query={name}`)
      - Similar target muscle exercises (`exercises/target/{target}`)
      - Similar equipment exercises (`exercises/equipment/{equipment}`)
    - `Loader` components might show within `ExerciseVideos` and `SimilarExercises` until their respective data arrives.
    - State in `ExerciseDetail` updates as data arrives.
    - `Detail`, `ExerciseVideos`, and `SimilarExercises` components render the fetched information.

## 6. Key Design Decisions

- **Component-Based Structure:** Leverages React's core strength for modularity and reusability.
- **Client-Side Rendering (CSR):** Standard SPA approach; UI is rendered in the browser.
- **External APIs:** Offloads data management to third-party services (ExerciseDB, YouTube), simplifying the application's backend requirements (none needed currently).
- **Utility for Fetching:** Centralizes API call logic in `fetchData.js`, though error handling and caching could be improved.
- **Prop Drilling for State:** Simple state management suitable for the current scale, but could become cumbersome if complexity increases.
- **Material UI:** Accelerates UI development using a pre-built component library.
- **Insecure API Key Handling:** **(Negative Decision / Area for Improvement)** - Hardcoding API keys in `fetchData.js` is a significant security flaw that needs immediate refactoring using environment variables.
