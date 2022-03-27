import { useSession } from 'next-auth/react'
import { NextPageWithLayout } from 'types/page'
// Define a default UI for filtering

const Home: NextPageWithLayout = () => {
  const { data: session } = useSession()
  return (
    <div>
      <div>
        <div className="flex flex-col items-center">
          <p className="mb-2 text-center text-gray-500 md:text-lg">
            your wallet acount address is {session?.user?.name}
          </p>
          <p className="text-center text-gray-500 md:text-lg">
            your roles is {session?.user?.roles.join('/') || 'vacancies'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
