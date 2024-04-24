import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useMain } from "../context/mainContext";

const BtnTabla = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getSymbolTable } = useMain();
    return (
        <div className="">
            <button
                onClick={() => { setIsOpen(true); getSymbolTable(); }}
                className="px-4 py-2 text-text-gray rounded-md hover:text-white hover:transition-all ease-in-out duration-150 cursor-pointer hover:opacity-90 transition-opacity"
            >
                Tabla
            </button>
            {isOpen && createPortal(<ModalTabla isOpen={isOpen} setIsOpen={setIsOpen} />, document.body)}
        </div>
    );
};


const ModalTabla = ({ isOpen, setIsOpen }) => {
    const closeModal = () => setIsOpen(false);
    const { symbolTable } = useMain();

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
                                <h2 className='text-white text-2xl w-full text-center mb-4 font-bold'>Tabla de Simbolos</h2>
                                <div className='flex relative flex-row w-full text-white items-center justify-center py-3 border-b-2 border-[#6a9bfb]/60 bg-sub-dark/80 mb-4'>
                                    <span className='w-[10%] text-center font-bold'>No</span>
                                    <span className='w-1/4 text-center font-bold'>Id</span>
                                    <span className='w-[15%] text-center font-bold'>Tipo</span>
                                    <span className='w-[15%] text-center font-bold'>Tipo Dato</span>
                                    <span className='w-[15%] text-center font-bold'>Entorno</span>
                                    <span className='w-[10%] text-center font-bold'>Linea</span>
                                    <span className='w-[10%] text-center font-bold'>Columna</span>
                                </div>
                                {symbolTable && symbolTable.length > 0 ?

                                    symbolTable.map((symbol, index) => (
                                        <div key={index} className="flex flex-row w-full text-white items-center justify-center py-4 border-b-2 border-white/30 bg-sub-dark/70">
                                            <span className='w-[10%] text-center'>{index}</span>
                                            <span className='w-1/4 text-center'>{symbol.id}</span>
                                            <span className='w-[15%] text-center'>{symbol.typeId}</span>
                                            <span className='w-[15%] text-center'>{symbol.type}</span>
                                            <span className='w-[15%] text-center'>{symbol.env}</span>
                                            <span className='w-[10%] text-center'>{symbol.line}</span>
                                            <span className='w-[10%] text-center'>{symbol.column}</span>
                                        </div>
                                    ))
                                    : < h1 className="text-center text-white text-xl font-bold w-full h-[70%] flex items-center justify-center">No hay Simbolos</h1>
                                }

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default BtnTabla;

ModalTabla.propTypes = {
    isOpen: PropTypes.node.isRequired,
    setIsOpen: PropTypes.node.isRequired
}