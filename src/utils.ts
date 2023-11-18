export function assertExists<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error(`Expected value to exist`);
  }
  return value;
}
