'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      validate: 
      {
        notEmpty: {
          msg: 'please input the title'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: 
      {
        notEmpty: {
          msg: 'please input the description'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: DataTypes.DATE,
    userId: DataTypes.INTEGER
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Todo;
};