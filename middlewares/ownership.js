const { ErrorObject } = require('./error')

const Role = require('../database/models/role')

const validationDb = require('../helpers/validationDb')

const ownership = async (req, res, next) => {
  let idQuery

  if (!req.userAuth) {
    const httpError = new ErrorObject('Restricted access: authentication required for the query', 403)
    next(httpError)
  }

  const idUser = req.userAuth.id
  const idRoleUser = req.userAuth.roleId

  if (req.query.user) {
    idQuery = req.query.user
  }
  if (req.params.id) {
    idQuery = req.params.id
  }

  try {
    const schema = { where: { id: idRoleUser } }
    const role = await validationDb(schema, Role, true)
    const roleUser = role.name

    if (idUser === idQuery || roleUser === 'ADMIN') {
      next()
    }

    const httpError = new ErrorObject('Restricted access: User is not authorized to make this request', 403)
    next(httpError)
  } catch (error) {
    const httpError = new ErrorObject(`Restricted access: ${error.message}`, 403)
    next(httpError)
  }
}

module.exports = ownership
