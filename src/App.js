import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { createContact, getAllContacts, deleteContact } from './services/contactService';
import { confirmAlert } from 'react-confirm-alert';
import {
  AddContact,
  EditContact,
  DetailsContact,
  Contacts,
  // Contact,
  Navbar
} from './components';
import './App.css';
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/colors';
// import axios from 'axios';


const App = () => {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([])
  const [forceRender, setForceRender] = useState(false)
  const [loading, setLoading] = useState(true);
  const [getImage, setImage] = useState(null);
  // const [groups, setGroups] = useState([]);
  const [contact, setContact] = useState({
    "name": "",
    "phone": "",
    "email": "",
    "job": "",
    "group": ""
  });
  const [query, setQuery] = useState({ text: "" })
  // const [files, setFiles] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();

        setContacts(contactsData.data);
        setFilteredContacts(contactsData.data)
        console.log(contacts);
        // setGroups(contactsData.data.attributes.group);
        setLoading(false);

      } catch (error) {
        console.error(error);
        setLoading(false)
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceRender])

  const createContactHandler = async e => {
    e.preventDefault();

    try {
      // console.log(contact);
      // const formData = new FormData();
      // formData.append("data", contact);
      // formData.append("files.image", getImage);
      // console.log(formData);
      const { status } = await createContact(contact);
      if (status === 200) {
        setContact({});
        setForceRender(!forceRender)
        navigate("/contacts")
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const setContactInfo = e => {
    // if (e.target.type === "file") {
    //   alert("IMAGE")
    //   const formData = new FormData();
    //   formData.append("file", e.target.files[0], e.target.files[0].name)
    //   setContact({
    //     ...contact, image: formData
    //   })
    //   console.log(e.target.files[0].name);
    // }
    // console.log(e.target.type);
    setContact({
      ...contact, [e.target.name]: e.target.value
    })
    console.log(contact);
  }

  const confirm = (contactID, contactName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>Delete contact</h1>
            <p style={{ color: FOREGROUND }}>
              Are you sure to delete
              <span
                style={{
                  color: "red",
                  fontWeight: "bold"
                }}
              > {contactName}</span>
            </p>
            <button
              onClick={() => {
                removeContact(contactID);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              I'm sure
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              Cancel
            </button>
          </div>
        );
      },
    });
  };


  const removeContact = async id => {
    try {
      setLoading(true);
      const response = await deleteContact(id);
      setForceRender(!forceRender);
      setLoading(false)
      if (response) {

      }
    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }
  const imageHandler = e => {
    setImage(e.target.files[0])
    console.log(getImage);
  }
  // const uploadImage = async () => {
  //   const BASE_URL = ""
  //   const form = new FormData();
  //   form.append()
  //   try {
  //     const response = await axios.post(BASE_URL,)
  //   } catch (error) {

  //   }
  // }

  const contactSearch = e => {
    setQuery({ ...query, text: e.target.value });
    const allContacts = contacts.filter(contact => {
      return contact.attributes.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setFilteredContacts(allContacts);
  }

  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path='/' element={<Navigate to='/contacts' />} />
        <Route path='contacts' element={<Contacts contacts={filteredContacts} loading={loading} confirmDelete={confirm} />} />
        <Route path='contacts/:id' element={<DetailsContact />} />
        <Route path='contacts/add' element={
          <AddContact
            loading={loading}
            setContactInfo={setContactInfo}
            contact={contact}
            // groups={groups}
            imageHandler={imageHandler}
            createContactHandler={createContactHandler}
          />
        } />
        <Route path='contacts/edit/:id' element={<EditContact />} />

      </Routes>
    </div>
  );
}

export default App;
