import { DataTypes, QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('auctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      start: {
        type: DataTypes.DATE
      },
      lastBid: {
        type: DataTypes.DOUBLE
      },
      status: {
        type: DataTypes.STRING
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
      'auctions',
      'item_id',
      {
        type: DataTypes.INTEGER,
        references: {
          model:'items',
          key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )

    await queryInterface.addColumn(
      'auctions',
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
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('auctions');
  }
};