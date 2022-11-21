import Plateau from "../../domain/entity/Plateau";
import Rover from "../../domain/entity/Rover";
import PlateauRepository from "../../domain/repository/PlateauRepository";
import RoverRepository from "../../domain/repository/RoverRepository";


export default class FullMoveRoverUseCase {

  constructor(
    readonly plateauRepository: PlateauRepository,
    readonly roverRepository: RoverRepository,
  ) {}

  async execute(input: Input): Promise<string> {

    const { plateauCoordinate, roverCoordinate, moveInstructions } = input

    const plateau = new Plateau(plateauCoordinate.xMaxCoordinate, plateauCoordinate.yMaxCoordinate)

    const rover = new Rover(plateau, roverCoordinate.xCoordinate, roverCoordinate.yCoordinate, roverCoordinate.currentDirection)

    const newRoverPosition = rover.move(moveInstructions)

    await this.plateauRepository.save(plateau)
    await this.roverRepository.save(rover)

    return newRoverPosition
  }

}


export type Input = {
  plateauCoordinate: {
    xMaxCoordinate: number,
    yMaxCoordinate: number,
  },
  roverCoordinate: {
    xCoordinate: number,
    yCoordinate: number,
    currentDirection: string
  },
  moveInstructions: string
}