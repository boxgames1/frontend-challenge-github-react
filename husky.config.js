module.exports = {
  hooks: {
    'pre-commit': 'npx --no-install lint-staged',
  },
};
