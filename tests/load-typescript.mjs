import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';

export default function loadTypescript(file, overrides = {}, environment = {}) {
  const code = ts.transpileModule(readFileSync(fileURLToPath(new URL(`../${file}`, import.meta.url)), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const context = {
    exports: {}, URL, URLSearchParams, console,
    process: { env: environment },
    require(name) {
      if (Object.hasOwn(overrides, name)) return overrides[name];
      throw new Error(`Unexpected dependency: ${name}`);
    },
  };
  vm.runInNewContext(code, context, { filename: file });
  return context.exports;
}
