import { Link, Outlet } from 'react-router'

function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Quiz App</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
