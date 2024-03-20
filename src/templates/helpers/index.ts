import { compileMJMLTemplate } from '@/utils/mjml.util';

export interface MergeTags {
  [key: string]: string;
}

function applyMergeTags(template: string, mergeTags: MergeTags): string {
  const regex = /{{\s*([^{}]+?)\s*}}/g;

  const replacedTemplate = template.replace(regex, (match, key) => {
    const cleanedKey = key.trim().replace(/%20/g, '').replace(/\s+/g, ''); // Remove espaços em branco, quebras de linha e %20 da chave
    if (Object.prototype.hasOwnProperty.call(mergeTags, cleanedKey)) {
      return mergeTags[cleanedKey];
    } else {
      return match;
    }
  });

  return replacedTemplate;
}

type ModelGetter = () => string;

export async function getTemplate(
  modelGetter: ModelGetter,
  mergeTags?: MergeTags,
): Promise<string> {
  let model = modelGetter();

  // Se mergeTags foram passadas como parâmetro, aplica-as ao template
  if (mergeTags) {
    model = applyMergeTags(model, mergeTags);
  }

  // Compila o template MJML para HTML
  const html = await compileMJMLTemplate(model);

  // Retorna o HTML compilado
  return html;
}
