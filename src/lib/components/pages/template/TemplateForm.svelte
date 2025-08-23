<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";

  let { templateProps = $bindable() }: { templateProps: Record<string, any> } =
    $props();
</script>

<div class="flex gap-3">
  {#each Object.keys(templateProps) as key}
    <div class="flex flex-col gap-1">
      <Label for={key}>{key}</Label>
      <Input id={key} bind:value={templateProps[key]} />
    </div>
  {/each}
</div>
