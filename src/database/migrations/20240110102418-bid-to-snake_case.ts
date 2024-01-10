import { QueryInterface } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
   await queryInterface.renameColumn('bids', 'createdAt', 'created_at')
   await queryInterface.renameColumn('bids', 'updatedAt', 'updated_at')
  },

  async down (queryInterface: QueryInterface) {

  }
};
