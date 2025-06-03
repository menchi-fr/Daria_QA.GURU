import { faker } from '@faker-js/faker';

export class ArticleBuilder {
  
  constructor() {
    this.article = {};
  }
  
  addTitle() {
    this.article.title = faker.lorem.sentence();
    return this;
  }
  
  addDescription() {
    this.article.description = faker.lorem.paragraph(1);
    return this;
  }
  
  addBody() {
    this.article.body = `${faker.lorem.paragraphs(2)}\n\n## ${faker.lorem.words(3)}\n\n${faker.lorem.paragraph()}`;
    return this;
  }
  
  addCustomTitle(title) {
    this.article.title = title;
    return this;
  }
  
  addCustomDescription(description) {
    this.article.description = description;
    return this;
  }
  
  addCustomBody(body) {
    this.article.body = body;
    return this;
  }
  
  generate() {
    return { ...this.article };
  }
}