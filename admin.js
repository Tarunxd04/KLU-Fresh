/* ===========================================================
   KLU FRESH — ADMIN MODULE (admin.js)
   -----------------------------------------------------------
   Handles Admin features & route protection:
   - Route guard: verifies admin authentication before rendering
   - Dashboard metrics (Revenue, Orders, Low Stock, Users)
   - Product Catalog CRUD (Add, Edit, Delete, Stock update)
   - Order fulfillment & status updates
   - Registered customer accounts view
   - Admin logout and navigation
=========================================================== */

/* ---------------------------------------------------------
   1. ROUTE GUARD (IMMEDIATE PROTECTION)
--------------------------------------------------------- */
(function enforceAdminProtection() {
  if (!isAdminAuthenticated()) {
    window.location.replace("index.html");
  }
})();

/* ---------------------------------------------------------
   2. STORAGE KEYS & DEFAULT DATA
--------------------------------------------------------- */
const ADMIN_STORAGE_KEYS = {
  PRODUCTS: "grocery_products",
  ORDERS: "grocery_orders",
  USERS: "grocery_users"
};

const DEFAULT_ADMIN_PRODUCTS = [
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

let adminProducts = [];
let adminOrders = [];

/* ---------------------------------------------------------
   3. PERSISTENCE HELPERS
--------------------------------------------------------- */
function migrateAdminProducts(storedList) {
  if (!Array.isArray(storedList) || storedList.length === 0) {
    return [...DEFAULT_ADMIN_PRODUCTS];
  }

  let cleaned = storedList.filter(p => p.category !== "Beverages" && p.category !== "Household");

  cleaned = cleaned.map(p => {
    if (p.name === "Fresh Tomatoes" || p.name === "Fresh Tomato") {
      return {
        ...p,
        name: "Tomato",
        category: "Vegetables",
        image: "Images/Tomato.jpg",
        emoji: "🍅"
      };
    }
    if (p.category === "Fruits & Vegetables") {
      const fruitNames = ["Avocado", "Mango", "Kiwi", "Grape", "Guava"];
      p.category = fruitNames.includes(p.name) ? "Fruits" : "Vegetables";
    }
    return p;
  });

  const validCategories = ["Fruits", "Vegetables", "Dairy", "Snacks", "Staples", "Personal Care", "Protein"];
  const finalProducts = [];

  DEFAULT_ADMIN_PRODUCTS.forEach(def => {
    const existing = cleaned.find(p => p.name.toLowerCase() === def.name.toLowerCase());
    if (existing) {
      finalProducts.push({
        ...def,
        stock: typeof existing.stock === "number" ? existing.stock : def.stock,
        price: existing.price || def.price,
        original: existing.original || def.original,
        image: def.image,
        category: def.category
      });
    } else {
      finalProducts.push({ ...def });
    }
  });

  cleaned.forEach(p => {
    const isDefault = DEFAULT_ADMIN_PRODUCTS.some(def => def.name.toLowerCase() === p.name.toLowerCase());
    if (!isDefault && validCategories.includes(p.category)) {
      finalProducts.push(p);
    }
  });

  return finalProducts;
}

function loadAdminData() {
  try {
    const rawProd = localStorage.getItem(ADMIN_STORAGE_KEYS.PRODUCTS);
    if (!rawProd) {
      adminProducts = [...DEFAULT_ADMIN_PRODUCTS];
      localStorage.setItem(ADMIN_STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
    } else {
      const parsed = JSON.parse(rawProd);
      adminProducts = migrateAdminProducts(parsed);
      localStorage.setItem(ADMIN_STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
    }
  } catch (e) {
    adminProducts = [...DEFAULT_ADMIN_PRODUCTS];
  }

  try {
    const rawOrders = localStorage.getItem(ADMIN_STORAGE_KEYS.ORDERS);
    if (!rawOrders) {
      adminOrders = [
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
      localStorage.setItem(ADMIN_STORAGE_KEYS.ORDERS, JSON.stringify(adminOrders));
    } else {
      const parsed = JSON.parse(rawOrders);
      if (Array.isArray(parsed)) {
        adminOrders = parsed.map(order => {
          if (order.items && Array.isArray(order.items)) {
            order.items = order.items.map(it => {
              if (it.name === "Fresh Tomatoes" || it.name === "Fresh Tomato") {
                return { ...it, name: "Tomato", emoji: "🍅", image: "Images/Tomato.jpg" };
              }
              return it;
            });
          }
          return order;
        });
        localStorage.setItem(ADMIN_STORAGE_KEYS.ORDERS, JSON.stringify(adminOrders));
      } else {
        adminOrders = [];
      }
    }
  } catch (e) {
    adminOrders = [];
  }
}

function saveAdminProducts() {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEYS.PRODUCTS, JSON.stringify(adminProducts));
  } catch (e) {
    console.warn("Could not save products", e);
  }
}

function saveAdminOrders() {
  try {
    localStorage.setItem(ADMIN_STORAGE_KEYS.ORDERS, JSON.stringify(adminOrders));
  } catch (e) {
    console.warn("Could not save orders", e);
  }
}

function findAdminProduct(id) {
  return adminProducts.find(p => p.id === Number(id));
}

function formatPrice(n) { return "₹" + Math.round(n); }

function stockInfo(stock) {
  if (stock === 0) return { label: "Out of Stock", cls: "stock-out" };
  if (stock <= 3) return { label: `Only ${stock} left`, cls: "stock-low" };
  return { label: "In Stock", cls: "stock-in" };
}

function showAdminToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showAdminToast._timer);
  showAdminToast._timer = setTimeout(() => toast.classList.remove("show"), 2500);
}

/* ---------------------------------------------------------
   4. TAB SWITCHING
--------------------------------------------------------- */
function switchAdminTab(tabName) {
  document.querySelectorAll(".admin-nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });
  document.querySelectorAll(".admin-tab-pane").forEach(pane => {
    pane.classList.toggle("active", pane.id === `tab-${tabName}`);
  });

  if (tabName === "admin-dashboard") renderAdminDashboard();
  else if (tabName === "admin-products") renderAdminProductsTable();
  else if (tabName === "admin-orders") renderAdminOrdersTable();
  else if (tabName === "admin-users") renderAdminUsersTable();
}

/* ---------------------------------------------------------
   5. DASHBOARD OVERVIEW
--------------------------------------------------------- */
function renderAdminDashboard() {
  loadAdminData();

  const totalRevenue = adminOrders
    .filter(o => o.status !== "Cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrders = adminOrders.filter(o => o.status === "Placed" || o.status === "Processing").length;
  const lowStockCount = adminProducts.filter(p => p.stock <= 3).length;
  const storedUsers = getStoredUsers();

  const revEl = document.getElementById("adminStatRevenue");
  const ordEl = document.getElementById("adminStatOrders");
  const pendEl = document.getElementById("adminStatPendingOrders");
  const prodEl = document.getElementById("adminStatProducts");
  const lowEl = document.getElementById("adminStatLowStock");
  const usrEl = document.getElementById("adminStatUsers");
  const badgeEl = document.getElementById("adminOrdersBadge");

  if (revEl) revEl.textContent = formatPrice(totalRevenue);
  if (ordEl) ordEl.textContent = adminOrders.length;
  if (pendEl) pendEl.textContent = `${pendingOrders} active / pending`;
  if (prodEl) prodEl.textContent = adminProducts.length;
  if (lowEl) lowEl.textContent = `${lowStockCount} low in stock`;
  if (usrEl) usrEl.textContent = storedUsers.length;
  if (badgeEl) badgeEl.textContent = adminOrders.length;

  // Render recent 5 orders
  const tbody = document.getElementById("adminRecentOrdersBody");
  if (!tbody) return;
  const recent = adminOrders.slice(0, 5);

  if (recent.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--gray-text);">No customer orders yet</td></tr>`;
    return;
  }

  tbody.innerHTML = recent.map(o => {
    let statusCls = `status-${o.status.toLowerCase().replace(/\s+/g, '-')}`;
    return `
      <tr>
        <td><strong>#${o.id}</strong></td>
        <td>${o.customerName}<br><span style="font-size:11px; color:var(--gray-text);">${o.customerEmail || ""}</span></td>
        <td>${o.items.length} item(s)</td>
        <td><strong>${formatPrice(o.total)}</strong></td>
        <td>${o.slot}</td>
        <td><span class="status-badge ${statusCls}">${o.status}</span></td>
        <td>
          <select class="status-select-sm" data-order-id="${o.id}">
            ${["Placed", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map(s => `
              <option value="${s}" ${o.status === s ? "selected" : ""}>${s}</option>
            `).join("")}
          </select>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll(".status-select-sm").forEach(sel => {
    sel.addEventListener("change", (e) => changeOrderStatus(sel.dataset.orderId, e.target.value));
  });
}

/* ---------------------------------------------------------
   6. PRODUCT CATALOG MANAGEMENT
--------------------------------------------------------- */
function renderAdminProductsTable() {
  loadAdminData();
  const tbody = document.getElementById("adminProductsTableBody");
  if (!tbody) return;

  const search = (document.getElementById("adminProductSearch")?.value || "").toLowerCase().trim();
  const catFilter = document.getElementById("adminProductCatFilter")?.value || "all";

  let list = adminProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    const matchesCat = catFilter === "all" || p.category === catFilter;
    return matchesSearch && matchesCat;
  });

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:var(--gray-text); padding:30px;">No products match criteria</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => {
    const stock = stockInfo(p.stock);
    return `
      <tr>
        <td>
          ${p.image ? `<img src="${p.image}" class="table-img" alt="${p.name}">` : `<span class="table-thumb">${p.emoji || "🛒"}</span>`}
        </td>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td>${p.qty || "1 unit"}</td>
        <td><strong>${formatPrice(p.price)}</strong></td>
        <td>${p.original ? formatPrice(p.original) : "—"}</td>
        <td>
          <span class="product-stock ${stock.cls}">${p.stock} units</span>
        </td>
        <td>
          <button class="action-icon-btn btn-stock-inc" data-id="${p.id}" title="Add 5 Stock">+5</button>
          <button class="action-icon-btn btn-edit-product" data-id="${p.id}" title="Edit Product">✏️</button>
          <button class="action-icon-btn btn-delete btn-delete-product" data-id="${p.id}" title="Delete Product">🗑️</button>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll(".btn-stock-inc").forEach(btn => {
    btn.addEventListener("click", () => {
      const p = findAdminProduct(btn.dataset.id);
      if (p) {
        p.stock += 5;
        saveAdminProducts();
        renderAdminProductsTable();
        renderAdminDashboard();
        showAdminToast(`Stock updated for ${p.name}`);
      }
    });
  });

  tbody.querySelectorAll(".btn-edit-product").forEach(btn => {
    btn.addEventListener("click", () => openAdminEditProductModal(Number(btn.dataset.id)));
  });

  tbody.querySelectorAll(".btn-delete-product").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const p = findAdminProduct(id);
      if (p && confirm(`Are you sure you want to delete "${p.name}" from catalog?`)) {
        adminProducts = adminProducts.filter(x => x.id !== id);
        saveAdminProducts();
        renderAdminProductsTable();
        renderAdminDashboard();
        showAdminToast("Product deleted from catalog");
      }
    });
  });
}

function openAdminAddProductModal() {
  document.getElementById("adminProductModalTitle").textContent = "Add New Product";
  document.getElementById("adminEditProductId").value = "";
  document.getElementById("adminProductForm").reset();
  document.getElementById("adminProductModal").classList.add("open");
  document.getElementById("adminProductOverlay").classList.add("active");
}

function openAdminEditProductModal(id) {
  const p = findAdminProduct(id);
  if (!p) return;
  document.getElementById("adminProductModalTitle").textContent = "Edit Product";
  document.getElementById("adminEditProductId").value = p.id;
  document.getElementById("adminProdName").value = p.name;
  document.getElementById("adminProdCategory").value = p.category;
  document.getElementById("adminProdQty").value = p.qty || "";
  document.getElementById("adminProdPrice").value = p.price;
  document.getElementById("adminProdOriginal").value = p.original || p.price;
  document.getElementById("adminProdStock").value = p.stock;
  document.getElementById("adminProdEmoji").value = p.emoji || "";
  document.getElementById("adminProdImage").value = p.image || "";

  document.getElementById("adminProductModal").classList.add("open");
  document.getElementById("adminProductOverlay").classList.add("active");
}

function closeAdminProductModal() {
  document.getElementById("adminProductModal")?.classList.remove("open");
  document.getElementById("adminProductOverlay")?.classList.remove("active");
}

function handleSaveAdminProduct(e) {
  e.preventDefault();
  const idVal = document.getElementById("adminEditProductId").value;
  const name = document.getElementById("adminProdName").value.trim();
  const category = document.getElementById("adminProdCategory").value;
  const qty = document.getElementById("adminProdQty").value.trim();
  const price = Number(document.getElementById("adminProdPrice").value);
  const original = Number(document.getElementById("adminProdOriginal").value) || price;
  const stock = Number(document.getElementById("adminProdStock").value);
  const emoji = document.getElementById("adminProdEmoji").value.trim() || "🛒";
  const image = document.getElementById("adminProdImage").value.trim();

  if (!name || price <= 0) {
    showAdminToast("Please enter valid product name and price");
    return;
  }

  if (idVal) {
    const p = findAdminProduct(idVal);
    if (p) {
      p.name = name;
      p.category = category;
      p.qty = qty;
      p.price = price;
      p.original = original;
      p.stock = stock;
      p.emoji = emoji;
      p.image = image || undefined;
      showAdminToast(`✓ Updated ${p.name}`);
    }
  } else {
    const newId = adminProducts.length > 0 ? Math.max(...adminProducts.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: newId,
      name,
      category,
      qty,
      price,
      original,
      stock,
      rating: 4.8,
      emoji,
      image: image || undefined
    };
    adminProducts.push(newProduct);
    showAdminToast(`✓ Added ${newProduct.name} to catalog`);
  }

  saveAdminProducts();
  closeAdminProductModal();
  renderAdminProductsTable();
  renderAdminDashboard();
}

/* ---------------------------------------------------------
   7. CUSTOMER ORDERS & FULFILLMENT
--------------------------------------------------------- */
function renderAdminOrdersTable() {
  loadAdminData();
  const tbody = document.getElementById("adminAllOrdersTableBody");
  if (!tbody) return;

  const statusFilter = document.getElementById("adminOrderStatusFilter")?.value || "all";
  let list = adminOrders;
  if (statusFilter !== "all") {
    list = list.filter(o => o.status === statusFilter);
  }

  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--gray-text); padding:30px;">No customer orders found</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(o => {
    const dateFormatted = new Date(o.createdAt).toLocaleDateString("en-IN", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
    return `
      <tr>
        <td>
          <strong>#${o.id}</strong><br>
          <span style="font-size:11px; color:var(--gray-text);">${dateFormatted}</span><br>
          <span style="font-size:11px; font-weight:600; color:var(--dark-green);">Slot: ${o.slot}</span>
        </td>
        <td>
          <strong>${o.customerName}</strong><br>
          <span style="font-size:11.5px; color:var(--gray-text);">${o.customerEmail || ""}</span><br>
          <span style="font-size:11.5px; color:var(--gray-text);">📞 ${o.phone || "N/A"}</span>
        </td>
        <td style="max-width:200px;">${o.address}, ${o.city} - ${o.pincode}</td>
        <td>
          <div style="font-size:12px; line-height:1.4;">
            ${o.items.map(it => `<div>${it.emoji || "🛒"} ${it.name} &times; ${it.qty}</div>`).join("")}
          </div>
        </td>
        <td><span class="role-badge">${o.paymentMethod || "COD"}</span></td>
        <td><strong>${formatPrice(o.total)}</strong></td>
        <td>
          <select class="status-select-sm" data-order-id="${o.id}">
            ${["Placed", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map(s => `
              <option value="${s}" ${o.status === s ? "selected" : ""}>${s}</option>
            `).join("")}
          </select>
        </td>
      </tr>
    `;
  }).join("");

  tbody.querySelectorAll(".status-select-sm").forEach(sel => {
    sel.addEventListener("change", (e) => changeOrderStatus(sel.dataset.orderId, e.target.value));
  });
}

function changeOrderStatus(orderId, newStatus) {
  const order = adminOrders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveAdminOrders();
    renderAdminDashboard();
    renderAdminOrdersTable();
    showAdminToast(`Order #${orderId} status updated to "${newStatus}"`);
  }
}

/* ---------------------------------------------------------
   8. REGISTERED USERS TABLE
--------------------------------------------------------- */
function renderAdminUsersTable() {
  const tbody = document.getElementById("adminUsersTableBody");
  if (!tbody) return;

  const usersList = [
    {
      id: "admin_001",
      name: "Store Administrator",
      email: "admin@klufresh.com",
      role: "admin",
      createdAt: "System Admin"
    },
    ...getStoredUsers()
  ];

  tbody.innerHTML = usersList.map(u => {
    const userOrdersCount = adminOrders.filter(o => o.userId === u.id || o.customerEmail === u.email).length;
    const isAdm = u.role === "admin";
    const dateFormatted = u.createdAt === "System Admin" ? "System Admin" : (u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN", {
      month: "short", day: "numeric", year: "numeric"
    }) : "Recently");

    return `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td>
          <span class="role-badge ${isAdm ? 'admin-role' : ''}">
            ${isAdm ? '🛡️ Store Admin' : '👤 Customer'}
          </span>
        </td>
        <td>${dateFormatted}</td>
        <td><strong>${isAdm ? '—' : `${userOrdersCount} orders`}</strong></td>
      </tr>
    `;
  }).join("");
}

/* ---------------------------------------------------------
   9. ADMIN LOGOUT & ACTIONS
--------------------------------------------------------- */
function handleAdminLogout() {
  adminLogout();
  showAdminToast("Admin logged out successfully 👋");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 400);
}

/* ---------------------------------------------------------
   10. EVENT LISTENERS
--------------------------------------------------------- */
function setupAdminEvents() {
  document.getElementById("adminLogoHome")?.addEventListener("click", () => switchAdminTab("admin-dashboard"));
  document.getElementById("adminBackToStoreBtn")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  document.getElementById("adminLogoutBtn")?.addEventListener("click", handleAdminLogout);

  document.querySelectorAll(".admin-nav-item").forEach(item => {
    item.addEventListener("click", () => switchAdminTab(item.dataset.tab));
  });

  document.getElementById("viewAllOrdersLink")?.addEventListener("click", () => switchAdminTab("admin-orders"));

  // Product CRUD Events (Manual click only)
  document.getElementById("adminAddNewProductBtn")?.addEventListener("click", openAdminAddProductModal);
  document.getElementById("adminAddNewProductBtnDash")?.addEventListener("click", openAdminAddProductModal);
  document.getElementById("closeAdminProductModal")?.addEventListener("click", closeAdminProductModal);
  document.getElementById("cancelAdminProductBtn")?.addEventListener("click", closeAdminProductModal);
  document.getElementById("adminProductOverlay")?.addEventListener("click", closeAdminProductModal);
  document.getElementById("adminProductForm")?.addEventListener("submit", handleSaveAdminProduct);

  document.getElementById("adminProductSearch")?.addEventListener("input", renderAdminProductsTable);
  document.getElementById("adminProductCatFilter")?.addEventListener("change", renderAdminProductsTable);
  document.getElementById("adminOrderStatusFilter")?.addEventListener("change", renderAdminOrdersTable);
}

/* ---------------------------------------------------------
   11. ADMIN MODULE INITIALIZATION
--------------------------------------------------------- */
function initAdminModule() {
  if (!isAdminAuthenticated()) {
    window.location.replace("index.html");
    return;
  }

  loadAdminData();
  renderAdminDashboard();
  renderAdminProductsTable();
  renderAdminOrdersTable();
  renderAdminUsersTable();
  setupAdminEvents();
  // NOTE: openAdminAddProductModal is INTENTIONALLY NOT called automatically!
}

document.addEventListener("DOMContentLoaded", initAdminModule);
