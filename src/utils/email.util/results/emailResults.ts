import chalk from 'chalk';

import { evaluateError } from '../errors';

interface EmailResult {
  email: string;
  success: boolean;
  message: string;
  error?: string; // Permitir que 'error' seja 'undefined'
}

const emailResults: EmailResult[] = [];

export async function handleEmailResult(
  email: string,
  result: { success: boolean; message: string; error?: string },
  emailsSentToday: number,
): Promise<void> {
  const successLabel = result.success ? chalk.green('Sim') : chalk.red('Não');
  const errorMessage = () => {
    if (result.error) {
      const evaluatedError = evaluateError(result.error);
      if (evaluatedError) {
        return chalk.red(`${evaluatedError}`);
      }
      return chalk.red(result.error);
    }

    return chalk.gray('N/A');
  };
  const now = new Date().toLocaleTimeString(); // Obtém o horário atual
  console.log(
    `[${chalk.blue(now)}] [${emailsSentToday}] E-mail: ${chalk.yellow(email)}, Enviado: ${successLabel}, Erro: ${errorMessage()}`,
  );

  // Aqui você pode adicionar lógica para registrar o sucesso ou falha do envio
  emailResults.push({
    email,
    success: result.success,
    message: result.message,
    error: result.error ?? undefined,
  });
}

export function getEmailResults(): EmailResult[] {
  return emailResults;
}

export function clearEmailResults(): void {
  emailResults.length = 0;
}
