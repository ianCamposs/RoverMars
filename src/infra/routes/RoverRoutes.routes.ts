import express from 'express'
import FullMoverRoverController from '../controller/FullMoveRoverController'
import { celebrate, Segments, Joi } from 'celebrate'
import RoverController from '../controller/RoverController'

const roverRoutes = express.Router()

const fullMoverRoverController = new FullMoverRoverController()
const roverController = new RoverController()

roverRoutes.post('/full-create-move-rover', celebrate({
  [Segments.BODY]: Joi.object().required().keys({
    plateauCoordinate: Joi.object().keys({
      xMaxCoordinate: Joi.number().required(),
      yMaxCoordinate: Joi.number().required(),
    }),
    roverCoordinate: Joi.object().required().keys({
      xCoordinate: Joi.number().required(),
      yCoordinate: Joi.number().required(),
      currentDirection: Joi.string().required()
    }),
    moveInstructions: Joi.string().required()
  })
}), fullMoverRoverController.post)

roverRoutes.post('/create-rover/:plateauUuid', celebrate({
  [Segments.BODY]: Joi.object().required().keys({
    roverCoordinate: Joi.object().required().keys({
      xCoordinate: Joi.number().required(),
      yCoordinate: Joi.number().required(),
      currentDirection: Joi.string().required()
    }),
    moveInstructions: Joi.string().required()
  })
}), roverController.post)

roverRoutes.put('/move-rover/:roverUuid', celebrate({
  [Segments.BODY]: Joi.object().required().keys({
    moveInstructions: Joi.string().required()
  })
}), roverController.update)


export default roverRoutes