
import { PURPLE } from '../../helpers/colors'


const SearchContact = ({ query, search }) => {

    return (
        <div className='input-group mx-2 w-75'>
            <span className='input-group-text' style={{ backgroundColor: PURPLE }}>
                <i className='fa fa-search'></i>
            </span>
            <input
                type="text"
                className="form-control"
                value={query.text}
                onChange={search}
                placeholder='Search contact'
            />

        </div>
    );
};

export default SearchContact;