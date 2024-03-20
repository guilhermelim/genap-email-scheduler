import axios from 'axios';

import { emailConfig } from '@/emailConfig';

// export async function sendEmail(
//   to: string,
//   subject: string,
//   text?: string,
//   html?: string,
// ): Promise<boolean> {
//   try {
//     const response = await axios.post(
//       emailConfig.apiUrl,
//       {
//         to,
//         subject,
//         text,
//         html,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${emailConfig.apiKey}`,
//         },
//       },
//     );

//     return response.status === 200;
//   } catch (error) {
//     console.error('Erro ao enviar e-mail:', error);
//     return false;
//   }
// }

export async function sendEmail(
  to: string,
  subject: string,
  text?: string,
  html?: string,
): Promise<{ success: boolean; message: string; error?: string }> {
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

    if (response.status === 200) {
      return { success: true, message: 'Email enviado com sucesso!' };
    } else {
      throw new Error('Erro ao enviar email.');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // console.error('Erro ao enviar e-mail:', error);

    return {
      success: false,
      message: 'Erro ao enviar email.',
      error: error?.response?.data?.error,
    };
  }
}
// ?.message ?? ''
