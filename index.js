const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const color = require("colors");

const program = require("commander").program;
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.log(contactsList);
      break;

    case "get":
      const getContact = await getContactById(id);
      console.log(getContact);
      break;

    case "add":
      const contactAdd = await addContact(name, email, phone);
      console.log(color.green(contactAdd));
      break;

    case "remove":
      const contactRemove = await removeContact(id);
      console.log(color.red(contactRemove));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
