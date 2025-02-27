/* eslint-disable @typescript-eslint/no-explicit-any */
export default function reverseObject<
  T extends Record<string, any>,
  K extends Record<string, any>,
>(obj: T): K {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    (acc as unknown as Record<string, any>)[String(value)] = key;
    return acc;
  }, {} as K);
}
