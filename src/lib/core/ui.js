/**
 * Shared Tailwind class strings for core components, so focus rings and
 * buttons look the same everywhere. Tailwind scans this file for classes.
 */

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';

const buttonBase = `inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`;

export const button = {
  primary: `${buttonBase} bg-indigo-600 text-white hover:bg-indigo-700`,
  secondary: `${buttonBase} border border-indigo-600 bg-white text-indigo-700 hover:bg-indigo-50`,
  quiet: `${buttonBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-100`,
};

export const textInput = `min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-lg tabular-nums ${focusRing}`;

export const card = 'rounded-2xl border border-slate-200 bg-white';
