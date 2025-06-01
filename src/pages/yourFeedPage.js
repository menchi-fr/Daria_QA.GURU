import { test, expect } from '@playwright/test';

export class YourFeedPage {
  
  constructor(page) {
    this.page = page;
    this.navigation = page.getByRole('navigation');
  }

  async checkUserNameInNavigation(expectedUsername) {
    await test.step(`Проверить что в навигации отображается имя "${expectedUsername}"`, async () => {
      await expect(this.navigation).toContainText(expectedUsername);
    });
  }
}