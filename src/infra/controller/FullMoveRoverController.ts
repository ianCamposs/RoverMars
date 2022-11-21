import FullMoveRoverUseCase from "../../app/usecases/FullMoveRoverUseCase"
import { Request, Response } from 'express'
import PlateauRepositoryDatabase from "../repository/database/PlateauRepositoryDatabase"
import RoverRepositoryDatabase from "../repository/database/RoverRepositoryDatabase"
import knex from '../database/connection'

export default class FullMoverRoverController {

  async post(request: Request, response: Response): Promise<Response> {
    const { plateauCoordinate, roverCoordinate, moveInstructions } = request.body

    const plateauRepository = new PlateauRepositoryDatabase(knex)
    const roverRepository = new RoverRepositoryDatabase(knex)

    const fullMoveRoverUseCase = new FullMoveRoverUseCase(plateauRepository, roverRepository)

    try {
      const newRoverPosition = await fullMoveRoverUseCase.execute({
        plateauCoordinate,
        roverCoordinate,
        moveInstructions
      })
      
      return response.json(newRoverPosition).status(201)
    } catch (error) {
      return response.json(error).status(400)
    }
  }
}