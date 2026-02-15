## Component Architecture - Product Catalog (Enabled by Atomic Design Principles)

This hierarchy applies Atomic Design Methodology principles to the existing product catalog feature, demonstrating how UI elements interactions compose the full catalog.

---

## Atoms (Smallest Building Blocks)
- Icons
- Text
- Dropdowns
- Buttoms, embedded buttons
- Price Labels
- Rating Star Visual
- Images of Products
- Search Icon
- Button to clear search, clear cart
- Loader

---

## Molecules (Groups Of Atoms)
- Search Bar
  - Inputs + Clear Button
- Sort Dropdown
  - Dropdown + Labels
- Rating Display
  - Rating Star Visuals + Text associated with review count
- Add-To-Cart
  - Button + Icon of Cart + Undermining Text
 
---

## Organisms (Complex Components)
- Product Display (grid)
  - All products (icons, text) displayed on main page
- Results Display
  - Product grid (listed above) + adaptable text displaying amount current products
- Loading Page
  - Loader + Loading Icon (changes during process)

---

## Templates (Page Layouts)
- Finalized srarch (full product grid display)
  - Navigation area for cursor
  - Top search bar, with cart icon displayed in corner of screen
  - Icons for expanding page, proceeding to next page + underlying text
  - Area for footer (displaying amount of products on page)


## Summary
This component hiearchy supports the rapid development design system that Buckeye Marketplace will follow.
