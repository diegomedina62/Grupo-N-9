const { Role } = require('../database/models')

const validationDb = require('../helpers/validationDb')
const { ErrorObject } = require('../helpers/error')

const ownership = async (req, res, next) => {
  const idParams = req.params.id

  if (!req.userAuth) {
    const httpError = new ErrorObject('Restricted access: authentication required for the query', 403)
    next(httpError)
  }

  const idUser = parseInt(req.userAuth.id)
  const userRoleId = parseInt(req.userAuth.roleId)

  try {
    const schema = { where: { id: userRoleId } }
    const role = await validationDb(schema, Role, true)
    const userRole = role.name

    if (idUser !== idParams && userRole !== 'ADMIN') {
      console.log('Entre')
      const httpError = new ErrorObject('Restricted access: User is not authorized to make this request', 403)
      next(httpError)
    }
    next()
  } catch (error) {
    const httpError = new ErrorObject(`Restricted access: ${error.message}`, error.statusCode)
    next(httpError)
  }
}

module.exports = ownership
