import joi from "joi";

const joiClean = joi.defaults((schema) =>
  schema.options({
    errors: {
      wrap: { label: false },
    },
  })
);

export default joiClean;
