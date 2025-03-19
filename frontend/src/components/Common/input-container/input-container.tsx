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
    <div className="flex flex-col gap-2 items-start py-2">
      <label htmlFor={id}>{label}</label>
      <input
        className="border-solid border rounded-md text-center h-8 w-full "
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
