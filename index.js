const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = listContacts();
      console.table(contacts);
      break;

    case "get":
      getContactById(id).then((data) => console.log(data));
      break;

    case "add":
      addContact(name, email, phone).then((data) => console.table(data));
      break;

    case "remove":
      removeContact(id).then((data) => console.table(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
