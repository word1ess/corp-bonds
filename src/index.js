import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import ErrorPage from "./Components/Common/Error";
import Bond from "./Components/Bond/Bond";
import Screener from "./Components/Screener/Screener";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "bond/:isinUrl",
        element: <Bond />,
        loader: async ({ params }) => {
          // Здесь вы можете использовать bondId для загрузки данных, если это необходимо
          const { isinUrl } = params;
          return isinUrl; // Возвращаем bondId, если нужно
        },
      },
      {
        path: "screener/",
        element: <Screener />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
