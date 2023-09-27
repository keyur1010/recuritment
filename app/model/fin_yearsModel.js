const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const fin_yearsModel=sequelize.define('fin_yearsModel',{
        year_name:{
            type:DataTypes.STRING,
        },
        year_start_date:{
            type:DataTypes.DATE,
        },
        year_end_date:{
            type:DataTypes.DATE,
        },

        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        }
    });
    return fin_yearsModel
}