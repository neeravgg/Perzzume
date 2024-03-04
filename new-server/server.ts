import express from "express"
import * as dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes"
import aboutRoutes from './src/routes/about.routes'
import authRoutes from './src/routes/auth.routes'
import contactRoutes from './src/routes/contact.routes'
import experienceRoutes from './src/routes/experience.routes'
import projectRoutes from './src/routes/project.routes'
import skillRoutes from './src/routes/skill.routes'
// import uploadRoutes from './routes/about.routes'

dotenv.config()

const app = express()
export const router = express.Router();
export const prisma = new PrismaClient();

const startApp = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port: ${process.env.PORT}`)
  })
  await prisma.$connect();
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/experience', experienceRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);
// app.use('/upload', uploadRoutes);

app.use("/api/v1", router)

startApp()
