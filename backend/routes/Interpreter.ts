import express from 'express'
import { Controller } from '../Controller/Controller'

const router = express.Router()
const interp: Controller = new Controller()
router.get('/', interp.runing)
router.post('/parser', interp.parser)
router.get('/getAST', interp.getAST)
router.get('/getSymbolTable', interp.getSymbolTable)
router.get('/getErrors', interp.getErrors)

export default router