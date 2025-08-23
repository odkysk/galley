<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import type { ImageFrame } from "$lib/models/template.js";
  import MoveDown from "@lucide/svelte/icons/move-down";
  import MoveLeft from "@lucide/svelte/icons/move-left";
  import MoveRight from "@lucide/svelte/icons/move-right";
  import MoveUp from "@lucide/svelte/icons/move-up";
  import ZoomIn from "@lucide/svelte/icons/zoom-in";
  import ZoomOut from "@lucide/svelte/icons/zoom-out";

  let {
    frame = $bindable(),
    blendMode = $bindable(),
  }: {
    frame: ImageFrame;
    blendMode?: string;
  } = $props();

  let displayZoom = $derived(Math.round(frame.zoom * 100));
  let holdTimeout: number | null = null;
  let holdInterval: number | null = null;

  const blendModes = [
    { value: "normal", label: "Normal" },
    { value: "multiply", label: "Multiply" },
    { value: "screen", label: "Screen" },
  ];

  // Initialize blendMode if not set
  if (!blendMode) {
    blendMode = "normal";
  }

  function adjustZoom(delta: number) {
    frame.zoom = Math.max(0.1, frame.zoom + delta * 0.01);
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

  function startHold(
    singleAdjustFn: () => void,
    continuousAdjustFn: () => void
  ) {
    singleAdjustFn(); // Execute immediately with ±1
    holdTimeout = setTimeout(() => {
      holdInterval = setInterval(continuousAdjustFn, 20); // Continue every 20ms with ±1
    }, 200); // Wait 200ms before starting continuous adjustment
  }

  function stopHold() {
    if (holdTimeout) {
      clearTimeout(holdTimeout);
      holdTimeout = null;
    }
    if (holdInterval) {
      clearInterval(holdInterval);
      holdInterval = null;
    }
  }
</script>

<div class="flex flex-col gap-2">
  <div class="flex items-center gap-2">
    <Label class="text-xs w-12 text-gray-500">Zoom</Label>
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onmousedown={() =>
          startHold(
            () => adjustZoom(-1),
            () => adjustZoom(-1)
          )}
        onmouseup={stopHold}
        onmouseleave={stopHold}
      >
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
      <Button
        variant="outline"
        size="icon"
        onmousedown={() =>
          startHold(
            () => adjustZoom(1),
            () => adjustZoom(1)
          )}
        onmouseup={stopHold}
        onmouseleave={stopHold}
      >
        <ZoomIn />
      </Button>
    </div>
  </div>
  <div class="w-[calc(100%+32px)] ml-[-16px]">
    <Separator class="w-full" />
  </div>
  <div class="flex items-center gap-2">
    <Label class="text-xs w-12 text-gray-500">X</Label>
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onmousedown={() =>
          startHold(
            () => adjustX(-1),
            () => adjustX(-1)
          )}
        onmouseup={stopHold}
        onmouseleave={stopHold}
      >
        <MoveLeft />
      </Button>
      <Input type="number" class="w-16 text-center" bind:value={frame.x} />
      <Button
        variant="outline"
        size="icon"
        onmousedown={() =>
          startHold(
            () => adjustX(1),
            () => adjustX(1)
          )}
        onmouseup={stopHold}
        onmouseleave={stopHold}
      >
        <MoveRight />
      </Button>
    </div>
  </div>
  <div class=" w-[calc(100%+32px)] ml-[-16px]">
    <Separator class="w-full" />
  </div>
  <div class="flex items-center gap-2">
    <Label class="text-xs w-12 text-gray-500">Y</Label>
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onmousedown={() =>
          startHold(
            () => adjustY(-1),
            () => adjustY(-1)
          )}
        onmouseup={stopHold}
        onmouseleave={stopHold}
      >
        <MoveUp />
      </Button>
      <Input type="number" class="w-16 text-center" bind:value={frame.y} />
      <Button
        variant="outline"
        size="icon"
        onclick={() => adjustY(1)}
        onmousedown={() =>
          startHold(
            () => adjustY(1),
            () => adjustY(1)
          )}
        onmouseup={stopHold}
        onmouseleave={stopHold}
      >
        <MoveDown />
      </Button>
    </div>
  </div>
  <div class=" w-[calc(100%+32px)] ml-[-16px]">
    <Separator class="w-full" />
  </div>
  <div class="flex items-center gap-2">
    <Label class="text-xs w-12 text-gray-500">Blend</Label>
    <Select.Root type="single" bind:value={blendMode}>
      <Select.Trigger class="flex-1">
        {blendModes.find(mode => mode.value === blendMode)?.label || "Normal"}
      </Select.Trigger>
      <Select.Content>
        {#each blendModes as mode}
          <Select.Item value={mode.value}>{mode.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
</div>
