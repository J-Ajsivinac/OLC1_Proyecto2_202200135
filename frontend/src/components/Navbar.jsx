
import { FaSquarePlus, FaFolderClosed, FaFloppyDisk, FaPlay, FaFile } from "react-icons/fa6";
// import { LuFile } from "react-icons/lu";
import { Button } from './Button';
import Modal from './Modal'
import { useMain } from "../context/mainContext";
// import { ModalReport } from "./ModalReport";

export function Navbar() {
    const { interpreter, handlerFileChange, saveFile } = useMain();

    return (
        <nav className="fixed w-full pt-5 pl-6 pr-5">
            <div className='bg-panel-dark flex justify-between py-4 px-5 rounded-lg text-white items-center'>
                <div className='flex gap-2'>
                    <label htmlFor="upload" className="flex items-center">
                        <FaFolderClosed size={24} />
                        <input id="upload" type="file" className="hidden" onChange={handlerFileChange} />
                    </label>
                    <Button text="Search" icon={<FaSquarePlus size={24} />} />
                    <Button text="Search" icon={<FaFloppyDisk size={24} onClick={saveFile} />} />
                </div>
                <div className='flex'>
                    <button onClick={interpreter} type="submit" className="flex items-center align-top px-2 py-2 bg-panel-dark rounded-md text-green-400 hover:text-green-200 transition-transform hover:transition-all ease-in-out duration-150 ">
                        {<FaPlay size={24} />}
                    </button>
                    <Modal name="Reportes" position={66} Icon={FaFile} />
                    {/* <ModalReport /> */}
                </div>
            </div>
        </nav >
    )
}
