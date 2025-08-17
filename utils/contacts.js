const fs = require('fs');

const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

const dataPath = './data/contacts.json';
if( !fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}

const loadContact = () =>{
    const fileBuffer = fs.readFileSync('data/contacts.json','utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}


const findContact = (nama)=>{
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

const saveContacts = (contacts) =>{
    fs.writeFileSync('data/contacts.json',JSON.stringify(contacts))
}

const addContact = (contact) =>{
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts)
}

const cekDuplikat = (nama) =>{
    const contacts = loadContact();
    return find((contact) => contact.nama === nama);
}

module.exports = {loadContact,findContact,addContact,cekDuplikat}