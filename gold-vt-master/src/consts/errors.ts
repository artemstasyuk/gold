/* Map server error codes to Vuetify i18n keys */

export const formErrors: Record<string, string> = {
  'invalid login or password': 'errors.formErrors.incorrectLoginOrPassword'
};

export const getI18nFormError = (key: string): string => {
  return formErrors[key] || 'errors.unknown';
};

export const validationErrors: Record<string, string> = {
  required: 'errors.validation.required',
  incorrect: 'errors.validation.incorrect',
  unique: 'errors.validation.unique',
  format: 'errors.validation.format',
  url: 'errors.validation.url',
  email: 'errors.validation.email',
  max: 'errors.validation.max',
  min: 'errors.validation.min',
  dateRange: 'errors.validation.dateRange'
};

export const getI18nFieldError = (key: string | null): string | void => {
  if (!key) {
    return '';
  }

  return validationErrors[key] || 'errors.unknown';
};
