// src/pages/registerPage.js
import { test } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    // Сохраняем объект страницы
    this.page = page;
    
    // Локаторы из codegen
    // Заголовок "Sign up"
    this.heading = page.getByRole('heading', { name: 'Sign up' });
    
    // Ссылка "login"
    this.loginLink = page.getByRole('link', { name: 'login' });
    
    // Поля ввода
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    
    // Ссылки в навигации
    this.homeLink = page.getByLabel('Home');
    this.signInLink = page.getByLabel('Sign in');
    this.signUpLink = page.getByLabel('Sign up');
    
    // Ссылка на глобальную ленту
    this.globalFeedLink = page.getByRole('navigation').getByRole('link', { name: 'global-feed' });
    
    // Кнопка регистрации (добавим, хотя её нет в codegen)
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }

  // Метод для проверки всех элементов на странице
  async checkAllElements() {
    await test.step('Проверить все элементы на странице регистрации', async () => {
      // Проверяем заголовок
      await this.heading.isVisible();
      
      // Проверяем ссылку на логин
      await this.loginLink.isVisible();
      
      // Проверяем поля ввода
      await this.usernameInput.isVisible();
      await this.emailInput.isVisible();
      await this.passwordInput.isVisible();
      
      // Проверяем ссылки в навигации
      await this.homeLink.isVisible();
      await this.signInLink.isVisible();
      await this.signUpLink.isVisible();
      
      // Проверяем ссылку на глобальную ленту
      await this.globalFeedLink.isVisible();
    });
  }

  // Метод для регистрации пользователя
  async register(user) {
    await test.step('Зарегистрировать нового пользователя', async () => {
      // Заполняем поля
      await this.usernameInput.fill(user.username);
      await this.emailInput.fill(user.email);
      await this.passwordInput.fill(user.password);
      
      // Делаем скриншот заполненной формы (для отладки)
      await this.page.screenshot({ path: 'register-form.png' });
      
      // Нажимаем кнопку регистрации
      await this.signUpButton.click();
    });
  }
}