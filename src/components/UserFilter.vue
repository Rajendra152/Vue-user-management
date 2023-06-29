<template>
  <div class="container mx-auto">
    <div class="flex flex-row justify-end space-x-2 mt-4">
      <input
        type="text"
        v-model="searchQuery"
        class="border p-2 rounded-md w-1/4"
        placeholder="Search by name or email"
      />
      <button @click="resetFilters" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        Reset Filters
      </button>
    </div>
    <div class="flex flex-row justify-end mt-4">
      <label class="mr-2">Filter by Gender:</label>
      <input type="checkbox" v-model="maleChecked" @change="filterUsers" />
      <label class="mr-2">Male</label>
      <input type="checkbox" v-model="femaleChecked" @change="filterUsers" />
      <label>Female</label>
    </div>
    <div class="flex flex-row justify-end mt-2">
      <label class="mr-2">Filter by Age:</label>
      <div v-for="ageRange in ageRanges" :key="ageRange.label">
        <input
          type="checkbox"
          :value="ageRange"
          v-model="selectedAgeRanges"
          @change="filterUsers"
        />
        <label>{{ ageRange.label }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useUserStore } from '../stores/usersStore'

export default defineComponent({
  setup() {
    const store = useUserStore()

    const searchQuery = computed({
      get: () => store.searchQuery,
      set: (value) => store.setSearchQuery(value)
    })
    const maleChecked = computed({
      get: () => store.maleChecked,
      set: (value) => store.setMaleChecked(value)
    })
    const femaleChecked = computed({
      get: () => store.femaleChecked,
      set: (value) => store.setFemaleChecked(value)
    })
    const selectedAgeRanges = computed({
      get: () => store.selectedAgeRanges,
      set: (value) => store.setSelectedAgeRanges(value)
    })
    const ageRanges = computed(() => store.ageRanges)

    const resetFilters = () => {
      store.resetFilters()
    }

    return {
      searchQuery,
      maleChecked,
      femaleChecked,
      selectedAgeRanges,
      ageRanges,
      resetFilters
    }
  }
})
</script>

<style scoped></style>
