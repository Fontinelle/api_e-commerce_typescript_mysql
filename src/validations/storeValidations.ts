import { check } from 'express-validator';

const create = [
  check('name')
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('email').isEmail().withMessage('Não é um email válido'),
  check('CNPJ')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    .withMessage('Não é um CNPJ válido'),
  check('phoneNumber').isMobilePhone(['pt-BR']).withMessage('Não é um numero de telefone válido'),
  check('address.CEP').isPostalCode('BR').withMessage('Não é um CEP válido'),
  check('address.state')
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.city')
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.district')
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.street')
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.number')
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 1 })
    .withMessage('Deve ter no minimo 1 caracteres'),
];

const show = [
  check('id').notEmpty().withMessage('Deve ser informado').isNumeric().withMessage('Não é um ID válido'),
];

const update = [
  check('id').notEmpty().withMessage('Deve ser informado').isNumeric().withMessage('Não é um ID válido'),
  check('name')
    .optional()
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('email').optional().isEmail().withMessage('Não é um email válido'),
  check('CNPJ')
    .optional()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    .withMessage('Não é um CNPJ válido'),
  check('phoneNumber')
    .optional()
    .isMobilePhone(['pt-BR'])
    .withMessage('Não é um numero de telefone válido'),
  check('address').optional(),
  check('address.CEP').optional().isPostalCode('BR').withMessage('Não é um CEP válido'),
  check('address.state')
    .optional()
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.city')
    .optional()
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.district')
    .optional()
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.street')
    .optional()
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 3 })
    .withMessage('Deve ter no minimo 3 caracteres'),
  check('address.number')
    .optional()
    .isString()
    .withMessage('Deve ser do tipo texto')
    .isLength({ min: 1 })
    .withMessage('Deve ter no minimo 1 caracteres'),
];

const remove = [
  check('id').notEmpty().withMessage('Deve ser informado').isNumeric().withMessage('Não é um ID válido'),
];

export default { create, show, update, remove };
