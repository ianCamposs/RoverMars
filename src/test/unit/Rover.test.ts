import Plateau from "../../domain/entity/Plateau"
import Rover from "../../domain/entity/Rover"


describe('Rover unit test', () => { 
  it('Should be able to move rover to position 1 3 N', () => {
    const xMaxCoordinate = 10
    const yMaxCoordinate = 10
    
    const plateau = new Plateau(xMaxCoordinate, yMaxCoordinate)

    const rover = new Rover(plateau, 1, 2, 'N')

    expect(rover.move('LMLMLMLMM')).toBe('1 3 N')
  })

  it('Should be able to move rover to position 2 3 S', () => {
    const xMaxCoordinate = 10
    const yMaxCoordinate = 10
    
    const plateau = new Plateau(xMaxCoordinate, yMaxCoordinate)

    const rover = new Rover(plateau, 3, 3, 'E')

    expect(rover.move('MRRMMRMRRM')).toBe('2 3 S')
  })

  it('Should not be able to move rover out plateau area', () => {
    const xMaxCoordinate = 10
    const yMaxCoordinate = 10
    
    const plateau = new Plateau(xMaxCoordinate, yMaxCoordinate)

    const rover = new Rover(plateau, 3, 3, 'E')

    expect(() => rover.move('MMMMMMMMMMMM')).toThrow(new Error('Invalid new coordinate position'))
  })

  it('Should not be able to deploy rover out plateau area', () => {
    const xMaxCoordinate = 10
    const yMaxCoordinate = 10
    
    const plateau = new Plateau(xMaxCoordinate, yMaxCoordinate)

    expect(() => new Rover(plateau, 15, 20, 'E')).toThrow(new Error('Can not create Rover out plateau area'))
 })
})