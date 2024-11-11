import { pool } from '../helper/db.js';
import { Router } from 'express';
import { hash,compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postLogin, postRegistration } from '../controllers/userController.js';
const { sign } = jwt;

const router = Router();


router.post('/register', postRegistration)


router.post('/login',(req,res,next) => {
    const invalid_message = "Invalid credentials."
    try {
        pool.query('SELECT * FROM account WHERE email = $1',
            [req.body.email],
            (error,result) => {
                if (error) return next(error);
                if (result.rowCount === 0) return next(new Error(invalid_message));
                compare(req.body.password,result.rows[0].password,(error,match) => {
                    if (error) return next(error);
                    if (!match) return next(new Error(invalid_message));
                    const token = sign({user: req.body.email}, process.env.JWT_SECRET_KEY);
                    const user = result.rows[0];
                    return res.status(200).json(
                        {
                            "id": user.id,
                            "email": user.email,
                            "token": token
                        }
                    )
                })
            })
    } catch (error) {
        return next(error);
    }
});
            

export default router;