import { Router } from "express";

const router = Router();

router.route("/test").post(
    (req,res)=>{
        res.json("Route working")
        return;
    }
)

export default router;