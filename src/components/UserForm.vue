<template>
  <div class="container mx-auto">
    <h1 class="text-2xl text-center font-bold mt-4">User Management App</h1>

    <form v-if="showForm" @submit.prevent="addUser" class="flex flex-col items-start mt-4">
      <div class="flex flex-row space-x-2" id="user.phone">
        <label for="firstName">First Name:</label>
        <input
          id="firstName"
          type="text"
          v-model="newUser.firstName"
          class="border p-2 rounded-md"
          placeholder="Enter first name"
          required
        />
      </div>
      <div class="flex flex-row space-x-2 mt-2">
        <label for="lastName">Last Name:</label>
        <input
          id="lastName"
          type="text"
          v-model="newUser.lastName"
          class="border p-2 rounded-md"
          placeholder="Enter last name"
          required
        />
      </div>
      <div class="flex flex-row space-x-2 mt-2">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="newUser.email"
          class="border p-2 rounded-md"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="flex flex-row space-x-2 mt-2">
        <label for="age">Age:</label>
        <input
          id="age"
          type="number"
          v-model="newUser.age"
          class="border p-2 rounded-md"
          placeholder="Enter age"
          required
        />
      </div>
      <div class="flex flex-row space-x-2 mt-2">
        <label for="gender">Gender:</label>
        <select id="gender" v-model="newUser.gender" class="border p-2 rounded-md" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="flex flex-row space-x-2 mt-2">
        <label for="phone">Phone:</label>
        <input
          id="phone"
          type="text"
          v-model="newUser.phone"
          class="border p-2 rounded-md"
          placeholder="Enter phone number"
          required
        />
      </div>
      <div class="flex flex-row space-x-2 mt-2">
        <label for="company">Company:</label>
        <input
          id="company"
          type="text"
          v-model="newUser.company.name"
          class="border p-2 rounded-md"
          placeholder="Enter company name"
          required
        />
      </div>
      <div class="flex flex-row space-x-2 mt-2">
        <label for="companyAddress">Company Address:</label>
        <input
          id="companyAddress"
          type="text"
          v-model="newUser.company.address.address"
          class="border p-2 rounded-md"
          placeholder="Enter company address"
          required
        />
      </div>
      <button type="submit" class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md">
        Add User
      </button>
    </form>
    <div v-else class="flex flex-row justify-center space-x-4 mt-4">
      <button @click="showForm = true" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        Add User
      </button>
      <button @click="showForm = true" class="px-4 py-2 bg-yellow-500 text-white rounded-md">
        Edit User
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref } from 'vue'
import { useUserStore } from '../stores/usersStore'

export default defineComponent({
  setup() {
    const store = useUserStore()

    const selectedUsers = computed(() => store.selectedUsers)

    const showForm = ref(false)

    const newUser = computed(() => store.newUser)

    const addUser = () => {
      store.addUser()
      showForm.value = false
    }

    const selectedUser = ref(null)

    const selectUser = (user) => {
      selectedUser.value = { ...user }
    }

    const editUser = () => {
      store.editUser(selectedUser.value)
    }

    return {
      selectedUsers,
      newUser,
      addUser,
      showForm,
      selectUser,
      editUser,
      selectedUser
    }
  }
})
</script>

<style scoped></style>
