<script>
  import Tex from '#lib/components/tex.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { linText, numText } from '#lib/core/algebra-text.js';
  import { button } from '#lib/core/ui.js';
  import CoordinatePlane from '#lib/core/visuals/coordinate-plane.svelte';
  import { planeScale } from '#lib/core/visuals/svg-math.js';
  import { curvePath } from '../_shared/quadratic.js';
  import { CHALLENGES, analyse, deltaTex, equationTex, solutionTex, verdict } from './engine.js';

  const plane = planeScale({ xMin: -7, xMax: 7, yMin: -8, yMax: 8, width: 420, pad: 24 });
  const { mx, my } = plane;
  const CURVE = '#4f46e5';
  const ROOT = '#059669';
  const clipId = $props.id();

  /** Why each challenge is met, said once the sliders reach it. */
  const DONE = [
    'Δ = 0: hai nghiệm trùng nhau, parabol chỉ chạm trục hoành.',
    'Δ < 0: parabol nằm hẳn về một phía của trục hoành.',
    'Khi ac < 0 thì −4ac > 0, nên Δ = b² − 4ac > 0 với mọi b: phương trình luôn có hai nghiệm phân biệt, và hai nghiệm đó trái dấu.',
    'Cả hai giao điểm với trục hoành đều nằm bên phải gốc O.',
  ];

  let a = $state(1);
  let b = $state(-2);
  let c = $state(-3);
  let challenge = $state(0);

  const info = $derived(analyse(a, b, c));
  const note = $derived(verdict(a, b, c));
  const curve = $derived(curvePath((t) => a * t * t + b * t + c, plane, 200));
  const lines = $derived(solutionTex(a, b, c));
  const current = $derived(CHALLENGES[challenge]);
  const met = $derived(a !== 0 && current.test(a, b, c));
  const visibleRoots = $derived(
    info.kind === 'two' || info.kind === 'double'
      ? [...new Set(info.roots)].filter((r) => r >= plane.xMin && r <= plane.xMax)
      : [],
  );

  const plotLabel = $derived(
    a === 0
      ? `Đường thẳng y = ${linText(b, c)}; a = 0 nên đây không phải parabol.`
      : `Parabol y = ax² + bx + c với a = ${numText(a)}, b = ${numText(b)}, c = ${numText(c)}. ${note.text}`,
  );
</script>

<div class="space-y-4">
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
    <SliderField
      label="Hệ số a"
      bind:value={a}
      min={-3}
      max={3}
      step={0.5}
      format={(v) => numText(v)}
    />
    <SliderField label="Hệ số b" bind:value={b} min={-6} max={6} format={(v) => numText(v)} />
    <SliderField label="Hệ số c" bind:value={c} min={-6} max={6} format={(v) => numText(v)} />
  </div>

  <div class="space-y-1 overflow-x-auto rounded-xl bg-indigo-50 p-3 text-center">
    {#if a === 0}
      <p class="font-semibold text-amber-800">a = 0: không phải phương trình bậc hai.</p>
    {:else}
      <Tex math={equationTex(a, b, c)} display />
      <Tex math={deltaTex(a, b, c)} display />
      {#each lines as line (line)}
        <Tex math={line} display />
      {/each}
    {/if}
  </div>

  <CoordinatePlane {plane} interactive={false} label={plotLabel}>
    <defs>
      <clipPath id={clipId}>
        <rect
          x={mx(plane.xMin)}
          y={my(plane.yMax)}
          width={mx(plane.xMax) - mx(plane.xMin)}
          height={my(plane.yMin) - my(plane.yMax)}
        />
      </clipPath>
    </defs>
    <g clip-path="url(#{clipId})">
      <path d={curve} fill="none" stroke={CURVE} stroke-width="2.5" />
    </g>
    {#each visibleRoots as r (r)}
      <circle cx={mx(r)} cy={my(0)} r="6" fill={ROOT} stroke="#fff" stroke-width="2" />
      <text
        x={mx(r)}
        y={my(0) + (a > 0 ? 20 : -10)}
        text-anchor="middle"
        font-size="11"
        font-weight="700"
        fill={ROOT}>{numText(r)}</text
      >
    {/each}
  </CoordinatePlane>

  <FeedbackNote tone={note.tone} text={note.text} />

  <div class="space-y-2 rounded-xl bg-slate-50 p-3">
    <p class="text-sm font-semibold text-slate-700">
      Thử thách {challenge + 1}/{CHALLENGES.length}: {current.text}
    </p>
    <FeedbackNote
      tone={met ? 'ok' : 'info'}
      text={met ? `Đạt yêu cầu! ${DONE[challenge]}` : 'Kéo các thanh trượt để đạt yêu cầu.'}
    />
    <button
      type="button"
      class={button.secondary}
      onclick={() => (challenge = (challenge + 1) % CHALLENGES.length)}
    >
      Thử thách tiếp
    </button>
  </div>
</div>
