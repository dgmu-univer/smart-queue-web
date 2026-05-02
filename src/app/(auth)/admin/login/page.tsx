import type { Metadata } from 'next';
import { Container, Section } from '@radix-ui/themes';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: 'Вход — OptPrice',
  description: 'Войдите или зарегистрируйтесь в B2B маркетплейсе',
};

export default function LoginPage() {
  return (
      <Section size="2" className="flex min-h-screen items-center justify-center">
            <Container size="1" p="2">
              <Card>
                <CardHeader>
                  <CardTitle>Login to your account</CardTitle>
                  <CardDescription>
                    Enter your email below to login to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <FieldGroup>
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                      </Field>
                      <Field>
                        <div className="flex items-center">
                          <FieldLabel htmlFor="password">Password</FieldLabel>
                          <a
                            href="/forgot"
                            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <Input id="password" type="password" required />
                      </Field>
                      <Field>
                        <Button type="submit">Login</Button>
                        <Button variant="outline" type="button">
                          Login with Google
                        </Button>
                        <FieldDescription className="text-center">
                          Don&apos;t have an account? <a href="/sig">Sign up</a>
                        </FieldDescription>
                      </Field>
                    </FieldGroup>
                  </form>
                </CardContent>
              </Card>
          </Container>
      </Section>
  );
}
