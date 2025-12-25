import { getStore, saveStore } from "../db/memoryStore.js";

export function learnVendorMemory(
  vendor: string,
  key: string,
  value: string
) {
  const store = getStore();

  const existing = store.vendorMemory.find(
    m => m.vendor === vendor && m.key === key
  );

  if (existing) {
    existing.confidence = Math.min(existing.confidence + 0.1, 0.95);
    existing.usageCount++;
  } else {
    store.vendorMemory.push({
      vendor,
      key,
      value,
      confidence: 0.6,
      usageCount: 1,
      lastUsed: new Date().toISOString()
    });
  }

  saveStore(store);
}
