import { faker } from '@faker-js/faker';

export class UserBuilder {
  
  constructor() {
    this.user = {};
  }

  addUsername() {
    this.user.username = faker.internet.userName();
    return this;
  }

  addEmail() {
    this.user.email = faker.internet.email();
    return this;
  }

  addPassword(length = 10) {
    this.user.password = faker.internet.password({ length });
    return this;
  }

  generate() {
    return { ...this.user };
  }
}