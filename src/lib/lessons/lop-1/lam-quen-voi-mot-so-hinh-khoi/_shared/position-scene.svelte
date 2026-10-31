<script>
  import Picture from '#lib/core/kid/picture.svelte';
  import { FLOOR, PLACE_NAMES, QUEUE, SCENE_H, SCENE_W } from './positions.js';

  /**
   * The room or the queue of `positions.js`, with the moving picture at one
   * of its places. When `onpick` is given, each place is a big button the
   * child taps (or focuses and presses Enter) to put the picture there.
   *
   * - `scene`: which scene to draw;
   * - `at`: id of the place the picture stands at, or null;
   * - `tone`: colour of that place: `ok` green, `warn` amber, `none` plain;
   * - `onpick`: called with a place id when a place is chosen.
   * @type {{
   *   scene: import('./positions.js').Scene;
   *   at?: string | null;
   *   tone?: 'ok' | 'warn' | 'none';
   *   onpick?: (placeId: string) => void;
   * }}
   */
  let { scene, at = null, tone = 'none', onpick } = $props();

  const ink = '#1e293b';
  const moverName = $derived(scene.moverName);

  /** @param {string} id */
  function placeFill(id) {
    if (id !== at) return onpick ? '#ffffff' : 'none';
    return tone === 'ok' ? '#d1fae5' : tone === 'warn' ? '#fef3c7' : '#e0e7ff';
  }

  /** @param {KeyboardEvent} e @param {string} id */
  function key(e, id) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    onpick?.(id);
  }

  const description = $derived(
    scene.id === 'phong'
      ? `Căn phòng: bên trái là cái tủ, ở giữa là cái bàn, bên phải là chậu cây.${at ? ` ${moverName[0].toUpperCase()}${moverName.slice(1)} ở ${PLACE_NAMES[at]}.` : ''}`
      : `Hàng đi về phía cửa bên trái: con thỏ đứng trước, con mèo đứng sau.${at ? ` ${moverName[0].toUpperCase()}${moverName.slice(1)} ở ${PLACE_NAMES[at]}.` : ''}`,
  );
</script>

<svg
  viewBox="0 0 {SCENE_W} {SCENE_H}"
  class="block h-auto w-full select-none"
  role="group"
  aria-label={description}
>
  <rect x="0" y="0" width={SCENE_W} height={FLOOR} fill="#fefce8" />
  <rect x="0" y={FLOOR} width={SCENE_W} height={SCENE_H - FLOOR} fill="#fde68a" />
  <line x1="0" y1={FLOOR} x2={SCENE_W} y2={FLOOR} stroke={ink} stroke-width="2" />

  {#if scene.id === 'phong'}
    <!-- cái tủ -->
    <g aria-hidden="true">
      <rect
        x="8"
        y="86"
        width="70"
        height={FLOOR - 86}
        rx="3"
        fill="#d97706"
        stroke={ink}
        stroke-width="2.5"
      />
      <line x1="43" y1="92" x2="43" y2={FLOOR - 6} stroke={ink} stroke-width="2" />
      <circle cx="37" cy="146" r="3" fill={ink} />
      <circle cx="49" cy="146" r="3" fill={ink} />
      <text x="43" y="230" text-anchor="middle" font-size="15" font-weight="700" fill={ink}
        >cái tủ</text
      >
      <!-- cái bàn -->
      <rect
        x="156"
        y="128"
        width="120"
        height="10"
        rx="2"
        fill="#a16207"
        stroke={ink}
        stroke-width="2.5"
      />
      <rect
        x="164"
        y="138"
        width="10"
        height={FLOOR - 138}
        fill="#a16207"
        stroke={ink}
        stroke-width="2"
      />
      <rect
        x="258"
        y="138"
        width="10"
        height={FLOOR - 138}
        fill="#a16207"
        stroke={ink}
        stroke-width="2"
      />
      <text x="216" y="230" text-anchor="middle" font-size="15" font-weight="700" fill={ink}
        >cái bàn</text
      >
      <!-- chậu cây -->
      <path
        d="M358 {FLOOR} L354 168 L394 168 L390 {FLOOR} Z"
        fill="#c2410c"
        stroke={ink}
        stroke-width="2"
      />
      <path
        d="M374 168 C360 150 356 130 366 118 M374 168 C374 140 376 120 380 104 M374 168 C388 150 394 134 390 120"
        fill="none"
        stroke="#15803d"
        stroke-width="5"
        stroke-linecap="round"
      />
      <text x="398" y="230" text-anchor="end" font-size="15" font-weight="700" fill={ink}
        >chậu cây</text
      >
    </g>
  {:else}
    <g aria-hidden="true">
      <!-- cửa: đầu hàng -->
      <rect
        x="4"
        y="96"
        width="44"
        height={FLOOR - 96}
        rx="3"
        fill="#93c5fd"
        stroke={ink}
        stroke-width="2.5"
      />
      <circle cx="40" cy="154" r="3" fill={ink} />
      <text x="26" y="230" text-anchor="middle" font-size="14" font-weight="700" fill={ink}
        >cửa</text
      >
      <path
        d="M160 48 H72 M84 38 L72 48 L84 58"
        fill="none"
        stroke="#4f46e5"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <text x="176" y="54" font-size="15" font-weight="700" fill="#4f46e5">Hàng đi vào cửa</text>
      {#each QUEUE as animal (animal.picture)}
        <Picture name={animal.picture} size={60} x={animal.x} y={FLOOR - 60} decorative />
        <text
          x={animal.x + 30}
          y="230"
          text-anchor="middle"
          font-size="15"
          font-weight="700"
          fill={ink}>{animal.name}</text
        >
      {/each}
    </g>
  {/if}

  {#each scene.places as place (place.id)}
    {#if onpick}
      <g
        role="button"
        tabindex="0"
        aria-label="{place.id === at ? `${moverName} đang ở ` : 'Đặt vào '}{PLACE_NAMES[place.id]}"
        class="cursor-pointer outline-none"
        onclick={() => onpick?.(place.id)}
        onkeydown={(e) => key(e, place.id)}
      >
        <rect
          class="place-knob"
          x={place.x}
          y={place.y}
          width={place.size}
          height={place.size}
          rx="10"
          fill={placeFill(place.id)}
          fill-opacity="0.85"
          stroke="#6366f1"
          stroke-width="2.5"
          stroke-dasharray={place.id === at ? 'none' : '7 5'}
        />
        {#if place.id === at}
          <Picture name={scene.mover} size={50} x={place.x + 5} y={place.y + 5} decorative />
        {/if}
      </g>
    {:else if place.id === at}
      <g aria-hidden="true">
        <rect
          x={place.x}
          y={place.y}
          width={place.size}
          height={place.size}
          rx="10"
          fill={placeFill(place.id)}
        />
        <Picture name={scene.mover} size={50} x={place.x + 5} y={place.y + 5} decorative />
      </g>
    {/if}
  {/each}
</svg>

<style>
  g[role='button']:focus-visible .place-knob {
    stroke: #312e81;
    stroke-width: 5;
  }
</style>
