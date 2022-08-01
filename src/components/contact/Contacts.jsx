import React from 'react';
import { Link } from "react-router-dom"
import { CURRENTLINE, ORANGE, PINK } from '../../helpers/colors';
import Contact from './Contact';
import Spinner from '../Spinner';

const Contacts = ({ contacts, loading, confirmDelete }) => {
    return (
        <>
            <section className='container'>
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 my-4 float-start">
                                <Link to='/contacts/add' className='btn mx-2'
                                    style={{ backgroundColor: PINK }}
                                >
                                    <i className="fa fa-plus-circle mx-2"></i>
                                    Create new Contacts
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> :
                    (
                        <section className="container">
                            <div className="row">
                                {
                                    contacts ?
                                        contacts.map(contact => (
                                            <Contact key={contact.id} confirmDelete={() => confirmDelete(contact.id, contact.attributes.name)} data={contact} />
                                        ))
                                        :
                                        (
                                            <div className='text-center py-5'
                                                style={{ backgroundColor: CURRENTLINE }}
                                            >
                                                <p className='h3'
                                                    style={{ color: ORANGE }}>
                                                    Contact not found
                                                </p>
                                                <img
                                                    src={require("../../assets/no-found.gif")}
                                                    alt="notfound"
                                                    className='w-25'
                                                />
                                            </div>
                                        )
                                }
                            </div>
                        </section>
                    )
            }
        </>
    );
};

export default Contacts;