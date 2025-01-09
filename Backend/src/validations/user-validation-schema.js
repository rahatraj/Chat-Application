import User from "../models/user.model.js"

export const userRegistrationValidation = {
    email : {
        in : ['body'],
        exists : {
            errorMessage : 'Email is required'
        },
        notEmpty : {
            errorMessage : "Email can not be empty"
        },
        isEmail : {
            errorMessage : "Email must be in format"
        },
        trim : true,
        normalizeEmail : true,
        custom : {
            options  : async function (value) {
                try {
                    const user = await User.findOne({email : value})
                    if(user){
                        return Promise.reject('Email is already taken')
                    }
                } catch (error) {
                    return Promise.reject('Somthing went wrong', error)
                }
            }
        }
    },
    password : {
        in : ['body'],
        exists : {
            errorMessage : "Password is required"
        },
        notEmpty : {
            errorMessage : "Password can not empty"
        },
        isStrongPassword : {
            options : {
                minLength : 8,
                minSymbol : 1,
                minUppercase : 1,
                minLowercase : 1,
                minNumber : 1,
            },
            errorMessage : "The password must contain atleast one Uppercase, one Lowercase, one Number, one Symbol and must be atleast 8 characters long"
        },
        trim : true,
    },
    fullName : {
        in : ['body'],
        exists : {
            errorMessage : "full Name is required"
        },
        notEmpty : {
            errorMessage : "Full name can not be empty"
        },
        trim : true
    }
}

export const userLoginValidation = {
    email : {
        in : ['body'],
        exists : {
            errorMessage : "Email is required"
        },
        notEmpty : {
            errorMessage : "Email can not be empty"
        },
        isEmail : {
            errorMessage : "Email must be in format"
        },
        trim : true,
        normalizeEmail : true
    },
    password : {
        in : ['body'],
        exists : {
            errorMessage : "Password is required"
        },
        notEmpty : {
            errorMessage : "Password can not be empty"
        },
        trim : true
    }
}