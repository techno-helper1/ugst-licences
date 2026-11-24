// Signs the heartbeat: the time now and the fingerprint of the current status.json, signed with the heartbeat key
// kept as this repository's secret. Copies of Ultimate GST accept their licence check only with a recent heartbeat
// that matches the list they read (the key can sign nothing else they trust).
const crypto = require('crypto');
const fs = require('fs');
const key = process.env.HEARTBEAT_KEY;
if (!key) { console.error('HEARTBEAT_KEY is not set'); process.exit(1); }
const list = crypto.createHash('sha256').update(fs.readFileSync('status.json', 'utf8').trim()).digest('hex');
const body = Buffer.from(JSON.stringify({ t: new Date().toISOString(), list })).toString('base64url');
process.stdout.write(body + '.' + crypto.sign(null, Buffer.from(body), key).toString('base64url') + '\n');
