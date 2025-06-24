import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container!);
// This wraps the entire app in the GoogleOAuthProvider so that the GoogleOAuthContext is available to all components
// The clientId prop is required and should be the OAuth client ID from the Google Developer Console: we will try to
// leave a readme file with instructions on how to get this ID but if you cannot find that file, here is the tutorial
// that I followed to generate the ID and set up the OAuth API: https://www.youtube.com/watch?v=UUJfTsn6S_Y 
// (note that the API user interface has been updated since this video was made, and since I generated the ID)

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="180804076381-l4nak5fj61tdsr0s5bd0vjiqii8788h2.apps.googleusercontent.com">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
