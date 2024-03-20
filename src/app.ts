import getLeeds from '@/leeds';
import { getEmailResults, sendEmailsSequentially } from '@/utils/email.util';

async function main(): Promise<void> {
  try {
    const leads = await getLeeds(); // Agora estamos chamando a função assíncrona para obter os leads
    await sendEmailsSequentially(leads, {
      delayBetweenEmailsMs: 5000,
      maxEmailsPerHour: 300,
      dailyEmailLimit: 1000,
    });
    console.log('Envio da lista de e-mails concluído.');

    const results = getEmailResults();
    const successfulEmails = results.filter((result) => result.success);
    const failedEmails = results.filter((result) => !result.success);

    console.log(
      `Total de e-mails enviados com sucesso: ${successfulEmails.length}`,
    );
    console.log(`Total de e-mails com falha: ${failedEmails.length}`);
    failedEmails.length > 0 && console.log('Lista de e-mails com falha:');

    failedEmails.forEach(({ email }) => console.log(email));
  } catch (error) {
    console.error('Erro ao processar a lista de e-mails:', error);
  }
}

// Exemplo de uso:
main();
