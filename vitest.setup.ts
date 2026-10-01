const data = new Map<string, string>();

const memoryStorage = {
  getItem: (key: string) => data.get(key) ?? null,
  setItem: (key: string, value: string) => void data.set(key, value),
  removeItem: (key: string) => void data.delete(key),
  clear: () => data.clear(),
  key: (index: number) => Array.from(data.keys())[index] ?? null,
  get length() {
    return data.size;
  },
} as Storage;

Object.defineProperty(globalThis, "localStorage", {
  value: memoryStorage,
  configurable: true,
});