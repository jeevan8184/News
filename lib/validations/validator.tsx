
import {z} from "zod"

export const SignInForm=z.object({
    email:z.string().email().nonempty({message:"this field is required"}),
    password:z.string().min(8,{message:'password must contain 8 chars'}).max(16,{message:'password should be less than 16'}),
})

export const SignUpForm=z.object({
    username:z.string().min(4,{message:'must contain 4 chars'}),
    email:z.string().email().nonempty({message:"this field is required"}),
    password:z.string().min(8,{message:'password must contain 8 chars'}).max(16,{message:'password should be less than 16'}),
    cpassword:z.string().min(8,{message:'password must contain 8 chars'}).max(16,{message:'password should be less than 16'})
})

export const ResetPassValidity=z.object({
    password:z.string().min(8,{message:'password must contain 8 chars'}).max(16,{message:'password should be less than 16'}),
    cpassword:z.string().min(8,{message:'password must contain 8 chars'}).max(16,{message:'password should be less than 16'})
})

export const ProfileForm=z.object({
    username:z.string().min(4,{message:'must contain 4 chars'}),
    mobileNo:z.string().nonempty({message:"this field is required"}),
    photo:z.string(),
})

