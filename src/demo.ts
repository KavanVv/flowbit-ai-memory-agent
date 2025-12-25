import fs from "fs";
import { processInvoice } from "./index.js";
import { learnVendorMemory } from "./memory/learn.js";

const invoice1 = JSON.parse(fs.readFileSync("./data/invoice1.json", "utf-8"));
const invoice2 = JSON.parse(fs.readFileSync("./data/invoice2.json", "utf-8"));

console.log("RUN 1");
const result1 = processInvoice(invoice1);
console.log(result1);

console.log("HUMAN CORRECTION APPLIED");
learnVendorMemory("Supplier GmbH", "serviceDate", "Leistungsdatum");

console.log("RUN 2");
const result2 = processInvoice(invoice2);
console.log(result2);
