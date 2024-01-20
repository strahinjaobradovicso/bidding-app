import { QueryInterface, DataTypes } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {

    await queryInterface.addColumn(
      'users',
      'salt',
      {
        type: DataTypes.STRING,
        allowNull: false
      }
    )

  },

  async down (queryInterface: QueryInterface) {
    
  }
};
