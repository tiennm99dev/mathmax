<script>
  import GradeHub from '#lib/core/grade-hub.svelte';

  let { data } = $props();
</script>

<GradeHub grade={data.grade} />
