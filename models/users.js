
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        handle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'users',
        timestamps: false,
        freezeTableName: true
    });
    return Users;
}


// module.exports = (sequelize) => {
//   class User extends Model {
//     static associate(models) {
//       // Define association with user_metadata
//       User.hasMany(models.UserMetadata, {
//         foreignKey: 'user_id',
//         as: 'metadata',
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//       });
//     }
//   }

//   User.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       handle: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'User',
//       tableName: 'users',
//       timestamps: true, // Includes createdAt and updatedAt
//     }
//   );

//   return User;
// };
