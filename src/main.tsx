import React, { Children } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import QuizResult from "./layouts/QuizResult/QuizResult.jsx";
import QuizQuestion from "./layouts/QuizQuestion/QuizQuestion.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <QuizQuestion />,
      },
      {
        path: "/result",
        element: <QuizResult />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
