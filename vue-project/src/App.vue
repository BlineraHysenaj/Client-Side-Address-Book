<template>
  <div class="container">
    <ContactForm :editContact="editContact" @clear-edit="clearEditContact" />
    <ContactList @edit-contact="setEditContact" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useContacts } from "@/store/ContactStore";
import ContactForm from "@/components/ContactForm.vue";
import ContactList from "@/components/ContactList.vue";

export default defineComponent({
  components: {
    ContactForm,
    ContactList,
  },
  setup() {
    const { contacts, addContact } = useContacts();

    const editContact = reactive({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      country: "",
    });

    const clearEditContact = () => {
      Object.assign(editContact, {
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        country: "",
      });
    };

    const setEditContact = (contact) => {
      Object.assign(editContact, contact);
    };

    return {
      contacts,
      editContact,
      clearEditContact,
      setEditContact,
    };
  },
});
</script>
