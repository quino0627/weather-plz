/* eslint-disable @typescript-eslint/no-explicit-any */
// set localstorage with expire time
export function setWithExpire(key: string, value: unknown, ttl: number): void {
  const now = new Date();
  const item = {
    value,
    ttl: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getWithExpire(key: string): any {
  const itemStringified = localStorage.getItem(key);
  if (!itemStringified) return null;
  const item = JSON.parse(itemStringified);
  const now = new Date();
  if (now.getTime() > item.ttl) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
