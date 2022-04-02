import { FC } from 'react'
import toast, { ToastBar, Toaster, ToasterProps } from 'react-hot-toast'

const CToaster: FC<ToasterProps> = (props) => {
  return (
    <Toaster position="top-right" {...props}>
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {
                <button
                  className="btn btn-ghost btn-sm btn-circle"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              }
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  )
}

export default CToaster
