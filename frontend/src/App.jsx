import { Navbar } from "./components/Navbar"
import CodeMirror from '@uiw/react-codemirror';
import { useState, useCallback } from "react";
import { cpp } from '@codemirror/lang-cpp'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import './theme.css'

function App() {
  // const [count, setCount] = useState(0)
  const [value, setValue] = useState("console.log('hello world!');");
  const onChange = useCallback((val, viewUpdate) => {
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
          <div className="w-2/5 ">
            <div className="flex flex-col w-full rounded-md bg-panel-dark h-full px-4">
              <span className="text-[#bdbec0] pt-3 pb-5 font-bold">Consola</span>
              <textarea name="" id="" className="w-full h-full bg-panel-dark text-[#adb6c4] outline-none resize-none"></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
