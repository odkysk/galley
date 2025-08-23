<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { getTemplates, type Template } from "$lib/utils/templates.js";
  import FileIcon from "@lucide/svelte/icons/file";

  // Dynamically load templates from filesystem
  let templates: Template[] = $state([]);

  // Load templates on mount
  $effect(() => {
    getTemplates().then((loadedTemplates: Template[]) => {
      templates = loadedTemplates;
    });
  });

</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Templates</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each templates as template (template.name)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={`/template/${template.name}`} {...props}>
                    <FileIcon />
                    <span>{template.title}</span>
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
