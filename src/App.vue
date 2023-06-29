<template>
  <div>
    <UserForm />
    <UserFilter />
    <UserTable />
  </div>
</template>

<script>
import UserForm from './components/UserForm.vue'
import UserTable from './components/UserTable.vue'
import UserFilter from './components/UserFilter.vue'
export default {
  name: 'App',
  components: {
    UserForm,
    UserFilter,
    UserTable
  }
}
</script>

<style scoped></style>
