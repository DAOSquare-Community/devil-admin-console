import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

const DSIuput: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return (
    <div className=" flex items-center justify-center">
      <div className="flex rounded-[10px] border-2 bg-white">
        <input
          type="text"
          className="w-80 border-0 bg-transparent px-4 py-2 placeholder:text-xs focus:outline-none "
          placeholder="Search..."
          {...props}
        />
        <button className="flex items-center justify-center  px-4 ">
          <svg
            className="h-5 w-5 text-ds-400/50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default DSIuput
