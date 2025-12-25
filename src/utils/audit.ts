import { getStore, saveStore } from "../db/memoryStore.js";

export function logAudit(
  invoiceId: string,
  step: string,
  details: string
) {
  const store = getStore();
  store.auditTrail.push({
    invoiceId,
    step,
    details,
    timestamp: new Date().toISOString()
  });
  saveStore(store);
}
