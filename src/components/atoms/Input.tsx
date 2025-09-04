import './css/Input.css'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`input_component ${props.className}`} />
}