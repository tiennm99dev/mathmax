<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import Tex from '#lib/components/tex.svelte';
  import { fmt, formatNumber, texNumber } from '#lib/core/number-format.js';
  import { mix } from './engine.js';

  /**
   * Mixing tasks: fixed concentrations c1, c2 and a target mass and
   * concentration. 'tu-do' lets the learner set the concentrations too.
   */
  const TASKS = [
    { value: 'muoi', label: 'Nước muối 10%', c1: 20, c2: 5, mass: 300, target: 10, what: 'muối' },
    { value: 'giam', label: 'Dung dịch 7%', c1: 3, c2: 15, mass: 600, target: 7, what: 'muối' },
    {
      value: 'duong',
      label: 'Nước đường 12%',
      c1: 20,
      c2: 0,
      mass: 500,
      target: 12,
      what: 'đường',
    },
    { value: 'tu-do', label: 'Tự do', c1: 25, c2: 10, mass: 0, target: 0, what: 'chất tan' },
  ];

  let taskKey = $state('muoi');
  let m1 = $state(150);
  let m2 = $state(150);
  let freeC1 = $state(25);
  let freeC2 = $state(10);

  const task = $derived(TASKS.find((t) => t.value === taskKey) ?? TASKS[0]);
  const free = $derived(task.value === 'tu-do');
  const c1 = $derived(free ? freeC1 : task.c1);
  const c2 = $derived(free ? freeC2 : task.c2);
  const result = $derived(mix(m1, c1, m2, c2));
  const solute1 = $derived((m1 * c1) / 100);
  const solute2 = $derived((m2 * c2) / 100);

  /** @param {number} c */
  const name = (c) => (c === 0 ? 'nước cất' : `dung dịch ${c}%`);
  /** @param {number} v */
  const pct = (v) => `${formatNumber(v, 2)}%`;
  /** @param {number} v */
  const gram = (v) => `${formatNumber(v, 2)} g`;

  const massOk = $derived(!free && result.mass === task.mass);
  const concOk = $derived(
    !free && result.mass > 0 && Math.abs(result.percent - task.target) < 0.005,
  );

  // The system of the task and the current values put into it.
  const system = $derived(
    free
      ? `\\begin{cases} x + y = m \\\\ ${c1}x + ${c2}y = c\\,m \\end{cases}`
      : `\\begin{cases} x + y = ${task.mass} \\\\ ${c1}x + ${c2}y = ${task.target} \\cdot ${task.mass} \\end{cases}`,
  );
  // Each equation on its own line so the block fits a phone screen.
  const plugged = $derived(
    free
      ? `\\begin{aligned} x + y &= ${m1} + ${m2} = ${m1 + m2} \\\\ c &= \\dfrac{${c1} \\cdot ${m1} + ${c2} \\cdot ${m2}}{${m1 + m2 || 1}} \\approx ${texNumber(formatNumber(result.percent, 2))} \\end{aligned}`
      : `\\begin{aligned} x + y &= ${m1} + ${m2} = ${m1 + m2}${massOk ? '' : ` \\ne ${task.mass}`} \\\\ ${c1} \\cdot ${m1} + ${c2} \\cdot ${m2} &= ${c1 * m1 + c2 * m2}${c1 * m1 + c2 * m2 === task.target * task.mass ? '' : ` \\ne ${task.target * task.mass}`} \\end{aligned}`,
  );

  const feedback = $derived.by(() => {
    if (result.mass === 0)
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Hai cốc đều trống. Kéo thanh trượt để rót dung dịch vào.',
      };
    const state = `Cốc pha được ${fmt(result.mass)} g, có ${gram(result.solute)} ${task.what}, nồng độ ${pct(result.percent)}.`;
    if (free) return { tone: /** @type {const} */ ('info'), text: state };
    if (massOk && concOk)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Đúng yêu cầu! ${state} Cặp số $(x; y) = (${m1}; ${m2})$ là nghiệm của hệ phương trình.`,
      };
    const strong = c1 > c2 ? name(c1) : name(c2);
    const weak = c1 > c2 ? name(c2) : name(c1);
    let advice = '';
    if (result.mass > 0 && Math.abs(result.percent - task.target) >= 0.005)
      advice =
        result.percent < task.target
          ? ` Còn loãng hơn ${task.target}%: tăng phần ${strong} hoặc bớt ${weak}.`
          : ` Đậm hơn ${task.target}%: tăng phần ${weak} hoặc bớt ${strong}.`;
    const massNote = massOk
      ? ''
      : ` Khối lượng cần ${fmt(task.mass)} g, đang ${result.mass < task.mass ? 'thiếu' : 'thừa'} ${fmt(Math.abs(task.mass - result.mass))} g.`;
    return { tone: /** @type {const} */ ('warn'), text: `${state}${massNote}${advice}` };
  });

  // Beakers: liquid height follows the mass, colour depth the concentration.
  const BEAKER_H = 110;
  const MAX_MASS = 600;
  /** @param {number} m @param {number} max */
  const level = (m, max) => (BEAKER_H * Math.min(m, max)) / max;
  /** @param {number} c */
  const shade = (c) => 0.12 + (Math.min(c, 40) / 40) * 0.8;

  function reset() {
    m1 = 150;
    m2 = 150;
  }
</script>

{#snippet beaker(
  /** @type {number} */ x,
  /** @type {number} */ h,
  /** @type {number} */ c,
  /** @type {string} */ top,
  /** @type {string} */ bottom,
)}
  <g>
    <rect {x} y={140 - h} width="80" height={h} fill="#0EA5E9" fill-opacity={shade(c)} />
    <path
      d="M{x - 4} 20 L{x} 26 L{x} 140 L{x + 80} 140 L{x + 80} 26 L{x + 84} 20"
      fill="none"
      stroke="#334155"
      stroke-width="2.5"
      stroke-linejoin="round"
    />
    <text x={x + 40} y="14" font-size="12" font-weight="700" text-anchor="middle" fill="#0F172A"
      >{top}</text
    >
    <text x={x + 40} y="158" font-size="12" text-anchor="middle" fill="#334155">{bottom}</text>
  </g>
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Nhiệm vụ pha chế"
    options={TASKS.map((t) => ({ value: t.value, label: t.label }))}
    bind:value={taskKey}
    onchange={reset}
  />

  {#if free}
    <p class="text-sm text-slate-700">
      Chọn nồng độ hai dung dịch, rót tuỳ ý và quan sát nồng độ của hỗn hợp.
    </p>
    <div class="grid gap-3 sm:grid-cols-2">
      <SliderField label="Nồng độ cốc 1" bind:value={freeC1} min={0} max={40} unit="%" />
      <SliderField label="Nồng độ cốc 2" bind:value={freeC2} min={0} max={40} unit="%" />
    </div>
  {:else}
    <p class="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">
      Pha {fmt(task.mass)} g dung dịch {task.what}
      {task.target}% từ {name(task.c1)} (cốc 1) và {name(task.c2)} (cốc 2). Gọi <em>x</em>,
      <em>y</em> là số gam lấy từ cốc 1, cốc 2.
    </p>
  {/if}

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Lấy từ cốc 1: x"
      bind:value={m1}
      min={0}
      max={MAX_MASS}
      step={10}
      unit="g"
      format={(v) => fmt(v)}
    />
    <SliderField
      label="Lấy từ cốc 2: y"
      bind:value={m2}
      min={0}
      max={MAX_MASS}
      step={10}
      unit="g"
      format={(v) => fmt(v)}
    />
  </div>

  <svg
    viewBox="0 0 400 170"
    class="mx-auto block w-full max-w-xl rounded-lg border border-slate-200 bg-white"
    role="img"
    aria-label={`Cốc 1: ${fmt(m1)} g ${name(c1)}, chứa ${gram(solute1)} chất tan. Cốc 2: ${fmt(m2)} g ${name(c2)}, chứa ${gram(solute2)} chất tan. Hỗn hợp: ${fmt(result.mass)} g, nồng độ ${pct(result.percent)}.`}
  >
    {@render beaker(14, level(m1, MAX_MASS), c1, `Cốc 1: ${c1}%`, `${fmt(m1)} g`)}
    <text x="117" y="88" font-size="22" text-anchor="middle" fill="#475569">+</text>
    {@render beaker(140, level(m2, MAX_MASS), c2, `Cốc 2: ${c2}%`, `${fmt(m2)} g`)}
    <text x="246" y="88" font-size="22" text-anchor="middle" fill="#475569">→</text>
    {@render beaker(
      286,
      level(result.mass, 2 * MAX_MASS),
      result.percent,
      `${pct(result.percent)}`,
      `${fmt(result.mass)} g`,
    )}
  </svg>

  <div class="grid gap-2 rounded-lg bg-slate-50 p-3 text-sm tabular-nums sm:grid-cols-3">
    <p>Chất tan cốc 1: {gram(solute1)}</p>
    <p>Chất tan cốc 2: {gram(solute2)}</p>
    <p>Hỗn hợp: {gram(result.solute)} trong {fmt(result.mass)} g</p>
  </div>

  <div class="space-y-2 overflow-x-auto rounded-lg border border-slate-200 p-3 text-sm">
    <p class="font-semibold text-slate-700">
      Hệ phương trình {free ? 'tổng quát' : 'của nhiệm vụ'}
    </p>
    <Tex math={system} display />
    <p class="font-semibold text-slate-700">Thay x = {m1}, y = {m2}</p>
    <Tex math={plugged} display />
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
