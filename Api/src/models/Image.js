const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("image", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    item_number: {
      type: DataTypes.STRING,
      defaultValue: "sin item number",
      allowNull: true,
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //     isAcceptedFormat(value) {
      //         if (!/\.(png|jpg)$/.test(value)) {
      //             throw new Error("La URL de la imagen debe terminar en .png o .jpg");
      //         }
      //     },
      // }
    },
  });
};
