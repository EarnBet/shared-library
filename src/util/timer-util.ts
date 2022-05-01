export function sleep(delayInMilliseconds: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, delayInMilliseconds);
  });
}
