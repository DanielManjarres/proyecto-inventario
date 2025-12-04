import { test, expect } from '@playwright/test';

test.setTimeout(60000);

test.describe('Flujo completo del sistema de inventario', () => {
  test('Crear categoría y producto correctamente en UI real', async ({ page }) => {
    await page.goto('http://localhost:5173');

    const categoria = 'Lácteos ' + Date.now();
    const producto = 'Leche Deslactosada Alpina ' + Date.now();
    const precio = '4500';
    const stock = '48';

    // -----------------------------
    // 1. Crear categoría
    // -----------------------------
    await page.getByRole('button', { name: '+ Nueva Categoría' }).click();
    await page.locator('input[name="name"]').fill(categoria);
    await page.getByRole('button', { name: 'Guardar' }).click();

    await page.waitForLoadState('networkidle');
    await expect(page.getByText(categoria, { exact: true })).toBeVisible();

    // -----------------------------
    // 2. Crear producto
    // -----------------------------
    await page.getByRole('button', { name: '+ Nuevo Producto' }).click();
    await page.locator('input[name="name"]').fill(producto);
    await page.locator('input[name="price"]').fill(precio);
    await page.locator('input[name="stock"]').fill(stock);
    await page.selectOption('select[name="categoryId"]', { label: categoria });
    await page.getByRole('button', { name: 'Guardar' }).click();

    await page.waitForLoadState('networkidle');

    // -----------------------------
    // 3. Verificaciones (CORREGIDAS)
    // -----------------------------
    const fila = page.getByRole('row').filter({ hasText: producto });

    // Precio
    await expect(fila.getByText(/\$?4?500/, { exact: false })).toBeVisible();

    // Stock (EVITA STRICT MODE VIOLATION)
    await expect(fila.getByText(stock, { exact: true })).toBeVisible();

    // Categoría
    await expect(fila.getByText(new RegExp(categoria), { exact: false })).toBeVisible();

    console.log('TEST COMPLETADO, INICIANDO LIMPIEZA...');

    // -----------------------------
    // 4. Limpieza controlada
    // -----------------------------
    await test.step("Eliminar producto y categoría creados", async () => {
      try {
        // PRODUCTO --------------------------
        const filaProducto = page.getByRole('row').filter({ hasText: producto });
        const deleteProdBtn = filaProducto.getByRole('button', { name: 'Eliminar' });

        if (await deleteProdBtn.isVisible().catch(() => false)) {
          await deleteProdBtn.click().catch(() => {});
          await page.getByRole('button', { name: /confirmar/i }).click().catch(() => {});
        }

        await page.waitForLoadState('networkidle').catch(() => {});

        // CATEGORÍA -------------------------
        const filaCategoria = page.getByRole('row').filter({ hasText: categoria });
        const deleteCatBtn = filaCategoria.getByRole('button', { name: 'Eliminar' });

        if (await deleteCatBtn.isVisible().catch(() => false)) {
          await deleteCatBtn.click().catch(() => {});
          await page.getByRole('button', { name: /confirmar/i }).click().catch(() => {});
        }

        await page.waitForLoadState('networkidle').catch(() => {});

        console.log("✔ LIMPIEZA FINALIZADA");

      } catch (error) {
        console.log("⚠ Error en la limpieza (no afecta el test):", error.message);
      }
    });
  });
});
