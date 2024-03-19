import PropTypes from 'prop-types';

export function Button({ icon }) {
    return (
        <button type="submit" className="flex items-center align-top px-2 py-2 bg-panel-dark rounded-md text-text-gray hover:text-white transition-transform hover:transition-all ease-in-out duration-150">{icon}</button>
    )
}

Button.propTypes = {
    icon: PropTypes.node.isRequired,
};