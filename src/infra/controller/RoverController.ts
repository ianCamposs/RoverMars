import { Request, Response } from "express";
import MoveRoverUseCase from "../../app/usecases/MoveRoverUseCase";
import PlateauRepositoryDatabase from "../repository/database/PlateauRepositoryDatabase";
import RoverRepositoryDatabase from "../repository/database/RoverRepositoryDatabase";
import knex from '../../infra/database/connection'
import DeployRoverUseCase from "../../app/usecases/DeployRoverUseCase";

export default class RoverController {
  
  async post(request: Request, response: Response): Promise<Response> {
    const { plateauUuid } = request.params
    const { roverCoordinate, moveInstructions } = request.body

    const plateauRepository = new PlateauRepositoryDatabase(knex)
    const roverRepository = new RoverRepositoryDatabase(knex)

    const deployRoverUseCase = new DeployRoverUseCase(plateauRepository, roverRepository)

    try {
      const newRoverPosition = await deployRoverUseCase.execute({
        plateauUuid,
        roverCoordinate,
        moveInstructions
      })

      return response.json(newRoverPosition).status(201)
    } catch (error) {
      return response.json(error).status(400)
    }
  }
  
  async update(request: Request, response: Response): Promise<Response> {
    const { roverUuid } = request.params
    const { moveInstructions } = request.body

    const plateauRepository = new PlateauRepositoryDatabase(knex)
    const roverRepository = new RoverRepositoryDatabase(knex)
    
    const moveRoverUseCase = new MoveRoverUseCase(plateauRepository, roverRepository)

    try {
      const newRoverPosition = await moveRoverUseCase.execute({
        roverUuid,
        moveInstructions
      })
  
      return response.json(newRoverPosition).status(200) 
    } catch (error) {
      return response.json(error).status(400)
    }
  }
}