interface SubmitButtonProps {
  id: string
  title: string
}

export default function SubmitButton({ id, title }: SubmitButtonProps) {
  return (
    <div>
      <button
        className="text-black m-auto font-bold border-solid border bg-mutedTaupe hover:bg-dustyRose min-w-[300px] h-10 rounded-md"
        type="submit"
        id={id}
      >
        {title}
      </button>
    </div>
  )
}
