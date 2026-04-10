"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/old/button";
import { Input } from "@/components/ui/old/input";
import { Label } from "@/components/ui/old/label";

const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Введите номер телефона")
    .refine(
      (val) => /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(val),
      "Введите корректный номер телефона",
    ),
});

type PhoneFormData = z.infer<typeof phoneSchema>;

interface PhoneStepProps {
  onSubmit: (phone: string) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

function formatPhoneNumber(value: string): string {
  // Strip everything except digits
  const digits = value.replace(/\D/g, "");

  // Always start with 7
  const normalized = digits.startsWith("7")
    ? digits
    : digits.startsWith("8")
      ? "7" + digits.slice(1)
      : "7" + digits;

  const d = normalized.slice(1); // digits after country code

  let result = "+7";

  if (d.length === 0) return result;

  result += " (";
  result += d.slice(0, 3);

  if (d.length < 3) return result;

  result += ") ";
  result += d.slice(3, 6);

  if (d.length < 6) return result;

  result += "-";
  result += d.slice(6, 8);

  if (d.length < 8) return result;

  result += "-";
  result += d.slice(8, 10);

  return result;
}

function extractRawPhone(formatted: string): string {
  const digits = formatted.replace(/\D/g, "");
  return "+" + digits;
}

export function PhoneStep({ onSubmit, isLoading, error }: PhoneStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: false });
    e.target.value = formatted;
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const value = input.value;

    // Prevent deleting the +7 prefix
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      input.selectionStart !== null &&
      input.selectionStart <= 2 &&
      input.selectionEnd !== null &&
      input.selectionEnd <= 2
    ) {
      e.preventDefault();
      return;
    }

    // Keep cursor after +7 if user clicks before it
    if (value === "" || value === "+" || value === "+7") {
      if (e.key === "Backspace") {
        e.preventDefault();
      }
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!e.target.value) {
      e.target.value = "+7 ";
      setValue("phone", "+7 ", { shouldValidate: false });
    }
  }

  async function onFormSubmit(data: PhoneFormData) {
    const rawPhone = extractRawPhone(data.phone);
    await onSubmit(rawPhone);
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="phone">Номер телефона</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
          autoFocus
          {...register("phone")}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="text-base tracking-wide"
          disabled={isLoading}
        />
        {errors.phone && (
          <p className="text-destructive text-sm">{errors.phone.message}</p>
        )}
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Проверяем номер...
          </>
        ) : (
          "Продолжить"
        )}
      </Button>
    </form>
  );
}
