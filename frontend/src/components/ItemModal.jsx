// import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

function ItemModal({ text, link }) {
    return (
        <a href={link} className="px-4 py-2 text-text-gray rounded-md hover:text-white transition-transform hover:transition-all ease-in-out duration-150 cursor-pointer">{text}</a>
    )
}

export default ItemModal

ItemModal.propTypes = {
    text: PropTypes.node,
    link: PropTypes.node,
};