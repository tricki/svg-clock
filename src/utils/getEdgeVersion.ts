export function getEdgeVersion() {
  const match = navigator.userAgent.match(/Edge\/(\d+)/i);

  if(!match || !match[1]) {
    return null;
  }

  return +match[1];
}
