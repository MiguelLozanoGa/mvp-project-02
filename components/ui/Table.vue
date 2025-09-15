<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover align-middle text-center">
      <thead class="table-dark">
        <tr>
          <th v-for="col in columns" :key="col.key">
            {{ col.label }}
          </th>

          <th v-if="$slots.actions">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="getKey(item)">
          <td v-for="col in columns" :key="col.key">
            {{ item[col.key] }}
          </td>

          <td v-if="$slots.actions">
            <slot name="actions" :item="item" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  defineProps({
    items: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    getKey: {
      type: Function,
      default: (item) => item.id,
    },
  });
</script>
