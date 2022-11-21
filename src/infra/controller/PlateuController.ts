import { Request, Response } from "express";
import GetPlateauUseCase from "../../app/usecases/GetPlateauUseCase";
import knex from '../../infra/database/connection'
import PlateauRepositoryDatabase from "../repository/database/PlateauRepositoryDatabase";
import RoverRepositoryDatabase from "../repository/database/RoverRepositoryDatabase";


export default class PlateauController {
  async get(request: Request, response: Response): Promise<Response> {
    const { uuid } = request.params

    const plateauRepository = new PlateauRepositoryDatabase(knex)
    const roverRepository = new RoverRepositoryDatabase(knex)
    const getPlateauUseCase = new GetPlateauUseCase(plateauRepository, roverRepository)
    
    try {
      const plateauAndRoversData = await getPlateauUseCase.execute(uuid)

      return response.json(plateauAndRoversData).status(200)
    } catch (error) {
      return response.json(error).status(400)
    }
  }
}