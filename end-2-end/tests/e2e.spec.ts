import { test, expect } from '@playwright/test';

test('Should load the homepage', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');

  await expect(page).toHaveTitle(/Révision titre CDA/);
  await page.locator('form').nth(1).click();
});

test('Should filter by tag', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');

  // Sélectionner un tag
  await page.getByRole('link', { name: 'Backend' }).click();

  // Vérifier que les questions affichées correspondent au tag
  await page.locator('span').filter({ hasText: 'Backen' }).click();
  expect(await page.locator('span').filter({ hasText: 'Backend' }).count()).toBeGreaterThan(0);
});

test('Should show an error for short answers', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');

  // Répondre à une question avec une réponse trop courte
  await page.getByRole('link', { name: 'Conception BDD' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('t');
  await page.getByRole('button', { name: 'Répondre' }).click();


  // Vérifier qu'un message d'erreur est affiché
  await expect(page.getByRole('paragraph').filter({ hasText: 'Une réponse est nécessaire' })).toBeVisible();

});

test('Should redirect to questions page on button click', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/');

  await page.getByRole('link', { name: '✨ Plus de 712 questions' }).click();

  // Vérifier que l'URL contient "/questions"
  expect(page.url()).toContain('/questions');
  await page.waitForSelector('text=Retour Toutes les questions');
  await expect(page.locator('text=Retour Toutes les questions')).toBeVisible();
});


test('Should search questions', async ({ page }) => {
  await page.goto('https://rubrr.s3-main.oktopod.app/questions');
  
  // Entrer un terme de recherche
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('ssh');
  await page.getByRole('button', { name: 'Rechercher' }).click();

  // Cliquer sur un des résultats
  await page.getByRole('row', { name: 'Le port SSH est le 22, selon' }).getByRole('link').click();

  // Vue d'une question
  await expect(page.getByText('RUBRR Liste des questions Retour Le port SSH est le 22, selon vous, faudrait t’')).toBeVisible();
});