import { describe, it, expect } from 'vitest'

function isValidPassword(password: string): boolean {
  if (password.length < 8) return false
  if (!password.split('').some(c => c >= 'A' && c <= 'Z')) return false
  if (!password.split('').some(c => c >= '0' && c <= '9')) return false
  return true
}

describe('Auth validation', () => {
  it('accepts a valid password', () => {
    expect(isValidPassword('Password123')).toBe(true)
  })

  it('rejects a password that is too short', () => {
    expect(isValidPassword('Pass1')).toBe(false)
  })

  it('rejects a password without uppercase', () => {
    expect(isValidPassword('password123')).toBe(false)
  })

  it('rejects a password without a digit', () => {
    expect(isValidPassword('PasswordOnly')).toBe(false)
  })
})