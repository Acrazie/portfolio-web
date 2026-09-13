#!/usr/bin/env bun
import fs from 'node:fs';
import process from 'node:process';

const ALLOWED_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'revert',
];

const COMMIT_REGEX =
  /^(?<type>feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(?:\((?<scope>[a-zA-Z0-9_\-\/\.]+)\))?(?<breaking>!)?:\s+(?<subject>.+)$/;

function getCommitMessage() {
  const target = process.argv[2];
  if (!target) {
    console.error('❌ Erreur : Aucun fichier ou message de commit fourni.');
    process.exit(1);
  }

  if (fs.existsSync(target)) {
    return fs.readFileSync(target, 'utf8');
  }

  return target;
}

function validate() {
  const rawMessage = getCommitMessage();
  const lines = rawMessage
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => !l.startsWith('#')); // ignore comment lines

  const firstLine = lines[0];

  if (!firstLine) {
    console.error('❌ Erreur : Le message de commit ne peut pas être vide.');
    process.exit(1);
  }

  // Exemptions standard
  if (
    firstLine.startsWith('Merge ') ||
    firstLine.startsWith('Revert ') ||
    firstLine.startsWith('fixup! ') ||
    firstLine.startsWith('squash! ') ||
    /^chore\((?:main|release)\):\s*release/i.test(firstLine)
  ) {
    console.log('ℹ️  Message exempté de la validation conventionnelle.');
    process.exit(0);
  }

  const match = firstLine.match(COMMIT_REGEX);

  if (!match) {
    console.error('\n❌ Erreur : Le message de commit ne respecte pas les Conventional Commits.');
    console.error(`👉 Message reçu : "${firstLine}"`);
    console.error('\n📋 Format attendu :');
    console.error('   <type>(<scope>)?: <description>');
    console.error('   exemples :');
    console.error('     feat(ui): add contact form');
    console.error('     fix(auth): prevent session timeout bug');
    console.error('     ci: configure lefthook pre-commit\n');
    console.error('Types autorisés :');
    console.error(`   ${ALLOWED_TYPES.join(', ')}\n`);
    process.exit(1);
  }

  const { type, subject } = match.groups;

  if (!subject || subject.trim().length < 3) {
    console.error('\n❌ Erreur : La description du commit est trop courte (minimum 3 caractères).');
    process.exit(1);
  }

  console.log(`✅ Commit message valide [${type}] : ${firstLine}`);
  process.exit(0);
}

validate();
