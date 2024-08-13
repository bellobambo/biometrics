let sharedValue = null;

export function setSharedValue(value) {
  sharedValue = value;
}

export function getSharedValue() {
  return sharedValue;
}
