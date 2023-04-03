export function validateLogin(state) {
  const { email, password } = state;
  const passwordLength = 6;

  const emailRegex = (
    /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i);
  const validEmail = email.match(emailRegex);
  const validPassword = password.length < passwordLength;
  return !validEmail || validPassword;
}
