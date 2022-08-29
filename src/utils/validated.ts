import * as Yup from 'yup';

export const validated = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password required 6 character')
    .max(50, 'Too Long!')
    .required('Please, provide your password'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please, provide your email'),
});
