// tests/realworldFirstHomework.js
import { test, expect } from '@playwright/test';
import { HomePage, RegisterPage, ArticlesPage } from '../src/pages';
import { UserBuilder } from '../src/helpers/builders/newUserBuilder';

// Тест 1: Проверка страницы регистрации
test('Проверка что страница регистрации выглядит как должна', async ({ page }) => {
  // Создаем экземпляры нужных страниц
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Открываем главную страницу
  await homePage.open();
  
  // Переходим на страницу регистрации
  await homePage.gotoSignUp();
  
  // Проверяем все элементы на странице регистрации
  await registerPage.checkAllElements();
});

// Тест 2: Проверка логина и отображения списка статей
test('Проверка что логин работает и список статей отображается', async ({ page }) => {
  // Создаем экземпляры нужных страниц
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const articlesPage = new ArticlesPage(page);
  
  // Генерируем данные тестового пользователя
  const user = new UserBuilder()
    .addUsername()
    .addEmail()
    .addPassword()
    .generate();
  
  console.log('Тестовый пользователь:', user); // Для отладки
  
  // Открываем главную страницу
  await homePage.open();
  
  // Переходим на страницу регистрации
  await homePage.gotoSignUp();
  
  // Регистрируем пользователя
  await registerPage.register(user);
  
  // Проверяем, что имя пользователя отображается в шапке
  await articlesPage.checkUserName(user.username);
  
  // Проверяем, что список статей отображается
  await articlesPage.checkArticlesExist();
});