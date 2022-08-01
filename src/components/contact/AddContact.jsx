import { Link } from "react-router-dom";

import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";


const AddContact = ({ loading, contact, setContactInfo, createContactHandler, imageHandler }) => {
    // console.log(groups);
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <img
                            src={require("../../assets/man-taking-note.png")}
                            alt='profile'
                            height="400px"
                            style={{
                                position: "absolute",
                                zIndex: "-1",
                                top: "130px",
                                right: "100px",
                                opacity: "50%",
                            }}
                        />
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p
                                        className="h4 fw-bold text-center"
                                        style={{ color: GREEN }}
                                    >
                                        Create new contact
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: GREEN }} />
                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <form onSubmit={createContactHandler}>
                                        <div className="mb-2">
                                            <input
                                                name="name"
                                                type="text"
                                                value={contact.name}
                                                onChange={setContactInfo}
                                                className="form-control"
                                                placeholder="Full name"
                                                required={true}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="image"
                                                type="file"
                                                // value={contact.image}
                                                onChange={imageHandler}
                                                className="form-control"
                                            // required={true}
                                            // placeholder="Image URL"
                                            />
                                            {/* <button onClick={uploadImage}>upload</button> */}
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                name="phone"
                                                type="number"
                                                value={contact.phone}
                                                onChange={setContactInfo}
                                                className="form-control"
                                                required={true}
                                                placeholder="Phone number"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={contact.email}
                                                onChange={setContactInfo}
                                                className="form-control"
                                                required={true}
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                type="text"
                                                name="job"
                                                value={contact.job}
                                                onChange={setContactInfo}
                                                className="form-control"
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
                                                <option value="Service">Service</option>
                                                {/* {
                                                    groups.length > 0 && groups.map(group => (
                                                        <option key={group.id} value={group.name}>
                                                            {group.name}
                                                        </option>
                                                    ))
                                                } */}
                                            </select>
                                        </div>
                                        <div className="mx-2">
                                            <input
                                                type="submit"
                                                className="btn"
                                                style={{ backgroundColor: PURPLE }}
                                                value="Create contact"
                                            />
                                            <Link
                                                to={"/contacts"}
                                                className="btn mx-2"
                                                style={{ backgroundColor: COMMENT }}
                                            >
                                                Cancel
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default AddContact;