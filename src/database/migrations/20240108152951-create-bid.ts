import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('bids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      value: {
        type: DataTypes.DOUBLE
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });

    await queryInterface.addColumn(
      'bids',
      'user_id',
      {
        type: DataTypes.INTEGER,
        references: {
          model:'users',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )

    await queryInterface.addColumn(
      'bids',
      'auction_id',
      {
        type: DataTypes.INTEGER,
        references: {
          model:'auctions',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )

  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('bids');
  }
};