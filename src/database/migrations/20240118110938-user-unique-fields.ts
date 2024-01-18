import { QueryInterface, DataTypes } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.changeColumn(
      'users',
      'username',
      {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      }
    )

    await queryInterface.changeColumn(
      'users',
      'email',
      {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      }
    )
  },

  async down (queryInterface: QueryInterface) {
  
  }
};
