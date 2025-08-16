# Frequently Asked Questions (FAQ)

Here are answers to common questions about the Awesome Kartikey Gym Exercise Finder project.

**1. Where does the exercise and video data come from?**

*   The exercise data (names, body parts, targets, equipment, GIFs) is sourced from the **ExerciseDB API** available on RapidAPI.
*   The related exercise videos are fetched from the **YouTube Search and Download API**, also available on RapidAPI, by searching for videos related to the specific exercise name.

**2. How do I get and configure the API keys needed to run the project?**

*   You need API keys from RapidAPI to use the ExerciseDB and YouTube Search APIs.
*   **Steps:**
    1.  Create a free account on [RapidAPI](https://rapidapi.com/).
    2.  Navigate to the API pages:
        *   [ExerciseDB API](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
        *   [YouTube Search and Download API](https://rapidapi.com/h0p3rwe/api/youtube-search-and-download)
    3.  Subscribe to the **Basic (Free)** plan for both APIs.
    4.  You'll find your `X-RapidAPI-Key` on your RapidAPI dashboard or on the API's endpoint page. You use the *same* key for both APIs associated with your account.
*   **Configuration:**
    *   The project currently has API keys **hardcoded** in `src/utils/fetchData.js`. This is **insecure**.
    *   **Best Practice:** Store your key in a `.env` file at the project root:
        ```env
        # .env file
        REACT_APP_RAPID_API_KEY=YOUR_ACTUAL_RAPIDAPI_KEY_HERE
        ```
    *   Then, update `src/utils/fetchData.js` to read this environment variable (see Setup Instructions in `README.md`). Remember to add `.env` to your `.gitignore` file.

**3. Why are the API keys currently hardcoded? Is this safe?**

*   The keys are hardcoded likely for simplicity during initial development or demonstration.
*   **No, it is absolutely NOT safe.** Hardcoding API keys, especially in a public repository, exposes them. Malicious users could steal your keys and misuse them, potentially incurring costs on your RapidAPI account if you exceed free tier limits.
*   **Always** use environment variables or a secure secrets management solution for API keys and other sensitive credentials.

**4. How is the application styled?**

*   The primary UI library is **Material UI (MUI)**. Components like `Box`, `Stack`, `Typography`, `Button`, `TextField`, and `Pagination` are used extensively.
*   Styling is applied using:
    *   The `sx` prop provided by MUI for inline styles and theme access.
    *   Custom CSS rules defined in `src/App.css` for global styles and specific component overrides (e.g., `.exercise-card`, `.hero-banner-img`).

**5. How can I add a new feature, like saving favorite exercises?**

*   **Frontend:**
    1.  Decide where to store favorites (e.g., `localStorage` for simple persistence, or requires a backend for user accounts).
    2.  Add state management logic (could use React Context or a state library if complexity grows) to track favorite exercises.
    3.  Create new UI components (e.g., a "Save" button on `ExerciseCard` or `Detail`, a dedicated "Favorites" page).
    4.  Update routing in `src/App.js` if adding a new page.
    5.  Modify existing components to display favorite status or interact with the favorites logic.
*   **Backend (Optional but Recommended for User Accounts):**
    1.  Set up a simple backend (e.g., Node.js/Express, Python/Flask) with a database (e.g., MongoDB, PostgreSQL).
    2.  Create API endpoints for user registration/login and managing favorites (add, remove, list).
    3.  Update the frontend to interact with these new backend endpoints.

**6. How do I deploy this application?**

*   Since it's a standard Create React App project, you can build static files:
    ```bash
    npm run build
    ```
*   This creates an optimized production build in the `build/` folder.
*   You can deploy the contents of the `build/` folder to any static web hosting provider, such as:
    *   Netlify (as used in the provided live link)
    *   Vercel
    *   GitHub Pages
    *   AWS S3 / CloudFront
*   **Important:** Ensure your environment variables (especially the `REACT_APP_RAPID_API_KEY`) are correctly configured in your hosting provider's build/deployment settings if you are using the recommended `.env` approach. Do *not* commit your `.env` file.

**7. What state management approach is used?**

*   The project primarily uses React's built-in **`useState` hook** for managing component-level state.
*   State is passed down from parent components to child components via **props** (prop drilling). For example, the `Home` component manages `exercises` and `bodyPart` state and passes them down to `SearchExercises` and `Exercises`.
*   For this application's current complexity, this approach is sufficient. For larger applications, consider using the **React Context API** or a dedicated state management library like **Redux** or **Zustand** to avoid excessive prop drilling and make state management more centralized.