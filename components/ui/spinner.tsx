// @ts-ignore
import { Spinner as SpinnerComponent } from "react-spinners-kit"

export const Spinner = ({ className }: { className?: string }) => {
  return <SpinnerComponent size={16} color="grey" loading={true} className={`animate-spin ${className}`} />
}

