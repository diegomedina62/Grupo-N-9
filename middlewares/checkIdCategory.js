const createHttpError = require('http-errors')
const { Category } = require('../database/models')

const checkIdCategory = async (req, res, next) => {
    const {id} = req.params

    const category = await Category.findByPk(id)

    if(!category){
        const errorMessage = `not exist a category with the id ${id}`
    
    const httpError = createHttpError(
        400,
          `[Error get category] - [index - GET]: ${errorMessage}`
      )
      next(httpError)
    }
    next()
}


module.exports = checkIdCategory