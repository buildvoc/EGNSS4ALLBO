export interface login_user {
    user_name:string;
    password:string;
}

export interface authenticated_user {
    id:number;
    name:string;
    surname:string;
    identification_number:number;
    email:string;
    vat:string
}