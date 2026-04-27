export const pow = Math.pow;

export const FP = (i, N) => pow(1 + i, N);
export const PF = (i, N) => pow(1 + i, -N);

export const FA = (i, N) => (i === 0 ? N : (pow(1 + i, N) - 1) / i);
export const AF = (i, N) => (i === 0 ? 1 / N : i / (pow(1 + i, N) - 1));
export const PA = (i, N) =>
  i === 0 ? N : (pow(1 + i, N) - 1) / (i * pow(1 + i, N));
export const AP = (i, N) =>
  i === 0 ? 1 / N : (i * pow(1 + i, N)) / (pow(1 + i, N) - 1);

export const PG = (i, N) =>
  i === 0
    ? (N * (N - 1)) / 2
    : (pow(1 + i, N) - i * N - 1) / (i * i * pow(1 + i, N));
export const AG = (i, N) =>
  i === 0 ? (N - 1) / 2 : 1 / i - N / (pow(1 + i, N) - 1);

export const fmt = (n, d = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", {
        maximumFractionDigits: d,
        minimumFractionDigits: d,
      })
    : "—";

export const pct = (n, d = 4) =>
  Number.isFinite(n) ? (n * 100).toFixed(d) + "%" : "—";

export function irrBisect(cfs) {
  const npv = (r) => cfs.reduce((s, c, j) => s + c / pow(1 + r, j), 0);
  let lo = -0.99,
    hi = 10.0;
  let f_lo = npv(lo),
    f_hi = npv(hi);
  if (Number.isNaN(f_lo) || Number.isNaN(f_hi) || f_lo * f_hi > 0) return null;
  for (let k = 0; k < 200; k++) {
    const mid = (lo + hi) / 2;
    const f_mid = npv(mid);
    if (Math.abs(f_mid) < 1e-7) return mid;
    if (f_mid * f_lo < 0) {
      hi = mid;
      f_hi = f_mid;
    } else {
      lo = mid;
      f_lo = f_mid;
    }
  }
  return (lo + hi) / 2;
}

export function signChanges(arr) {
  let n = 0;
  let prev = 0;
  for (const v of arr) {
    if (v === 0) continue;
    const s = v > 0 ? 1 : -1;
    if (prev !== 0 && s !== prev) n++;
    prev = s;
  }
  return n;
}

export function cumulative(arr) {
  const out = [];
  let s = 0;
  for (const v of arr) {
    s += v;
    out.push(s);
  }
  return out;
}
