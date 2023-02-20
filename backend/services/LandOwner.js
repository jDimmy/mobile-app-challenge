const { PrismaClient } = require('@prisma/client');
const exp = require('express');
const router = exp.Router()
const prisma = new PrismaClient()



router.get('/', async (req, res) => {
    const landOwner = await prisma.land_owner.findMany()
    res.status(200).json(landOwner)
})


router.post('/', async (req, res) => {
    req.body.pwd = await bcrypt.hash(req.body.pwd, 10)
    const landOwner = await prisma.land_owner.create({
        data:{
            ...req.body,
        }
    }).catch(()=>{
        res.send("Error")
    })
    res.status(200).json({result:landOwner, message:"New Land Owner has been created"})
})


router.get('/:id', async (req,res)=>{
    let id = parseInt(req.params.id)
    let landOwner = await prisma.land_owner.findUnique({
        where:{
            id
        }
    })
    res.status(200).json(landOwner)
})



module.exports = router