// This file is used in development environment

db = db.getSiblingDB('the-dancing-ponny');

db.createUser({
  user: 'BagginsOfBagEnd',
  pwd: 'ShireSecrets42',
  roles: [
    {
      role: 'readWrite',
      db: 'the-dancing-ponny',
    },
  ],
});

db.createCollection('userfulls');
