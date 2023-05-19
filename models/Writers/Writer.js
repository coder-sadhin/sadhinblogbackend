const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('writers', {
        writer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        writer_fullname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        writer_userName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        writer_email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        writer_password: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        writer_phone: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        writer_country: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        writer_city: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        writer_zip: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        profile_image: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.Sequelize.fn('current_timestamp')
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        is_agreed: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        }
    }, {
        sequelize,
        tableName: 'writers',
        timestamps: false,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "writer_id" },
                ]
            },
        ]
    });
};
