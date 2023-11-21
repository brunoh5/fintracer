interface InputLabelProps {
  name: string
  text: string
}

export function InputLabel({ name, text }: InputLabelProps) {
  return (
    <label
      htmlFor={name}
      className="text-gray-900 font-semibold leading-6 block"
    >
      {text}
    </label>
  )
}
