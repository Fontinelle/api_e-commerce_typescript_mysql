import { InferCreationAttributes, Model, DataTypes } from 'sequelize';
import db from '../config/database';
import Address from './Address';

interface IStore extends Model<InferCreationAttributes<IStore>> {
  id?: number;
  name: string;
  CNPJ: string;
  email: string;
  phoneNumber: string;
}

const Store = db.define<IStore>(
  'store',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    CNPJ: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, unique: true },
  },
  { timestamps: true },
);

Store.hasOne(Address, { foreignKey: 'store_id' });

export default Store;
