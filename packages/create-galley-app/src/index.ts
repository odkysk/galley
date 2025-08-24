#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prompts from 'prompts';
import { red, green, cyan, yellow, blue, magenta } from 'kolorist';
import minimist from 'minimist';

// Helper to get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = minimist(process.argv.slice(2), {
  default: { help: false },
  alias: { h: 'help', t: 'template' },
  string: ['_']
});

const cwd = process.cwd();

// Templates available
const TEMPLATES = [
  {
    name: 'basic',
    display: 'Basic',
    color: cyan,
    description: 'Basic setup with essential Galley components'
  },
  {
    name: 'corporate',
    display: 'Corporate',
    color: blue,
    description: 'Corporate branding setup with professional templates'
  },
  {
    name: 'marketing',
    display: 'Marketing',
    color: magenta,
    description: 'Marketing-focused templates for campaigns and promotion'
  }
];

const DEFAULT_TARGET_DIR = 'galley-project';

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  let targetDir = argTargetDir || DEFAULT_TARGET_DIR;
  
  const getProjectName = () =>
    targetDir === '.' ? path.basename(path.resolve()) : targetDir;

  let result: prompts.Answers<
    'projectName' | 'overwrite' | 'packageName' | 'template'
  >;

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: DEFAULT_TARGET_DIR,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || DEFAULT_TARGET_DIR;
          }
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
          name: 'overwrite',
          message: () =>
            (targetDir === '.'
              ? 'Current directory'
              : \`Target directory "\${targetDir}"\`) +
            \` is not empty. Remove existing files and continue?\`
        },
        {
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
          },
          name: 'overwriteChecker'
        },
        {
          type: 'text',
          name: 'packageName',
          message: 'Package name:',
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || 'Invalid package.json name'
        },
        {
          type: argTemplate && TEMPLATES.find(t => t.name === argTemplate) ? null : 'select',
          name: 'template',
          message: 'Select a template:',
          initial: 0,
          choices: TEMPLATES.map((template) => {
            const templateColor = template.color;
            return {
              title: templateColor(template.display || template.name),
              description: template.description,
              value: template.name
            };
          })
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        }
      }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { template, overwrite, packageName } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  // Determine template
  const templateName = template || argTemplate || 'basic';

  console.log(\`\\nScaffolding project in \${root}...\`);

  const templateDir = path.resolve(__dirname, '..', 'templates', templateName);
  
  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  // Copy template files
  const files = fs.readdirSync(templateDir);
  for (const file of files.filter((f) => f !== 'package.json')) {
    write(file);
  }

  // Handle package.json
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
  );

  pkg.name = packageName || getProjectName();

  write('package.json', JSON.stringify(pkg, null, 2) + '\\n');

  const cdProjectName = path.relative(cwd, root);
  console.log(\`\\n\${green('✓')} Done. Now run:\\n\`);
  if (root !== cwd) {
    console.log(
      \`  cd \${
        cdProjectName.includes(' ') ? \`"\${cdProjectName}"\` : cdProjectName
      }\`
    );
  }
  console.log(\`  \${yellow('pnpm install')}\`);
  console.log(\`  \${yellow('pnpm dev')}\`);
  console.log();
}

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\\/+$/g, '');
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\\d\\-*~][a-z\\d\\-*._~]*\\/)?[a-z\\d\\-~][a-z\\d\\-._~]*$/.test(
    projectName
  );
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\\d\\-~]+/g, '-');
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === '.git') {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

init().catch((e) => {
  console.error(e);
});