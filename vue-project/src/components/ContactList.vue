<template>
  <div class="container mt-4">
    <h2 class="header">Contact List</h2>
    <div class="table-responsive">
    <table class="custom-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.firstName }}</td>
          <td>{{ contact.lastName }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.country }}</td>
          <td>
            <div class="btn-group" role="group">
          <button class="btn btn-primary btn-sm" @click="$emit('edit-contact', contact)">
            <i class="bi bi-pencil-fill" style="color: white;"></i>
          </button>
          <button class="btn btn-danger btn-sm ms-2" @click="deleteContact(contact.id)">
            <i class="bi bi-trash-fill" style="color: white;"></i>
          </button>
        </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useContacts } from '@/store/ContactStore';
export default defineComponent({
  setup() {
    const { contacts, deleteContact } = useContacts();

    return {
      contacts,
      deleteContact
    };
  }
});
</script>
