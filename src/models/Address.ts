import { InferCreationAttributes, Model, DataTypes } from 'sequelize';
import db from '../config/database';

interface IAddress extends Model<InferCreationAttributes<IAddress>> {
  id?: number;
  store_id?: number;
  user_id?: number;
  complement?: string;
  number: string;
  street: string;
  district: string;
  city: string;
  state: string;
  CEP: string;
}

const Address = db.define<IAddress>('address', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  store_id: { type: DataTypes.INTEGER, defaultValue: null },
  user_id: { type: DataTypes.INTEGER, defaultValue: null },
  complement: { type: DataTypes.STRING, defaultValue: '' },
  number: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING, allowNull: false },
  district: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING, allowNull: false },
  CEP: { type: DataTypes.STRING, allowNull: false },
});

export default Address;
