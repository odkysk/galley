<script lang="ts">
  interface Props {
    templateName: string;
    error: Error;
  }

  let { templateName, error }: Props = $props();
</script>

<div class="flex flex-1 items-center justify-center">
  <p class="text-gray-500">Template "{templateName}" not found</p>
  <p>{error.message}</p>
</div>