<script>
  import ChoiceRound from '#lib/core/kid/choice-round.svelte';
  import Banknote from '../_shared/banknote.svelte';
  import { KIND_LABELS, TAPE_LABELS, TAPE_MAX, buildRound } from './engine.js';

  const U = 26;
  const X0 = 16;

  /**
   * What a screen reader hears for the tape: enough to count from a printed
   * number to the arrow, and the mark itself only once the question has ended.
   * @param {number} at
   * @param {boolean} settled
   */
  function tapeText(at, settled) {
    if (settled) return `Thước chia theo đề-xi-mét. Mũi tên chỉ vào vạch ${at}.`;
    const from = at > 10 ? 10 : at > 5 ? 5 : 0;
    return `Thước chia theo đề-xi-mét. Mũi tên chỉ vào vạch cách vạch ${from} là ${at - from} vạch về bên phải.`;
  }

  // Corners of the broken line ABCD, in SVG units, and where each side's length goes.
  const ZIG = [
    { name: 'A', x: 24, y: 86 },
    { name: 'B', x: 124, y: 28 },
    { name: 'C', x: 212, y: 86 },
    { name: 'D', x: 316, y: 34 },
  ];
</script>

<ChoiceRound
  build={buildRound}
  labels={KIND_LABELS}
  allGood="Tuyệt vời! Em đổi đơn vị, đọc thước, tính độ dài và dùng tiền rất giỏi."
>
  {#snippet visual(q, settled)}
    {#if q.visual?.type === 'tape'}
      <div class="rounded-2xl bg-sky-50 p-2">
        <svg
          viewBox="0 0 {X0 * 2 + TAPE_MAX * U} 86"
          class="w-full"
          role="img"
          aria-label={tapeText(q.visual.at, settled)}
        >
          <rect
            x={X0 - 8}
            y="30"
            width={TAPE_MAX * U + 16}
            height="44"
            fill="#fde68a"
            stroke="#b45309"
          />
          {#each { length: TAPE_MAX + 1 } as _, k (k)}
            <line
              x1={X0 + k * U}
              y1="30"
              x2={X0 + k * U}
              y2={k % 5 === 0 ? 50 : 44}
              stroke="#451a03"
              stroke-width={k % 5 === 0 ? 2.5 : 1.5}
            />
          {/each}
          {#each TAPE_LABELS as n (n)}
            <text
              x={X0 + n * U}
              y="68"
              text-anchor="middle"
              font-size="16"
              font-weight="700"
              fill="#451a03">{n}</text
            >
          {/each}
          <path d="M {X0 + q.visual.at * U} 28 l -8 -14 l 16 0 z" fill="#dc2626" stroke="#7f1d1d" />
          {#if settled}
            <text
              x={X0 + q.visual.at * U}
              y="68"
              text-anchor="middle"
              font-size="16"
              font-weight="800"
              fill="#b91c1c">{q.visual.at}</text
            >
          {/if}
        </svg>
      </div>
    {:else if q.visual?.type === 'notes'}
      <div class="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-sky-50 p-3">
        {#each q.visual.notes as value, i (i)}
          <Banknote {value} />
        {/each}
      </div>
    {:else if q.visual?.type === 'zigzag'}
      {@const sides = q.visual.sides}
      <div class="rounded-2xl bg-sky-50 p-2">
        <svg
          viewBox="0 0 340 110"
          class="w-full"
          role="img"
          aria-label="Đường gấp khúc ABCD: đoạn AB dài {sides[0]} mét, đoạn BC dài {sides[1]} mét, đoạn CD dài {sides[2]} mét."
        >
          <polyline
            points={ZIG.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#92400e"
            stroke-width="5"
            stroke-linejoin="round"
          />
          {#each ZIG as p (p.name)}
            <circle cx={p.x} cy={p.y} r="5" fill="#451a03" />
            <text
              x={p.x}
              y={p.y > 60 ? p.y + 20 : p.y - 10}
              text-anchor="middle"
              font-size="16"
              font-weight="700"
              fill="#1e293b">{p.name}</text
            >
          {/each}
          {#each sides as side, i (i)}
            <text
              x={(ZIG[i].x + ZIG[i + 1].x) / 2 + 26}
              y={(ZIG[i].y + ZIG[i + 1].y) / 2 + (i === 1 ? -10 : 18)}
              text-anchor="middle"
              font-size="16"
              font-weight="700"
              fill="#4338ca">{side} m</text
            >
          {/each}
        </svg>
      </div>
    {/if}
  {/snippet}
</ChoiceRound>
