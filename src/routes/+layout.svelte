<script lang="ts">
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index";

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

<Sidebar.Provider>
  <AppSidebar />
  <div class="p-2"><Sidebar.Trigger /></div>
  <div class="flex-1">
    {@render children?.()}
  </div>
</Sidebar.Provider>
