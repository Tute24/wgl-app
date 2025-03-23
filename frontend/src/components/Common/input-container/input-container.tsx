interface InputContainerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function InputContainer({
  label,
  id,
  ...rest
}: InputContainerProps) {
  return (
    <div className="flex flex-col gap-2 items-start py-2 w-full">
      <label
        className="font-bold font-sans w-full text-mutedTaupe"
        htmlFor={id}
      >
        {label}:
      </label>
      <input
        className="border-solid px-3.5 focus:outline-mutedTaupe border rounded-md text-start text-sm h-10 min-w-[300px] "
        id={id}
        {...rest}
      />
    </div>
  )
}
