import { test, expect } from '@playwright/test';

test.describe('Flujo completo del sistema de inventario', () => {
  test('crear categoría y producto reales - VERSIÓN 100% INFALIBLE', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const categoria = 'Lácteos';
    const producto = 'Leche Deslactosada Alpina';
    const precio = '4500';
    const stock = '48';

    // 1. Crear categoría (aunque ya exista)
    await page.getByRole('button', { name: 'Categorías' }).click();
    await page.fill('input[placeholder="Nombre de la nueva categoría"]', categoria);
    await page.getByRole('button', { name: 'Crear Categoría' }).click();

    // 2. Ir a Productos
    await page.getByRole('button', { name: 'Productos' }).click();

    // 3. Esperar que la categoría esté en el select (aunque no sea visible)
    await expect(page.locator('select option').filter({ hasText: categoria })).toBeAttached({ timeout: 10000 });

    // 4. Crear el producto bonito
    await page.fill('input[placeholder="Nombre del producto"]', producto);
    await page.fill('input[placeholder="Descripción (opcional)"]', '1 litro, deslactosada, marca Alpina');
    await page.fill('input[placeholder="Precio"]', precio);
    await page.fill('input[placeholder="Stock inicial"]', stock);
    await page.selectOption('select', { label: categoria });
    await page.getByRole('button', { name: 'Guardar Producto' }).click();

    // 5. Verificaciones 100% estables (evitamos duplicados)
    await expect(page.getByRole('heading', { name: producto })).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('$4500.00')).toBeVisible();
    await expect(page.getByText('Stock: 48 und')).toBeVisible();

    // Para la categoría: usamos el que está dentro de la tarjeta del producto
    await expect(
      page.getByRole('heading', { name: producto })
          .locator('..')
          .locator('..')
          .getByText(categoria)
    ).toBeVisible();

    console.log('TEST E2E COMPLETADO CON ÉXITO');
    console.log('Producto creado: Leche Deslactosada Alpina - $4500.00');
  });
});