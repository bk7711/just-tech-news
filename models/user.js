const{ Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create our User model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        //define an id column
        id: {
            //use the special Sequelize DataTypes object provide what type od data it is
            type: DataTypes.INTEGER,
            //this is the equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            //instruct that this is the Primary Key
            primaryKey:true,
            //turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        //define an emal column
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            //there cannot be any duplicate email values in this table
            unique: true,
            //if allowNull is set to false, we can run our data through validators before creating the table data
            validate:{
                isEmail:true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                //this means that the passwrod must be atleast four characters long
                len: [4]
            }
        }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE 
        
        //pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        //don't automatically create createdAt/updateAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing
        underscored:true,
        //make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;