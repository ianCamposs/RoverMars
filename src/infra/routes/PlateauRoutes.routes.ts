import express from 'express'
import PlateauController from '../controller/PlateuController'

const plateauRoutes = express.Router()

const plateauController = new PlateauController()

plateauRoutes.get('/get-plateau/:uuid', plateauController.get)

export default plateauRoutes