import { test, expect } from '@playwright/test';
import { HomePage, RegisterPage, LoginPage, YourFeedPage } from '../src/pages/index.js';
import { UserBuilder } from '../src/helpers/builders/index.js';

//Логаут чтобы тесты были независимые
async function performLogout(page, username) {
  await page.getByRole('navigation').getByText(username).click();
  await page.waitForTimeout(500);
  await page.getByRole('link', { name: ' Logout' }).click();
  await page.waitForTimeout(1000);
  await page.goto('https://realworld.qa.guru/#/');
  await page.waitForTimeout(1000);
  
  const loginButton = page.getByRole('link', { name: ' Login' });
  await expect(loginButton).toBeVisible({ timeout: 3000 });
}

//Тест 1
test('Проверка что страница регистрации выглядит как должна', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  
  await homePage.open();
  await homePage.gotoSignUp();
  await page.waitForTimeout(1000);
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
  await page.waitForTimeout(1000);
  await registerPage.registerUser(testUser);
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: `after-registration-${testUser.username}.png`,
    fullPage: true 
  });
  
  await yourFeedPage.checkUserNameInNavigation(testUser.username);
  
  await performLogout(page, testUser.username);
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
  await page.waitForTimeout(1000);
  await registerPage.registerUser(testUser);
  await page.waitForTimeout(2000);
  
  //Выходим из системы
  await performLogout(page, testUser.username);
  
  //Переходим на главную страницу и логинимся
  await homePage.open();
  await page.waitForTimeout(1000);
  await homePage.gotoLogin();
  await page.waitForTimeout(1000);
  
  await loginPage.loginUser(testUser);
  await page.waitForTimeout(2000);
  
  await page.screenshot({ 
    path: `successful-login-${testUser.username}.png`,
    fullPage: true 
  });
  
  await yourFeedPage.checkUserNameInNavigation(testUser.username);
  await expect(page).toHaveURL(/.*#\/$/);
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
  await page.waitForTimeout(1000);
  await registerPage.registerUser(testUser);
  await page.waitForTimeout(2000);
  
  //Выходим
  await performLogout(page, testUser.username);
  
  //Логинимся
  await homePage.open();
  await homePage.gotoLogin();
  await page.waitForTimeout(1000);
  await loginPage.loginUser(testUser);
  await page.waitForTimeout(2000);
  
  //Создаем статью
  await page.getByRole('link', { name: ' New Article' }).click();
  await page.waitForTimeout(1000);
  
  const articleData = {
    title: `Статья от ${testUser.username} - ${Date.now()}`,
    description: 'Интересная статья о программировании и тестировании',
    body: `Это тестовая статья, созданная пользователем ${testUser.username}.\n\n## Заголовок\n\nТекст статьи в формате Markdown.`
  };
  
  await page.getByRole('textbox', { name: 'Article Title' }).fill(articleData.title);
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill(articleData.description);
  await page.getByRole('textbox', { name: 'Write your article (in' }).fill(articleData.body);
  
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await page.waitForTimeout(2000);
  
  await expect(page.getByRole('heading', { level: 1 })).toContainText(articleData.title);
  
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
  await page.waitForTimeout(1000);
  await registerPage.registerUser(testUser);
  await page.waitForTimeout(2000);
  
  //Выходим
  await performLogout(page, testUser.username);
  
  //Логинимся
  await homePage.open();
  await homePage.gotoLogin();
  await page.waitForTimeout(1000);
  await loginPage.loginUser(testUser);
  await page.waitForTimeout(2000);
  
  //Проверяем Profile menu
  await page.getByText(testUser.username).click();
  await page.waitForTimeout(500);
  
  await page.screenshot({ 
    path: `dropdown-menu-${testUser.username}.png`,
    fullPage: true 
  });
  
  await page.getByRole('link', { name: ' Profile' }).click();
  await page.waitForTimeout(1500);
  
  await page.screenshot({ 
    path: `profile-page-${testUser.username}.png`,
    fullPage: true 
  });
  
  //Проверяем элемент страницы профиля
  await expect(page.getByRole('link', { name: ' Edit Profile Settings' })).toBeVisible();
  await expect(page).toHaveURL(new RegExp(`.*#/profile/${testUser.username}.*`));
  await expect(page.locator('h4, .profile-username, .username')).toContainText(testUser.username);
  
  await performLogout(page, testUser.username);
});