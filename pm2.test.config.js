module.exports = {
  apps: [
    {
      name: 'kop-admin',
      script: 'npm',
      args: '-- run start:test',
      exec_mode: 'cluster',
      max_memory_restart: '500M',
    }
  ]
}
