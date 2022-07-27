const { Users, Items, Orders, OrderItem } = require('../db/models/index')


const getOrders = async (req, res, next) => {
    const orders = await Orders.findAll({where: { userId: req.params.id },include:["item"]})
    return res.status(201).json(orders)
}

const addOrder = async (req, res, next) => {
    try {
        const body = req.body
        // console.log(body.itemName)
        const items = body.itemName || [] //seaerch item name
        // console.log(items)
        // console.log(body)
        if (items.length === 0) {
            return res.status(201).json({
                message: 'add items'
            })
        } else {
            const order = await Orders.create({//create order
                userId: req.params.id,
                totalPrice: 0,
                status: body.status
            });
            // console.log(order)
            const totalPrice = []
            for (let newItem of items) {
                const item = await Items.findOne({ where: { name: newItem } })//search all items
                // const addItems = await order.addItem(item,{through:{OrderItem}})
                await totalPrice.push(item.price)//push item price to total price
                // console.log(item.id)
                const orderItem = await OrderItem.create({ orderId: order.id, itemId: item.id }) //create order item
            }
            console.log(totalPrice)
            let sum = 0;

            for (let i = 0; i < totalPrice.length; i++) {
                sum += totalPrice[i];
            }
            // console.log(sum);
            // console.log(order.totalPrice)
            await order.set({ ...order, totalPrice: sum })
            // console.log(order.totalPrice)
            await order.save()
            return res.status(201).json({
                message: 'success create Order',
                data: {
                    orderId: order.id,
                    userId: order.userId,
                    items: items,
                    totalPrice: order.totalPrice,
                    status: order.status
                }
            })
        }

    } catch (error) {
        console.log(error)
        next(error)
    }

}

const updateOrder = async (req, res, next) => {

    try {
        const body = req.body
        // console.log(body.itemName)
        const items = body.itemName || [] //seaerch item name
        // console.log(items)
        // console.log(body)
        if (items.length === 0) {
            return res.status(201).json({
                message: 'add items'
            })
        } else {
            const idOrder = req.params.idorder
            const order = await Orders.findByPk(idOrder);
            // console.log(order)
            await OrderItem.destroy({ where: { orderId: idOrder } })
            
            const totalPrice = []
            for (let newItem of items) {
                const item = await Items.findOne({ where: { name: newItem } })//search all items
                // const addItems = await order.addItem(item,{through:{OrderItem}})
                await totalPrice.push(item.price)//push item price to total price
                // console.log(item.id)
                const orderItem = await OrderItem.create({ orderId: order.id, itemId: item.id }) //create order item
            }
            console.log(totalPrice)
            let sum = 0;

            for (let i = 0; i < totalPrice.length; i++) {
                sum += totalPrice[i];
            }
            // console.log(sum);
            // console.log(order.totalPrice)
            await order.set({
                userId: req.params.id,
                totalPrice: sum,
                status: body.status
             })
            // console.log(order.totalPrice)
            await order.save()
            return res.status(201).json({
                message: 'success create Order',
                data: {
                    orderId: order.id,
                    userId: order.userId,
                    items: items,
                    totalPrice: order.totalPrice,
                    status: order.status
                }
            })
        }
        // const order = await Orders.findByPk(req.params.idorder)
        // await order.set({ ...order, ...req.body })
        // await order.save()
        // return res.status(200).json({
        //     message: 'order berhasil diupdate'
        // })
    } catch (error) {
        next(error)
    }
}


const deleteOrder = async (req, res, next) => {
    try {
        const idOrder = req.params.idorder
        console.log(idOrder)
        const order = await Orders.findByPk(idOrder)
        console.log(order)
        const orderItem = await OrderItem.findAll({ where: { orderId: order.id } })
        if (orderItem == null) {

            order.destroy()
        } else {
             await OrderItem.destroy({where:{orderId:order.id}})
             await order.destroy()
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