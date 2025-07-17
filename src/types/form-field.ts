import type { FormRules } from 'element-plus'
import type { MaybeRef } from '@vueuse/core'  // or from 'vue-demi' depending on what you're using

export interface FormProps<T extends MaybeRef<string | Record<string, any>> = Record<string, any>> {
  formFields: FormField[]
  formData: T
  labelWidth?: string
  rules?: FormRules<T>
  showSubmit?: boolean
  submitText?: string
  showReset?: boolean
  model?: 'readOnly' | 'edit' | 'create'
}
export interface FormFieldOption {
  label: string
  value: string | number
}

export type FormFieldType = 
  | 'input' 
  | 'textarea' 
  | 'select' 
  | 'radio' 
  | 'checkbox' 
  | 'date' 
  | 'datetime' 
  | 'number' 
  | 'password' 
  | 'email'
  | 'upload'
  | 'custom'

export interface FormField {
  label: string
  prop: string
  type: FormFieldType
  placeholder?: string
  format?: string // For date/datetime fields
  limit?: number  // For file uploads
  rows?: number   // For textarea
  options?: FormFieldOption[]
  required?: boolean
  rules?: FormRules
  slotName?: string // For custom slot content
  [key: string]: any // For additional properties
}


export type FormModel = 'readOnly' | 'edit' | 'create'
