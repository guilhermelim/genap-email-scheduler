import { getTemplateGenap } from '@/templates';

export default async function getLeeds(): Promise<
  { email: string; subject: string; html: string }[]
> {
  // Simule aqui o carregamento de leads de algum lugar
  const leads = [
    {
      email: 'guilherme@genap.com.br',
      subject: 'Assunto de Email',
      html: await getTemplateGenap({
        name: 'Guilherme Lima',
        email: 'guilherme@genap.com.br',
      }),
      // text: 'Modernize seus sistemas e impulsione sua empresa! Soluções de desenvolvimento de sistemas para resultados eficientes.',
      text: 'Esse é um email belo e lindo!',
    },
    {
      email: 'guilhermem.lima@outlook.com',
      subject: 'Assunto de Email',
      html: await getTemplateGenap({
        name: 'Guilherme Lima',
        email: 'guilherme@genap.com.br',
      }),
      text: 'Esse é um email belo e lindo!',
    },
    {
      email: 'guilhermemoreiralima.br@gmail.com',
      subject: 'Assunto de Email',
      html: await getTemplateGenap({
        name: 'Guilherme Lima',
        email: 'guilherme@genap.com.br',
      }),
      text: 'Esse é um email belo e lindo!',
    },
  ];

  return leads;
}
