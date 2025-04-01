interface UserButtonProps {
  id: string
  content: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function UserButton({ id, content, onClick }: UserButtonProps) {
  return (
    <div>
      <button
        className={`text-black min-w-[100px] w-full font-bold border-solid border bg-mutedTaupe hover:bg-dustyRose h-10 rounded-md`}
        type="button"
        id={id}
        onClick={onClick}
      >
        {content}
      </button>
    </div>
  )
}
