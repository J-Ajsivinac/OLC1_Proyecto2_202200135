import { useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import Graphviz from 'graphviz-react';
import { useMain } from "../context/mainContext";
import { useRef, useEffect } from 'react';

const ExampleWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { getASTFrontend } = useMain();
    return (
        <div className="">
            <button
                onClick={() => { setIsOpen(true); getASTFrontend(); }}
                className="px-4 py-2 text-text-gray rounded-md hover:text-white transition-transform hover:transition-all ease-in-out duration-150 cursor-pointer hover:opacity-90 transition-opacity"
            >
                Árbol AST
            </button>
            {isOpen && createPortal(<SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />, document.body)}
        </div>
    );
};


const SpringModal = ({ isOpen, setIsOpen }) => {
    const closeModal = () => setIsOpen(false);
    const { ast } = useMain();
    const containerRef = useRef();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.clientWidth);
            setHeight(containerRef.current.clientHeight);
        }
    }, [ast]);
    return (
        <>
            {isOpen && (
                <div
                    onClick={closeModal}
                    className="absolute inset-0 z-50 flex justify-center items-center w-full"
                >
                    <div className="flex bg-slate-900/20 backdrop-blur p-8 absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll cursor-pointer items-center">


                        <div ref={containerRef} className="flex items-center justify-center box-border w-full h-full z-10 ">
                            {ast === '' ? <h1 className="text-center text-2xl font-bold">No hay AST</h1> : <Graphviz dot={ast} options={{ zoom: true, width: width, height: height, fit: true }} className='flex-grow w-full' />
                            }

                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default ExampleWrapper;

SpringModal.propTypes = {
    isOpen: PropTypes.node.isRequired,
    setIsOpen: PropTypes.node.isRequired
}