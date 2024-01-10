import { QueryInterface, DataTypes } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.addColumn(
      'bids',
      'auction_id',
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'auctions',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn('bids', 'auction_id')
  }
};
