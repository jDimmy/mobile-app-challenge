const { PrismaClient } = require('@prisma/client');
const exp = require('express');
const router = exp.Router()
const prisma = new PrismaClient()




router.get('/', async (req, res) => {
    const landOperator = await prisma.land_operator.findMany()
    res.status(200).json(landOperator)
})


router.post('/', async (req, res) => {
    req.body.pwd = await bcrypt.hash(req.body.pwd, 10)
    const landOperator = await prisma.land_operator.create({
        data:{
            ...req.body,
        }
    }).catch(()=>{
        res.send("Error")
    })
    res.status(200).json({result:landOperator, message:"New Land Operator has been created"})
})


router.get('/:id', async (req,res)=>{
    let id = parseInt(req.params.id)
    let landOperator = await prisma.land_operator.findUnique({
        where:{
            id
        }
    })
    res.status(200).json(landOperator)
})


module.exports = router