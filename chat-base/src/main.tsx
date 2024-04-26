import React from "react";
import ReactDOM from "react-dom/client";
import ConversationThread from "./routes/ConversationThread.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllConversationsPage from "./routes/AllConversationsPage.tsx";
import App from "./routes/App.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AllConversationsPage />,
      },
      {
        // index: true,
        path: "conversation",
        element: <ConversationThread />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
