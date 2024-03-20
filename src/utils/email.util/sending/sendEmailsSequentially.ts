import { sendEmail } from '@/services/email.service';

import { handleEmailResult } from '../results';

let emailsSentToday: number = 0;

function calculateDelay(
  options: { delayBetweenEmailsMs?: number; maxEmailsPerHour?: number } = {},
): number {
  const { delayBetweenEmailsMs = 1000, maxEmailsPerHour } = options;

  let delay = delayBetweenEmailsMs;

  if (maxEmailsPerHour) {
    const delayPerHour = 3600000 / maxEmailsPerHour;
    delay = Math.max(delay, delayPerHour);
  }

  // Garante que o delay nunca seja menor que delayBetweenEmailsMs
  delay = Math.max(delay, delayBetweenEmailsMs);

  return delay;
}

export async function sendEmailsSequentially(
  leads: { email: string; subject: string; text?: string; html?: string }[],
  options: {
    delayBetweenEmailsMs?: number;
    maxEmailsPerHour?: number;
    dailyEmailLimit?: number;
    maxConsecutiveFailures?: number; // Novo parâmetro opcional
  } = {},
): Promise<void> {
  const delay = calculateDelay(options);
  const { dailyEmailLimit, maxConsecutiveFailures = 5 } = options; // Definindo o padrão para 5 falhas seguidas
  let consecutiveFailures = 0; // Contador de falhas consecutivas

  for (const [index, lead] of leads.entries()) {
    if (dailyEmailLimit && emailsSentToday >= dailyEmailLimit) {
      console.log('Limite diário de e-mails atingido.');
      break;
    }

    const { email, subject, text, html } = lead;
    try {
      const result = await sendEmail(email, subject, text, html);
      emailsSentToday++;
      await handleEmailResult(email, result, emailsSentToday);

      if (!result.success) {
        throw new Error('Erro ao enviar email.');
      }

      consecutiveFailures = 0; // Reseta o contador de falhas consecutivas após um envio bem-sucedido
    } catch (error) {
      consecutiveFailures++;
      console.error(`Erro ao enviar e-mail para ${email}:`, error);
      await handleEmailResult(
        email,
        {
          success: false,
          message: 'Erro ao enviar email.',
          error: (error as Error)?.message ?? '',
        },
        emailsSentToday,
      );
      console.log(
        `consecutiveFailures: ${consecutiveFailures} | maxConsecutiveFailures: ${maxConsecutiveFailures}`,
      );
      if (consecutiveFailures >= maxConsecutiveFailures) {
        console.log(
          `Parando o envio após ${maxConsecutiveFailures} falhas seguidas.`,
        );
        break;
      }
    }

    // Adiciona o delay se não for o último e-mail da lista
    if (index < leads.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
