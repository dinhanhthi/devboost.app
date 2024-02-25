'use client'

import { cn } from '@/lib/utils'
import { useRef, useState } from 'react'
import zxcvbn from 'zxcvbn'
import MainContainer from '../../components/MainContainer'
import ButtonClear from '../../components/ui/ButtonClear'
import ButtonClipboard from '../../components/ui/ButtonClipboard'
import ButtonSample from '../../components/ui/ButtonSample'
import { Input } from '../../components/ui/Input'
import { PasswordStrength, calculatePwdStrength } from './PasswordGenerator'

export default function PasswordChecker() {
  const pwdInputRef = useRef<HTMLInputElement>(null)
  const [pwdInputValue, setPwdInputValue] = useState('')
  const [pwdStrength, setPwdStrength] = useState<PasswordStrength | null>(null)
  const [timeToCrackDisplay, setTimeToCrackDisplay] = useState('')

  const handleClipText = (text: string) => {
    setPwdInputValue(text)
    handlePwdChange(text)
  }

  const handleOnChangePwdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwdInputValue(event.target.value)
    if (event.target.value === '') {
      setPwdStrength(null)
      return
    }
    handlePwdChange(event.target.value)
  }

  const handleClearClicked = () => {
    setPwdInputValue('')
    pwdInputRef.current?.focus()
    setPwdStrength(null)
  }

  const handleSampleClicked = () => {
    const sample = 's0=CoSh@-rK'
    setPwdInputValue(sample)
    handlePwdChange(sample)
  }

  const handlePwdChange = (pwd: string) => {
    const zxcvbnObj = zxcvbn(pwd)
    setPwdStrength(
      calculatePwdStrength(+zxcvbnObj.crack_times_seconds.offline_slow_hashing_1e4_per_second)
    )
    setTimeToCrackDisplay(
      zxcvbnObj.crack_times_display.offline_slow_hashing_1e4_per_second as string
    )
  }

  return (
    <MainContainer>
      <div className="flex flex-col flex-wrap flex-1 w-full min-h-0 gap-5">
        {/* Buttons */}
        <div className="flex flex-row flex-wrap items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <ButtonClipboard handleClipText={handleClipText} />
            <ButtonClear onClick={handleClearClicked} disabled={!pwdInputValue} />
            <ButtonSample onClick={handleSampleClicked} />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-row items-center gap-2 flex-2">
          <div className="w-16 text-sm">Password</div>
          <Input
            data-testid="api-key-input"
            ref={pwdInputRef}
            value={pwdInputValue}
            onChange={handleOnChangePwdInput}
            type="text"
            placeholder={'Type your password here'}
            className={cn('flex-1 py-2')}
          />
        </div>

        {/* Result */}
        {pwdStrength && (
          <div>
            <span
              className={cn('font-medium', {
                'text-danger': pwdStrength === 'Very weak',
                'text-warning': pwdStrength === 'Weak',
                'text-sky-600 dark:text-sky-400': pwdStrength === 'Good',
                'text-success': pwdStrength === 'Strong',
                'text-fuchsia-600 dark:text-fuchsia-400': pwdStrength === 'Very strong'
              })}
            >
              {pwdStrength}
            </span>{' '}
            -{' '}
            <span className="text-sm italic">
              Estimated time to crack:{' '}
              <span
                className={cn('font-medium', {
                  'text-danger': pwdStrength === 'Very weak',
                  'text-warning': pwdStrength === 'Weak',
                  'text-sky-600 dark:text-sky-400': pwdStrength === 'Good',
                  'text-success': pwdStrength === 'Strong',
                  'text-fuchsia-600 dark:text-fuchsia-400': pwdStrength === 'Very strong'
                })}
              >
                {timeToCrackDisplay}
              </span>
              .
            </span>
          </div>
        )}
      </div>
    </MainContainer>
  )
}
