<template>
  <div class="container mt-4">
    <h2 class="header">{{ contact.id ? "Edit" : "Add" }} Contact</h2>
    <form @submit.prevent="handleSubmit" class="formContact">
      <div class="form-group">
        <label for="firstName"
          >First Name <span class="text-danger">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="contact.firstName"
          required
        />
      </div>
      <div class="form-group">
        <label for="lastName"
          >Last Name <span class="text-danger">*</span></label
        >
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="contact.lastName"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email <span class="text-danger">*</span></label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="contact.email"
          @blur="validateEmail"
          required
          :class="{ 'is-invalid': emailError }"
        />
        <div v-if="emailError" class="invalid-feedback">
          {{ emailErrorMessage }}
        </div>
      </div>
      <div class="form-group">
        <label for="country">Country <span class="text-danger">*</span></label>
        <select
          class="form-control"
          id="country"
          v-model="contact.country"
          required
        >
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>
      <div class="submitButton">
        <button type="submit" class="btn btn-success">Save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from "vue";
import { useContacts } from "@/store/ContactStore";
import countriesList from "country-list";

export default defineComponent({
  props: ["editContact"],
  emits: ["clear-edit"],
  setup(props, { emit }) {
    const { addContact, updateContact } = useContacts();
    const countries = countriesList.getNames();

    const contact = reactive({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      country: "",
    });
    const emailError = ref(false);
    const emailErrorMessage = ref("");

    watch(
      () => props.editContact,
      (newValue) => {
        if (newValue && newValue.id) {
          Object.assign(contact, newValue);
        }
      },
      { immediate: true, deep: true }
    );

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!contact.email.match(emailPattern)) {
        emailError.value = true;
        emailErrorMessage.value = "Please enter a valid email address.";
      } else {
        emailError.value = false;
        emailErrorMessage.value = "";
      }
    };

    const handleSubmit = () => {
      if (emailError.value) {
        return;
      }

      if (contact.id) {
        updateContact(contact);
      } else {
        addContact({ ...contact });
      }
      resetForm();
      emit("clear-edit");
    };

    const resetForm = () => {
      Object.assign(contact, {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        country: "",
      });
      emailError.value = false;
      emailErrorMessage.value = "";
    };

    return {
      contact,
      countries,
      handleSubmit,
      validateEmail,
      emailError,
      emailErrorMessage,
    };
  },
});
</script>
