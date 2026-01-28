const client = require('firebase-tools');

(async () => {
  try {
    await client.deploy({
      project: 'welwitschiadata-com',
      only: 'hosting',
      cwd: process.cwd()
    });
    console.log('Deploy success!');
  } catch (err) {
    console.error('Deploy error:', err);
    process.exit(1);
  }
})();
