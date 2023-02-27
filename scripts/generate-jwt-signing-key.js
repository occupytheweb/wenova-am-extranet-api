const colors       = require('colors');
const secureRandom = require('secure-random');

console.log("Generating signing key...".blue);
const key = secureRandom(
  256,
  { type: 'Buffer' }
).toString('base64');
console.log("Done.".blue);

console.log(
  "\nAdd the following to the environment before running the app:\n".yellow
);
console.log(
  `${colors.bgMagenta('ENCODED_JWT_SIGNING_KEY')}=${colors.green(key)}\n`
);
