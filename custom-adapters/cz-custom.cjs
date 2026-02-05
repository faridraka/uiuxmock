module.exports = {
  prompter: async (cz, commit) => {
    const { type } = await cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Commit type:',
        choices: [
          { name: 'feat      ✨  new feature', value: 'feat' },
          { name: 'fix       🐛  bug fix', value: 'fix' },
          { name: 'refactor  ♻️  code refactor', value: 'refactor' },
          { name: 'style     💄  formatting / style only', value: 'style' },
          { name: 'docs      📚  documentation', value: 'docs' },
          { name: 'chore     🔧  tooling / config', value: 'chore' },
        ],
      },
    ]);

    const { scope } = await cz.prompt([
      {
        type: 'input',
        name: 'scope',
        message: 'Scope (module, feature, file):',
        validate: (v) => (v ? true : 'Scope is required'),
      },
    ]);

    const { subject } = await cz.prompt([
      {
        type: 'input',
        name: 'subject',
        message: 'Short description (imperative, max 50 chars):',
        validate: (v) => {
          if (!v) return 'Description is required';
          if (v.length > 50) return 'Max 50 characters';
          if (v[0] === v[0].toUpperCase())
            return 'Must start with lowercase';
          if (v.endsWith('.')) return 'Must not end with dot';
          return true;
        },
      },
    ]);

    const { body } = await cz.prompt([
      {
        type: 'input',
        name: 'body',
        message: 'Long description (optional):',
      },
    ]);

    const { footer } = await cz.prompt([
      {
        type: 'input',
        name: 'footer',
        message: 'Footer (issue, breaking change, etc.) (optional):',
      },
    ]);

    const { pr } = await cz.prompt([
      {
        type: 'input',
        name: 'pr',
        message: 'PR reference (optional, ex: PR-123):',
      },
    ]);

    const { task } = await cz.prompt([
      {
        type: 'input',
        name: 'task',
        message: 'Task ID (optional, ex: CU-1234):',
      },
    ]);

    let message = `${type}(${scope}): ${subject}`;

    if (body) message += `\n\n${body}`;
    if (footer || pr || task) message += '\n\n';

    if (footer) message += `${footer}\n`;
    if (pr) message += `Refer #${pr}\n`;
    if (task) message += `fixes ${task}\n`;

    commit(message.trim());
  },
};