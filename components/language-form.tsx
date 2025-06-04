"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { User } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { useLanguage } from "@/contexts/language-context"

const languageFormSchema = z.object({
  language: z.enum(["en", "bn"], {
    required_error: "Please select a language.",
  }),
})

type LanguageFormValues = z.infer<typeof languageFormSchema>

interface LanguageFormProps {
  user: User
}

export function LanguageForm({ user }: LanguageFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const form = useForm<LanguageFormValues>({
    resolver: zodResolver(languageFormSchema),
    defaultValues: {
      language: (user.language as "en" | "bn") || language,
    },
  })

  async function onSubmit(data: LanguageFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/user/language", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update language")
      }

      setLanguage(data.language)
      toast.success(t("notification.success"))
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error(t("notification.error"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("profile.language")}</CardTitle>
        <CardDescription>
          {t("profile.language")} {t("profile.save")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("profile.language")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem value="en" id="en" className="peer sr-only" />
                        <Label
                          htmlFor="en"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <span className="text-2xl mb-2">🇺🇸</span>
                          English
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="bn" id="bn" className="peer sr-only" />
                        <Label
                          htmlFor="bn"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <span className="text-2xl mb-2">🇧🇩</span>
                          বাংলা
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>{t("profile.language")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : t("button.save")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
