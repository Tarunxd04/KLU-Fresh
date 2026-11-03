export const DEFAULT_PRODUCTS = [
  // --- 1. FRUITS ---
  { id: 101, name: "Avocado",       category: "Fruits",        qty: "500 g (2 pcs)", price: 180, original: 220, rating: 4.6, emoji: "🥑", image: "Images/Avocado.jpg", stock: 15 },
  { id: 102, name: "Mango",         category: "Fruits",        qty: "1 kg",          price: 150, original: 190, rating: 4.8, emoji: "🥭", image: "Images/Mango.jpg", stock: 20 },
  { id: 103, name: "Kiwi",          category: "Fruits",        qty: "3 pcs",         price: 95,  original: 120, rating: 4.5, emoji: "🥝", image: "Images/Kiwi.jpg", stock: 18 },
  { id: 104, name: "Grape",         category: "Fruits",        qty: "500 g",         price: 70,  original: 90,  rating: 4.6, emoji: "🍇", image: "Images/Grape.jpg", stock: 22 },
  { id: 105, name: "Guava",         category: "Fruits",        qty: "1 kg",          price: 60,  original: 80,  rating: 4.4, emoji: "🍈", image: "Images/Guava.jpg", stock: 16 },

  // --- 2. VEGETABLES ---
  { id: 106, name: "Carrot",        category: "Vegetables",    qty: "500 g",         price: 35,  original: 45,  rating: 4.5, emoji: "🥕", image: "Images/Carrot.jpg", stock: 25 },
  { id: 107, name: "Mushroom",      category: "Vegetables",    qty: "200 g",         price: 50,  original: 65,  rating: 4.6, emoji: "🍄", image: "Images/Mushroom.jpg", stock: 14 },
  { id: 108, name: "Onions",        category: "Vegetables",    qty: "1 kg",          price: 40,  original: 50,  rating: 4.4, emoji: "🧅", image: "Images/Onions.jpg", stock: 30 },
  { id: 109, name: "Sweet Potato",  category: "Vegetables",    qty: "1 kg",          price: 55,  original: 70,  rating: 4.3, emoji: "🍠", image: "Images/Sweet Potato.jpg", stock: 12 },
  { id: 110, name: "Corn",          category: "Vegetables",    qty: "2 pcs",         price: 30,  original: 40,  rating: 4.5, emoji: "🌽", image: "Images/Corn.jpg", stock: 20 },
  { id: 1,   name: "Tomato",        category: "Vegetables",    qty: "1 kg",          price: 45,  original: 60,  rating: 4.5, emoji: "🍅", image: "Images/Tomato.jpg", stock: 20 },

  // --- 3. DAIRY ---
  { id: 111, name: "Cheese",        category: "Dairy",         qty: "200 g",         price: 120, original: 140, rating: 4.7, emoji: "🧀", image: "Images/Cheese.jpg", stock: 15 },
  { id: 112, name: "Yogurt",        category: "Dairy",         qty: "400 g",         price: 45,  original: 55,  rating: 4.5, emoji: "🥣", image: "Images/Yogurt.jpg", stock: 20 },
  { id: 113, name: "Butter",        category: "Dairy",         qty: "500 g",         price: 260, original: 285, rating: 4.8, emoji: "🧈", image: "Images/Butter.jpg", stock: 18 },

  // --- 4. SNACKS ---
  { id: 114, name: "Lays Chips",    category: "Snacks",        qty: "90 g",          price: 20,  original: 25,  rating: 4.5, emoji: "🍟", image: "Images/Lays Chips.jpg", stock: 35 },
  { id: 115, name: "Popcorn",       category: "Snacks",        qty: "150 g",         price: 65,  original: 80,  rating: 4.4, emoji: "🍿", image: "Images/Popcorn.jpg", stock: 25 },
  { id: 116, name: "Biscuits",      category: "Snacks",        qty: "300 g",         price: 40,  original: 50,  rating: 4.6, emoji: "🍪", image: "Images/Biscuits.jpg", stock: 30 },
  { id: 117, name: "Ice Cream",     category: "Snacks",        qty: "700 ml",        price: 180, original: 220, rating: 4.8, emoji: "🍨", image: "Images/Ice Cream.jpg", stock: 12 },
  { id: 118, name: "Peanut Nuts",   category: "Snacks",        qty: "200 g",         price: 55,  original: 70,  rating: 4.5, emoji: "🥜", image: "Images/Peanut Nuts.jpg", stock: 24 },

  // --- 5. STAPLES ---
  { id: 119, name: "Atta",          category: "Staples",       qty: "5 kg",          price: 235, original: 275, rating: 4.7, emoji: "🌾", image: "Images/Atta.jpg", stock: 20 },
  { id: 120, name: "Salt",          category: "Staples",       qty: "1 kg",          price: 25,  original: 30,  rating: 4.6, emoji: "🧂", image: "Images/Salt.jpg", stock: 40 },
  { id: 121, name: "Turmeric",      category: "Staples",       qty: "200 g",         price: 48,  original: 60,  rating: 4.5, emoji: "🫙", image: "Images/Turmeric.jpg", stock: 28 },
  { id: 11,  name: "Cooking Oil",   category: "Staples",       qty: "1 L",           price: 145, original: 165, rating: 4.4, emoji: "🛢️", image: "Images/Cooking Oil.jpg", stock: 18 },

  // --- 6. PERSONAL CARE ---
  { id: 122, name: "Shampoo",       category: "Personal Care", qty: "340 ml",        price: 220, original: 260, rating: 4.6, emoji: "🧴", image: "Images/Shampoo.jpg", stock: 16 },
  { id: 123, name: "Conditioner",   category: "Personal Care", qty: "180 ml",        price: 190, original: 230, rating: 4.5, emoji: "🧴", image: "Images/Conditioner.jpg", stock: 14 },
  { id: 124, name: "Moisturizer",   category: "Personal Care", qty: "200 ml",        price: 210, original: 250, rating: 4.6, emoji: "🧴", image: "Images/Moisturizer.jpg", stock: 15 },
  { id: 125, name: "Soap",          category: "Personal Care", qty: "125 g (Pack of 3)", price: 110, original: 135, rating: 4.5, emoji: "🧼", image: "Images/Soap.jpg", stock: 25 },
  { id: 126, name: "Deodorant",     category: "Personal Care", qty: "150 ml",        price: 195, original: 240, rating: 4.7, emoji: "✨", image: "Images/Deodorant.jpg", stock: 20 },
  { id: 127, name: "Hair Oil",      category: "Personal Care", qty: "200 ml",        price: 130, original: 160, rating: 4.5, emoji: "💧", image: "Images/Hair Oil.jpg", stock: 18 },

  // --- 7. PROTEIN ---
  { id: 128, name: "Creatine",      category: "Protein",       qty: "250 g",         price: 799, original: 999, rating: 4.8, emoji: "⚡", image: "Images/Creatine.jpg", stock: 15 },
  { id: 18,  name: "Protein Powder",category: "Protein",       qty: "1 kg",          price: 1035,original: 1200, rating: 4.7, emoji: "🥣", image: "Images/Protein Powder.jpg", stock: 12 },
  { id: 129, name: "Mass Gainer",   category: "Protein",       qty: "1 kg",          price: 1250,original: 1500, rating: 4.6, emoji: "💪", image: "Images/Mass Gainer.jpg", stock: 10 },
  { id: 130, name: "Eggs",          category: "Protein",       qty: "12 pcs",        price: 85,  original: 96,  rating: 4.8, emoji: "🥚", image: "Images/Eggs.jpg", stock: 30 },
  { id: 131, name: "Oats",          category: "Protein",       qty: "1 kg",          price: 160, original: 190, rating: 4.6, emoji: "🥣", image: "Images/Oats.jpg", stock: 22 },
  { id: 17,  name: "Chicken Breast",category: "Protein",       qty: "500 g",         price: 250, original: 300, rating: 4.7, emoji: "🍗", image: "Images/Chicken Breast.jpg", stock: 14 },
  { id: 132, name: "Whole Chicken", category: "Protein",       qty: "1 kg",          price: 280, original: 340, rating: 4.6, emoji: "🍗", image: "Images/Whole Chicken.jpg", stock: 10 },
  { id: 133, name: "Mutton Legs",   category: "Protein",       qty: "1 kg",          price: 780, original: 850, rating: 4.7, emoji: "🥩", image: "Images/Mutton Legs.jpg", stock: 8 },
  { id: 134, name: "Whole Mutton",  category: "Protein",       qty: "1 kg",          price: 750, original: 820, rating: 4.6, emoji: "🥩", image: "Images/Whole Mutton.jpg", stock: 8 }
];

export const DEFAULT_ORDERS = [
  {
    id: "KLF20268831",
    userId: "sample_user",
    customerName: "Rahul Sharma",
    customerEmail: "rahul@example.com",
    phone: "9876543210",
    address: "Flat 402, Green Meadows, Vaddeswaram",
    city: "Vijayawada",
    pincode: "522502",
    slot: "10 AM – 12 PM",
    paymentMethod: "UPI",
    items: [
      { id: 1, name: "Tomato", qty: 2, price: 45, emoji: "🍅", image: "Images/Tomato.jpg" },
      { id: 111, name: "Cheese", qty: 1, price: 120, emoji: "🧀", image: "Images/Cheese.jpg" }
    ],
    subtotal: 210,
    discount: 21,
    total: 189,
    status: "Out for Delivery",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];
