import * as dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";

dotenv.config()
import app from './src/app'


export const prisma = new PrismaClient();

const startApp = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
  })
  await prisma.$connect();
}

startApp()
