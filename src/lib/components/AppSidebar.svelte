<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { getTemplateNames } from "$lib/utils/templates.js";
  import FileIcon from "@lucide/svelte/icons/file";

  // Dynamically load templates from filesystem
  let templates: string[] = $state([]);

  // Load templates on mount
  $effect(() => {
    templates = getTemplateNames();
  });
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Templates</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each templates as template}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={`/template/${template}`} {...props}>
                    <FileIcon />
                    <span>{template}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
