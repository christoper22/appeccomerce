const { Users, Items, Orders,OrderItem } = require('../db/models/schemas')


const getItems = async (req, res, next) => {
    try {
        const allItems = await Items.findAll({})
        console.log(allItems)
        res.status(200).send(allItems)
       
    } catch (error) {
        next(Error)
    }
   
}

const addItem = async (req, res, next) => {
    try {
        const item = await Items.create(req.body);
    console.log(item)
    return res.status(201).json({
        message: 'success create item'
    })
    } catch (error) {
        next(error)
    }
    
}

const updateItem = async (req, res, next) => {
   
    try {
        const item = await Items.findByPk(req.params.iditem)
    await item.set({ ...item, ...req.body })
    await item.save()
    return res.status(200).json({
        message: 'item berhasil diupdate'
    })
    } catch (error) {
        next(error)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const item = await Items.findByPk(req.params.iditem)
    item.destroy()
    return res.status(200).json({
        message: 'success remove items'
    })
    } catch (error) {
      next(error)  
    }
    
}


module.exports = {
    getItems,
    addItem,
    updateItem,
    deleteItem
}