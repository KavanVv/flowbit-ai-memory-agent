export function decide(confidence: number) {
  if (confidence > 0.8) return false;
  return true;
}
