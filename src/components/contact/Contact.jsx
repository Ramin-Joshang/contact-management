import React from 'react';
import { Link } from 'react-router-dom';
import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from '../../helpers/colors';

const Contact = ({ data, confirmDelete }) => {
    // console.log(data.attributes.name);
    const IMG_URL = "http://localhost:1337";

    return (
        <>
            <div className="col-md-6">
                <div
                    style={{ backgroundColor: CURRENTLINE }}
                    className="card my-2"
                >
                    <div className="card-body">
                        <div
                            className="row align-items-center d-flex justify-content-around">
                            <div className="col-md-4 col-sm-4">
                                {
                                    data.attributes.image.data ? (
                                        < img
                                            src={`${IMG_URL}${data.attributes.image.data.attributes.url}`}
                                            alt="contact"
                                            style={{ border: `1px solid ${PURPLE}` }}
                                            className="img-fluid rounded"
                                        />
                                    ) : (<h1>Not found 404</h1>)
                                }

                            </div>
                            <div className='col-md-7 col-sm-7'>
                                <ul className='list-group'>
                                    <li className="list-group-item list-group-item-dark text-start">
                                        Full Name: {" "}
                                        <span className='fw-bold'>
                                            {data.attributes.name}
                                        </span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark text-start">
                                        Phone Number: {" "}
                                        <span className='fw-bold'>
                                            {data.attributes.phone}
                                        </span>
                                    </li>
                                    <li className="list-group-item list-group-item-dark text-start">
                                        Email Address: {" "}
                                        <span className='fw-bold'>
                                            {data.attributes.email}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                                <Link to={`/contacts/${data.id}`} className='btn my-1' style={{ backgroundColor: ORANGE }}>
                                    <i className="fa fa-eye"></i>
                                </Link>
                                <Link to={`/contacts/edit/${data.id}`} className='btn my-1' style={{ backgroundColor: CYAN }}>
                                    <i className="fa fa-pencil"></i>
                                </Link>
                                <button onClick={confirmDelete} className='btn my-1' style={{ backgroundColor: RED }}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Contact;