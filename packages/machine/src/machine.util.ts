export function deepEqual<T>(obj1: T, obj2: T): boolean {
  if (obj1 === obj2) {
    return true; // If they are strictly equal
  }

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false; // One is not an object or one is null
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => deepEqual(item, obj2[index]));
  }

  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  if (keys1.length !== keys2.length) {
    return false; // Objects have different number of properties
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false; // Recursive comparison of each property
    }
  }

  return true; // All properties match
}
