import PlateauRepository, { PlateauData } from "../../domain/repository/PlateauRepository";
import RoverRepository, { RoverData } from "../../domain/repository/RoverRepository";


export default class GetPlateauUseCase {

  constructor(
    readonly plateauRepository: PlateauRepository,
    readonly roverRepository: RoverRepository
  ) {}

  async execute(plateauUuid: string): Promise<GetResponse> {
    const plateau = await this.plateauRepository.getByUuid(plateauUuid)

    if(!plateau) {
      throw new Error('Plateau not found')
    }

    const roversOnPlateau = await this.roverRepository.getByPlateauUuid(plateauUuid)

    if(!roversOnPlateau?.length) {
      throw new Error('Rovers not found')
    }

    return {
      plateau,
      rovers: roversOnPlateau
    }
  }
}

type GetResponse = {
  plateau: PlateauData,
  rovers: RoverData[]
}