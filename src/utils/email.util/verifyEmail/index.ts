// Exemplo de uso:
import { PingEmail } from 'ping-email';

export async function verifyEmail(emailTest: string): Promise<boolean> {
  const pingEmail = new PingEmail({
    port: 25, // Default SMTP port
    fqdn: 'smtp.titan.email', // Fully Qualified Domain Name of your SMTP server
    sender: 'guilherme@genap.com.br', // Email address to use as the sender in SMTP checks,
    timeout: 10000, // Time in milliseconds to wait for a response from the SMTP server
    attempts: 3, // Number of attempts to verify the email address
    ignoreSMTPVerify: true,
  });

  const { email, valid, message } = await pingEmail.ping(emailTest);

  if (valid) {
    // console.log('O e-mail é válido:', email);
    return true;
  } else {
    console.error(`O email ${email} falhou na verificação :`, message);
    return false;
  }
}

// console.log('Verificando email!');
// verifyEmail('guilhermelima02@gmail.com');
// verifyEmail('guilherme.lima02@gmail.com');
// verifyEmail('guilhermem.lima2@outlook.com');
