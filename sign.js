// Signs the heartbeat: the time now, signed with the heartbeat key kept as this repository's secret. Copies of
// Ultimate GST accept their licence check only with a recent heartbeat (the key can sign nothing else they trust).
const crypto = require('crypto');
const key = process.env.HEARTBEAT_KEY;
if (!key) { console.error('HEARTBEAT_KEY is not set'); process.exit(1); }
const body = Buffer.from(JSON.stringify({ t: new Date().toISOString() })).toString('base64url');
process.stdout.write(body + '.' + crypto.sign(null, Buffer.from(body), key).toString('base64url') + '\n');
