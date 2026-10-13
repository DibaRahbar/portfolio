import { useEffect, useRef, useState } from 'react'
import DotGrid from '@/components/DotGrid'
import { LangProvider } from '@/i18n'
import { ContactPage } from '@/pages/ContactPage'
import { HomePage } from '@/pages/HomePage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ProjectsPage, parseCategory } from '@/pages/ProjectsPage'
import { colors } from '@/theme'

/** Current hash split into path and query, e.g. '#/projects?category=brand'. */
function useRoute() {
  const read = () => {
    const [path, query = ''] = (window.location.hash || '#/').split('?')
    return { path, query }
  }
  const [route, setRoute] = useState(read)
  const lastPath = useRef(route.path)

  useEffect(() => {
    const onChange = () => {
      const next = read()
      // Only jump to the top on a new page, not when a filter changes the query.
      if (next.path !== lastPath.current) window.scrollTo(0, 0)
      lastPath.current = next.path
      setRoute(next)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}

function Page({ path, query }: { path: string; query: string }) {
  const detail = path.match(/^#\/projects\/(.+)$/)
  if (detail) return <ProjectDetailPage key={detail[1]} slug={detail[1]} />
  if (path.startsWith('#/projects')) return <ProjectsPage category={parseCategory(query)} />
  if (path.startsWith('#/contact')) return <ContactPage />
  return <HomePage />
}

export default function App() {
  const route = useRoute()
  return (
    <LangProvider>
      {/* Mounted once so the dot grid does not replay its intro on every route change */}
      <div className="fixed inset-0 -z-10">
        <DotGrid
          dotSize={3}
          gap={24}
          baseColor={colors.dot}
          activeColor={colors.primary}
          proximity={120}
          shockRadius={220}
          shockStrength={3}
        />
      </div>
      <Page path={route.path} query={route.query} />
    </LangProvider>
  )
}
