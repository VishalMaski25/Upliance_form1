import { ValidationRules } from '../types'

export function validateValue(value: any, rules?: ValidationRules) {
  const errors: string[] = []
  if (!rules) return errors
  if (rules.notEmpty && (value === undefined || value === null || value === '')) errors.push('Cannot be empty')
  if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) errors.push(`Minimum length ${rules.minLength}`)
  if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) errors.push(`Maximum length ${rules.maxLength}`)
  if (rules.email) {
    const re = /\S+@\S+\.\S+/
    if (!re.test(value || '')) errors.push('Must be a valid email')
  }
  if (rules.passwordRule) {
    if (typeof value !== 'string' || value.length < 8 || !/\d/.test(value)) errors.push('Password must be >=8 chars and contain a number')
  }
  return errors
}
