import { ChangeEvent } from 'react'

interface InputContainerProps {
  type: string
  id: string
  value: string
  name: string
  placeholder: string
  label: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputContainer({
  type,
  id,
  value,
  name,
  placeholder,
  onChange,
  label,
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
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
