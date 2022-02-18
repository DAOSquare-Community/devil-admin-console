import { FC } from 'react'
import Image from 'next/image'

const UserInfo: FC = () => {
  return (
    <div className="-mx-2 mt-6 flex flex-col items-center">
      <Image
        className="mx-2 h-24 w-24 rounded-full object-cover"
        width={60}
        height={60}
        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        alt="avatar"
      />
      <h4 className="mx-2 mt-2 font-medium text-gray-800 hover:underline dark:text-gray-200">
        John Doe
      </h4>
      <p className="mx-2 mt-1 text-sm font-medium text-gray-600 hover:underline dark:text-gray-400">
        john@example.com
      </p>
    </div>
  )
}

export default UserInfo
