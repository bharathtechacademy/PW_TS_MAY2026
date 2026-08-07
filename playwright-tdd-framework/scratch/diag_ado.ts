import fs from 'fs';
import path from 'path';

function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        process.env[key] = val;
      }
    }
  }
}

loadEnv();

const pat = (process.env.AZURE_PAT || '').trim();
const email = (process.env.AZURE_EMAIL || '').trim();
console.log('PAT Raw:', pat);
console.log('Email:', email);

async function testAuth() {
  const org = 'bharattechacademy3';
  const proj = 'Creatio%20CRM';
  const planId = '1357';
  const suiteId = '1359';

  const authHeaders = [
    { name: 'Basic :PAT', val: `Basic ${Buffer.from(`:${pat}`).toString('base64')}` },
    { name: 'Basic email:PAT', val: `Basic ${Buffer.from(`${email}:${pat}`).toString('base64')}` },
    { name: 'Bearer PAT', val: `Bearer ${pat}` }
  ];

  const urls = [
    `https://dev.azure.com/${org}/${proj}/_apis/test/Plans/${planId}/Suites/${suiteId}/testcases?api-version=7.0`,
    `https://dev.azure.com/${org}/${proj}/_apis/test/Plans/${planId}/suites/${suiteId}/testcases?api-version=7.1-preview.3`,
    `https://dev.azure.com/${org}/_apis/projects?api-version=7.0`,
    `https://dev.azure.com/${org}/${proj}/_apis/wit/workitems/10?api-version=7.0`
  ];

  for (const auth of authHeaders) {
    console.log(`\n--- Testing Auth: ${auth.name} ---`);
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          headers: {
            'Authorization': auth.val,
            'Accept': 'application/json'
          }
        });
        console.log(`URL: ${url}`);
        console.log(`Status: ${res.status} ${res.statusText}`);
        if (res.ok) {
          const json: any = await res.json();
          console.log(`SUCCESS! Data count / keys:`, Array.isArray(json.value) ? json.value.length : Object.keys(json));
          if (json.value && json.value.length > 0) {
            console.log('Sample item:', JSON.stringify(json.value[0]).substring(0, 200));
          }
        } else {
          const text = await res.text();
          console.log(`ERR Text preview:`, text.substring(0, 150));
        }
      } catch (err: any) {
        console.log(`FETCH ERROR:`, err.message);
      }
    }
  }
}

testAuth();
