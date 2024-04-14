import { Suspense } from 'react'

import { Routes, Route, useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import { Loader } from '@/components/Core/Loader'

import { NotFound } from '@/pages/Errors/NotFound'

import { routes } from '../Pages/Pages.routes'

import { RequireAuth } from './RequireAuth'

export function Routing() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
        <Routes key={location.pathname} location={location}>
          <Route path="/">
            {routes.map(
              ({ path, component: Component, isPrivate, allowedRoles }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    !isPrivate ? (
                      <Component />
                    ) : (
                      <RequireAuth allowedRoles={allowedRoles}>
                        <Component />
                      </RequireAuth>
                    )
                  }
                />
              )
            )}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}
