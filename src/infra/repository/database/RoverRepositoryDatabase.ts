import Rover from "../../../domain/entity/Rover";
import RoverRepository, { RoverData } from "../../../domain/repository/RoverRepository";

export default class RoverRepositoryDatabase implements RoverRepository{
  
  constructor(
    readonly connection: any
  ) {}

  async save(rover: Rover): Promise<void> {
    await this.connection('rover').insert({
      uuid: rover.getUuid(),
      plateauUuid: rover.plateau.getUuid(),
      direction: rover.getCurrentDirection(),
      xCoordinate: rover.getXCoordinate(),
      yCoordinate: rover.getYCoordinate()
    })
  }

  async getByUuid(uuid: string): Promise<RoverData | undefined> {
    const foundRover = await this.connection('rover').select('*')
      .where('uuid', uuid)
      .first()
    
    return {
      uuid: foundRover.uuid,
      plateauUuid: foundRover.plateauUuid,
      direction: foundRover.direction,
      xCoordinate: foundRover.xCoordinate,
      yCoordinate: foundRover.yCoordinate
    }
  }

  async getByPlateauUuid(uuid: string): Promise<RoverData[] | undefined> {
    const foundRovers = await this.connection('rover').select('*')
      .where('plateauUuid', uuid)
    
    return foundRovers.map((foundRover: RoverData) => {
      return {
        uuid: foundRover.uuid,
        plateauUuid: foundRover.plateauUuid,
        direction: foundRover.direction,
        xCoordinate: foundRover.xCoordinate,
        yCoordinate: foundRover.yCoordinate
      }
    })
  }

  async update(uuid: string, newDirection: string, newXCoordinate: number, newYCoordinate: number): Promise<void> {
    await this.connection('rover').where({uuid}).update({
      direction: newDirection,
      xCoordinate: newXCoordinate,
      yCoordinate: newYCoordinate
    })
  }
}