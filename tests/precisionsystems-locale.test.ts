import assert from 'node:assert/strict';
import test from 'node:test';

import {
  resolvePrecisionSystemsBasePath,
  resolvePrecisionSystemsLocale,
} from '../src/tenants/precisionsystems/copy.ts';

function makeRequest(path: string, host: string, headers: Record<string, string> = {}) {
  return new Request(`https://${host}${path}`, { headers });
}

test('precision systems locale uses browser language when supported', () => {
  const request = makeRequest('/contact', 'precisionsystems.ch', {
    'accept-language': 'en-US,en;q=0.9',
  });

  assert.equal(resolvePrecisionSystemsLocale(request), 'en');
});

test('precision systems locale prefers aw_lang cookie over browser language', () => {
  const request = makeRequest('/contact', 'precisionsystems.ch', {
    'accept-language': 'en-US,en;q=0.9',
    cookie: 'aw_lang=de',
  });

  assert.equal(resolvePrecisionSystemsLocale(request), 'de');
});

test('precision systems locale falls back to french when unsupported', () => {
  const request = makeRequest('/contact', 'precisionsystems.ch', {
    'accept-language': 'es-ES,es;q=0.9',
  });

  assert.equal(resolvePrecisionSystemsLocale(request), 'fr');
});

test('precision systems host uses clean root URLs', () => {
  const request = makeRequest('/contact', 'precisionsystems.ch');

  assert.equal(resolvePrecisionSystemsBasePath(request), '');
});

test('precision systems preview keeps the tenant base path', () => {
  const request = makeRequest('/precisionsystems/contact', 'localhost:4321');

  assert.equal(resolvePrecisionSystemsBasePath(request), '/precisionsystems');
});
