import { QueryInterface, DataTypes } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(
      'bids',
      'user_id',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        
      }
    
    )
  },

  async down (queryInterface: QueryInterface) {
    queryInterface.removeColumn('bids', 'user_id')
  }
};
