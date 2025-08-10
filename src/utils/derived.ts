import { FormField } from '../types'

// Evaluate derived formula by building a function with parent values injected
export function computeDerivedValue(field: FormField, allFields: FormField[], values: Record<string, any>): any {
  if (!field.derived) return undefined
  const parents = field.derived.parents
  try {
    const func = new Function(...parents, `return (${field.derived!.formula});`)
    const args = parents.map(p => values[p])
    return func(...args)
  } catch (e) {
    return 'ERR'
  }
}
