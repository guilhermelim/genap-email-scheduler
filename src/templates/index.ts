import genapModel from './genap';
import { getTemplate, MergeTags } from './helpers';

export async function getTemplateGenap(mergeTags?: MergeTags): Promise<string> {
  return getTemplate(genapModel, mergeTags);
}

export async function getTemplateExample(
  mergeTags?: MergeTags,
): Promise<string> {
  return getTemplate(genapModel, mergeTags);
}
