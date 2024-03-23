import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join("db", "contacts.json");
// console.log({ contactsPath });

async function listContacts() {
  const readContacts = await fs.readFile(contactsPath);
  const contactOject = JSON.parse(readContacts);
  return contactOject;
}

const renderContacts = () => {};

async function getContactById(contactId) {}
async function removeContact(contactId) {}
async function addContact(name, email, phone) {}
