<script lang="ts">
  import AppSidebar from "$lib/components/AppSidebar.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index";

  import "../app.css";
  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <div class="flex-1">
    {@render children?.()}
  </div>
</Sidebar.Provider>
