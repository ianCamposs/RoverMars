import Plateau from "../../domain/entity/Plateau";
import Rover from "../../domain/entity/Rover";
import PlateauRepository from "../../domain/repository/PlateauRepository";
import RoverRepository from "../../domain/repository/RoverRepository";


export default class DeployRoverUseCase {

  constructor(
    readonly plateauRepository: PlateauRepository,
    readonly roverRepository: RoverRepository
  ) {}

  async execute(input: Input): Promise<string> {
    const { roverCoordinate, moveInstructions } = input

    const plateauData = await this.plateauRepository.getByUuid(input.plateauUuid)

    if(!plateauData) {
      throw new Error('Plateau not found')
    }

    const plateau = new Plateau(plateauData.xMaxCoordinate, plateauData.yMaxCoordinate, input.plateauUuid)

    const rover = new Rover(
      plateau,
      roverCoordinate.xCoordinate,
      roverCoordinate.yCoordinate,
      roverCoordinate.currentDirection
    )

    const newRoverPosition = rover.move(moveInstructions)  
    
    await this.roverRepository.save(rover)

    return newRoverPosition
  }
}

type Input = {
  plateauUuid: string,
  roverCoordinate: {
    xCoordinate: number,
    yCoordinate: number,
    currentDirection: string
  },
  moveInstructions: string
}