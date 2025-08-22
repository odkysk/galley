<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import "../app.css";

  let { children } = $props();
  let sidebarOpen = $state(true);

  function handleTemplateSelect(templateId: string) {
    console.log("Selected template:", templateId);
  }

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen bg-gray-50">
  <Sidebar />

  <div class="flex-1 flex flex-col overflow-hidden">
    <main class="flex-1 overflow-auto">
      {@render children?.()}
    </main>
  </div>
</div>
