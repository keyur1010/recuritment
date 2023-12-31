const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const clientModel=sequelize.define('clientModel',{
        client_name:{
            type:DataTypes.STRING,

        },
        type:{
            type:DataTypes.STRING
        },
        registered_address:{
            type:DataTypes.STRING
        },
        
        contract_name:{
            type:DataTypes.STRING
        },
        contract_position:{
            type:DataTypes.STRING
        },
        contract_number:{
            type:DataTypes.STRING,
            // unique: true,
           
        },
        contract_mobile:{
            type:DataTypes.STRING
        },
        contract_email:{
            type:DataTypes.STRING
        },
        website:{
            type:DataTypes.STRING
        },
        industry:{
            type:DataTypes.STRING
        },
        vat_number:{
            type:DataTypes.STRING
        },
        registration_no:{
            type:DataTypes.STRING
        },
        client_logo:{
            type:DataTypes.STRING
        },
        
        subscrption_level_agreed:{
            type:DataTypes.STRING
        },
        payroll_subsribe:{
            type:DataTypes.STRING
        },
        employement_contract:{
            type:DataTypes.STRING
        },
        service:{
            type:DataTypes.STRING
        },
        finance_name:{
            type:DataTypes.STRING
        },
        finance_position:{
            type:DataTypes.STRING
        },
        finance_number:{
            type:DataTypes.STRING
        },
        finance_mobile:{
            type:DataTypes.STRING
        },
        finance_email:{
            type:DataTypes.STRING
        },
        finance_credit_limit:{
            type:DataTypes.INTEGER
        },
        finance_debit_details:{
            type:DataTypes.INTEGER
        },
       
        billing_name:{
            type:DataTypes.STRING
        },
        billing_position:{
            type:DataTypes.STRING
        },
        billing_number:{
            type:DataTypes.STRING
        },
        billing_mobile:{
            type:DataTypes.STRING
        },
        billing_email:{
            type:DataTypes.STRING
        },
        services:{
            type:DataTypes.JSON,
        },
        insertOn:{
            type:DataTypes.DATE
        },
        insertBy:{
            type:DataTypes.INTEGER
        },
        updateOn:{
            type:DataTypes.DATE
        },
        updateBy:{
            type:DataTypes.STRING
        },
        approveOn:{
            type:DataTypes.DATE
        },
        approveBy:{
            type:DataTypes.STRING
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        admin_status:{
            type:Sequelize.ENUM('Approved','Pending',"Rejected"),
            defaultValue:"Pending"
        },
        login_random:{
            type:DataTypes.STRING
        }
        
        
    });
    return clientModel
}