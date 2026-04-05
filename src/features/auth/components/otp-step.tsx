'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/old/button'
import { cn } from '@/lib/utils'

interface OtpStepProps {
  phone: string
  onVerify: (code: string) => Promise<void>
  onResend: () => Promise<void>
  isLoading: boolean
  error?: string
  onBack: () => void
}

const OTP_LENGTH = 4
const RESEND_TIMEOUT = 60

export function OtpStep({
  phone,
  onVerify,
  onResend,
  isLoading,
  error,
  onBack,
}: OtpStepProps) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [timer, setTimer] = useState(RESEND_TIMEOUT)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array(OTP_LENGTH).fill(null),
  )

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [timer])

  // Autofocus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const submitCode = useCallback(
    async (code: string) => {
      if (code.length === OTP_LENGTH) {
        await onVerify(code)
      }
    },
    [onVerify],
  )

  function focusIndex(index: number) {
    if (index >= 0 && index < OTP_LENGTH) {
      inputRefs.current[index]?.focus()
      inputRefs.current[index]?.select()
    }
  }

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value

    // Handle paste that lands in a single input
    if (raw.length > 1) {
      handlePasteString(raw, index)
      return
    }

    const digit = raw.replace(/\D/g, '').slice(-1)
    const newDigits = [...digits]
    newDigits[index] = digit
    setDigits(newDigits)

    if (digit && index < OTP_LENGTH - 1) {
      focusIndex(index + 1)
    }

    const code = newDigits.join('')
    if (code.length === OTP_LENGTH && !newDigits.includes('')) {
      submitCode(code)
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newDigits = [...digits]
      if (newDigits[index]) {
        newDigits[index] = ''
        setDigits(newDigits)
      } else if (index > 0) {
        newDigits[index - 1] = ''
        setDigits(newDigits)
        focusIndex(index - 1)
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      focusIndex(index - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      focusIndex(index + 1)
    } else if (e.key === 'Delete') {
      e.preventDefault()
      const newDigits = [...digits]
      newDigits[index] = ''
      setDigits(newDigits)
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    handlePasteString(text, 0)
  }

  function handlePasteString(text: string, startIndex: number) {
    const pastedDigits = text.replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pastedDigits) return

    const newDigits = [...digits]
    for (
      let i = 0;
      i < pastedDigits.length && startIndex + i < OTP_LENGTH;
      i++
    ) {
      newDigits[startIndex + i] = pastedDigits[i]
    }
    setDigits(newDigits)

    const nextEmpty = newDigits.findIndex((d) => d === '')
    const focusTarget = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty
    focusIndex(focusTarget)

    const code = newDigits.join('')
    if (code.length === OTP_LENGTH && !newDigits.includes('')) {
      submitCode(code)
    }
  }

  function handleFocus(index: number) {
    inputRefs.current[index]?.select()
  }

  async function handleResend() {
    setResending(true)
    try {
      await onResend()
      setDigits(Array(OTP_LENGTH).fill(''))
      setTimer(RESEND_TIMEOUT)
      setTimeout(() => focusIndex(0), 0)
    } finally {
      setResending(false)
    }
  }

  const formattedTimer = `0:${String(timer).padStart(2, '0')}`
  const filledCount = digits.filter((d) => d !== '').length

  return (
    <div className='space-y-6'>
      <div className='space-y-2 text-center'>
        <h1 className='text-2xl font-bold tracking-tight'>Введите код</h1>
        <p className='text-muted-foreground text-sm'>
          Код подтверждения отправлен на номер{' '}
          <span className='text-foreground font-medium'>{phone}</span>
        </p>
      </div>

      {/* OTP inputs */}
      <div className='flex items-center justify-center gap-3'>
        {Array.from({ length: OTP_LENGTH }, (_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el
            }}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            maxLength={1}
            value={digits[i]}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(i)}
            disabled={isLoading}
            aria-label={`Цифра ${i + 1} из ${OTP_LENGTH}`}
            className={cn(
              'bg-background h-14 w-12 rounded-xl border-2 text-center text-xl font-bold tracking-widest transition-all duration-150',
              'focus:ring-0 focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              digits[i]
                ? 'border-primary text-primary shadow-sm'
                : 'border-input text-foreground',
              error && 'border-destructive text-destructive',
            )}
          />
        ))}
      </div>

      {/* Error */}
      {error && <p className='text-destructive text-center text-sm'>{error}</p>}

      {/* Progress hint */}
      {!error && filledCount > 0 && filledCount < OTP_LENGTH && (
        <p className='text-muted-foreground text-center text-xs'>
          Введено {filledCount} из {OTP_LENGTH} цифр
        </p>
      )}

      {/* Submit button */}
      <Button
        type='button'
        className='w-full'
        size='lg'
        disabled={isLoading || filledCount < OTP_LENGTH}
        onClick={() => submitCode(digits.join(''))}
      >
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Проверяем код...
          </>
        ) : (
          'Подтвердить'
        )}
      </Button>

      {/* Resend / Timer */}
      <div className='text-center'>
        {timer > 0 ? (
          <p className='text-muted-foreground text-sm'>
            Отправить повторно через{' '}
            <span className='text-foreground font-medium tabular-nums'>
              {formattedTimer}
            </span>
          </p>
        ) : (
          <button
            type='button'
            onClick={handleResend}
            disabled={resending}
            className='text-primary text-sm font-medium underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50'
          >
            {resending ? 'Отправляем...' : 'Отправить код повторно'}
          </button>
        )}
      </div>

      {/* Back */}
      <Button
        type='button'
        variant='ghost'
        className='w-full'
        onClick={onBack}
        disabled={isLoading}
      >
        ← Изменить номер
      </Button>
    </div>
  )
}
