import {Page} from '@playwright/test';

export async function emailForSignup (){
    const timestamp = new Date().getTime();
    const email = `johndoe+${timestamp}@sample.com`; 
    return email;
};