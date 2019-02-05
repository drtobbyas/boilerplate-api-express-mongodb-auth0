module.exports = {
  apps: [
    {
      name: 'express-api',
      script: './bin/server.js',
      args: [
        '--toto=heya coco',
        '-d',
        '1',
      ],
      watch: true,
      ignore_watch: [
        'node_modules',
        'logs',
        '.idea',
        '.git',
      ],
      node_args: '',
      merge_logs: true,
      cwd: './'
    },
  ],
};
