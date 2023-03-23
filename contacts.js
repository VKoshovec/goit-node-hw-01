const { nanoid } = require('nanoid');
const path = require('path');
const fs = require('fs').promises;

const contactsPath  = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
      const currentContacts = await fs.readFile(contactsPath); 
      const list = JSON.parse(currentContacts);
      return list;
    } catch (error) {
      console.log(error);  
    };
};
  
async function getContactById(contactId) {
    try {
        const currentContacts = await listContacts();
        const findElement = currentContacts.find(el=>
           el.id == contactId
        );
        return findElement || null;
    } catch (error) {
        console.log(error);  
    }
};
  
async function removeContact(contactId) {
    try {
        const currentContacts = await listContacts();
        const index = currentContacts.findIndex(item=>item.id===contactId);
        if (index === -1) {
            return null;
        };
        const [result] = currentContacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(currentContacts,null,2));
        return result;
    } catch (error) {
        console.log(error);
    }
   };
  
async function addContact(name, email, phone) {
    try {
        const currentContacts = await listContacts();
        const newContact = { id: nanoid(), name: name, email: email, phone: phone };
        currentContacts.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(currentContacts,null,2)); 
        return newContact;
      } catch (error) {
        console.log(error);  
      };
};

module.exports = {
    listContacts,
    addContact,
    getContactById,
    removeContact
};
