# Memory Driven AI Agent for Invoice Automation

This project implements a memory based learning layer for invoice processing systems.
The goal is to demonstrate how an AI agent can learn from past human corrections, persist those learnings, and reuse them to improve automation decisions over time while remaining explainable and auditable.

The solution avoids machine learning training and instead relies on well designed heuristics with confidence based memory, which mirrors real world document automation systems.

## Problem Overview

In high volume invoice processing, many corrections repeat:- 

- Vendor specific field labels such as Leistungsdatum to serviceDate
- Recurring tax interpretations such as VAT already included
-  Repeated normalization and reconciliation decisions

Traditional systems treat every invoice as a fresh input, wasting prior human effort.
This project demonstrates a learned memory layer that captures these corrections and applies them intelligently to future invoices.

## High Level Architecture

Each invoice is processed through the following stages:- 

1. Recall Memory
   Retrieve relevant vendor specific memories from persistent storage.

2. Apply Memory
   Use high confidence memory to normalize fields and suggest corrections.

3. Decide
   Determine whether to auto accept, auto correct, or escalate for human review.

4. Learn
   Store new insights from human corrections and reinforce existing memory.

5. Audit
   Maintain an explainable trail of how each decision was made.

## Memory Types Implemented
### Vendor Memory

Stores vendor specific recurring patterns such as:- 

- Field label mappings, for example Leistungsdatum to serviceDate
- Semantic conventions unique to a supplier

Each memory entry includes a confidence score that evolves over time.

## Confidence and Decision Strategy

- Initial memory confidence is set to 0.6
- Memory is only auto applied when confidence is greater than or equal to 0.6
- Low confidence memory never triggers automation
- This prevents incorrect or premature learning from dominating decisions


Decision logic:
- Low confidence results in human review
- Sufficient confidence results in auto correction or auto accept


## Persistence Strategy
The system uses file based JSON persistence:- 

- Memory survives across runs
- Easy to inspect and audit
- Avoids native dependencies for portability
- Storage layer can be replaced with SQLite or Postgres without changing core logic
  

## Demo Learning Over Time
For demonstration clarity, memory is reset before the first run.

### Run 1
- No prior vendor memory exists
- Invoice is escalated for human review

### Human Correction
- Vendor specific correction is applied
- Memory is stored with initial confidence

### Run 2
- System recalls learned memory
- Automatically fills missing service date
- Human review is avoided

This clearly demonstrates learning improving automation rates over time.


## Alignment with Sample Data Appendix
> This implementation aligns with the provided Sample Data Appendix:- 

- Supplier GmbH
  Learns and reuses serviceDate from Leistungsdatum

- Parts AG
  Architecture supports VAT inclusive correction strategies and currency recovery

- Freight and Co
  Supports discount term detection and SKU normalization from descriptions

- Duplicate invoices
  Designed to escalate duplicates and prevent memory pollution

The demo focuses on a minimal subset to clearly demonstrate learning behavior, while the architecture generalizes to the full dataset.


## Output Contract
> Each processed invoice produces:- 

- normalizedInvoice
- proposedCorrections
- requiresHumanReview
- reasoning
- confidenceScore
- memoryUpdates
- auditTrail


> How to Run:- 

```bash
npm install
npx tsc
node dist/demo.js
```


> Key Design Principles:- 
- Explainability over black box automation
- Confidence gated learning
- Safe defaults
- Persistent and auditable memory
- No machine learning training required


For demo purposes, the memory store is reset before the first run to clearly demonstrate learning over time.

