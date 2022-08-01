const validation = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        // console.log(error)
        const message = error.details[0].message
        next({
            code: 400,
            message: message
        })
    }
}

module.exports = validation