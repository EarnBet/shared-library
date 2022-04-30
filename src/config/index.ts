export function parseBooleanFromEnv(VARIABLE_NAME: string) {
  return process.env[VARIABLE_NAME] === "true";
}
