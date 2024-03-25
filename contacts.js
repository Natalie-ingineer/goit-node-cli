const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const readContacts = await fs.readFile(contactsPath);
    const contactOject = JSON.parse(readContacts);
    return contactOject;
  } catch (error) {
    error.message = "Error! Try again";
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contactOject = await listContacts();
    const contactById = contactOject.find((item) => item.id === contactId);

    return contactById || null;
  } catch (error) {
    error.message = "Error! Try again";
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contactOject = await listContacts();
    const contactById = contactOject.find((item) => item.id === contactId);
    if (contactById === -1) {
      return null;
    }

    const [removeContact] = contactOject.splice(contactById, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactOject, null, 2));
    return removeContact;
  } catch (error) {
    error.message = "Error! Try again";
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contactOject = await listContacts();

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contactOject.push(newContact);

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactOject, null, 2),
      "utf8"
    );
    return newContact;
  } catch (error) {
    error.message = "Error! Try again";
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
