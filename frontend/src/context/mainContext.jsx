import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { getErrors, runInterpreter, getAST, getSymbolTableRequest, saveFileRequest } from '../api/interpreter'
import { toast } from 'sonner';
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
    const [ast, setAst] = useState("")
    const [symbolTable, setSymbolTable] = useState("")
    const [errorsReport, setErrorsReport] = useState([])
    const [filename, setFilename] = useState("")
    // const [code, setCode] = useState("")

    const interpreter = async () => {
        setError("")
        try {
            const valuetoSend = {
                code: value
            }
            const res = await runInterpreter(valuetoSend)
            setConsolePrint(res.data.console)
            setError(res.data.errors)
            console.log(res.data, error.length)
            if (res.data.errors.length > 0) {
                toast.error('Errores en el código', { duration: 1500 })
            } else {
                toast.success('Código Analizado', { duration: 1500 })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handlerFileChange = (e) => {
        const file = e.target.files[0];
        setFilename(file.name)
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            setValue(text);
        }
        reader.readAsText(file);
    }

    const getASTFrontend = async () => {
        try {
            const res = await getAST()
            console.log(res.data.ast)
            setAst(res.data.ast)
        } catch (error) {
            console.error(error)
        }
    }

    const saveFile = async () => {
        const content = value
        try {
            const res = await saveFileRequest({ filename, content })
            toast.success("Se ha guardado el archivo", { duration: 1500 })
            console.log(res)
        } catch (error) {
            toast.error("Hubo un error al guardar", { duration: 1500 })
            console.error(error)
        }
    }

    const getSymbolTable = async () => {
        try {
            const res = await getSymbolTableRequest()
            console.log(res.data.table)
            setSymbolTable(res.data.table)
        } catch (error) {
            console.error(error)
        }
    }

    const getErrorsReport = async () => {
        try {
            const res = await getErrors()
            console.log(res.data.errors)
            setErrorsReport(res.data.errors)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <MainContext.Provider value={{
            value,
            setValue,
            interpreter,
            consolePrint,
            setConsolePrint,
            error,
            handlerFileChange,
            getASTFrontend,
            ast,
            getSymbolTable,
            symbolTable,
            getErrorsReport,
            errorsReport,
            saveFile
        }}>
            {children}
        </MainContext.Provider>
    );
};

export default MainContext;

MainProvider.propTypes = {
    children: PropTypes.node.isRequired
}