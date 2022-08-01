import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { getContact, updateContact, } from "../../services/contactService";
import Spinner from "../Spinner";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";

const EditContact = () => {

    const IMG_URL = "http://localhost:1337";

    const { id } = useParams();
    const navigate = useNavigate();

    const [state, setState] = useState({
        loading: true,
        contact: {
            "name": "",
            "phone": "",
            "email": "",
            "job": "",
            "group": ""
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContact(id);
                // console.log(contactData);
                setState({
                    ...state,
                    loading: false,
                    contact: contactData.data.attributes
                });
                // console.log(state.contact);
            } catch (error) {
                console.error(error);
                setState({ ...state, loading: false });
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setContactInfo = e => {

        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value,
            },
        });
        console.log(state.contact);
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            setState({ ...state, loading: true });
            console.log(state.contact);
            const { data } = await updateContact(state.contact, id);
            setState({ ...state, loading: false });
            if (data) {
                navigate("/contacts");
            }
        } catch (err) {
            console.error(err);
            setState({ ...state, loading: false });
        }
    };

    const { loading, contact } = state;

    return (
        <>
            {
                console.log(contact)
            }
            {loading ? (
                <Spinner />
            ) : (


                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{ color: ORANGE }}>
                                        Edit Contact
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: ORANGE }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                            >
                                <div className="col-md-8">
                                    <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input
                                                name="name"
                                                type="text"
                                                className="form-control"
                                                value={contact.name}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="Full Name"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="image"
                                                type="file"
                                                // value={contact.photo}
                                                onChange={setContactInfo}
                                                className="form-control"
                                            // required={true}
                                            // placeholder="آدرس تصویر"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="phone"
                                                type="number"
                                                className="form-control"
                                                value={contact.phone}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="Phone Number"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="email"
                                                type="email"
                                                className="form-control"
                                                value={contact.email}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="Email"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="job"
                                                type="text"
                                                className="form-control"
                                                value={contact.job}
                                                onChange={setContactInfo}
                                                required={true}
                                                placeholder="Job"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                name="group"
                                                value={contact.group}
                                                onChange={setContactInfo}
                                                required={true}
                                                className="form-control"
                                            >
                                                <option value="">Select groups</option>
                                                <option value="Friend">Friend</option>
                                                <option value="Family">Family</option>
                                                <option value="Service">Service</option>                                                {/* {contact.data.attributes.group.length > 0 &&
                                                    contact.data.attributes.group.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))} */}
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="submit"
                                                className="btn"
                                                style={{ backgroundColor: PURPLE }}
                                                value="ویرایش مخاطب"
                                            />
                                            <Link
                                                to={"/contacts"}
                                                className="btn mx-2"
                                                style={{ backgroundColor: COMMENT }}
                                            >
                                                انصراف
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-4">
                                    {
                                        contact.image.data ? (
                                            <img
                                                src={`${IMG_URL}${contact.image.data.attributes.url}`}
                                                alt='contact'
                                                className="img-fluid rounded"
                                                style={{ border: `1px solid ${PURPLE}` }}
                                            />
                                        )
                                            :
                                            (<h1>Not found 404</h1>)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/man-taking-note.png")}
                                alt="man-taking-note"
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;
