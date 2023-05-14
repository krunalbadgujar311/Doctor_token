module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      }
    });
  
    return Tutorial;
  };