import { DataTypes, QueryInterface } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(
      'auctions',
      'starting_bid',
      {
        type: DataTypes.DOUBLE,
        allowNull: false
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    
  }
};
