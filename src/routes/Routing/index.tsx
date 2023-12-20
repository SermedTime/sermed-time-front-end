import { Suspense } from 'react'

import { Routes, Route, useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

// import { RequireAuth } from 'routes/Routing/RequireAuth'

import { Loader } from '@/components/Core/Loader'

import { NotFound } from '@/pages/Errors/NotFound'

import { routes } from '../Pages/Pages.routes'

export function Routing() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loader />}>
        <Routes key={location.pathname} location={location}>
          <Route path="/">
            {routes.map(({ path, component: Component }) => (
              <Route
                key={path}
                path={path}
                element={
                  <Component />
                  // !isPrivate ? (
                  //   <Component />
                  // ) : (
                  //   <RequireAuth allowedRoles={allowedRoles}>
                  //     <Component />
                  //   </RequireAuth>
                  // )
                }
              />
            ))}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}
