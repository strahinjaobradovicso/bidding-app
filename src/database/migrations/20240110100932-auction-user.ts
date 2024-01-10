import { QueryInterface, DataType, DataTypes } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(
      'auctions',
      'user_id',
      {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE'
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn('auctions', 'user_id')
  }
};
