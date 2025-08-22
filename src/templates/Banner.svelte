<script lang="ts">
  interface BannerProps {
    title: string;
    description: string;
  }

  let { title, description }: BannerProps = $props();
</script>

<div class="bg-blue-500 text-white p-4">
  <h1>{title}</h1>
  <p>{description}</p>
</div>
