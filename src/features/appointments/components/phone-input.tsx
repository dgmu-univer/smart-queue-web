'use client';

import * as React from 'react';
import PhoneInput from 'react-phone-number-input';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import 'react-phone-number-input/style.css';

type PhoneInputFieldProps = Omit<
  React.ComponentProps<typeof PhoneInput>,
  'onChange' | 'value'
> & {
  value?: string
  onChange?: (value: string | undefined) => void
};

const InnerInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn('h-9 rounded-l-none border-l-0', className)}
    {...props}
  />
));
InnerInput.displayName = 'InnerInput';

export function PhoneInputField({
  className,
  value,
  onChange,
  ...props
}: PhoneInputFieldProps) {
  return (
    <PhoneInput
      international
      defaultCountry="RU"
      value={value}
      onChange={onChange}
      className={cn(
        'flex w-full items-stretch rounded-md',
        `
          [&_.PhoneInputCountry]:border-input [&_.PhoneInputCountry]:bg-background [&_.PhoneInputCountry]:flex [&_.PhoneInputCountry]:items-center [&_.PhoneInputCountry]:gap-1.5
          [&_.PhoneInputCountry]:rounded-l-md [&_.PhoneInputCountry]:border [&_.PhoneInputCountry]:px-3 [&_.PhoneInputCountry]:shadow-xs
        `,
        `
          [&_.PhoneInputCountrySelect]:absolute [&_.PhoneInputCountrySelect]:inset-0 [&_.PhoneInputCountrySelect]:size-full [&_.PhoneInputCountrySelect]:cursor-pointer
          [&_.PhoneInputCountrySelect]:opacity-0
        `,
        '[&_.PhoneInputCountryIcon]:overflow-hidden [&_.PhoneInputCountryIcon]:rounded-sm [&_.PhoneInputCountryIcon--border]:shadow-none',
        className,
      )}
      inputComponent={InnerInput}
      {...props}
    />
  );
}
