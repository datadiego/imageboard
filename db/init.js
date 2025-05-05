import { sequelize } from "./sequelize.js";

import "./associations.js";

const initializeDB = async () => {
    try{
        await sequelize.sync({ force: true });
    } catch(error) {
        console.error("Error initializing the database:", error);
    }
};

initializeDB()