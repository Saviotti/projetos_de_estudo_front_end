const MINIMUM_PASSWORD_LENGTH = 7;

export function validateLogin(email, password) {
  if (!email || !password) return true;

  const emailRegex = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
  const isEmailValid = email.match(emailRegex);

  const isPasswordValid = password.length < MINIMUM_PASSWORD_LENGTH;

  return !isEmailValid || isPasswordValid;
}
