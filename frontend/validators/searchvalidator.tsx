export function ValidateSearchInput(input: string): boolean {
  if (input.length == 0 || input.replaceAll(' ', '').length == 0) {
    return false; // It's going to be either whitespace or empty string
  }

  if (input.length > 200) {
    return false; // too long
  }

  return true;
}