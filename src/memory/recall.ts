import { getStore } from "../db/memoryStore.js";

export function recallVendorMemory(vendor: string) {
  const store = getStore();
  return store.vendorMemory.filter(m => m.vendor === vendor);
}
