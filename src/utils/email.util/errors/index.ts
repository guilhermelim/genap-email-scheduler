import errorPatterns from './errorPatterns';

export function evaluateError(errorMsg: string): string | null {
  for (const pattern of errorPatterns) {
    const match = errorMsg.match(pattern.regex);
    if (match) {
      return pattern.message(match);
    }
  }
  return null; // Se nenhum padrão for correspondido
}
