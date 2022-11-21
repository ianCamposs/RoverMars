import GetPlateauUseCase from "../../app/usecases/GetPlateauUseCase"
import Plateau from "../../domain/entity/Plateau"
import Rover from "../../domain/entity/Rover"
import PlateauRepositoryMemory from "../../infra/repository/memory/PlateuRepositoryMemory"
import RoverRepositoryMemory from "../../infra/repository/memory/RoverRepositoryMemory"

describe('Get plateau and rovers on its use case', () => { 
  let plateauRepositoryMemory: PlateauRepositoryMemory
  let roverRepositoryMemory: RoverRepositoryMemory
  let plateau: Plateau
  let rover1: Rover
  let rover2: Rover

  beforeAll(async () => {
    plateauRepositoryMemory = new PlateauRepositoryMemory()
    roverRepositoryMemory = new RoverRepositoryMemory()
    
    plateau = new Plateau(10, 10)
    rover1 = new Rover(plateau, 1, 2, 'N')
    rover2 = new Rover(plateau, 2, 4, 'W')

    await plateauRepositoryMemory.save(plateau)
    await roverRepositoryMemory.save(rover1)
    await roverRepositoryMemory.save(rover2)
  })

  it('Should be able to return plateau and rovers deployed', async () => {

    const getPlateauUseCase = new GetPlateauUseCase(plateauRepositoryMemory, roverRepositoryMemory)

    const plateauAndRoversData = await getPlateauUseCase.execute(plateau.getUuid() as string)

    expect(plateauAndRoversData.plateau).toStrictEqual(
      await plateauRepositoryMemory.getByUuid(plateau.getUuid() as string))
    expect(plateauAndRoversData.rovers).toStrictEqual(
      await roverRepositoryMemory.getByPlateauUuid(plateau.getUuid() as string)
    )
  })
})