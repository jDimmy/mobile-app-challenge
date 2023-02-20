const { PrismaClient } = require('@prisma/client');
const exp = require('express');
const router = exp.Router()
const prisma = new PrismaClient()



router.get('/', async (req, res) => {
    const landPlot = await prisma.land_plot.findMany()
    res.status(200).json(landPlot)
})


router.post('/', async (req, res) => {
    const landPlot = await prisma.land_plot.create({
        data:{
            ...req.body,
        }
    }).catch(()=>{
        res.send("Error")
    })
    res.status(200).json({result:landPlot, message:"New Land Plot has been created"})
})


router.get('/:id', async (req,res)=>{
    let id = parseInt(req.params.id)
    let landPlot = await prisma.land_plot.findUnique({
        where:{
            id
        }
    })
    res.status(200).json(landPlot)
})



router.get('/those/:id', async (req, res) => {
    let lo_id = parseInt(req.params.id)
    const landPlot = await prisma.land_plot.findMany({
        where : {land_own_id : lo_id}
    })

    res.status(200).json(landPlot)
})



module.exports = router