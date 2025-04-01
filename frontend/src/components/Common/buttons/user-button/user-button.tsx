interface UserButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  content: string
}

export default function UserButton({ content }: UserButtonProps) {
  return (
    <div>
      <button
        className={`text-black min-w-[100px] w-full font-bold border-solid border bg-mutedTaupe hover:bg-dustyRose h-10 rounded-md`}
      >
        {content}
      </button>
    </div>
  )
}
