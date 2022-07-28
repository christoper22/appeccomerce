const { Users, Items, Orders, OrderItem } = require('../db/models/index')


const getItems = async (req, res, next) => {
    try {
        const allItems = await Items.findAll({})

        console.log(allItems)
        res.status(200).json(allItems)

    } catch (error) {
        next(Error)
    }

}

const addItem = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id)
        if (!user) {
            return res.status(200).json({
                message: 'user not found'
            })
        } else {
            const body = req.body
            // console.log(body)
            const allItems = []
            const problem = []
            const looping = async () => {
                for (let i = 0; i < body.length; i++) {
                    const searchItem = await Items.findOne({ where: { name: body[i].name, codes: body[i].codes } })
                    if (searchItem == null) {
                        const item = await Items.create(body[i]);
                        console.log(item)
                        allItems.push(item.name)
                        // return res.status(201).json({
                        //     message: `success create item ${item.name}`,
                        //     data: {
                        //         name: item.name,
                        //         codes: item.codes,
                        //         price: item.price,
                        //         totalItem: item.totalItems
                        //     }
                        // })
                    } else {
                        console.log(`please input different item, your item name ${searchItem.name} has been add`)
                        problem.push(searchItem.name)
                        // return res.status(201).json({
                        //     message: `please input different item, your item name ${searchItem.name} has been add`,
                        // })
                    }
                }
            }
            await looping()
            console.log(allItems.length)
            console.log(problem)
            if (allItems.length === 0) {
                return res.status(201).json({
                    message: `please input different item, your item name ${problem} has been add`
                })
            } else if (problem.length !== 0) {
                return res.status(201).json({
                    message: `success create item ${allItems} and cannot add this item ${problem}`
                })
            } else {
                return res.status(201).json({
                    message: `success create item ${allItems} `
                })
            }
        }
    } catch (error) {
        next(error)
    }

}

const updateItem = async (req, res, next) => {

    try {
        const user = await Users.findByPk(req.params.id)
        if (!user) {
            return res.status(200).json({
                message: 'user not found'
            })
        } else {
            const item = await Items.findByPk(req.params.iditem)
            if (!item) {
                return res.status(200).json({
                    message: 'item not found'
                })
            } else {
                const body = req.body
                await item.set({ ...item, ...body })
                await item.save()
                return res.status(200).json({
                    message: 'item berhasil diupdate',
                    Data: {
                        name: item.name,
                        codes: item.code,
                        price: item.price,
                        totalItems: item.totalItems
                    }
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id)
        if (!user) {
            return res.status(200).json({
                message: 'user not found'
            })
        } else {
            const item = await Items.findByPk(req.params.iditem)
            if (!item) {
                return res.status(200).json({
                    message: 'item not found'
                })
            } else {
                item.destroy()
                return res.status(200).json({
                    message: 'success remove items'
                })
            }
        }
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