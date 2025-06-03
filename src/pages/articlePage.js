import { test } from '@playwright/test';

export class ArticlePage {
  
  constructor(page) {
    this.page = page;
    
    //Локаторы для формы создания статьи
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.descriptionInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
    this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in' });
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    
    //Локаторы для просмотра статьи
    this.articleTitle = page.getByRole('heading', { level: 1 });
    this.newArticleLink = page.getByRole('link', { name: ' New Article' });
  }

  //Метод для перехода к созданию новой статьи
  async goToNewArticle() {
    await test.step('Перейти к созданию новой статьи', async () => {
      await this.newArticleLink.click();
    });
  }

  //Метод для создания статьи (объединяет все поля)
  async createArticle(article) {
    await test.step('Заполнить форму статьи и опубликовать', async () => {
      await this.titleInput.fill(article.title);
      await this.descriptionInput.fill(article.description);
      await this.bodyInput.fill(article.body);
      await this.publishButton.click();
    });
  }

  //Отдельные методы для заполнения полей
  async fillTitle(title) {
    await this.titleInput.fill(title);
  }

  async fillDescription(description) {
    await this.descriptionInput.fill(description);
  }

  async fillBody(body) {
    await this.bodyInput.fill(body);
  }

  async publishArticle() {
    await this.publishButton.click();
  }

  //Методы для получения элементов
  getArticleTitle() {
    return this.articleTitle;
  }

  getTitleInput() {
    return this.titleInput;
  }
}