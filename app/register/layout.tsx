import { Utensils } from "lucide-react"
import Link from "next/link"

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <div className="mb-8 w-full max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Utensils className="h-6 w-6" />
            <span className="text-xl">MealSphere</span>
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
