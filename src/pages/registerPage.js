import { test, expect } from '@playwright/test';

export class RegisterPage {
  
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading');
    this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.homeLink = page.getByRole('link', { name: ' Home' });
    this.loginLink = page.getByRole('link', { name: ' Login' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.logo = page.getByRole('navigation').getByRole('link', { name: 'conduit' });
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }

  async registerUser(user) {
    await test.step('Заполнить форму регистрации и отправить', async () => {
      await this.nameInput.fill(user.username);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      
      await this.page.screenshot({ 
        path: `register-form-${user.username}.png`,
        fullPage: true 
      });
      
      await this.signUpButton.click();
    });
  }
 getHeading() {
    return this.heading;
  }

  getNameInput() {
    return this.nameInput;
  }

  getEmailInput() {
    return this.emailInput;
  }

  getPasswordInput() {
    return this.passwordInput;
  }

  getHomeLink() {
    return this.homeLink;
  }

  getLoginLink() {
    return this.loginLink;
  }

  getSignUpLink() {
    return this.signUpLink;
  }

  getLogo() {
    return this.logo;
  }

  getSignUpButton() {
    return this.signUpButton;
  }
}