"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signup } from "src/app/(auth)/actions";
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

const RegisterSchema = z.object({
  full_name: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

// ------------------------------------------------------------

export function RegisterView() {
  const [inputType, setInputType] = useState("password");

  const defaultValues = {
    full_name: "",
    email: "",
    password: "",
  };

  type FormValues = z.infer<typeof RegisterSchema>;

  const methods = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  });

  const {
    setError,
    formState: { isSubmitting, isDirty },
  } = methods;

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await signup({
        email: data.email,
        password: data.password,
        name: data.full_name,
      });

      if (result?.error) {
        toast.error(result.error);
        setError("root", { message: result.error });
      } else {
        toast.success("Akun berhasil dibuat");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan sistem");
    }
  };

  const loginForm = () => (
    <ExtendedForm methods={methods} onSubmit={onSubmit} className="space-y-6">
      <ExtendedForm.Input name="full_name" label="Nama Lengkap" autoFocus />

      <ExtendedForm.Input name="email" type="email" label="Email" />

      <ExtendedForm.InputGroup
        name="password"
        type={inputType}
        label="Password"
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

      <Button
        size="lg"
        variant="secondary"
        className="w-full bg-indigo-500 hover:bg-indigo-500/90 text-white rounded-full"
        disabled={isSubmitting || !isDirty}
      >
        {isSubmitting ? (
          <>
            <Spinner /> Membuat akun...
          </>
        ) : (
          "Buat Akun"
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
          <h1 className="text-xl font-semibold mb-8">Buat Akun</h1>
          <div className="w-full flex flex-col gap-y-5">
            <Button size="lg" variant="outline" className="rounded-full">
              Masuk dengan Google
            </Button>
            <div className="flex items-center">
              <Separator className="flex-1" />
              <p className="text-sm font-medium text-muted-foreground px-2">
                atau
              </p>
              <Separator className="flex-1" />
            </div>
            {loginForm()}
            <div className="text-center text-sm">
              <p>
                Sudah punya akun?{" "}
                <Link
                  href={paths.auth.login}
                  className="text-indigo-500 hover:text-indigo-500 font-semibold"
                >
                  Masuk Sekarang
                </Link>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
