import { Outlet } from 'react-router'
import { Navbar } from './Navbar'

export const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0F0F1A] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
