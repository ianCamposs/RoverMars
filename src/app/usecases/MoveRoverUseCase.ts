import Plateau from "../../domain/entity/Plateau";
import Rover from "../../domain/entity/Rover";
import PlateauRepository from "../../domain/repository/PlateauRepository";
import RoverRepository from "../../domain/repository/RoverRepository";


export default class MoveRoverUseCase {

  constructor(
    readonly plateauRepository: PlateauRepository,
    readonly roverRepository: RoverRepository
  ){}

  async execute(input: Input): Promise<string> {
    const roverData = await this.roverRepository.getByUuid(input.roverUuid)
   
    if(!roverData) {
      throw new Error('Rover not found')
    }

    const plateauData = await this.plateauRepository.getByUuid(roverData.plateauUuid as string)
    
    if(!plateauData) {
      throw new Error('Plateau not found')
    }
    
    const plateau = new Plateau(plateauData.xMaxCoordinate, plateauData.yMaxCoordinate)
    
    const rover = new Rover(
      plateau, 
      roverData.xCoordinate, 
      roverData.yCoordinate,
      roverData.direction)

    const newRoverPosition = rover.move(input.moveInstructions)  

    await this.roverRepository.update(input.roverUuid, rover.getCurrentDirection(), rover.getXCoordinate(), rover.getYCoordinate())
    
    return newRoverPosition
  }

}

type Input = {
  roverUuid: string,
  moveInstructions: string
}
