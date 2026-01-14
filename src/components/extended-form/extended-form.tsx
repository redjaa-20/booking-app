"use client";

import * as React from "react";
import {
  FormProvider,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "src/components/ui/form";
import { Input } from "src/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupInput,
} from "src/components/ui/input-group";
import { cn } from "src/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Textarea } from "src/components/ui/textarea";
import Link from "next/link";

type ExtendedFormProps = {
  methods: any;
  onSubmit: (data: any) => void;
  className?: string;
  children: React.ReactNode;
};

const FormContext = React.createContext<any>(null);

export function ExtendedForm({
  methods,
  onSubmit,
  className,
  children,
}: ExtendedFormProps) {
  return (
    <FormContext.Provider value={methods}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn("space-y-6", className)}
        >
          {children}
        </form>
      </FormProvider>
    </FormContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                             FORM SUBCOMPONENTS                             */
/* -------------------------------------------------------------------------- */

function useFormMethods() {
  const ctx = React.useContext(FormContext);
  if (!ctx)
    throw new Error("Form.* components must be used inside <ExtendedForm>");
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                   INPUT                                    */
/* -------------------------------------------------------------------------- */
type FormInputProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  autoFocus?: boolean;
};

ExtendedForm.Input = function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  type = "text",
  disabled,
  className,
  autoFocus,
}: FormInputProps<TFieldValues>) {
  const methods = useFormMethods();

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="mb-1.5 md:mb-1">{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              className={cn(
                // "h-11 rounded-xl shadow-none focus-visible:border-2 focus-visible:border-foreground transition-[border-color] duration-200",
                className
              )}
              autoFocus={autoFocus}
            />
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                                INPUT GROUP                                 */
/* -------------------------------------------------------------------------- */
type FormInputGroupProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  forgotPasswordUrl?: string;
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
};

ExtendedForm.InputGroup = function FormInputGroup<
  TFieldValues extends FieldValues
>({
  name,
  label,
  placeholder,
  type = "text",
  forgotPasswordUrl,
  startAddon,
  endAddon,
  description,
  disabled,
  className,
}: FormInputGroupProps<TFieldValues>) {
  const methods = useFormMethods();

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center justify-between mb-1.5">
            {label && <FormLabel>{label}</FormLabel>}
            {forgotPasswordUrl && (
              <Link
                href={forgotPasswordUrl}
                className="text-sm text-primary leading-none font-medium hover:text-indigo-500 transition-colors duration-300"
              >
                Lupa password?
              </Link>
            )}
          </div>
          <FormControl>
            <InputGroup
              className={cn(
                // "h-11 rounded-xl shadow-none focus-visible:border-2 focus-visible:border-foreground transition-[border-color] duration-200",
                // "has-[>[data-align=inline-start]]:[&>input]:pl-1",
                // "has-[>[data-align=inline-end]]:[&>input]:pr-1",
                className
              )}
            >
              {startAddon && (
                <InputGroupAddon>
                  {typeof startAddon === "string" ? (
                    <InputGroupText>{startAddon}</InputGroupText>
                  ) : (
                    startAddon
                  )}
                </InputGroupAddon>
              )}
              <InputGroupInput
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                className="focus-visible:border-0"
                type={type}
              />
              {endAddon && (
                <InputGroupAddon align="inline-end">
                  {typeof endAddon === "string" ? (
                    <InputGroupText>{endAddon}</InputGroupText>
                  ) : (
                    endAddon
                  )}
                </InputGroupAddon>
              )}
            </InputGroup>
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                                TEXTAREA (OPSIONAL)                         */
/* -------------------------------------------------------------------------- */

ExtendedForm.Textarea = function FormTextarea<
  TFieldValues extends FieldValues
>({
  name,
  label,
  placeholder,
  description,
  disabled,
  className,
}: FormInputProps<TFieldValues>) {
  const { control } = useFormMethods();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
              {...field}
              className={cn(
                // "focus-visible:border-2 focus-visible:border-foreground rounded-xl shadow-none",
                className
              )}
            />
          </FormControl>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                                   SELECT                                   */
/* -------------------------------------------------------------------------- */

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
  badge?: React.ReactNode;
};

type FormSelectProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  options: SelectOption[]; // Daftar opsi yang akan ditampilkan di Select
  description?: string;
  disabled?: boolean;
  className?: string;
  selectClassName?: string; // Untuk styling komponen Select (SelectTrigger)
};

ExtendedForm.Select = function FormSelect<TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  description,
  disabled,
  className,
  selectClassName,
}: FormSelectProps<TFieldValues>) {
  const methods = useFormMethods();

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="mb-1.5">{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value} // Tambahkan ini agar select bisa di-reset/berubah nilainya
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  // "data-[size=default]:h-11 w-full rounded-xl shadow-none focus-visible:border-2 focus-visible:border-foreground transition-[border-color] duration-200 cursor-pointer",
                  selectClassName
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="rounded-xl">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="rounded-md cursor-pointer"
                >
                  {/* <div className="flex items-center justify-between w-full gap-2"> */}
                  {option.label}
                  {option.badge}
                  {/* </div> */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};
