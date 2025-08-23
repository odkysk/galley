<script lang="ts">
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index";

  import "../app.css";
  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main class="w-full">
    {@render children?.()}
  </main>
</Sidebar.Provider>
