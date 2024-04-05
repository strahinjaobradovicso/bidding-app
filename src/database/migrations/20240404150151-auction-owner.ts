import { DataTypes, QueryInterface } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(
      'auctions',
      'owner_id',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn('auctions', 'owner_id')
  }
};
