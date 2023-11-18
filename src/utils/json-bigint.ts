export function jsonBigIntSerializer(key: string, value: any) {
  if (typeof value === "bigint") {
    return value.toString();
  }
  return value;
}
export function jsonBigIntDeserializer(key: string, value: any) {
  if (typeof value === "string") {
    try {
      return BigInt(value);
    } catch (err) {
      return value;
    }
  }
  return value;
}

JSON.stringify({ a: BigInt(123) }, jsonBigIntSerializer);
