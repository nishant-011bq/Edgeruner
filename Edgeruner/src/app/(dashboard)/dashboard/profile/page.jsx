import Profile from '@/components/dashboard/Profile'
import { getUserData } from '@/actions/actions'

export default async function page() {
  const data = await getUserData()

  return <Profile data={data} />
}
