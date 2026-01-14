"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "src/app/(auth)/actions";
import { ExtendedForm } from "src/components/extended-form/extended-form";
import { Button } from "src/components/ui/button";
import { Card, CardContent } from "src/components/ui/card";
import { Checkbox } from "src/components/ui/checkbox";
import { Label } from "src/components/ui/label";
import { Separator } from "src/components/ui/separator";
import { Spinner } from "src/components/ui/spinner";
import { paths } from "src/routes/paths";
import * as z from "zod";

// ------------------------------------------------------------

const SignInSchema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

// ------------------------------------------------------------

export function LoginView() {
  const [inputType, setInputType] = useState("password");

  const defaultValues = {
    email: "",
    password: "",
  };

  type FormValues = z.infer<typeof SignInSchema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues,
  });

  const {
    setError,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        toast.error(result.error);
        setError("root", { message: result.error });
      } else {
        toast.success("Berhasil masuk");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem");
    }
  };

  const loginForm = () => (
    <ExtendedForm methods={methods} onSubmit={onSubmit} className="space-y-6">
      <ExtendedForm.Input name="email" type="email" label="Email" autoFocus />

      <ExtendedForm.InputGroup
        name="password"
        type={inputType}
        label="Password"
        forgotPasswordUrl="/auth/forgot-password"
        endAddon={
          <>
            <HugeiconsIcon
              icon={inputType === "password" ? ViewIcon : ViewOffSlashIcon}
              className="cursor-pointer"
              onClick={() =>
                setInputType((prev) =>
                  prev === "password" ? "text" : "password"
                )
              }
            />
          </>
        }
      />

      {/* <div className="flex items-center gap-3">
        <Checkbox
          id="remember-me"
          className="data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white data-[state=checked]:border-indigo-500"
        />
        <Label htmlFor="remember-me">Ingat saya</Label>
      </div> */}

      <Button
        size="lg"
        variant="secondary"
        className="w-full bg-indigo-500 hover:bg-indigo-500/90 text-white rounded-full"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? (
          <>
            <Spinner /> Masuk...
          </>
        ) : (
          "Masuk"
        )}
      </Button>
    </ExtendedForm>
  );

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">
          Book<span className="text-indigo-500">ly</span>
        </h1>
      </div>
      <Card className="border-0 rounded-2xl shadow-none py-10">
        <CardContent className="flex flex-col items-center px-12">
          <h1 className="text-xl font-semibold mb-8">Masuk ke akun Anda</h1>
          <div className="w-full flex flex-col gap-y-5">
            <Button size="lg" variant="outline" className="rounded-full">
              Masuk dengan Google
            </Button>
            <div className="flex items-center">
              <Separator className="flex-1" />
              <p className="font-medium text-muted-foreground px-2">atau</p>
              <Separator className="flex-1" />
            </div>
            {loginForm()}
            <div className="text-center text-sm">
              <p>
                Belum punya akun?{" "}
                <Link
                  href={paths.auth.register}
                  className="text-indigo-500 hover:text-indigo-500 font-semibold"
                >
                  Buat Sekarang
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
