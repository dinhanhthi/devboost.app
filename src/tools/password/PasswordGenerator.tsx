'use client'

import { useState } from 'react'
import zxcvbn from 'zxcvbn'
import MainContainer from '../../components/MainContainer'
import ButtonCopy from '../../components/ui/ButtonCopy'
import ButtonGenerate from '../../components/ui/ButtonGenerate'
import { Checkbox } from '../../components/ui/Checkbox'
import { RadioGroup, RadioGroupItem } from '../../components/ui/RadioGroup'
import { Slider } from '../../components/ui/Slider'
import { cn } from '../../lib/utils'

type GenerateTypes = 'password' | 'passphrase'
export type PasswordStrength = 'Very weak' | 'Weak' | 'Good' | 'Strong' | 'Very strong'

const specialChars = '!@#$%^&*-_+='
const wordList = [
  'aardvark',
  'albatross',
  'ant',
  'apple',
  'avocado',
  'baboon',
  'banana',
  'bee',
  'bison',
  'bamboo',
  'bicycle',
  'basil',
  'cat',
  'crocodile',
  'cactus',
  'caterpillar',
  'coconut',
  'cheetah',
  'donut',
  'dragon',
  'dinosaur',
  'dolphin',
  'dog',
  'elephant',
  'eagle',
  'elephant',
  'fox',
  'flamingo',
  'feather',
  'ferret',
  'gorilla',
  'gazelle',
  'guitar',
  'giraffe',
  'grape',
  'horse',
  'hat',
  'hedgehog',
  'hummingbird',
  'hippo',
  'hawk',
  'ice',
  'iguana',
  'ibis',
  'ink',
  'jaguar',
  'jellyfish',
  'jigsaw',
  'kiwi',
  'kangaroo',
  'koala',
  'lion',
  'lemon',
  'ladybug',
  'lighthouse',
  'lizard',
  'mango',
  'mongoose',
  'monkey',
  'mushroom',
  'nectarine',
  'nightingale',
  'notebook',
  'narwhal',
  'numbat',
  'octopus',
  'ostrich',
  'orange',
  'owl',
  'pizza',
  'penguin',
  'parrot',
  'quilt',
  'quokka',
  'quail',
  'rabbit',
  'raccoon',
  'rhinoceros',
  'robot',
  'sunflower',
  'sloth',
  'snake',
  'strawberry',
  'squirrel',
  'turtle',
  'toucan',
  'tapir',
  'teacher',
  'tiger',
  'tower',
  'umbrella',
  'uakari',
  'unicorn',
  'vase',
  'volleyball',
  'vulture',
  'watermelon',
  'waffle',
  'walrus',
  'xylophone',
  'xerus',
  'yak',
  'yacht',
  'yogurt',
  'yak',
  'zebra',
  'zucchini'
]

export default function PasswordGenerator() {
  const defaultType = 'password'

  // #region Default values for password
  const defaultNChars = 8
  const minNChars = 5
  const maxNChars = 100
  const defaultUpperPwd = true
  const defaultLowerPwd = true
  const defaultNumberPwd = true
  const defaultSpecialPwd = false
  const defaultPwd = generatePassword(
    defaultNChars,
    defaultUpperPwd,
    defaultLowerPwd,
    defaultNumberPwd,
    defaultSpecialPwd
  )
  const defaultZxcvbnObj = zxcvbn(defaultPwd)
  // #endregion End of default values for password

  // #region Default values for passphrase
  const defaultNWords = 3
  const minNWords = 3
  const maxNWords = 20
  // #endregion End of default values for passphrase

  const [pwdHistory, setPwdHistory] = useState<string[]>([defaultPwd])

  const [result, setResult] = useState(defaultPwd)
  const [pwdStrength, setPwdStrength] = useState<PasswordStrength>(
    calculatePwdStrength(+defaultZxcvbnObj?.crack_times_seconds.offline_slow_hashing_1e4_per_second)
  )
  const [timeToCrackDisplay, setTimeToCrackDisplay] = useState(
    defaultZxcvbnObj?.crack_times_display.offline_slow_hashing_1e4_per_second as string
  )

  const [type, setType] = useState<GenerateTypes>(defaultType)
  const generateTypes = [
    { value: 'password', name: 'Password' },
    { value: 'passphrase', name: 'Passphrase*' }
  ]
  const handleSelectTypes = (value: GenerateTypes) => {
    setType(value)
    if (value === 'password') {
      handleGeneratePwd(nChars, upperPwd, lowerPwd, numberPwd, specialPwd)
    } else {
      handleGeneratePp(nWords, upperPp, capitalPp, numberPp, separatorPp)
    }
  }

  // #region Options for password
  const [disableOptsPwd, setDisableOptsPwd] = useState(false)

  const [nChars, setNChars] = useState(defaultNChars)
  const handleCharsChanged = (value: number[]) => {
    setNChars(value[0])
    handleGeneratePwd(value[0], upperPwd, lowerPwd, numberPwd, specialPwd)
  }

  const [upperPwd, setUpperPwd] = useState(defaultUpperPwd)
  const handleUpperPwdChanged = (value: boolean) => {
    setUpperPwd(value)
    setDisableOptsPwd(handleDisableOptsPwd(value, lowerPwd, numberPwd, specialPwd))
    handleGeneratePwd(nChars, value, lowerPwd, numberPwd, specialPwd)
  }

  const [lowerPwd, setLowerPwd] = useState(defaultLowerPwd)
  const handleLowerPwdChanged = (value: boolean) => {
    setLowerPwd(value)
    setDisableOptsPwd(handleDisableOptsPwd(upperPwd, value, numberPwd, specialPwd))
    handleGeneratePwd(nChars, upperPwd, value, numberPwd, specialPwd)
  }

  const [numberPwd, setNumberPwd] = useState(defaultNumberPwd)
  const handleNumberPwdChanged = (value: boolean) => {
    setNumberPwd(value)
    setDisableOptsPwd(handleDisableOptsPwd(upperPwd, lowerPwd, value, specialPwd))
    handleGeneratePwd(nChars, upperPwd, lowerPwd, value, specialPwd)
  }

  const [specialPwd, setSpecialPwd] = useState(defaultSpecialPwd)
  const handleSpecialPwdChanged = (value: boolean) => {
    setSpecialPwd(value)
    setDisableOptsPwd(handleDisableOptsPwd(upperPwd, lowerPwd, numberPwd, value))
    handleGeneratePwd(nChars, upperPwd, lowerPwd, numberPwd, value)
  }
  // #endregion End of options for password

  // #region Options for passphrase
  const [nWords, setNWords] = useState(defaultNWords)
  const handleWordsChanged = (value: number[]) => {
    setNWords(value[0])
    handleGeneratePp(value[0], upperPp, capitalPp, numberPp, separatorPp)
  }

  const defaultUpperPp = false
  const [upperPp, setUpperPp] = useState(defaultUpperPp)
  const handleUpperPpChanged = (value: boolean) => {
    setUpperPp(value)
    handleGeneratePp(nWords, value, capitalPp, numberPp, separatorPp)
  }

  const defaultCapitalPp = false
  const [capitalPp, setCapitalPp] = useState(defaultCapitalPp)
  const handleCapitalPp = (value: boolean) => {
    setCapitalPp(value)
    handleGeneratePp(nWords, upperPp, value, numberPp, separatorPp)
  }

  const defaultNumberPp = false
  const [numberPp, setNumberPp] = useState(defaultNumberPp)
  const handleNumberPp = (value: boolean) => {
    setNumberPp(value)
    handleGeneratePp(nWords, upperPp, capitalPp, value, separatorPp)
  }

  const defaultSeparatorPp = '-'
  const [separatorPp, setSeparatorPp] = useState(defaultSeparatorPp)
  const handleSeparatorPp = (value: string) => {
    setSeparatorPp(value)
    handleGeneratePp(nWords, upperPp, capitalPp, numberPp, value)
  }
  // #endregion End of options for passphrase

  const handleGenerateClicked = async () => {
    if (type === 'password') {
      handleGeneratePwd(nChars, upperPwd, lowerPwd, numberPwd, specialPwd)
    } else {
      handleGeneratePp(nWords, upperPp, capitalPp, numberPp, separatorPp)
    }
  }

  const handleGeneratePwd = (
    nChars: number,
    upper: boolean,
    lower: boolean,
    number: boolean,
    special: boolean
  ) => {
    const pwd = generatePassword(nChars, upper, lower, number, special)
    setResult(pwd)
    const zxcvbnObj = zxcvbn(pwd)
    setPwdStrength(
      calculatePwdStrength(+zxcvbnObj.crack_times_seconds.offline_slow_hashing_1e4_per_second)
    )
    setTimeToCrackDisplay(
      zxcvbnObj.crack_times_display.offline_slow_hashing_1e4_per_second as string
    )
    setPwdHistory([pwd, ...pwdHistory])
  }

  const handleGeneratePp = (
    nWords: number,
    upper: boolean,
    capital: boolean,
    number: boolean,
    separator: string
  ) => {
    const pp = generatePassphrase(nWords, upper, capital, number, separator)
    setResult(pp)
    const zxcvbnObj = zxcvbn(pp)
    setPwdStrength(
      calculatePwdStrength(+zxcvbnObj.crack_times_seconds.offline_slow_hashing_1e4_per_second)
    )
    setTimeToCrackDisplay(
      zxcvbnObj.crack_times_display.offline_slow_hashing_1e4_per_second as string
    )
  }

  return (
    <MainContainer className="justify-between h-full">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col flex-wrap w-full gap-4">
          {/* header */}
          <div className="flex flex-wrap gap-8">
            {/* buttons */}
            <div className="flex flex-row flex-wrap items-center gap-4">
              <ButtonGenerate onClick={handleGenerateClicked} />
              <ButtonCopy text={result} />
            </div>

            {/* type */}
            <RadioGroup
              className="flex gap-4"
              defaultValue={defaultType}
              onValueChange={handleSelectTypes}
            >
              {generateTypes.map(item => (
                <div key={item.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={item.value} id={item.value} />
                  <label htmlFor={item.value}>{item.name}</label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-wrap w-full gap-4">
            {/* Options for password */}
            <div
              className={cn('flex flex-col gap-4 w-full', {
                hidden: type === 'passphrase'
              })}
            >
              {/* nChars */}
              <div className="flex flex-wrap w-full max-w-screen-sm gap-2">
                <div className="whitespace-nowrap">Number of characters</div>
                <div className="flex items-center w-full gap-2 sm:flex-1 sm:min-w-0 flex-nowrap">
                  <Slider
                    onValueChange={handleCharsChanged}
                    defaultValue={[defaultNChars]}
                    max={maxNChars}
                    min={minNChars}
                    step={1}
                    className="sm:min-w-[256px] flex-1"
                  />
                  <div>{nChars}</div>
                </div>
              </div>

              {/* Other options for password */}
              <div className="flex flex-wrap w-full gap-4 my-1">
                {/* Uppercase */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={handleUpperPwdChanged}
                    defaultChecked={defaultUpperPwd}
                    id="capitalize"
                    disabled={disableOptsPwd && upperPwd}
                  />
                  <label
                    htmlFor="capitalize"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                  >
                    A-Z
                  </label>
                </div>

                {/* Lowercase */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={handleLowerPwdChanged}
                    defaultChecked={defaultLowerPwd}
                    id="miniscule"
                    disabled={disableOptsPwd && lowerPwd}
                  />
                  <label
                    htmlFor="miniscule"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                  >
                    a-z
                  </label>
                </div>

                {/* Contain number */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={handleNumberPwdChanged}
                    defaultChecked={defaultNumberPwd}
                    id="contain-number"
                    disabled={disableOptsPwd && numberPwd}
                  />
                  <label
                    htmlFor="contain-number"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                  >
                    0-9
                  </label>
                </div>

                {/* Contain special */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={handleSpecialPwdChanged}
                    defaultChecked={defaultSpecialPwd}
                    id="contain-special"
                    disabled={disableOptsPwd && specialPwd}
                  />
                  <label
                    htmlFor="contain-special"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                  >
                    {specialChars}
                  </label>
                </div>
              </div>
            </div>

            {/* Options for passphrase */}
            <div
              className={cn('flex flex-col gap-4 w-full', {
                hidden: type === 'password'
              })}
            >
              {/* nWords */}
              <div className="flex flex-wrap w-full max-w-screen-sm gap-2">
                <div className="whitespace-nowrap">Number of words</div>
                <div className="flex items-center w-full gap-2 sm:flex-1 sm:min-w-0 flex-nowrap">
                  <Slider
                    onValueChange={handleWordsChanged}
                    defaultValue={[defaultNWords]}
                    max={maxNWords}
                    min={minNWords}
                    step={1}
                    className="sm:min-w-[240px] flex-1"
                  />
                  <div>{nWords}</div>
                </div>
              </div>

              {/* Other options for passphrase */}
              <div className={'flex w-full gap-4 flex-nowrap'}>
                {/* Uppercase */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={handleUpperPpChanged}
                    defaultChecked={defaultUpperPp}
                    id="capitalize-passphrase"
                    disabled={capitalPp}
                  />
                  <label
                    htmlFor="capitalize-passphrase"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                  >
                    Uppercase
                  </label>
                </div>

                {/* Capitalize */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={handleCapitalPp}
                    defaultChecked={defaultCapitalPp}
                    id="capitalize-passphrase"
                    disabled={upperPp}
                  />
                  <label
                    htmlFor="capitalize-passphrase"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                  >
                    Capitalize
                  </label>
                </div>

                {/* Include number */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    onCheckedChange={handleNumberPp}
                    defaultChecked={defaultNumberPp}
                    id="include-number"
                  />
                  <label
                    htmlFor="include-number"
                    className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 whitespace-nowrap"
                  >
                    Include number
                  </label>
                </div>

                {/* Word separator */}
                <div className="flex items-center space-x-2">
                  <div className="font-medium leading-none whitespace-nowrap">Word separator</div>
                  <input
                    type="text"
                    value={separatorPp}
                    onChange={e => handleSeparatorPp(e.target.value)}
                    className="w-8 h-6 px-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* result */}
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center justify-center h-20 p-4 border rounded-md min-h-fit bg-muted">
            <div
              className="w-full font-mono text-base break-words"
              dangerouslySetInnerHTML={{ __html: getMarkup(result) }}
            ></div>
            <div className="absolute top-2 right-2">
              <ButtonCopy className="px-2" text={result} />
            </div>
          </div>
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
        </div>

        {/* History */}
        <div className="flex flex-col gap-3 p-4 mt-4 overflow-auto border rounded-md db-scrollbar">
          <div>
            Last 5 passwords generated (<i>deleted when page is reloaded</i>)
          </div>
          <ol className="pl-6 font-mono text-sm list-decimal">
            {pwdHistory.slice(0, 5).map((pwd, index) => (
              <li key={index}>{pwd}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="text-sm italic">*The passphrase is generated from 100 random words.</div>
    </MainContainer>
  )
}

const handleDisableOptsPwd = (
  capitalize: boolean,
  miniscule: boolean,
  containNumber: boolean,
  containSpecial: boolean
) => {
  return +!capitalize + +!miniscule + +!containNumber + +!containSpecial === 3
}

const generatePassword = (
  nChars: number,
  upper: boolean,
  lower: boolean,
  number: boolean,
  special: boolean
) => {
  const chars = {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    special: specialChars
  }

  let validChars = ''
  if (lower) validChars += chars.lower
  if (upper) validChars += chars.upper
  if (number) validChars += chars.numbers
  if (special) validChars += chars.special

  let password = ''
  for (let i = 0; i < nChars; i++) {
    password += validChars[Math.floor(Math.random() * validChars.length)]
  }

  return password
}

const generatePassphrase = (
  nWords: number,
  upper: boolean,
  capital: boolean,
  number: boolean,
  separator: string
) => {
  let passphrase = ''
  for (let i = 0; i < nWords; i++) {
    const word = wordList[Math.floor(Math.random() * wordList.length)]
    passphrase += capital ? word[0].toUpperCase() + word.slice(1) : word
    passphrase += number ? Math.floor(Math.random() * 10) : ''
    if (i !== nWords - 1) passphrase += separator
  }
  return upper ? passphrase.toUpperCase() : passphrase
}

export const calculatePwdStrength = (crackTimesSeconds: number) => {
  if (crackTimesSeconds < 3 * 60) return 'Very weak'
  if (crackTimesSeconds < 24 * 60 * 60) return 'Weak'
  if (crackTimesSeconds < 15 * 24 * 60 * 60) return 'Good'
  if (crackTimesSeconds < 365 * 24 * 60 * 60) return 'Strong'
  return 'Very strong'
}

const getMarkup = (pwd: string) => {
  if (!pwd || pwd.length === 0) return ''
  let markup = ''
  for (const char of pwd) {
    if ('0123456789'.indexOf(char) !== -1) {
      markup += `<span class="text-blue-500 dark:text-blue-400">${char}</span>`
    } else if (specialChars.indexOf(char) !== -1) {
      markup += `<span class="text-red-500">${char}</span>`
    } else {
      markup += char
    }
  }
  return markup
}
