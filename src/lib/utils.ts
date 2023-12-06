import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v5 as uuidv5 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUuidBasedOnEmail(email: string) {
  return uuidv5(email, uuidv5.URL)
}