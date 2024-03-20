// import * as fs from 'fs';

import { getTemplateGenap } from '@/templates';

import leeds from './leeds.json';

// Tipo para o objeto de lead
interface Lead {
  name: string;
  email: string;
  phone: string;
}

export default async function getLeeds(): Promise<
  { email: string; subject: string; html: string }[]
> {
  // // Simule aqui o carregamento de leads de algum lugar
  // const leads = [
  //   {
  //     email: 'guilherme@genap.com.br',
  //     subject: 'Modernize seus sistemas e impulsione sua empresa 🚀',
  //     html: await getTemplateGenap({
  //       name: 'Guilherme Lima',
  //       email: 'guilherme@genap.com.br',
  //     }),
  //     text: 'Modernize seus sistemas e impulsione sua empresa! Soluções de desenvolvimento de sistemas para resultados eficientes.',
  //   },
  //   {
  //     email: 'guilhermem.lima@outlook.com',
  //     subject: 'Modernize seus sistemas e impulsione sua empresa 🚀',
  //     html: await getTemplateGenap({
  //       name: 'Guilherme Lima',
  //       email: 'guilherme@genap.com.br',
  //     }),
  //     text: 'Modernize seus sistemas e impulsione sua empresa! Soluções de desenvolvimento de sistemas para resultados eficientes.',
  //   },
  //   {
  //     email: 'guilhermemoreiralima.br@gmail.com',
  //     subject: 'Modernize seus sistemas e impulsione sua empresa 🚀',
  //     html: await getTemplateGenap({
  //       name: 'Guilherme Lima',
  //       email: 'guilherme@genap.com.br',
  //     }),
  //     text: 'Modernize seus sistemas e impulsione sua empresa! Soluções de desenvolvimento de sistemas para resultados eficientes.',
  //   },
  // ];
  // return leads;

  // Processa os leeds
  const leads = leeds.map(async (lead: Lead) => {
    return {
      email: lead.email,
      subject: 'Modernize seus sistemas e impulsione sua empresa 🚀',
      html: await getTemplateGenap({
        name: lead.name,
        email: lead.email,
      }),
      text: 'Modernize seus sistemas e impulsione sua empresa! Soluções de desenvolvimento de sistemas para resultados eficientes.',
    };
  });

  // Aguarda todas as promessas de processamento dos leeds
  return Promise.all(leads);
}
