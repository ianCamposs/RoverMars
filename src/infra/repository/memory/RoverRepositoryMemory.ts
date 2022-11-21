import Rover from "../../../domain/entity/Rover";
import RoverRepository, { RoverData } from "../../../domain/repository/RoverRepository";


export default class RoverRepositoryMemory implements RoverRepository {
  rovers: Rover[]

  constructor() {
    this.rovers = []
  }

  async save(rover: Rover): Promise<void> {
    this.rovers.push(rover)
  }

  async getByUuid(uuid: string): Promise<RoverData| undefined> {
    const foundRover = this.rovers.find((rover) => rover.getUuid() === uuid)

    if(!foundRover) {
      return undefined
    }

    return {
      uuid: foundRover.getUuid(),
      plateauUuid: foundRover.plateau.getUuid(),
      direction: foundRover.getCurrentDirection(),
      xCoordinate: foundRover.getXCoordinate(),
      yCoordinate: foundRover.getYCoordinate()
    }
  }

  async getByPlateauUuid(uuid: string): Promise<RoverData[] | undefined> {
    const foundRovers = this.rovers.filter((rover) => 
      rover.plateau.getUuid() === uuid)
    
    return foundRovers.map((foundRover: Rover) => {
      return {
        uuid: foundRover.getUuid(),
        plateauUuid: foundRover.plateau.getUuid(),
        direction: foundRover.getCurrentDirection(),
        xCoordinate: foundRover.getXCoordinate(),
        yCoordinate: foundRover.getYCoordinate()
      }
    })
  }

  async update(uuid: string, newDirection: string, newXCoordinate: number, newYCoordinate: number): Promise<void> {
    const indexToUpdate = this.rovers.findIndex((rover) => 
      rover.getUuid() === uuid)

    this.rovers[indexToUpdate].setCurrentDirection(newDirection)
    this.rovers[indexToUpdate].setXCoordinate(newXCoordinate)
    this.rovers[indexToUpdate].setYCoordinate(newYCoordinate)
  }

}