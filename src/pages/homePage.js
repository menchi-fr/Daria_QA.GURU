import { test } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;
    this.signUpButton = page.getByRole('link', { name: 'Sign up' });
  }
  async open() {
    await test.step('Открыть главную страницу', async () => {
      await this.page.goto('https://realworld.qa.guru/#/');
    });
  }

  //Метод для перехода на страницу регистрации
  async gotoSignUp() {
    await test.step('Кликнуть на кнопку Sign up', async () => {
      await this.signUpButton.click();
    });
  }

  //Метод для перехода на страницу логина
async gotoLogin() {
  await test.step('Кликнуть на кнопку Login', async () => {
    const loginButton = this.page.getByRole('link', { name: ' Login' });
    
    //Кликаем по Login
    await loginButton.click();
    console.log('Переход на страницу логина');
  });
}
}