<template>
  <div class="container mx-auto">
    <div class="flex flex-row justify-center space-x-4 mt-4">
      <button @click="deleteSelectedUsers" class="px-4 py-2 bg-red-500 text-white rounded-md">
        Delete User
      </button>
    </div>
    <table class="table-auto w-full mt-4">
      <thead>
        <tr>
          <th class="px-4 py-2">Select</th>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Avatar</th>
          <th class="px-4 py-2">Full Name</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Age</th>
          <th class="px-4 py-2">Gender</th>
          <th class="px-4 py-2">Phone</th>
          <th class="px-4 py-2">Company</th>
          <th class="px-4 py-2">Company Address</th>
        </tr>
      </thead>
      <tbody v-if="filteredUsers.length > 0">
        <tr v-for="user in filteredUsers" :key="user.id">
          <td class="px-4 py-2">
            <input type="checkbox" v-model="selectedUserIds" :value="user.id" />
          </td>
          <td class="px-4 py-2">{{ user.id }}</td>
          <td class="px-4 py-2">
            <img
              :src="user.image || 'src/assets/icons/pngtree-vector-users-icon-png-image_856952.jpg'"
              :alt="user.fullName"
              class="w-8 h-8 rounded-full"
            />
          </td>
          <td class="px-4 py-2">{{ user.firstName }} {{ user.lastName }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">{{ user.age }}</td>
          <td class="px-4 py-2">{{ user.gender }}</td>
          <td class="px-4 py-2">{{ user.phone }}</td>
          <td class="px-4 py-2">{{ user.company.name }}</td>
          <td class="px-4 py-2">{{ user.company.address.address }}</td>
        </tr>
      </tbody>
      <div v-else>
        <h1><b>No Users Found</b></h1>
      </div>
    </table>
  </div>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useUserStore } from '../stores/usersStore'
export default defineComponent({
  setup() {
    const store = useUserStore()

    const filteredUsers = computed(() => store.filteredUsers)

    const selectedUserIds = ref([])

    const fetchUsers = async () => {
      await store.fetchUsers()
    }

    onMounted(fetchUsers)

    const deleteSelectedUsers = () => {
      store.deleteSelectedUsers(selectedUserIds.value)
      selectedUserIds.value = []
    }

    return {
      filteredUsers,
      selectedUserIds,
      deleteSelectedUsers
    }
  }
})
</script>

<style scoped></style>
