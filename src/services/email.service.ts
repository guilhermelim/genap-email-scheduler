import axios from 'axios';

import { emailConfig } from '@/emailConfig';

export async function sendEmail(
  to: string,
  subject: string,
  text?: string,
  html?: string,
): Promise<boolean> {
  try {
    const response = await axios.post(
      emailConfig.apiUrl,
      {
        to,
        subject,
        text,
        html,
      },
      {
        headers: {
          Authorization: `Bearer ${emailConfig.apiKey}`,
        },
      },
    );

    return response.status === 200;
  } catch (error) {
    // console.error('Erro ao enviar e-mail:', error);
    return false;
  }
}
