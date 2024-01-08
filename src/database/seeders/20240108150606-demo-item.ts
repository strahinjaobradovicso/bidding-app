import { QueryInterface } from "sequelize"
import { ItemModel } from "../models/item";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('items', [
      {
        title:"First item",
        price:120.5,
        decription:"first item description",
        user_id:2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('items', {}, {}, ItemModel)
  }
};
