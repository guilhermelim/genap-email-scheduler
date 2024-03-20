import mjml2html from 'mjml';

export async function compileMJMLTemplate(mjml: string): Promise<string> {
  try {
    const { html } = mjml2html(mjml);
    return html;
  } catch (error) {
    console.error('Erro ao compilar o template MJML:', error);
    throw error;
  }
}
