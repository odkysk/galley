<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import FileIcon from "@lucide/svelte/icons/file";
  import HouseIcon from "@lucide/svelte/icons/house";
  import { getTemplates } from "$lib/templates.js";

  // Dynamically load templates from filesystem
  const templates = getTemplates();

  // Navigation items
  const navItems = [
    {
      title: "Home",
      url: "/",
      icon: HouseIcon,
    }
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each navItems as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>

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
