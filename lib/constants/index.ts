
import {Bookmark, Compass, HomeIcon, UserIcon} from 'lucide-react';

export const USER="USER"
export const NEWS="NEWS"
export const ISLOADING="ISLOADING"

export const SignInInitVals={
    email:'',
    password:''
}

export const SignUpInitVals={
    username:'',
    email:'',
    password:'',
    cpassword:''
}

export const ProfileInitVals={
    username:'',
    photo:'/icons/user1.png',
    mobileNo:''
}

export const ResetPassInitVals={
    password:'',
    cpassword:''
}

export const NavItems=[
    {
        label:"Home",
        Icon:HomeIcon,
        path:"/"
    },
    {
        label:"Explore",
        Icon:Compass,
        path:"/Explore"
    },
    {
        label:"Bookmark",
        Icon:Bookmark,
        path:"/Bookmark"
    },
    {
        label:"Profile",
        Icon:UserIcon,
        path:"/UserProfile"
    },
]

export const NavItems1=[
    {
        label:"Explore",
        Icon:Compass,
        path:"/Explore"
    },
    {
        label:"Bookmark",
        Icon:Bookmark,
        path:"/Bookmark"
    },
    {
        label:"Profile",
        Icon:UserIcon,
        path:"/UserProfile"
    },
]

export const LatestItems=[
    {
        label:"All",
    },
    {
        label:"Sports",
    },
    {
        label:"Olympics",
    },
    {
        label:"Business",
    },
    {
        label:"Health",
    },
    {
        label:"Travel",
    },
    {
        label:"Technology",
    },
    {
        label:"Science",
    },
    {
        label:"Entertainment",
    },
    
]