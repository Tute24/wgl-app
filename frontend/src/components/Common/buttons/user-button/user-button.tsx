interface UserButtonProps {
    id: string
    title: string
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
  }
  
  export default function UserButton({ id, title, onClick }: UserButtonProps) {
    return (
      <div>
        <button
          className="text-black m-auto font-bold border-solid border bg-paleGold hover:bg-champagneGold min-w-[300px] h-10 rounded-md"
          type="button"
          id={id}
          onClick={onClick}
        >
          {title}
        </button>
      </div>
    )
  }