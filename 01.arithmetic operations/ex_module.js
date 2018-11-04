var nconf = require('nconf');
nconf.env();

console.log('os env :: %s', nconf.get('OS'));