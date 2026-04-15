import { test, expect } from '@playwright/test'

test('happy path: register, browse, add to cart, checkout, view order', async ({ page }) => {
  const email = `test${Date.now()}@osu.edu`

  // Register
  await page.goto('http://localhost:5173/register')
  await page.fill('input[placeholder="Your name"]', 'Test User')
  await page.fill('input[placeholder="you@osu.edu"]', email)
  await page.fill('input[placeholder="Min 8 chars, 1 uppercase, 1 number"]', 'Password123')
  await page.click('button[type="submit"]')
  await page.waitForURL('http://localhost:5173/')

  // Browse and add to cart
  await page.goto('http://localhost:5173/')
  await page.waitForSelector('button[aria-label*="Add"]')
  await page.click('button[aria-label*="Add"]:first-of-type')
  await page.waitForTimeout(500)

  // Go to cart
  await page.goto('http://localhost:5173/cart')
  await expect(page.locator('text=Your Cart')).toBeVisible()

  // Checkout
  await page.click('text=Proceed to Checkout')
  await page.waitForURL('http://localhost:5173/checkout')
  await page.fill('textarea', '1993 Summit St, Columbus OH 43201')
  await page.click('text=Place Order')

  // Confirmation
  await page.waitForURL('http://localhost:5173/order-confirmation')
  await expect(page.locator('text=Order Confirmed')).toBeVisible()

  // Order history
  await page.click('text=View My Orders')
  await page.waitForURL('http://localhost:5173/orders')
  await expect(page.locator('text=My Orders')).toBeVisible()
})