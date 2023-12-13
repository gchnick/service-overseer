type ErrosDictionary = {
  [key: string]: string;
};

export const errorsDictionary: ErrosDictionary = {
  required: 'El campo es requerido',
  min: 'El número debe ser mayor a 0',
  max: 'El número debe ser menor a 100',
  minlength: 'El campo debe tener 3 letras como minimo',
  maxlength: 'El campo debe tener 255 letras como máximo',
  checkNumberIsAvailable: 'El número no debe estar registrado',
  pastDate: 'Debe ser una fecha pasada',
};
