const {Sequelize,DataTypes}=require('sequelize')


module.exports=(sequelize,DataTypes)=>{
    const clientPersonalModel=sequelize.define('clientPersonalModel',{
        candidate_name:{
            type:DataTypes.STRING,
        },
        advert_ref:{
            type:DataTypes.STRING,
        },
        countryCode:{
            type:DataTypes.STRING,
        },
        mobile_number:{
            type:DataTypes.STRING,
        },
        email_id:{
            type:DataTypes.STRING,
        },
        address_line_1:{
            type:DataTypes.STRING,
        },
        address_line_2:{
            type:DataTypes.STRING,
        },
        post_code:{
            type:DataTypes.STRING,
        },
        visa:{
            type:DataTypes.STRING,
        },
        passport:{
            type:DataTypes.STRING,
        },
        other_passport:{
            type:DataTypes.STRING,
        },
        driver_car_owner:{
            type:DataTypes.STRING,
        },
        candidate_dob:{
            type:DataTypes.DATE,
        },
        dbs:{
            type:DataTypes.STRING,
        },
        profile_image:{
            type:DataTypes.STRING,
        },
        upload_cv:{
            type:DataTypes.STRING,
        },
        //here is three field :-candidateIndustry,skill,job



        current_salary:{
            type:DataTypes.STRING,
        },
        desired_salary:{
            type:DataTypes.STRING,
        },
        notice_period:{
            type:DataTypes.STRING,
        },
        current_pay_status:{
            type:DataTypes.STRING,
        },
        reason_for_leave:{
            type:DataTypes.STRING,
        },
        current_position:{
            type:DataTypes.STRING,
        },
        w_u_consider:{
            type:DataTypes.STRING,
        },
        client_random:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.BOOLEAN,
            defaultValue:true
        },
        password:{
            type:DataTypes.STRING,
        },
        adminStatus:{
            type:Sequelize.ENUM('Approved','Pending','Rejected'),
            defaultValue:"Pending",
        },
    });
    return clientPersonalModel
}


