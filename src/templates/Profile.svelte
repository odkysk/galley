<script lang="ts">
  interface ProfileProps {
    name: string;
    email: string;
  }

  let { name, email }: ProfileProps = $props();
</script>

<div class="bg-white p-4">
  <h1>{name}</h1>
  <p>{email}</p>
</div>
