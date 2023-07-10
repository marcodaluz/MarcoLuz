import { DataTypes } from 'sequelize';
import { database } from '../config/context/database.js';



const ProductModel = database.define('product_models', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img:{
    type: DataTypes.STRING,
    allowNull: true,
  },
});
/*
ProductModel.belongsTo(UserModel, { 
  constraint: true,
  foreignKey: 'id_utilizador',
  
});
*/
export { ProductModel };
