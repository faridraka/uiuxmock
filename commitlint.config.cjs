module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'style', 'docs', 'chore'],
    ],
    'scope-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 50],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case']],
    'subject-full-stop': [2, 'never', '.'],
  },
};