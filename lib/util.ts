export function select<T, Y>(val: T, opts: [T, Y][], fallback?: Y): Y {
  const opt = opts.find((x) => (x[0] === val ? x : null));

  if (opt == null) {
    if (fallback == null) {
      throw new Error(`Impossible to handle ${val}`);
    }

    return fallback;
  }

  return opt[1];
}
