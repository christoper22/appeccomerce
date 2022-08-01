const { Users, Items, Orders, OrderItem, connection } = require('../db/models/index')


const getOrders = async (req, res, next) => {
   try {
       const user = await Users.findByPk(req.userAfterVerifikation)
       console.log(req.userAfterVerifikation)
    // console.log(user)
    // if (!user) {
    //     return res.status(400).json({
    //         message: 'user not found'
    //     })
    // } else {
    
    const orders = await Orders.findAll({
        where: { userId: user.id }, include: [
            {
                model: OrderItem, as: "order", include: [{
                    model: Items, as: "item", attributes: ["name", "codes", "totalItems"]
                }], attributes: { exclude: ['id', "orderId", "createdAt", "updatedAt"] }
            },
            { model: Users, as: "user", attributes: ['userName'] }]
        ,
        attributes: { exclude: ['userId', 'deletedAt'] }
    })
    // console.log(orders)
    if (orders.length === 0 ) {

        return res.status(201).json({
            message: 'dont have order',
        })
    }

    // console.log(orders[0].user.userName)
    return res.status(201).json({
        message: 'all order',
        data: orders
    })
    // }
   } catch (error) {
    next(error)
   }
}

const addOrder = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.userAfterVerifikation)
        // if (!user) {
        //     return res.status(400).json({
        //         message: 'user not found'
        //     })
        // } else {
        const body = req.body
        const items = body.item || [] //seaerch item name
        // console.log(items[0].name)
        // console.log(body)

        if (items.length === 0) {
            return res.status(201).json({
                message: 'add items'
            })
        } else {
            const t = await connection.transaction()
            const order = await Orders.create({//create order
                userId: user.id,
                totalPrice: 0,
                status: body.status
            }, { transaction: t });
            // console.log(order)
            const totalPrice = []
            for (let i = 0; i < items.length; i++) {
                const item = await Items.findOne({ where: { name: items[i].name } }, { transaction: t })//search all items
                if (!item) {
                    return res.status(201).json({
                        message: 'item not found',
                    })
                }
                const totalPriceItem = items[i].totalItem * item.price

                console.log(item.price)
                // console.log(typeof(items[i].totalitem))
                // console.log(item.id)
                const orderItem = await OrderItem.create({
                    orderId: order.id,
                    itemId: item.id,
                    price: item.price,
                    totalItem: items[i].totalItem,
                    total: totalPriceItem
                }, { transaction: t }) //create order item

                const totalPriceOrder = orderItem.price * orderItem.totalItem
                totalPrice.push(totalPriceOrder)//push item price to total price
                const updateTotalItem = item.totalItems - orderItem.totalItem
                item.update({ totalItems: updateTotalItem })
            }
            // console.log(totalPrice)
            await t.commit()
            let sum = 0;

            for (let i = 0; i < totalPrice.length; i++) {
                sum += totalPrice[i];
            }
            // console.log(sum);
            // console.log(order.totalPrice)
            await order.update({ totalPrice: sum })
            // console.log(order.totalPrice)

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
        // }

    } catch (error) {
        // console.log(error)
        next(error)
    }

}

const updateOrder = async (req, res, next) => {

    try {
        // const user = await Users.findByPk(req.params.id)
        // if (!user) {
        //     return res.status(400).json({
        //         message: 'user not found'
        //     })
        // } else {
        const idOrder = req.params.idorder
        const order = await Orders.findByPk(idOrder);
        if (!order) {
            return res.status(400).json({
                message: 'order not found'
            })
        } else {
            const body = req.body
            // console.log(body.itemName)
            const items = body.item || [] //seaerch item name
            // console.log(items)
            // console.log(body)
            if (items.length === 0) {
                return res.status(201).json({
                    message: 'add items'
                })
            } else {
                // console.log(order)
                const orderItemDelete = await OrderItem.findAll({ where: { orderId: idOrder } })
                for (let orderItem of orderItemDelete) {
                    const item = await Items.findOne({ where: { id: orderItem.itemId } })
                    const updateTotalItem = (item.totalItems + orderItem.totalItem)
                    // console.log(updateTotalItem)
                    // console.log(typeof (item.totalItems))
                    // console.log(typeof (orderItem.totalItem))
                    item.update({ totalItems: updateTotalItem })
                    orderItem.destroy()
                }

                const totalPrice = []
                for (let i = 0; i < items.length; i++) {
                    const item = await Items.findOne({ where: { name: items[i].name } })//search all items
                    const totalPriceItem = items[i].totalItem*item.price
                    // console.log(item.id)
                    const orderItem = await OrderItem.create({
                        orderId: order.id,
                        itemId: item.id,
                        price: item.price,
                        totalItem: items[i].totalItem,
                        total:totalPriceItem
                    }) //create order item
                    const totalPriceOrder = orderItem.price * orderItem.totalItem
                    await totalPrice.push(totalPriceOrder)//push item price to total price
                    const updateTotalItem = item.totalItems - orderItem.totalItem
                    item.update({ totalItems: updateTotalItem })
                }
                // console.log(totalPrice)
                let sum = 0;

                for (let i = 0; i < totalPrice.length; i++) {
                    sum += totalPrice[i];
                }
                // console.log(sum);
                // console.log(order.totalPrice)
                await order.update({
                    totalPrice: sum,
                    status: body.status
                })
                // console.log(order.totalPrice)
                return res.status(201).json({
                    message: 'success Update Order',
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
        }
        // }
    } catch (error) {
        // console.log(error)
        next(error)
    }
}


const deleteOrder = async (req, res, next) => {
    try {
        // const user = await Users.findByPk(req.params.id)
        // if (!user) {
        //     return res.status(400).json({
        //         message: 'user not found'
        //     })
        // } else {
        const idOrder = req.params.idorder
        const order = await Orders.findByPk(idOrder)
        console.log(order.status)
        if (!order) {
            return res.status(400).json({
                message: 'order not found'
            })
        } else if (order.status === "PAID") {
            return res.status(200).json({
                message: 'order already paid'
            })
        } else {
            // console.log(order)
            const orderItem = await OrderItem.findAll({ where: { orderId: order.id } })
            if (orderItem == null) {
                order.destroy()
            } else {
                const orderItemDelete = await OrderItem.findAll({ where: { orderId: order.id } })
                for (let orderItem of orderItemDelete) {
                    const item = await Items.findOne({ where: { id: orderItem.itemId } })
                    const updateTotalItem = (item.totalItems + orderItem.totalItem)
                    // console.log(updateTotalItem)
                    // console.log(typeof (item.totalItems))
                    // console.log(typeof (orderItem.totalItem))
                    item.update({ totalItems: updateTotalItem })
                    orderItem.destroy()
                }
                order.destroy()
            }

            return res.status(200).json({
                message: 'success remove order'
            })
        }
        // }
    } catch (error) {
        next(error)
    }
}

const statusChange = async (req, res, next) => {

    try {
        // const user = await Users.findByPk(req.params.id)
        // if (!user) {
        //     return res.status(400).json({
        //         message: 'user not found'
        //     })
        // } else {
            const idOrder = req.params.idorder
            const order = await Orders.findByPk(idOrder);
            if (!order) {
                return res.status(400).json({
                    message: 'order not found'
                })
            } else {
                const statusChange = req.params.status.toUpperCase()
                order.update({ status: statusChange })
                return res.status(200).json({
                    message: `order is ${statusChange}`
                })
            }
        // }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    statusChange
}