const { PrismaClient } = require('@prisma/client');
const exp = require('express');
const router = exp.Router()
const prisma = new PrismaClient()


router.get('/', async (req, res) => {
    const Report = await prisma.report.findMany()
    res.status(200).json(Report)
})


router.post('/', async (req, res) => {
    const Report = await prisma.report.create({
        data:{
            ...req.body,
        }
    }).catch(()=>{
        res.send("Error")
    })
    res.status(200).json({result:Report, message:"New Report has been created"})
})


router.get('/:id', async (req,res)=>{
    let id = parseInt(req.params.id)
    let Report = await prisma.report.findUnique({
        where:{
            id
        }
    })
    res.status(200).json(Report)
})



router.get('/those/:id_own/:id_op', async (req, res) => {
    let lown_id = parseInt(req.params.id_own)
    let lop_id = parseInt(req.params.id_op)
    const Report = await prisma.report.findMany({
        where : {
            land_own_id : lown_id,
            land_op_id : lop_id
        }
    })

    res.status(200).json(Report)
})



module.exports = router