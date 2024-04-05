import { QueryInterface } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.renameColumn('auctions', 'user_id', 'winner_id');
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.renameColumn('auctions', 'winner_id', 'user_id');
  }
};
