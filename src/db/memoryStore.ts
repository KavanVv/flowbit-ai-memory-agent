import fs from "fs";

const FILE_PATH = "./storage/memory.json";

interface MemoryStore {
  vendorMemory: any[];
  auditTrail: any[];
}

function load(): MemoryStore {
  if (!fs.existsSync(FILE_PATH)) {
    return { vendorMemory: [], auditTrail: [] };
  }
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf-8"));
}

function save(data: MemoryStore) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

export function getStore(): MemoryStore {
  return load();
}

export function saveStore(store: MemoryStore) {
  save(store);
}
