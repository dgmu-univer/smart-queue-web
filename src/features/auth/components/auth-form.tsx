"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { PhoneStep } from "./phone-step";
import { RoleStep } from "./role-step";
import { OtpStep } from "./otp-step";
import { authApi } from "../api";
import { ApiError } from "@/lib/api";
import { CURRENT_USER_QUERY_KEY } from "@/features/user/hooks/use-current-user";
import type { UserRole } from "../types";

type AuthStep = "phone" | "role" | "otp";

interface AuthFormProps {
  redirectTo?: string;
}

export function AuthForm({ redirectTo = "/dashboard" }: AuthFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [otpError, setOtpError] = useState<string | undefined>();

  // Step 1: send OTP or detect new user
  const handlePhoneSubmit = useCallback(async (rawPhone: string) => {
    setIsLoading(true);
    setPhoneError(undefined);

    try {
      const res = await authApi.sendOtp(rawPhone);

      setPhone(rawPhone);

      if (res.status === "OTP_SENT") {
        setStep("otp");
      } else if (res.status === "NEEDS_REGISTRATION") {
        setStep("role");
      }
    } catch (err) {
      setPhoneError(
        err instanceof ApiError
          ? err.message
          : "Произошла ошибка. Попробуйте снова.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Step 2 (registration only): register with role, then OTP is sent
  const handleRegister = useCallback(
    async (role: UserRole) => {
      setIsLoading(true);
      try {
        await authApi.register(phone, role);
      } finally {
        setIsLoading(false);
      }
    },
    [phone],
  );

  const handleRoleSuccess = useCallback(() => {
    setOtpError(undefined);
    setStep("otp");
  }, []);

  // Step 3 (both flows): verify OTP
  const handleVerifyOtp = useCallback(
    async (code: string) => {
      setIsLoading(true);
      setOtpError(undefined);

      try {
        const res = await authApi.verifyOtp(phone, Number(code));

        if (res.status === "SUCCESS") {
          await queryClient.setQueryData(CURRENT_USER_QUERY_KEY, res.user);
          router.push(redirectTo);
        }
      } catch (err) {
        setOtpError(
          err instanceof ApiError
            ? err.message
            : "Произошла ошибка. Попробуйте снова.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [phone, queryClient, router],
  );

  // Resend OTP
  const handleResendOtp = useCallback(async () => {
    try {
      await authApi.sendOtp(phone);
      setOtpError(undefined);
    } catch (err) {
      setOtpError(
        err instanceof ApiError
          ? err.message
          : "Не удалось отправить код. Попробуйте снова.",
      );
    }
  }, [phone]);

  const handleBackToPhone = useCallback(() => {
    setStep("phone");
    setOtpError(undefined);
    setPhoneError(undefined);
  }, []);

  const handleBackToRole = useCallback(() => {
    setStep("role");
    setOtpError(undefined);
  }, []);

  return (
    <div className="w-full">
      {step === "phone" && (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Добро пожаловать
            </h1>
            <p className="text-sm text-muted-foreground">
              Введите номер телефона для входа или регистрации
            </p>
          </div>
          <PhoneStep
            onSubmit={handlePhoneSubmit}
            isLoading={isLoading}
            error={phoneError}
          />
        </div>
      )}

      {step === "role" && (
        <RoleStep
          phone={phone}
          onRegister={handleRegister}
          onSuccess={handleRoleSuccess}
          onBack={handleBackToPhone}
          isLoading={isLoading}
        />
      )}

      {step === "otp" && (
        <OtpStep
          phone={phone}
          onVerify={handleVerifyOtp}
          onResend={handleResendOtp}
          onBack={step === "otp" ? handleBackToPhone : handleBackToRole}
          isLoading={isLoading}
          error={otpError}
        />
      )}
    </div>
  );
}
