<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    blurAmount?: number;
    direction?: "top" | "bottom" | "left" | "right";
    color?: string;
    children: Snippet;
  }

  let {
    blurAmount = 100,
    direction = "top",
    color = "rgb(0 0 0 / 20%)",
    children,
    ...rest
  }: Props = $props();
  const progressiveBlurStyle = $derived(
    `
    position: absolute;
    inset: 0;
    mask-image: linear-gradient(
      to ${direction},
      rgb(0 0 0 / 100%) 0%,
      rgb(0 0 0 / 0%) 100%
    );
    backdrop-filter: blur(${blurAmount}px);
		-webkit-backdrop-filter: blur(${blurAmount}px);

		mask-composite: intersect;
		-webkit-mask-composite: source-in;`
      .replace(/\s+/g, " ")
      .trim()
  );
  const gradientStyle = $derived(
    `
    position: absolute;
    inset: 0;
    background: linear-gradient(to ${direction}, ${color} 25%, rgb(0 0 0 / 0%) 100%);
  `
      .replace(/\s+/g, " ")
      .trim()
  );
</script>

<div class="container" {...rest}>
  <div class="progressive-blur" style={progressiveBlurStyle}></div>
  <div class="gradient-blur" style={gradientStyle}></div>
  <div class="children-wrapper">{@render children()}</div>
</div>

<style>
  .container {
    position: relative;
  }
  .children-wrapper {
    position: relative;
  }
</style>
