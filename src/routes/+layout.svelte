<script>
  // Font CSS goes through Vite here, not through @import in app.css: Tailwind
  // inlines CSS imports without rebasing their relative font URLs.
  import '@fontsource/be-vietnam-pro/400.css';
  import '@fontsource/be-vietnam-pro/500.css';
  import '@fontsource/be-vietnam-pro/700.css';
  import '../app.css';
  import 'katex/dist/katex.min.css';

  let { children } = $props();
</script>

{@render children()}
