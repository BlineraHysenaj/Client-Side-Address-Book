import { ref, reactive, onMounted } from 'vue';
import type { Contact } from '@/models/Contact';

const contacts = reactive<Contact[]>([]);
let nextId = ref(1);

export function useContacts() {
  const loadContacts = () => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts) as Contact[];

      contacts.length = 0; 

      contacts.push(...parsedContacts);

      if (parsedContacts.length > 0) {
        nextId.value = Math.max(...parsedContacts.map((c) => c.id)) + 1;
      }
    }
  };

  onMounted(loadContacts);

  const addContact = (contact: Contact) => {
    const exists = contacts.some(c => c.email === contact.email);
    if (!exists) {
      contact.id = nextId.value++;
      contacts.push(contact);
      saveContacts();
    }
  };

  const updateContact = (contact: Contact) => {
    const index = contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      Object.assign(contacts[index], contact);
      saveContacts();
    }
  };

  const deleteContact = (id: number) => {
    const index = contacts.findIndex((c) => c.id === id);
    if (index !== -1) {
      contacts.splice(index, 1);
      saveContacts();
    }
  };

  const saveContacts = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  };

  return {
    contacts,
    addContact,
    updateContact,
    deleteContact,
  };
}
