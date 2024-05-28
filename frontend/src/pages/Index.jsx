import { Navbar } from "../components/Navbar"
import CodeMirror from '@uiw/react-codemirror';
import { useState, useCallback } from "react";
import { cpp } from '@codemirror/lang-cpp'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import { PiWarningCircleFill } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import { useMain } from "../context/mainContext";
import { Toaster } from 'sonner';

function Index() {
    // const error = "---> Este es un error de ejemplo  \n---> Error No. 2";
    const [isOpen, setIsOpen] = useState(false);
    const { value, setValue, consolePrint, error } = useMain();

    const onChange = useCallback((val) => {
        setValue(val);
    }, []);

    return (
        <>
            <div className='flex h-screen bg-bg-dark'>
                <Navbar />
                <div className="flex mt-28 h-[100%-112px] w-full px-6 pb-5 gap-4">
                    <div className="w-3/5">
                        <div className="flex flex-col w-full rounded-md bg-panel-dark h-full overflow-auto px-4 -z-30">
                            <span className="text-[#bdbec0] pt-3 pb-5 font-bold">Código</span>
                            <CodeMirror value={value} height="555px" onChange={onChange} extensions={cpp()} theme={tokyoNight} aria-autocomplete={true} className="-z-0" />
                            {/* <span className="text-text-gray w-full text-end">Joab Ajsivinac - 202200135</span> */}
                        </div>
                    </div>
                    <div className="w-2/5 flex flex-shrink-0 ">
                        <div className="flex flex-shrink-0 flex-col w-full rounded-md bg-panel-dark h-full px-4">
                            <span className="text-[#bdbec0] pt-3 pb-5 font-bold text-monospace">Consola</span>
                            <div className="w-full h-full flex flex-col mb-2 gap-y-4">
                                <textarea value={consolePrint} name="" id="" className="w-full h-full bg-panel-dark text-[#adb6c4] outline-none resize-none text-monospace" readOnly wrap="off"></textarea>

                                <div
                                    className={`group flex flex-col gap-2 rounded-lg bg-panel-dark border-2 border-gray-200/10 p-5 text-white ${isOpen ? 'group-focus:-translate-y-5' : ''}`}
                                    tabIndex="1"
                                >
                                    <div className="flex cursor-pointer items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
                                        <span className="flex flex-row items-center gap-x-2 text-[#f86f6f] text-monospace"><PiWarningCircleFill size={20} /> Errores </span>
                                        <div className={`h-2 w-3 transition-all duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                                            <FaChevronDown size={12} color="#f47961" />
                                        </div>
                                    </div>
                                    <div
                                        className={`items-center text-text-gray duration-1000 transition-all ${isOpen ? 'visible max-h-screen opacity-100 h-28 overflow-auto' : 'overflow-hidden invisible h-0 max-h-0 opacity-0'}`}
                                    >
                                        <pre className="flex w-9/12 flex-shrink-0 text-monospace">{error}</pre>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >
            <Toaster position="top-center" richColors theme="dark" />
        </>
    )
}

export default Index