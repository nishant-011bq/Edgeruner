'use server'

import { getUserData } from '@/actions/actions'
import Header from '@/components/dashboard/Header'
import ProfileCompletion from '@/components/ProfileCompletion'
import Sidebar from '@/components/Sidebar'

export default async function DashboardLayout({ children }) {
  const data = await getUserData()
  return (
    <div className="h-full min-h-screen w-full bg-white">
      <Header data={data} />
      {Math.round(data.profile_completion.percent_completed) >= 99 ? (
        <></>
      ) : (
        <ProfileCompletion data={data} />
      )}
      <div className="mx-auto max-w-6xl py-8 lg:flex lg:gap-x-8 lg:px-8 lg:py-16">
        <Sidebar />

        <main className="px-4 sm:px-6 lg:flex-auto lg:px-0">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
