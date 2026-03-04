import { test, expect } from '@playwright/test';

test.describe('TodoMVC App', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.getByTestId('text-input').waitFor({ state: 'visible', timeout: 15000 });
  });

  // ✅ Test 1: Halaman berhasil dimuat
  test('should load the app correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/TodoMVC/i);
    await expect(page.getByTestId('text-input')).toBeVisible();
  });

  // ✅ Test 2: Tambah satu todo baru
  test('should add a new todo item', async ({ page }) => {
    await page.getByTestId('text-input').fill('Belajar Playwright');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('todo-list')).toContainText('Belajar Playwright');
  });

  // ✅ Test 3: Tambah beberapa todo
  test('should add multiple todo items', async ({ page }) => {
    const input = page.getByTestId('text-input');

    await input.fill('Belajar Playwright');
    await page.keyboard.press('Enter');

    await input.fill('Belajar Cypress');
    await page.keyboard.press('Enter');

    await input.fill('Publish artikel Medium');
    await page.keyboard.press('Enter');

    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Belajar Playwright');
    await expect(todoList).toContainText('Belajar Cypress');
    await expect(todoList).toContainText('Publish artikel Medium');
  });

  // ✅ Test 4: Centang todo sebagai selesai
  test('should mark a todo as completed', async ({ page }) => {
    await page.getByTestId('text-input').fill('Belajar Playwright');
    await page.keyboard.press('Enter');

    await page.getByTestId('todo-item-toggle').first().check();

    await expect(page.getByTestId('todo-item').first()).toHaveClass(/completed/);
  });

  // ✅ Test 5: Hapus todo item
  test('should delete a todo item', async ({ page }) => {
    await page.getByTestId('text-input').fill('Todo yang akan dihapus');
    await page.keyboard.press('Enter');

    const todoItem = page.getByTestId('todo-item').first();
    await todoItem.hover();
    await todoItem.getByTestId('todo-item-button').click({ force: true });

    await expect(page.getByTestId('todo-list')).not.toContainText('Todo yang akan dihapus');
  });

  // ✅ Test 6: Footer muncul setelah ada todo
  test('should show footer when there is at least one todo', async ({ page }) => {
    await page.getByTestId('text-input').fill('Test footer');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('footer')).toBeVisible();
    await expect(page.getByTestId('footer')).toContainText('item left');
  });

  // ✅ Test 7: Filter Active menampilkan hanya todo yang belum selesai
  test('should filter active todos', async ({ page }) => {
    const input = page.getByTestId('text-input');

    await input.fill('Todo aktif');
    await page.keyboard.press('Enter');

    await input.fill('Todo selesai');
    await page.keyboard.press('Enter');

    await page.getByTestId('todo-item-toggle').last().check();

    await page.getByTestId('footer-navigation').getByRole('link', { name: 'Active' }).click();

    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Todo aktif');
    await expect(todoList).not.toContainText('Todo selesai');
  });

  // ✅ Test 8: Filter Completed menampilkan hanya todo yang sudah selesai
  test('should filter completed todos', async ({ page }) => {
    const input = page.getByTestId('text-input');

    await input.fill('Todo aktif');
    await page.keyboard.press('Enter');

    await input.fill('Todo selesai');
    await page.keyboard.press('Enter');

    await page.getByTestId('todo-item-toggle').last().check();

    await page.getByTestId('footer-navigation').getByRole('link', { name: 'Completed' }).click();

    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Todo selesai');
    await expect(todoList).not.toContainText('Todo aktif');
  });

  // ✅ Test 9: Tombol Clear Completed menghapus semua todo selesai
  test('should clear completed todos', async ({ page }) => {
    const input = page.getByTestId('text-input');

    await input.fill('Todo aktif');
    await page.keyboard.press('Enter');

    await input.fill('Todo selesai');
    await page.keyboard.press('Enter');

    await page.getByTestId('todo-item-toggle').last().check();

    await page.getByRole('button', { name: 'Clear completed' }).click();

    const todoList = page.getByTestId('todo-list');
    await expect(todoList).toContainText('Todo aktif');
    await expect(todoList).not.toContainText('Todo selesai');
  });

  // ✅ Test 10: Toggle semua todo sekaligus
  test('should toggle all todos at once', async ({ page }) => {
    const input = page.getByTestId('text-input');

    await input.fill('Todo satu');
    await page.keyboard.press('Enter');

    await input.fill('Todo dua');
    await page.keyboard.press('Enter');

    await page.getByTestId('toggle-all').check();

    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems.nth(0)).toHaveClass(/completed/);
    await expect(todoItems.nth(1)).toHaveClass(/completed/);
  });

});
