'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { type AdminFormData, authAdminCredsSchema } from '../auth-schema';

export const AdminForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
  } = useForm<AdminFormData>({
    resolver: zodResolver(authAdminCredsSchema),
  });

  const onSubmit = async (data: AdminFormData) => {
    setLoading(true);
    setServerError(null);

    try {
      // Use NextAuth signIn with credentials provider
      const result = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false, // Don't redirect automatically
      });

      console.log(result)
      if (result?.error) {
        setServerError(result.error);
        return;
      }
      // Success - redirect based on user role
      // NextAuth session will be available after successful sign in
      if (result?.url) {
        router.push(result.url);
      } else {
        router.push('/dashboard');
        router.refresh(); // Refresh to update session on server
      }
    } catch (error) {
      console.error('Login error:', error);
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div className="text-red-500">{error}</div>}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="login">Логин</FieldLabel>
          <Input
            id="login"
            type="text"
            placeholder="Введите логин"
            {...register('username')}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Пароль</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Введите пароль"
            {...register('password')}
          />
        </Field>
      </FieldGroup>
      <Button
        type="submit"
        disabled={loading}
        aria-label={loading ? 'Signing in...' : 'Sign in'}
        className="mt-6 w-full bg-blue-600"
        size="lg"
      >
        Войти
      </Button>
    </form>
  );
};
