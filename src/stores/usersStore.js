import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    selectedUsers: [],
    searchQuery: '',
    maleChecked: false,
    femaleChecked: false,
    ageRanges: [
      { label: '20-30', minAge: 20, maxAge: 30 },
      { label: '31-40', minAge: 31, maxAge: 40 },
      { label: '41-50', minAge: 41, maxAge: 50 }
    ],
    selectedAgeRanges: [],
    newUser: {
      firstName: '',
      lastName: '',
      email: '',
      age: null,
      gender: '',
      phone: '',
      company: {
        name: '',
        address: {
          address: ''
        }
      }
    },
    selectedUser: null
  }),
  getters: {
    filteredUsers: (state) => {
      let selectedUsers = state.users

      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase()
        console.log(query)
        selectedUsers = selectedUsers.filter(
          (user) =>
            (user.firstName + ' ' + user.lastName).toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        )
      }

      if (state.maleChecked && !state.femaleChecked) {
        selectedUsers = selectedUsers.filter((user) => user.gender === 'male')
      } else if (state.femaleChecked && !state.maleChecked) {
        selectedUsers = selectedUsers.filter((user) => user.gender === 'female')
      }

      if (state.selectedAgeRanges && state.selectedAgeRanges.length > 0) {
        selectedUsers = selectedUsers.filter((user) => {
          for (const ageRange of state.selectedAgeRanges) {
            if (user.age >= ageRange.minAge && user.age <= ageRange.maxAge) {
              return true
            }
          }
          return false
        })
      }

      return selectedUsers
    }
  },
  actions: {
    fetchUsers() {
      axios
        .get('https://dummyjson.com/users')
        .then((response) => response.data)
        .then((data) => {
          this.users = data.users
          console.log(data)
        })
        .catch((error) => {
          console.error(error)
        })
    },

    addUser() {
      const newUser = { ...this.newUser, id: this.users.length + 1 }
      this.users.push(newUser)
      this.newUser = {
        firstName: '',
        lastName: '',
        email: '',
        age: null,
        gender: '',
        phone: '',
        company: {
          name: '',
          address: {
            address: ''
          }
        }
      }
    },

    deleteSelectedUsers(userIds) {
      this.users = this.users.filter((user) => !userIds.includes(user.id))
    },

    editUser(user) {
      const userIndex = this.users.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) {
        this.users[userIndex] = { ...user }
      }
    },

    resetFilters() {
      this.searchQuery = ''
      this.maleChecked = false
      this.femaleChecked = false
      this.selectedAgeRanges = []
    },

    setSearchQuery(value) {
      this.searchQuery = value
    },
    setMaleChecked(value) {
      this.maleChecked = value
    },
    setFemaleChecked(value) {
      this.femaleChecked = value
    },
    setSelectedAgeRanges(value) {
      this.selectedAgeRanges = value
    }
  }
})
