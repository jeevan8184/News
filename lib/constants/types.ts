

export type AuthSignUpVals={
    username:string,
    password:string,
    cpassword:string,
    email:string
}

export type AuthSignInVals={
    email:string,
    password:string
}

export type SessionParams={
    authId:string,
    token:string,
    expiresAt:Date
}

export type createUserParams={
    username:string,
    authId:string
}

export type updateUserParams={
    photo:string,
    id:string,
    path:string,
    mobileNo:number,
    username:string
}

export type updateMobileNoParams={
    path:string,
    mobileNo:string,
    id:string
}

export type AuthResetPassParams={
    password:string,
    cpassword:string,
    path:string,
    email:string
}

export type formUrlParams={
    params:string,
    key:string,
    value:string | null
}

export type RemoveUrlQueryParams={
    params:string,
    keysToRemove:string[]
}

export type searchParamsProps={
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}
