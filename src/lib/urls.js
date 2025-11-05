export function buildSuccessUrl(origin) {
  const o = (origin || '').replace(/\/$/, '');
  return `${o}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
}

export function buildCancelUrl(origin) {
  const o = (origin || '').replace(/\/$/, '');
  return `${o}/pricing`;
}

