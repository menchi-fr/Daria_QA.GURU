// src/helpers/builders/newUserBuilder.js
import { faker } from '@faker-js/faker';

export class UserBuilder {
  constructor() {
    // Инициализируем пустой объект пользователя
    this.user = {};
  }

  // Метод для добавления email к данным пользователя
  addEmail() {
    // Генерируем случайный email с помощью faker
    this.user.email = faker.internet.email();
    // Возвращаем this для цепочки вызовов
    return this;
  }

  // Метод для добавления username к данным пользователя
  addUsername() {
    // Генерируем случайное имя пользователя
    this.user.username = faker.internet.userName();
    return this;
  }

  // Метод для добавления password к данным пользователя
  addPassword(length = 14) {
    // Генерируем случайный пароль с указанной длиной
    this.user.password = faker.internet.password({ length });
    return this;
  }

  // Метод для генерации финального объекта пользователя
  generate() {
    // Возвращаем копию объекта пользователя
    return { ...this.user };
  }
}