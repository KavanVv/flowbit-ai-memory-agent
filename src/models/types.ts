export interface Invoice {
  invoiceId: string;
  vendor: string;
  rawText: string;
  extracted: Record<string, any>;
}

export interface Memory {
  key: string;
  value: string;
  confidence: number;
}

export interface VendorMemory {
  id: number;
  vendor: string;
  key: string;
  value: string;
  confidence: number;
  usageCount: number;
  lastUsed: string;
}
