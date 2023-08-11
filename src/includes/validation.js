import { string, ref as yupRef } from 'yup'

// 帳號
export const accountValidate = string()
  .matches(/^[a-zA-Z0-9]{6,12}$/, 'Error, only 6-12 digits of alphabets and numbers.')
  .required('Field not filled')

// 密碼
export const passwordValidate = string()
  .matches(/^[a-zA-Z0-9]{6,12}$/, 'Only 6-12 digits of alphabets and numbers.')
  .required('Field not filled')
