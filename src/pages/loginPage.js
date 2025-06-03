import { test } from '@playwright/test';

export class LoginPage {
  
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.heading = page.getByRole('heading');
  }

  async loginUser(user) {
    await test.step('Заполнить форму логина и войти в систему', async () => {
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      
      await this.page.screenshot({ 
        path: `login-form-${user.email.replace('@', '_at_')}.png`,
        fullPage: true 
      });
      
      //await this.page.waitForTimeout(500);
      await this.loginButton.click();
    });
  }

getEmailInput() {
    return this.emailInput;
  }
  
  getPasswordInput() {
    return this.passwordInput;
  }
  
  getLoginButton() {
    return this.loginButton;
  }
}