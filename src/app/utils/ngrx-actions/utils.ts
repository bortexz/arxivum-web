export function getMetadata(instance: any, key: string): any[] {
  const target = Object.getPrototypeOf(instance);

  if (!(Reflect as any).hasOwnMetadata(key, target)) {
    return [];
  }

  return (Reflect as any).getOwnMetadata(key, target);
}
