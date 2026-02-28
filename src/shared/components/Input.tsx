import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black ${className}`}
      {...props}
    />
  )
}

export default Input
