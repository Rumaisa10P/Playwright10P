import { Locator, Page } from "@playwright/test";



export default class LoginPage{

    readonly loginfield : Locator;
    readonly passwordfield : Locator;
    readonly buttonclick : Locator;
    readonly validation : Locator

    constructor(page: Page){
        this.loginfield = page.getByRole('textbox',{name:'username'});
        this.passwordfield = page.getByRole('textbox',{name:'password'});
        this.buttonclick = page.getByRole('button',{name:'Submit'});
        this.validation = page.locator("#error");
    }
async enterusername(username: string){
    await this.loginfield.fill(username);
}


async enterpassword(password: string){
    await this.passwordfield.fill(password);
}
async btnclick(){
    await this.buttonclick.click();
}


}