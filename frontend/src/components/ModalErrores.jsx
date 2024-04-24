import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { MdOutlineError } from "react-icons/md";
import { useMain } from "../context/mainContext";

const BtnError = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getErrorsReport } = useMain();
    return (
        <div className="">
            <button
                onClick={() => { setIsOpen(true); getErrorsReport(); }}
                className="px-4 py-2 text-text-gray rounded-md hover:text-white transition-transform hover:transition-all ease-in-out duration-150 cursor-pointer hover:opacity-90 transition-opacity"
            >
                Errores
            </button>
            {isOpen && createPortal(<ModalError isOpen={isOpen} setIsOpen={setIsOpen} />, document.body)}
        </div>
    );
};


const ModalError = ({ isOpen, setIsOpen }) => {
    const closeModal = () => setIsOpen(false);
    const { errorsReport } = useMain();

    return (
        <>
            {isOpen && (
                <div
                    onClick={closeModal}
                    className="absolute inset-0 z-50 flex justify-center items-center w-full h-screen"
                >
                    <div className="flex h-full w-full bg-slate-900/20 backdrop-blur p-8 absolute top-0 left-0 right-0 bottom-0 cursor-pointer items-center gap-4 justify-center ">
                        <div className="flex w-11/12 flex-col h-4/5">
                            <div className="flex-grow overflow-auto px-5">
                                <h2 className='text-white text-2xl w-full text-center mb-4 font-bold'>Resumen de Errores</h2>
                                <div className='flex relative flex-row w-full text-white items-center justify-center py-3 border-b-2 border-[#6a9bfb]/60 bg-sub-dark/80 mb-4'>
                                    <span className='w-[20%] text-center font-bold'>Tipo</span>
                                    <span className='w-[60%] text-center font-bold'>Descripción</span>
                                    <span className='w-[10%] text-center font-bold'>Fila</span>
                                    <span className='w-[10%] text-center font-bold'>Columna</span>
                                </div>
                                {errorsReport && errorsReport.length > 0 ?

                                    errorsReport.map((error, index) => (
                                        <div key={index} className="flex flex-row w-full text-white items-center justify-center py-4 border-b-2 border-white/30 bg-sub-dark/70">
                                            <div className="w-[20%] relative text-center flex items-center justify-center gap-x-4">
                                                <div className='p-2 bg-[#b77fd8]/30 rounded-lg'>
                                                    <MdOutlineError color='#b07cd0' size={23} />
                                                </div>
                                                <span>{error.type}</span>
                                            </div>
                                            <span className="w-[60%] text-center"> {error.description}</span>
                                            <span className="w-[10%] text-center"> {error.line}</span>
                                            <span className="w-[10%] text-center">{error.column}</span>
                                        </div>
                                    ))
                                    : < h1 className="text-center text-white text-xl font-bold w-full h-[70%] flex items-center justify-center">No hay Errores</h1>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default BtnError;

ModalError.propTypes = {
    isOpen: PropTypes.node.isRequired,
    setIsOpen: PropTypes.node.isRequired
}