import type { FormInstance, FormRules } from 'element-plus'

export interface FormField {
  label: string
  type: 'input' | 'textarea' | 'select' | 'date' | 'datetime' | 'number' | 'password' | 'email'
  prop: string
  options?: Array<{ label: string; value: string | number }>
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rules?: FormRules
  rows?: number
  [key: string]: any
}

export interface CourseFormData {
  title: string
  hours: string
  credit: string
  time: string
  person: string
  phone: string
  intro: string
}

export type FormModel = 'readOnly' | 'edit' | 'create'
