import { test, expect } from '@playwright/test';

export class YourFeedPage {
  
  constructor(page) {
    this.page = page;
    this.navigation = page.getByRole('navigation');
  }

  getUserNameInNavigation() {
    return this.navigation;
  }
}