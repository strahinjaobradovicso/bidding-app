import { DataTypes, QueryInterface } from "sequelize"
import { AuctionStatus } from "../models/auction";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.changeColumn(
      'auctions',
      'status',
      {
        type: DataTypes.ENUM,
        values: Object.values(AuctionStatus),
        defaultValue: AuctionStatus.Upcoming,
        allowNull: false
      }
      
    )
  },

  async down (queryInterface: QueryInterface) {
   
  }
};
