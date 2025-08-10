export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date'

export interface ValidationRules {
  notEmpty?: boolean
  minLength?: number | null
  maxLength?: number | null
  email?: boolean
  passwordRule?: boolean
}

export interface DerivedSpec {
  parents: string[]
  formula: string // a JS expression referencing parents by id, e.g. "parent1 + '-' + parent2"
}

export interface FormField {
  id: string
  type: FieldType
  label: string
  required: boolean
  defaultValue?: string
  options?: string[]
  validation?: ValidationRules
  derived?: DerivedSpec | null
}

export interface FormSchema {
  id: string
  name: string
  createdAt: string
  fields: FormField[]
}
