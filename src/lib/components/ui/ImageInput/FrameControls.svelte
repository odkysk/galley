<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import MoveDown from "@lucide/svelte/icons/move-down";
  import MoveLeft from "@lucide/svelte/icons/move-left";
  import MoveRight from "@lucide/svelte/icons/move-right";
  import MoveUp from "@lucide/svelte/icons/move-up";
  import ZoomIn from "@lucide/svelte/icons/zoom-in";
  import ZoomOut from "@lucide/svelte/icons/zoom-out";

  let {
    frame = $bindable(),
  }: {
    frame: { zoom: number; x: number; y: number };
  } = $props();

  let displayZoom = $derived(Math.round(frame.zoom * 100));

  function adjustZoom(delta: number) {
    frame.zoom = Math.max(0.1, frame.zoom + delta * 0.1);
  }

  function setZoomFromDisplay(value: number) {
    frame.zoom = Math.max(0.1, value / 100);
  }

  function adjustX(delta: number) {
    frame.x += delta;
  }

  function adjustY(delta: number) {
    frame.y += delta;
  }
</script>

<div class="flex flex-col gap-2">
  <Label>Zoom</Label>
  <div class="flex items-center gap-2">
    <Button variant="outline" size="icon" onclick={() => adjustZoom(-0.1)}>
      <ZoomOut />
    </Button>
    <div class="relative">
      <Input
        type="number"
        class="w-16 text-center pr-4"
        value={displayZoom}
        oninput={(e) => setZoomFromDisplay(Number(e.currentTarget.value))}
        step="1"
        min="10"
      />
      <span
        class="absolute right-1 top-1/2 -translate-y-9/20 text-xs text-gray-500 pointer-events-none"
        >%</span
      >
    </div>
    <Button variant="outline" size="icon" onclick={() => adjustZoom(0.1)}>
      <ZoomIn />
    </Button>
  </div>
  <Label>X</Label>
  <div class="flex items-center gap-2">
    <Button variant="outline" size="icon" onclick={() => adjustX(-1)}>
      <MoveLeft />
    </Button>
    <Input type="number" class="w-16 text-center" bind:value={frame.x} />
    <Button variant="outline" size="icon" onclick={() => adjustX(1)}>
      <MoveRight />
    </Button>
  </div>
  <Label>Y</Label>
  <div class="flex items-center gap-2">
    <Button variant="outline" size="icon" onclick={() => adjustY(-1)}>
      <MoveUp />
    </Button>
    <Input type="number" class="w-16 text-center" bind:value={frame.y} />
    <Button variant="outline" size="icon" onclick={() => adjustY(1)}>
      <MoveDown />
    </Button>
  </div>
</div>
