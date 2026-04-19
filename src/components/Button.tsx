import { cn } from '../lib/cn'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={cn('px-4 py-2 rounded bg-blue-500 text-white ', className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
