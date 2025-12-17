import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@sola/ui"

import { loginSchema } from "@/lib/schemas"

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  })

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
    toast.success("Login Validated")
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          Sign in
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          Don't have an account?{" "}
          <Link to="/auth/sign-up" className="text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  )
}

