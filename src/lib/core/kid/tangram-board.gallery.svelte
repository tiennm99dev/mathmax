<script module>
  export const title = 'Bảng ghép hình';
</script>

<script>
  import TangramBoard from './tangram-board.svelte';
  import { PIECE_SHAPES } from './tangram.js';

  /** A 2 × 2 square from two big triangles. */
  const puzzles = [
    {
      id: 'vuong',
      title: 'Hình vuông',
      goal: 'Ghép hai mảnh thành hình vuông.',
      done: 'Em đã ghép xong hình vuông!',
      target: [PIECE_SHAPES.square.corners],
      pieces: [
        { shape: /** @type {const} */ ('tri2'), color: '#f97316', rot: 0 },
        { shape: /** @type {const} */ ('tri2'), color: '#6366f1', rot: 2 },
      ],
    },
  ];
</script>

<TangramBoard {puzzles} />
