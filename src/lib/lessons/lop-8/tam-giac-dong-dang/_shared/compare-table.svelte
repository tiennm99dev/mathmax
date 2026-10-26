<script>
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { degText } from '#lib/core/visuals/angle-math.js';

  /**
   * Every side ratio and every pair of angles of △ABC and △A′B′C′, measured
   * on the triangles the learner built, so the whole correspondence can be
   * read off once a similarity case holds. Lengths and ratios show two
   * decimals, angles one.
   *
   * @type {{ left: import('./tri.js').Tri, right: import('./tri.js').Tri }}
   */
  let { left, right } = $props();

  /** @param {number} n */
  const round1 = (n) => Math.round(n * 10) / 10;

  const sideRows = $derived(
    /** @type {const} */ ([
      ['AB', 'A′B′', 'ab'],
      ['BC', 'B′C′', 'bc'],
      ['CA', 'C′A′', 'ca'],
    ]).map(([a, b, key]) => ({
      a,
      b,
      la: formatNumber(left[key], 2),
      lb: formatNumber(right[key], 2),
      k: formatFixed(right[key] / left[key], 2),
      exact:
        Math.abs(Math.round((right[key] / left[key]) * 100) - (right[key] / left[key]) * 100) <
        1e-6,
    })),
  );
  const angleRows = $derived(
    /** @type {const} */ (['A', 'B', 'C']).map((v) => ({
      v,
      da: degText(round1(left[v])),
      db: degText(round1(right[v])),
      same: Math.abs(left[v] - right[v]) < 0.05,
    })),
  );
</script>

<div class="grid gap-3 sm:grid-cols-2">
  <table class="w-full text-sm tabular-nums">
    <caption class="mb-1 text-left font-semibold text-slate-700">Tỉ số cạnh tương ứng</caption>
    <tbody>
      {#each sideRows as r (r.a)}
        <tr class="border-t border-slate-200">
          <td class="py-1">{r.b} : {r.a}</td>
          <td class="py-1 text-slate-500">{r.lb} : {r.la}</td>
          <td class="py-1 text-right font-semibold text-indigo-700">{r.exact ? '=' : '≈'} {r.k}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <table class="w-full text-sm tabular-nums">
    <caption class="mb-1 text-left font-semibold text-slate-700">Góc tương ứng</caption>
    <tbody>
      {#each angleRows as r (r.v)}
        <tr class="border-t border-slate-200">
          <td class="py-1">Góc {r.v} = {r.da}</td>
          <td class="py-1">Góc {r.v}′ = {r.db}</td>
          <td class="py-1 text-right font-semibold {r.same ? 'text-emerald-700' : 'text-amber-700'}"
            >{r.same ? 'bằng nhau' : 'khác nhau'}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
