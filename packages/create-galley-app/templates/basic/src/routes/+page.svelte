<script lang="ts">
  import { getTemplates } from '@galley/core/utils';
  import { onMount } from 'svelte';

  let templates: Awaited<ReturnType<typeof getTemplates>> = [];
  let loading = true;

  onMount(async () => {
    try {
      templates = await getTemplates();
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Galley - Banner Generator</title>
  <meta name="description" content="Create beautiful banners with Galley" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">
      Welcome to Galley
    </h1>
    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
      Create stunning banners and graphics with our easy-to-use template system.
      Choose a template below to get started.
    </p>
  </div>

  {#if loading}
    <div class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  {:else if templates.length === 0}
    <div class="text-center py-12">
      <p class="text-gray-500">No templates found. Please check your configuration.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each templates as template}
        <a
          href="/template/{template.name}"
          class="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
        >
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            {template.name}
          </h3>
          {#if template.size}
            <p class="text-sm text-gray-500 mb-4">
              {template.size.width} × {template.size.height}px
            </p>
          {/if}
          <div class="text-blue-600 font-medium">
            Create Banner →
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>