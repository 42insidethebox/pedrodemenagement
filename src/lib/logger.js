function ts() {
  return new Date().toISOString();
}

export const logger = {
  info(message, context) {
    safeLog('info', message, context);
  },
  error(error, context) {
    const message = error && error.message ? error.message : String(error);
    safeLog('error', message, { ...context, stack: error?.stack });
  },
  child(extra) {
    return {
      info: (m, c) => logger.info(m, { ...extra, ...c }),
      error: (e, c) => logger.error(e, { ...extra, ...c }),
    };
  },
};

function safeLog(level, message, context) {
  const line = { level, time: ts(), message, ...(context || {}) };
  try {
    // eslint-disable-next-line no-console
    console[level === 'error' ? 'error' : 'log'](JSON.stringify(line));
  } catch {
    // eslint-disable-next-line no-console
    console.log(`[${level}] ${message}`);
  }
}

