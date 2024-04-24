import { useState } from "react";
import PropTypes from 'prop-types';
import { FaChevronDown } from "react-icons/fa6";
import ExampleWrapper from "./ModalAST";
import BtnError from "./ModalErrores";
import BtnTabla from "./ModalTabla";

export default function Modal({ name, position, Icon }) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    document.body.classList.toggle('active-modal')
    const pos = {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        right: `${position}%`,
        top: '4.5rem',
        padding: '3px 4px',
        minWidth: '150px',
        backgroundColor: 'rgba(20, 20, 20, 0.75)',
        borderRadius: '4px',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255, 255, 255, 0.4)'
    };
    return (
        <>
            <li onClick={toggleModal} className='flex flex-row items-center gap-2 px-4 py-3 hover:bg-alt-dark rounded-lg text-text-gray hover:text-white cursor-pointer'><Icon size={20} />{name}<FaChevronDown size={12} className="ml-2" /></li>

            {modal && (
                <div className="relative w-full h-full z-10">
                    <div onClick={toggleModal} className="fixed w-full h-full top-0 left-0 right-0 bottom-0"></div>
                    <div style={pos}>
                        <ul className="flex flex-col ">
                            {
                                <>
                                    <ExampleWrapper />
                                    <BtnError />
                                    <BtnTabla />
                                </>
                            }
                        </ul>
                    </div>
                </div >
            )
            }
        </>
    )
}

Modal.propTypes = {
    name: PropTypes.node,
    position: PropTypes.node,
    Icon: PropTypes.elementType,
};