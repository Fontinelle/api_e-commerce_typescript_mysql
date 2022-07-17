import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Address from '../models/Address';
import Store from '../models/Store';

import err from '../validations/errors';

const create = async (req: Request, res: Response) => {
  const { name, email, CNPJ, phoneNumber, address } = req.body;

  try {
    const exists = await Store.findOne({
      where: {
        [Op.or]: [{ name }, { email }, { CNPJ }, { phoneNumber }],
      },
    });

    if (exists) {
      const errors = err(exists, name, email, phoneNumber, 'store', CNPJ);
      return res.status(422).json({ errors });
    }

    const store = await Store.create({ name, email, CNPJ, phoneNumber }).then(async (data) => {
      const result = await Address.create({ store_id: data.id, ...address });
      return { ...data.get(), address: result };
    });

    return res.send({ store });
  } catch (e) {
    return res.status(500).json({
      errors: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const store = await Store.findAll({ include: Address });
    return res.send({ store });
  } catch (e) {
    return res.status(500).json({
      errors: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    });
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const store = await Store.findOne({ where: { id }, include: Address });
    if (!store) return res.status(404).json({ errors: 'Loja não encontrada' });

    return res.send({ store });
  } catch (e) {
    return res.status(500).json({
      errors: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    });
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, CNPJ, phoneNumber, address } = req.body;

  if (!name && !email && !CNPJ && !phoneNumber && !address) {
    return res.status(400).json({ errors: 'Uma das informações deve ser fornecida' });
  }

  try {
    const exists = await Store.findOne({
      where: {
        [Op.or]: [
          { name: name || null },
          { email: email || null },
          { CNPJ: CNPJ || null },
          { phoneNumber: phoneNumber || null },
        ],
      },
    });

    if (exists) {
      const errors = err(exists, name, email, phoneNumber, 'store', CNPJ);
      return res.status(422).json({ errors });
    }

    const addressFind = await Address.findOne({ where: { store_id: id } });
    await addressFind?.update({ ...address });

    const store = await Store.findOne({ where: { id }, include: Address });
    if (!store) return res.status(404).json({ errors: 'Loja não encontrada' });

    const storeUpdate = await store.update({ name, email, CNPJ, phoneNumber });

    return res.send({ store: storeUpdate });
  } catch (e) {
    return res.status(500).json({
      errors: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    });
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const store = await Store.findOne({ where: { id } });
    if (!store) return res.status(404).json({ errors: 'Loja não encontrada' });

    await Address.destroy({ where: { store_id: id } });
    await Store.destroy({ where: { id } });

    return res.send({ deleted: true });
  } catch (e) {
    return res.status(500).json({
      errors: 'Aconteceu um erro no servidor, tente novamente mais tarde!',
    });
  }
};

export default { create, index, show, update, remove };
