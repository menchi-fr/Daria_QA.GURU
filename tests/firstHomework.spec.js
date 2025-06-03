import { test, expect } from '@playwright/test';
import { HomePage, RegisterPage, LoginPage, YourFeedPage, ArticlePage } from '../src/pages/index.js';
import { UserBuilder, ArticleBuilder } from '../src/helpers/builders/index.js';

//Тест 1
test('Проверка что страница регистрации выглядит как должна', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  
  await homePage.open();
  await homePage.gotoSignUp();
  await registerPage.checkAllUIElements();
});

//Тест 2
test('Проверяем что можем зарегить нового пользователя', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const yourFeedPage = new YourFeedPage(page);
  
  const testUser = new UserBuilder()
    .addUsername()
    .addEmail()
    .addPassword(14)
    .generate();
  
  await homePage.open();
  await homePage.gotoSignUp();
  await registerPage.registerUser(testUser);
  
  //await page.screenshot({ 
  //  path: `after-registration-${testUser.username}.png`,
  //  fullPage: true 
  //});
  
  await expect(yourFeedPage.navigation).toContainText(testUser.username);
});


//Тест 3
test('Проверка логина с данными зарегеного пользователя', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const yourFeedPage = new YourFeedPage(page);
  
  const testUser = new UserBuilder()
    .addUsername()
    .addEmail()
    .addPassword(10)
    .generate();
  
  //Регистрируем пользователя
  await homePage.open();
  await homePage.gotoSignUp();
  await registerPage.registerUser(testUser);

  //ЛОГАУТ
  await page.getByText(testUser.username).click();
  await page.getByRole('link', { name: ' Logout' }).click();

  //Переходим на главную страницу и логинимся
  await homePage.open();
  await homePage.gotoLogin();
  
  await loginPage.loginUser(testUser);
  
  //await page.screenshot({ 
  //  path: `successful-login-${testUser.username}.png`,
  //  fullPage: true 
  //});
  
  await expect(yourFeedPage.navigation).toContainText(testUser.username);
});

//Тест 4
test('Создание новой статьи авторизованным пользователем', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  
  const testUser = new UserBuilder()
    .addUsername()
    .addEmail()
    .addPassword(12)
    .generate();
  
  //Регистрируем пользователя
  await homePage.open();
  await homePage.gotoSignUp();
  await registerPage.registerUser(testUser);
  const articlePage = new ArticlePage(page);

  //ЛОГАУТ
  await page.getByText(testUser.username).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  
  //Логинимся
  await homePage.open();
  await homePage.gotoLogin();
  await loginPage.loginUser(testUser);
  
  //Создаем статью
  await articlePage.goToNewArticle();
  
  const testArticle = new ArticleBuilder()
  .addTitle()
  .addDescription()
  .addBody()
  .generate();
  
  await articlePage.createArticle(testArticle);

  await expect(articlePage.getArticleTitle()).toContainText(testArticle.title);
  
  await page.screenshot({ 
    path: `published-article-${testUser.username}.png`,
    fullPage: true 
  });
});

//Тест 5
test('Проверяем что открывается страница профиля', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  
  const testUser = new UserBuilder()
    .addUsername()
    .addEmail()
    .addPassword(10)
    .generate();
  
  //Регистрируем пользователя
  await homePage.open();
  await homePage.gotoSignUp();
  await registerPage.registerUser(testUser);

  //ЛОГАУТ
  await page.getByText(testUser.username).click();
  await page.getByRole('link', { name: ' Logout' }).click();
  
  //Логинимся
  await homePage.open();
  await homePage.gotoLogin();
  await loginPage.loginUser(testUser);
  
  //Проверяем Profile menu
  await page.getByText(testUser.username).click();
  
  //await page.screenshot({ 
  //  path: `dropdown-menu-${testUser.username}.png`,
  //  fullPage: true 
  //});
  
  await page.getByRole('link', { name: ' Profile' }).click();
  
  //await page.screenshot({ 
  //  path: `profile-page-${testUser.username}.png`,
  //  fullPage: true 
  //});
  
  //Проверяем элемент страницы профиля
  await expect(page.getByRole('link', { name: ' Edit Profile Settings' })).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`.*#/profile/${testUser.username}.*`));
  await expect(page.locator('h4, .profile-username, .username')).toContainText(testUser.username);
});