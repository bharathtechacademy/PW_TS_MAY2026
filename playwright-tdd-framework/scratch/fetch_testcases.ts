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

const pat = process.env.AZURE_PAT?.trim() || '';

async function testAuth() {
  console.log('PAT length:', pat.length);
  const token = Buffer.from(`:${pat}`).toString('base64');
  
  // Try 1: standard project endpoint
  const url1 = `https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_apis/test/Plans/1357/Suites/1359/testcases?api-version=7.0`;
  console.log('Testing URL 1:', url1);
  const res1 = await fetch(url1, {
    headers: {
      'Authorization': `Basic ${token}`,
      'Accept': 'application/json'
    }
  });
  console.log('Res 1 status:', res1.status, res1.statusText);
  if (res1.ok) {
    const json = await res1.json();
    console.log('Res 1 data:', JSON.stringify(json, null, 2));
  } else {
    const text = await res1.text();
    console.log('Res 1 text:', text.substring(0, 300));
  }

  // Try 2: get projects endpoint to test PAT validness
  const url2 = `https://dev.azure.com/bharattechacademy3/_apis/projects?api-version=7.0`;
  console.log('Testing URL 2:', url2);
  const res2 = await fetch(url2, {
    headers: {
      'Authorization': `Basic ${token}`,
      'Accept': 'application/json'
    }
  });
  console.log('Res 2 status:', res2.status, res2.statusText);
  if (res2.ok) {
    const json = await res2.json();
    console.log('Projects:', json.value?.map((p: any) => p.name));
  } else {
    const text = await res2.text();
    console.log('Res 2 text:', text.substring(0, 300));
  }
}

testAuth();
