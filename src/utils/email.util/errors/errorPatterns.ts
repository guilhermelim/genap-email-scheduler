import { format } from 'date-fns';

interface ErrorPattern {
  regex: RegExp;
  message: (match: RegExpMatchArray) => string;
}

const errorPatterns: ErrorPattern[] = [
  {
    regex: /Sender Daily Bounce Limit Exceeded.*\[time=([^\]]+)/,
    message: (match) => {
      const recoveryTimeUTC = match[1];
      // const recoveryTimeLocal = new Date(recoveryTimeUTC).toLocaleString(); // Convertendo para a linguagem local
      const recoveryTimeLocal = format(recoveryTimeUTC, 'dd/MM/yyyy HH:mm:ss');
      return `Limite diário de rejeição de emails excedido. Serviço indisponível até ${recoveryTimeLocal}.`;
    },
  },
  // Adicione outros padrões de erro conforme necessário
];

export default errorPatterns;
