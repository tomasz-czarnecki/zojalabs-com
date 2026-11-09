/** Catalogue and the runway order. Images live in assets/products and assets/figures. */

const PRODUCTS = {
  "feather-jacket": { name: "Feather Jacket", price: 2900 },
  "satin-trousers": { name: "Satin Wide Leg Trousers", price: 1450 },
  "pleated-dress": { name: "Pleated Dress", price: 2200 },
  "powder-coat": { name: "Powder Long Coat", price: 1980 },
  "ivory-trousers": { name: "Ivory Straight Trousers", price: 690 },
  "ruffle-top": { name: "Sculpted Ruffle Top", price: 1120 },
  "trench-dress": { name: "Satin Trench Dress", price: 2350 },
  "top-handle-bag": { name: "Top Handle Bag", price: 980 },
  "billow-blouse": { name: "Billow Sleeve Blouse", price: 860 },
};

const LOOKS = [
  { number: 15, figure: "feather-jacket", products: ["feather-jacket", "satin-trousers", "pleated-dress"] },
  { number: 16, figure: "green-gown", products: ["pleated-dress", "feather-jacket", "top-handle-bag"] },
  { number: 17, figure: "satin-trench", products: ["trench-dress", "top-handle-bag", "billow-blouse"] },
  { number: 18, figure: "pink-satin", products: ["billow-blouse", "satin-trousers", "top-handle-bag"] },
  { number: 19, figure: "powder-coat", products: ["powder-coat", "ivory-trousers", "ruffle-top"] },
  { number: 20, figure: "ruffle-gown", products: ["ruffle-top", "ivory-trousers", "powder-coat"] },
];
