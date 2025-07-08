interface UserButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content'> {
  content: string | React.ReactNode
  className?: string
}

export default function UserButton({
  content,
  className,
  onClick,
  id,
  type,
}: UserButtonProps) {
  return (
    <div>
      <button
        type={type}
        id={id}
        onClick={onClick}
        className={`text-amber-900 w-full font-bold border-solid border bg-mutedTaupe hover:bg-dustyRose h-10 rounded-md ${className || ''}`}
      >
        {content}
      </button>
    </div>
  )
}
