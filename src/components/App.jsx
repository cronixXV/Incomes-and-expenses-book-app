import React, { useState, Profiler, lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeContext } from '../helpers/ThemeContext'

// import Main from './pages/Main'
import Error404 from './pages/Error404'
import CheckItem from './CheckItem'
import MainLayout from './layouts/MainLayout'
import CreateCheck, { createCheckAction } from './pages/CreateCheck'
import ErrorBoundary from './ErrorBoundary'
// import AllChecks from './pages/AllChecks'
import LoginForm from './pages/LoginForm'
import AuthLayout from './layouts/AuthLayout'
import Logout from './pages/Logout'
import PrivateRoute from './PrivateRoute'
// import Settings from './Settings'
import { profilerOnRenderCallback } from '../helpers/profiler'

const Main = lazy(() => import('./pages/Main'))
const AllChecks = lazy(() => import('./pages/AllChecks'))
const Settings = lazy(() => import('./Settings'))

const appThemes = ['light', 'dark']

const router1 = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          </ErrorBoundary>
        ),
      },
      {
        path: 'incomes',
        element: (
          <PrivateRoute>
            <AllChecks />
          </PrivateRoute>
        ),
      },
      {
        path: 'expenses',
        element: <AllChecks />,
      },
      {
        path: 'create',
        element: <CreateCheck />,
        action: createCheckAction,
      },
      {
        path: 'items/:itemId',
        element: <CheckItem />,
        errorElement: (
          <div>Не удалось загрузить чек для пользователя. Попробуйте позже</div>
        ),
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <LoginForm />
          </ErrorBoundary>
        ),
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
])

export default function App() {
  const [theme, setTheme] = useState(appThemes[0])

  function changeTheme(theme) {
    if (appThemes.includes(theme)) {
      setTheme(theme)
    }
  }

  function changeThemeNext() {
    const index = appThemes.indexOf(theme) || 0
    setTheme(index === 0 ? appThemes[1] : appThemes[0])
  }

  return (
    <ThemeContext.Provider
      value={[theme, setTheme, changeTheme, changeThemeNext]}
    >
      <Profiler
        id="Routing"
        onRender={profilerOnRenderCallback}
      >
        <Suspense fallback={<span>Загрузка...</span>}>
          <RouterProvider router={router1} />
        </Suspense>
      </Profiler>
    </ThemeContext.Provider>
  )
}
