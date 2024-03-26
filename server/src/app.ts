import express from "express"
import path from "path";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import aboutRoutes from './routes/about.routes'
import authRoutes from './routes/auth.routes'
import contactRoutes from './routes/contact.routes'
import experienceRoutes from './routes/experience.routes'
import projectRoutes from './routes/project.routes'
import skillRoutes from './routes/skill.routes'

const app = express()
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use(cookieParser());

// routes
app.use('/auth', authRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/experience', experienceRoutes);
app.use('/project', projectRoutes);
app.use('/skill', skillRoutes);

// app.use("/api/v1", router)

export default app 
