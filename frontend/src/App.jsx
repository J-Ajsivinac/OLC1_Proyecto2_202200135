import { Navbar } from "./components/Navbar"
import CodeMirror from '@uiw/react-codemirror';
import { useState, useCallback } from "react";
import { cpp } from '@codemirror/lang-cpp'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import { PiWarningCircleFill } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";
import './theme.css'

function App() {
  // const [count, setCount] = useState(0)
  const [value, setValue] = useState("console.log('hello world!');");
  const [isOpen, setIsOpen] = useState(false);
  const onChange = useCallback((val, _viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);

  return (
    <>
      <div className='flex h-screen bg-bg-dark'>
        <Navbar />
        <div className="flex mt-28 h-[100%-112px] w-full px-6 pb-5 gap-4">
          <div className="w-3/5">
            <div className="flex flex-col w-full rounded-md bg-panel-dark h-full overflow-auto px-4">
              <span className="text-[#bdbec0] pt-3 pb-5 font-bold">Código</span>
              <CodeMirror value={value} height="560px" onChange={onChange} extensions={cpp()} theme={tokyoNight} aria-autocomplete={true} />
            </div>
          </div>
          <div className="w-2/5">
            <div className="flex flex-col w-full rounded-md bg-panel-dark h-full px-4">
              <span className="text-[#bdbec0] pt-3 pb-5 font-bold">Consola</span>
              <div className="w-full h-full flex flex-col mb-2">
                <textarea name="" id="" className="w-full h-full bg-panel-dark text-[#adb6c4] outline-none resize-none"></textarea>

                <div
                  className={`group flex flex-col gap-2 rounded-lg bg-panel-dark border-2 border-gray-200/10 p-5 text-white ${isOpen ? 'group-focus:-translate-y-5' : ''}`}
                  tabIndex="1"
                >
                  <div className="flex cursor-pointer items-center justify-between" onClick={() => setIsOpen(!isOpen)}>
                    <span className="flex flex-row items-center gap-x-2 text-[#f47961]"><PiWarningCircleFill size={20} /> Errores </span>
                    <div className={`h-2 w-3 transition-all duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                      <FaChevronDown size={12} color="#f47961" />
                    </div>
                  </div>
                  <div
                    className={`items-center  duration-1000 transition-all ${isOpen ? 'visible max-h-screen opacity-100 h-28 overflow-auto' : 'overflow-hidden invisible h-0 max-h-0 opacity-0'}`}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
