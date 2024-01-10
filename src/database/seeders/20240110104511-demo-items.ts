import { QueryInterface } from "sequelize"
import dummyItems from "../data/items";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
   await queryInterface.bulkInsert('items', dummyItems)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('items', {})
  }
};
