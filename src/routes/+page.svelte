<script lang="ts">
  import { Button, Column, Grid, Row, Tile } from "carbon-components-svelte";
  import { Add } from "carbon-icons-svelte";
</script>

<div class="min-h-screen bg-gray-50 p-8">
  <Grid>
    <Row>
      <Column>
        <h1 class="text-4xl text-red-500 font-bold text-center mb-8">
          Welcome to Galley
        </h1>
        <p class="text-lg text-center text-gray-600 mb-8">
          SvelteKit + Carbon Design + Tailwind CSS
        </p>
      </Column>
    </Row>
    <p class="text-red-500">aaa</p>
    <Row>
      <Column sm={4} md={8} lg={6}>
        <Tile class="mb-4">
          <h2 class="text-2xl font-semibold mb-4">Carbon Components</h2>
          <p class="mb-4">
            IBM's Carbon Design System integrated with Svelte 5
          </p>
          <Button icon={Add}>Add Item</Button>
        </Tile>
      </Column>

      <Column sm={4} md={8} lg={6}>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold mb-4">Tailwind CSS</h2>
          <p class="text-gray-600 mb-4">
            Utility-first CSS framework for rapid UI development
          </p>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Tailwind Button
          </button>
        </div>
      </Column>
    </Row>
  </Grid>
</div>
