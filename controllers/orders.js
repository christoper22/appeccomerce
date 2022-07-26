const { Users, Items, Orders,OrderItem } = require('../db/models/index')


const getOrders = async (req, res, next) => {
    const orders = await Orders.findAll({where:{userId:req.params.id}})
    return res.status(201).send(orders)
}

const addOrder = async (req, res, next) => {
    try {
        const order = await Orders.create({ ...req.body, userId: req.params.id });
        console.log(order.id)
        const orderItem = await OrderItem.create({orderId: order.id})
    console.log(order)
    return res.status(201).json({
        message: 'success create Order'
    })
    } catch (error) {
        next(error)
    }
    
}

const updateOrder =  async (req, res, next) => {
   
    try {
        const order = await Orders.findByPk(req.params.idorder)
    await order.set({ ...order, ...req.body })
    await order.save()
    return res.status(200).json({
        message: 'order berhasil diupdate'
    })
    } catch (error) {
        next(error)
    }
}


const deleteOrder = async (req, res, next) => {
    try {
        const order = await Orders.findByPk(req.params.idorder)
        const orderItem = await OrderItem.findOne({ where: { orderId: order.id } })
        if (orderItem == null) {
           
        order.destroy()
        } else {
            orderItem.destroy()
            order.destroy()
        }
        
    return res.status(200).json({
        message: 'success remove order'
    })
    } catch (error) {
      next(error)  
    }
}

module.exports = {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder
}