import { QueryInterface } from "sequelize"
import dummyBids from "../data/bid";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('bids', dummyBids)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('bids', {})
  }
};
