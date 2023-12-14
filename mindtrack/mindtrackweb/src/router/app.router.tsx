import RegisterPage from "../features/user/auth/register/register.page";
import LoginPage from "../features/user/auth/login/login.page";
import HomePage from "../features/user/home.page"
import { createBrowserRouter, Navigate, Route } from 'react-router-dom';
import React from "react";
import NotePage from "../features/user/note/note.page";
import LabelPage from "../features/user/label/label.page";
import ReminderPage from "../features/user/reminder/reminder.page";
import TrashPage from "../features/user/trash/trash.page";
import TracklistPage from "../features/user/tracklist/tracklist.page";
import NotFoundPage from "../features/user/notFound/notFound.page";

const BASE_ROUTES = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/home/:userId',
        element: <HomePage />,
    },
    {
        path: '/note/:userId',
        element: <NotePage />,
    }
    ,
    {
        path: '/label/:userId',
        element: <LabelPage />,
    },
    {
        path: '/reminder/:userId',
        element: <ReminderPage />,
    }
    ,
    {
        path: '/trash/:userId',
        element: <TrashPage />,
    }
    ,
    {
        path: '/tracklist/:userId',
        element: <TracklistPage />,
    }
    ,
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

const AppRouter = createBrowserRouter([...BASE_ROUTES]);

export default AppRouter;