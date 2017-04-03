export function getOrSetMetadata (target, key, def?) {
  const md = (Reflect as any).getOwnMetadata(key, target);
  if (!md && def) (Reflect as any).defineMetadata(key, def, target);
  return md || def;
}

export function setMetadata (target, key, value) {
  (Reflect as any).defineMetadata(key, value, target);
}
