import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CURRENTLINE, PURPLE, CYAN } from '../../helpers/colors';
import { getContact } from "../../services/contactService"
import Spinner from '../Spinner';


const DetailsContact = () => {

    const IMG_URL = "http://localhost:1337";
    const { id } = useParams();
    const [state, setState] = useState({
        loading: true,
        contact: {}
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContact(id);

                setState({
                    ...state,
                    loading: false,
                    contact: contactData.data,
                });
            } catch (err) {
                console.log(err.message);
                setState({ ...state, loading: false });
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { loading, contact } = state;

    return (
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: CYAN }}>
                            Contact Information
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{ backgroundColor: CYAN }} />
            {
                console.log(contact)
            }
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {Object.keys(contact).length > 0 && (
                        <section className="view-contact mt-e">
                            <div
                                className="container p-3"
                                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        {
                                            contact.attributes.image.data ? (
                                                <img
                                                    src={`${IMG_URL}${contact.attributes.image.data.attributes.url}`}
                                                    alt=""
                                                    className="img-fluid rounded"
                                                    style={{ border: `1px solid ${PURPLE}` }}
                                                />
                                            )
                                                :
                                                (<h1>Not found 404</h1>)
                                        }

                                    </div>
                                    <div className="col-md-9">
                                        <ul className="list-group text-start">
                                            <li className="list-group-item list-group-item-dark">
                                                Full Name :{" "}
                                                <span className="fw-bold">{contact.attributes.name}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Phone Number :{" "}
                                                <span className="fw-bold">{contact.attributes.phone}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Email : <span className="fw-bold">{contact.attributes.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Job : <span className="fw-bold">{contact.attributes.job}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                Group : <span className="fw-bold">{contact.attributes.group}</span>
                                            </li>
                                        </ul>
                                        <div className="row my-2">
                                            <div className="d-grid ">
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn"
                                                    style={{ backgroundColor: PURPLE }}
                                                >
                                                    Back to home
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    )
}


export default DetailsContact;