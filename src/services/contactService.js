import axios from "axios";

// Request Base URL
const BASE_URL = "http://localhost:1337/api";

// Get all contacts
export const getAllContacts = () => {
    const url = `${BASE_URL}/contacts?populate=*`;
    return axios.get(url);
}

// Get one contact
export const getContact = contactID => {
    const url = `${BASE_URL}/contacts/${contactID}?populate=*`;
    return axios.get(url);
}

//  Get all groups
// export const getAllGroups = () => {
//     const url = `${BASE_URL}/groups`;
//     return axios.get(url);
// }

// Get one group
// export const getGroup = groupID => {
//     const url = `${BASE_URL}/groups/${groupID}`;
//     return axios.get(url);
// }

// Create new contact
export const createContact = contact => {
    const url = `${BASE_URL}/contacts`;
    return axios.post(url, { "data": contact });
    // return axios.post(url, contact);
}

// Update contact
export const updateContact = (contact, contactID) => {
    const url = `${BASE_URL}/contacts/${contactID}?populate=*`;
    return axios.put(url, { "data": JSON.stringify(contact) });
}

// Delete contact
export const deleteContact = contactID => {
    const url = `${BASE_URL}/contacts/${contactID}`;
    return axios.delete(url);
}






