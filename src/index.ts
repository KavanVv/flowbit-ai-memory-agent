import { recallVendorMemory } from "./memory/recall.js";
import { applyMemory } from "./memory/apply.js";
import { decide } from "./memory/decide.js";
import { logAudit } from "./utils/audit.js";
import { VendorMemory } from "./models/types.js";

export function processInvoice(invoice: any) {
  logAudit(invoice.invoiceId, "recall", "Recalling vendor memory");

  const memories = recallVendorMemory(invoice.vendor);

const { normalizedInvoice, proposedCorrections } =
  applyMemory(invoice, memories);

const confidence = memories.length
  ? Math.max(...memories.map(m => m.confidence))
  : 0.5;

const requiresHumanReview = confidence < 0.6;

  return {
  normalizedInvoice,
  proposedCorrections,
  requiresHumanReview,
  reasoning:
    proposedCorrections.length > 0
      ? `Applied learned vendor memory with confidence ${confidence}`
      : "No reliable memory available yet",
  confidenceScore: confidence,
  memoryUpdates: [],
  auditTrail: []
};

}
