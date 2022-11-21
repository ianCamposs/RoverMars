import express from 'express'
import plateauRoutes from './src/infra/routes/PlateauRoutes.routes'
import roverRoutes from './src/infra/routes/RoverRoutes.routes'

const server = express()

server.use(express.json())
server.use(roverRoutes)
server.use(plateauRoutes)

server.listen(3000, () => console.log('Server Running'))