import * as yaml from 'js-yaml';

export function formatYaml(yamlString: string): string {
  try {
    const doc = yaml.load(yamlString);
    return yaml.dump(doc, { indent: 2 });
  } catch (e) {
    console.error("Error formatting YAML:", e);
    return yamlString; // Return original if formatting fails
  }
}

export function minifyYaml(yamlString: string): string {
  try {
    const doc = yaml.load(yamlString);
    return yaml.dump(doc, { indent: 0 });
  } catch (e) {
    console.error("Error minifying YAML:", e);
    return yamlString; // Return original if minifying fails
  }
}
