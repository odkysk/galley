<script lang="ts">

  interface BannerTemplate {
    id: string;
    name: string;
    thumbnail: string;
    category: string;
  }

  export let isOpen = true;
  export let onTemplateSelect: (templateId: string) => void = () => {};

  const templates: BannerTemplate[] = [
    {
      id: "social-media-post",
      name: "banner",
      thumbnail: "/api/placeholder/300/200",
      category: "ソーシャル",
    },
    {
      id: "blog-header",
      name: "ブログヘッダー",
      thumbnail: "/api/placeholder/300/200",
      category: "ブログ",
    },
    {
      id: "event-banner",
      name: "イベントバナー",
      thumbnail: "/api/placeholder/300/200",
      category: "イベント",
    },
    {
      id: "product-showcase",
      name: "商品紹介",
      thumbnail: "/api/placeholder/300/200",
      category: "商品",
    },
    {
      id: "newsletter-header",
      name: "ニュースレターヘッダー",
      thumbnail: "/api/placeholder/300/200",
      category: "メール",
    },
  ];

  const categories = [...new Set(templates.map((t) => t.category))];
  let selectedCategory = "すべて";

  $: filteredTemplates =
    selectedCategory === "すべて"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);
</script>

<aside
  class="bg-white border-r border-gray-200 h-full transition-all duration-300 ease-in-out"
  class:w-80={isOpen}
  class:w-0={!isOpen}
  class:overflow-hidden={!isOpen}
>
  <div class="flex flex-col">
    <p>テンプレート</p>
    <div class="flex items-center gap-2 mb-6"></div>
    {#each filteredTemplates as template}
      <a href={`/templates/${template.id}`} class="block mb-2">
        <div class="cursor-pointer hover:bg-gray-50 transition-colors p-3 border border-gray-200 rounded-lg">
          {template.name}
        </div>
      </a>
    {/each}
  </div>
</aside>
