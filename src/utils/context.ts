// temporary backend context placeholder
export const getBackendContext = async () => {
  return {
    env: process.env.ENVIRONMENT || "development",
    timestamp: new Date().toISOString(),
  };
};
