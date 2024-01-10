import { QueryInterface } from "sequelize"
import dummyAuctions from "../data/auction";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('auctions', dummyAuctions)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('auctions', {})
  }
};
