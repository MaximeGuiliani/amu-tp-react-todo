// src/app.js

import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoDetailsPage from "./pages/TodoDetailsPage";
import TodoListPage from "./pages/TodoListPage";



const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route
                path="/:id/details"
                element={<TodoDetailsPage />}
            />
            <Route
                path="/"
                element={<TodoListPage />}
            />
        </Routes>
    </BrowserRouter>
}

const root = createRoot(document.querySelector("main"));
root.render(<App />);

