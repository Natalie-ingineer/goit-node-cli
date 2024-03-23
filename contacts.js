import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join("db", "contacts.json");
console.log({ contactsPath });

async function listContacts() {}
async function getContactById(contactId) {}
async function removeContact(contactId) {}
async function addContact(name, email, phone) {}
