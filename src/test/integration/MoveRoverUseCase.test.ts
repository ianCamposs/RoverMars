import MoveRoverUseCase from "../../app/usecases/MoveRoverUseCase"
import Plateau from "../../domain/entity/Plateau"
import Rover from "../../domain/entity/Rover"
import PlateauRepositoryMemory from "../../infra/repository/memory/PlateuRepositoryMemory"
import RoverRepositoryMemory from "../../infra/repository/memory/RoverRepositoryMemory"


describe('Test move rover use case with already created scenario', () => {
  let plateauRepositoryMemory: PlateauRepositoryMemory
  let roverRepositoryMemory: RoverRepositoryMemory
  let plateau: Plateau
  let rover: Rover

  beforeAll(async () => {
    plateauRepositoryMemory = new PlateauRepositoryMemory()
    roverRepositoryMemory = new RoverRepositoryMemory()
    
    plateau = new Plateau(10, 10)
    rover = new Rover(plateau, 1, 2, 'N')

    await plateauRepositoryMemory.save(plateau)
    await roverRepositoryMemory.save(rover)
  })

  it('Should be able to move rover in already created plateau', async () => {
    const input = {
      roverUuid: rover.getUuid() as string,
      moveInstructions: 'LMLMLMLMM'
    }

    const moveRoverUseCase = new MoveRoverUseCase(plateauRepositoryMemory, roverRepositoryMemory)

    const newRoverPosition = await moveRoverUseCase.execute(input)

    expect(newRoverPosition).toBe('1 3 N')
  })

  it('Should return not found rover error', async () => {
    const newRover = new Rover(plateau, 2, 2, 'S')

    const input = {
      roverUuid: newRover.getUuid() as string,
      moveInstructions: 'LMLMLMLMM'
    }

    const moveRoverUseCase = new MoveRoverUseCase(plateauRepositoryMemory, roverRepositoryMemory)

    expect(() => moveRoverUseCase.execute(input)).rejects.toThrow(new Error('Rover not found'))
  })

  it('Should return not found plateau error', async () => {
    const newPlateau = new Plateau(5, 5)
    const newRover = new Rover(newPlateau, 2, 2, 'S')

    await roverRepositoryMemory.save(newRover)

    const input = {
      roverUuid: newRover.getUuid() as string,
      moveInstructions: 'LMLMLMLMM'
    }

    const moveRoverUseCase = new MoveRoverUseCase(plateauRepositoryMemory, roverRepositoryMemory)

    expect(() => moveRoverUseCase.execute(input)).rejects.toThrow(new Error('Plateau not found'))
  })
})