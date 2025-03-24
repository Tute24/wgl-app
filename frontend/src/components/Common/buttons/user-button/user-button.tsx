interface UserButtonProps {
    id: string
    content: React.ReactNode
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
    bg: string
    bgHover: string
  }
  
  export default function UserButton({ id, content, onClick, bg, bgHover }: UserButtonProps) {
    return (
      <div>
        <button
          className={`text-black min-w-[100px] w-full font-bold border-solid border bg-${bg} hover:${bgHover} h-10 rounded-md`}
          type="button"
          id={id}
          onClick={onClick}
        >
          {content}
        </button>
      </div>
    )
  }