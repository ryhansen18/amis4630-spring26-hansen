import { describe, it, expect } from 'vitest'
import { cartReducer, initialState } from '../context/cartReducer'
import type { CartItem } from '../context/cartTypes'

const mockItem: CartItem = {
  cartItemId: 1,
  productId: 1,
  title: 'Test Product',
  price: 50.00,
  imageUrl: '',
  quantity: 2,
}

describe('cartReducer', () => {
  it('SET_CART updates items', () => {
    const state = cartReducer(initialState, { type: 'SET_CART', payload: [mockItem] })
    expect(state.items).toHaveLength(1)
    expect(state.items[0].title).toBe('Test Product')
  })

  it('CLEAR_CART empties items', () => {
    const stateWithItem = cartReducer(initialState, { type: 'SET_CART', payload: [mockItem] })
    const cleared = cartReducer(stateWithItem, { type: 'CLEAR_CART' })
    expect(cleared.items).toHaveLength(0)
  })

  it('initial state has empty items', () => {
    expect(initialState.items).toHaveLength(0)
  })
})