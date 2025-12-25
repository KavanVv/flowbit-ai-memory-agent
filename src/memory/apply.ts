export function applyMemory(invoice: any, memories: any[]) {
  const corrections: string[] = [];
  const normalized = { ...invoice.extracted };

  for (const mem of memories) {
    // Example: Leistungsdatum → serviceDate
    if (
      mem.key === "serviceDate" &&
      invoice.rawText.includes(mem.value) &&
      mem.confidence >= 0.6
    ) {
      normalized.serviceDate = "AUTO_FILLED_FROM_MEMORY";
      corrections.push(
        `Filled serviceDate using vendor label '${mem.value}' (confidence ${mem.confidence})`
      );
    }
  }

  return {
    normalizedInvoice: normalized,
    proposedCorrections: corrections
  };
}
