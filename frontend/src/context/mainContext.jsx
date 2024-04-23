import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { runInterpreter } from '../api/interpreter'

const MainContext = createContext();

export const useMain = () => {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error('useMain must be used within a MainProvider')
    }
    return context;
}

export const MainProvider = ({ children }) => {
    const [value, setValue] = useState("");
    const [consolePrint, setConsolePrint] = useState("");
    const [error, setError] = useState("")

    const interpreter = async () => {
        try {
            const valuetoSend = {
                code: value
            }
            const res = await runInterpreter(valuetoSend)
            console.log(res.data)
            setConsolePrint(res.data.console)
            setError(res.data.errors)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <MainContext.Provider value={{ value, setValue, interpreter, consolePrint, setConsolePrint, error }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainContext;

MainProvider.propTypes = {
    children: PropTypes.node.isRequired
}