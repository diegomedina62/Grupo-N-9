const { checkSchema, validationResult } = require("express-validator");
const ErrorObject = require("../helpers/error.js");

// se crea un esquema de prueba. despues se importaran squemas con los campos de cada tabla. este esquema de prueba se debe borrar en el futuro. el esquema se crea en modo objeto y no en modo prueba individual usando body()

const schemaPrueba = checkSchema({
  username: { notEmpty: true },
  password: { isString: true },
});

//cambié la funcion y ahora no usa el validation run sino el checkschema()

const ValidationMiddleware = (schema) => {
  return [
    schema,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //si se dejara la siguiente linea se entrega el error predeterminado de express-validatos

        /* return res.status(400).json({ errors: errors.array() }); */

        //si se deja lo siguiente, se usaria el ErrorObject que está en helpers

        const finalErrors = errors.errors;
        const newError = new ErrorObject(
          "Validation Error in your request",
          400,
          finalErrors
        );

        return res.status(400).json(newError);
      }
      //next para continuar con el controlador de la ruta, en caso de que no ocurra error
      next();
    },
  ];
};
