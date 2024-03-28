import { DataTypes, QueryInterface } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(
      'images',
      'item_id',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'items',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
