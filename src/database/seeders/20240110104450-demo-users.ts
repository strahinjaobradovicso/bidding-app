import { QueryInterface } from "sequelize"
import dummyUsers from "../data/users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('users', dummyUsers)
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {})
  }
};
