const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");
// console.log({ contactsPath });

async function listContacts() {
  const readContacts = await fs.readFile(contactsPath);
  const contactOject = JSON.parse(readContacts);
  return contactOject;
}

// const renderContacts = () => {};

async function getContactById(contactId) {
  const readContacts = await fs.readFile(contactsPath);
  const contactOject = JSON.parse(readContacts);
  const contactById = contactOject.find((item) => item.id === contactId);

  return contactById || null;
  // const getContact = await fs.readFile(listContacts());
  // return getContact.map((item) => item.id);
}

// getContactById("qdggE76Jtbfd9eWJHrssH").then((result) => console.log(result));

async function removeContact(contactId) {
  const readContacts = await fs.readFile(contactsPath);
  const contactOject = JSON.parse(readContacts);
  const contactById = contactOject.find((item) => item.id === contactId);
  if (contactById !== -1) {
    const removeContact = contactOject.splice(contactById, 1);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactOject, null, 2),
      "utf8"
    );

    return removeContact;
  }
  // Якщо контакт не знайдено, повертаємо null
  return null;
}

removeContact("qdggE76Jtbfd9eWJHrssH").then((result) => console.log(result));

async function addContact(name, email, phone) {
  const readContacts = await fs.readFile(contactsPath);
  const contactOject = JSON.parse(readContacts);

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
}

addContact("Anna", "anna@gerz.com", "(508) 252-5118)").then((result) =>
  console.log(result)
);
