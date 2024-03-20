import { sendEmail } from '@/services/email.service';

interface EmailResult {
  email: string;
  success: boolean;
}

const emailResults: EmailResult[] = [];

async function handleEmailResult(
  email: string,
  success: boolean,
): Promise<void> {
  console.log(`E-mail: ${email}, Sucesso: ${success ? 'Sim' : 'Não'}`);
  // Aqui você pode adicionar lógica para registrar o sucesso ou falha do envio
  emailResults.push({ email, success });
}

export function getEmailResults(): EmailResult[] {
  return emailResults;
}

export function clearEmailResults(): void {
  emailResults.length = 0;
}
export async function sendEmailsSequentially(
  leads: { email: string; subject: string; text?: string; html?: string }[],
  delayBetweenEmailsMs: number = 0,
): Promise<void> {
  for (const [index, lead] of leads.entries()) {
    const { email, subject, text, html } = lead;
    try {
      await sendEmail(email, subject, text, html);
      await handleEmailResult(email, true);
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${email}:`, error);
      await handleEmailResult(email, false);
    }
    // Adiciona o delay se não for o último e-mail da lista
    if (index < leads.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayBetweenEmailsMs));
    }
  }
}
