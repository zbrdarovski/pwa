const webpush = require('web-push');

const publicVapidKey = 'BHnffHGsnJ65zTXW8mt1vTjp1w0GobvYGfnJpxF-9zXNi1yYjvpMNk-zfZuyQSoOr95QZhBepDtcqoV10dIyZro';
const privateVapidKey = 'tLISf1ckjjne1qj-a9iLpwMMlBEnQfkbZSC4y7EcFXI';

webpush.setVapidDetails('mailto:zdravko.brdarovski@student.um.si', publicVapidKey, privateVapidKey);

module.exports = webpush;
