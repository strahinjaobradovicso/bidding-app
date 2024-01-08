import { QueryInterface, DataTypes } from "sequelize"
import { UserModel } from "../models/user";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface:QueryInterface) {
    
    await queryInterface.bulkInsert('users', [
      {
        username:"John",
        password:"johnPassword",
        email:"johnEmail",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username:"Steve",
        password:"stevePassword",
        email:"steveEmail",
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {}, {}, UserModel)
  }
};
