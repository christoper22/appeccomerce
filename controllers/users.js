const { Users, Items, Orders,OrderItem } = require('../db/models/schemas')

const getUsers = async (req, res, next) => {
console.log(req.body.username)
    const searchUser = await Users.findOne({ where: { userName: req.body.userName,password:req.body.password } })
    // console.log(searchUser.userid)
   if (searchUser === null ) {
       return res.status(401).json({
        message: 'incorrect password'
    })
    } else {
        return res.status(201).json({
            message: 'success login'
        })
    
    }
}
  

const addUser = async (req, res, next) => {
  try {
      const user = await Users.create(req.body);
      console.log(user)
      res.status(201).json({
        message: 'success create user'})
      
      
  } catch (error) {
    next(error)
  }  
}

const updateUser = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id)
    await user.set({ ...user, ...req.body })
    await user.save()
    
    console.log(user)
    return res.status(200).json({
        message: 'user berhasil diupdate'
    })
    } catch (error) {
        next(error)
    }
    
}

const deleteUser = async (req, res, next) => {
   try {
    const user = await Users.findByPk(req.params.id)
    user.destroy()
    return res.status(200).json({
        message: 'success remove user'
    })
   } catch (error) {
    next(error)
   } 
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}