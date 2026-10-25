<script>
  import StrandHub from '#lib/core/strand-hub.svelte';

  let { data } = $props();
</script>

<StrandHub strand={data.strand} />
