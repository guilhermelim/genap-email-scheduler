import fs from 'fs';
import path from 'path';

export default function getModel() {
  const templatePath = path.resolve(__dirname, 'index.mjml');
  const model = fs.readFileSync(templatePath, 'utf8');
  return model;
}
