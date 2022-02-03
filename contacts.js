const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err));
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const currentData = JSON.parse(data);
    const newData = currentData.filter(
      (contact) => Number.parseInt(contact.id) === contactId
    );
    return newData;
  } catch (err) {
    return console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const currentData = JSON.parse(data);
    const newData = currentData.filter(
      (contact) => Number.parseInt(contact.id) !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newData));
    return newData;
  } catch (error) {
    return console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const currentData = JSON.parse(data);
    currentData.push({ name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(currentData));
    return currentData;
  } catch (error) {
    return console.log(error.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
