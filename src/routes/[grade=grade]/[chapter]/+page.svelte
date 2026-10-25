<script>
  import ChapterHub from '#lib/core/chapter-hub.svelte';

  let { data } = $props();
</script>

<ChapterHub grade={data.grade} chapter={data.chapter} />
