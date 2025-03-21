interface UserButtonProps {
    id: string
    content: React.ReactNode
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
  }
  
  export default function UserButton({ id, content, onClick }: UserButtonProps) {
    return (
      <div>
        <button
          className="text-black m-auto font-bold border-solid border bg-paleGold hover:bg-champagneGold min-w-[300px] h-10 rounded-md"
          type="button"
          id={id}
          onClick={onClick}
        >
          {content}
        </button>
      </div>
    )
  }