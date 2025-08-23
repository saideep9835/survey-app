import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from "./App";
import { SurveyPage } from "./pages/SurveyPage";
import { ReviewPage } from "./pages/ReviewPage";

const router = createBrowserRouter([
    {path: '/', element: <App />, children:[
        {index: true, element: <SurveyPage/>},
        {path:'review/:id', element: <ReviewPage/>}
    ]}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)