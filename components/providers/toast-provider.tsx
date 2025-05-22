"use client"
import { Toaster } from "react-hot-toast"
import { useTheme } from "next-themes"

export function ToastProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
        },
        success: {
          duration: 2000,
          iconTheme: {
            primary: "#10b981",
            secondary: "white",
          },
        },
        error: {
          duration: 2000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "white",
          },
        },
      }}
    />
  )
}
