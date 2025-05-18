// src/pages/homePage.js
// Импортируем объект test из библиотеки @playwright/test
// Он нужен для создания шагов в отчетах (test.step)
import { test } from '@playwright/test';

// Создаем и экспортируем класс HomePage
// export означает, что класс будет доступен для импорта в других файлах
export class HomePage {
  // constructor - метод, который вызывается при создании экземпляра класса
  // page - это параметр, который мы передаем при создании HomePage
  constructor(page) {
    // Сохраняем объект page как свойство класса
    this.page = page;
    
    // Создаем локаторы элементов на странице на основе codegen
    // Ссылка "Sign up" для перехода на страницу регистрации
    this.signUpButton = page.getByRole('link', { name: 'Sign up' });
    
    // Ссылка "Sign in" для перехода на страницу входа
    this.signInButton = page.getByRole('link', { name: 'Sign in' });
    
    // Ссылка на домашнюю страницу
    this.homeLink = page.getByLabel('Home');
    
    // Элемент навигации
    this.navBar = page.getByRole('navigation');
    
    // Ссылка на глобальную ленту статей
    this.globalFeedLink = page.getByRole('navigation').getByRole('link', { name: 'global-feed' });
  }

  // Метод для открытия главной страницы
  async open() {
    await test.step('Открыть главную страницу', async () => {
      // Используем URL из codegen - обратите внимание на # в пути
      await this.page.goto('https://vue3-realworld-example-app-mutoe.vercel.app/#/');
    });
  }

  // Метод для перехода на страницу регистрации
  async gotoSignUp() {
    await test.step('Перейти на страницу регистрации', async () => {
      // Кликаем по кнопке Sign up
      await this.signUpButton.click();
    });
  }

  // Метод для перехода на страницу входа
  async gotoSignIn() {
    await test.step('Перейти на страницу входа', async () => {
      // Кликаем по кнопке Sign in
      await this.signInButton.click();
    });
  }

  // Метод для прямого перехода на страницу регистрации (опционально)
  async openSignUpPage() {
    await test.step('Открыть страницу регистрации напрямую', async () => {
      // Переходим сразу на URL страницы регистрации
      await this.page.goto('https://vue3-realworld-example-app-mutoe.vercel.app/#/register');
    });
  }

  // Метод для прямого перехода на страницу входа (опционально)
  async openSignInPage() {
    await test.step('Открыть страницу входа напрямую', async () => {
      // Переходим сразу на URL страницы входа
      await this.page.goto('https://vue3-realworld-example-app-mutoe.vercel.app/#/login');
    });
  }
}