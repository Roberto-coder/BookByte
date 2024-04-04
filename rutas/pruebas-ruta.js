import  express  from "express";
import passport  from '../config/passport.js';
import bcrypt from "bcrypt";
import pool from '../config/database.js';
import path from 'path';
const router = express.Router();

export default router;