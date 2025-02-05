// testinomials-home
document.addEventListener("DOMContentLoaded", function () {
  let currentIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dots span');

  function showTestimonial(index) {
      if (!testimonials[currentIndex] || !dots[currentIndex]) return;
      testimonials[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
  }

  function showNextTestimonial() {
      if (testimonials.length === 0) return;
      const nextIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(nextIndex);
  }

  setInterval(showNextTestimonial, 3000);
});


// like and cart

document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".btn-outline-danger");
  const cartButtons = document.querySelectorAll(".btn-primary");

  function getLikedItems() {
    return JSON.parse(localStorage.getItem("likedItems")) || [];
  }

  function saveLikedItems(items) {
    localStorage.setItem("likedItems", JSON.stringify(items));
  }

  function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  }

  function saveCartItems(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  function updateLikeIcons() {
    const likedItems = getLikedItems();
    document.querySelectorAll(".btn-outline-danger").forEach(button => {
      const card = button.closest(".card");
      const productId = card.querySelector(".card-title").innerText;
      const icon = button.querySelector("i");

      if (likedItems.some(item => item.id === productId)) {
        icon.classList.remove("far");
        icon.classList.add("fas", "text-danger");
      } else {
        icon.classList.remove("fas", "text-danger");
        icon.classList.add("far");
      }
    });
  }

  function updateCartButtons() {
    const cartItems = getCartItems();
    document.querySelectorAll(".btn-primary").forEach(button => {
      const card = button.closest(".card");
      const productId = card.querySelector(".card-title").innerText;

      if (cartItems.some(item => item.id === productId)) {
        button.innerText = "Added";
        button.disabled = true;
      } else {
        button.innerText = "Add to Cart";
        button.disabled = false;
      }
    });
  }

  function toggleLike(button, card) {
    const likedItems = getLikedItems();
    const productId = card.querySelector(".card-title").innerText;
    const productImage = card.querySelector(".card-img-top").src;
    const productPrice = card.querySelector(".card-text").innerText;
    const icon = button.querySelector("i");

    const existingIndex = likedItems.findIndex(item => item.id === productId);

    if (existingIndex === -1) {
      likedItems.push({ id: productId, image: productImage, price: productPrice });
      icon.classList.remove("far");
      icon.classList.add("fas", "text-danger");
    } else {
      likedItems.splice(existingIndex, 1);
      icon.classList.remove("fas", "text-danger");
      icon.classList.add("far");
    }

    saveLikedItems(likedItems);
  }

  function toggleCart(button, card) {
    let cartItems = getCartItems();
    const productId = card.querySelector(".card-title").innerText;
    const productImage = card.querySelector(".card-img-top").src;
    let productPrice = card.querySelector(".card-text").innerText.match(/\d+/g); // Extract numbers

    if (!productPrice) {
        console.error("Error: Unable to extract price for", productId);
        return;
    }

    productPrice = parseFloat(productPrice.join("")); // Convert to float

    let existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id: productId, image: productImage, price: `Rs. ${productPrice}`, quantity: 1 });
    }

    saveCartItems(cartItems);
    button.innerText = "Added";
    button.disabled = true;
}

  function updateShopPageCartButton(productId) {
    const cartItems = getCartItems();
    const shopCartButtons = document.querySelectorAll(".btn-primary");

    shopCartButtons.forEach(button => {
      const card = button.closest(".card");
      const shopProductId = card.querySelector(".card-title").innerText;

      if (shopProductId === productId) {
        if (cartItems.some(item => item.id === productId)) {
          button.innerText = "Added";
          button.disabled = true;
        } else {
          button.innerText = "Add to Cart";
          button.disabled = false;
        }
      }
    });
  }

  function updateLikedPageCartButton(productId) {
    const cartItems = getCartItems();
    const likedCartButtons = document.querySelectorAll(".add-to-cart");

    likedCartButtons.forEach(button => {
      const card = button.closest(".card");
      const likedProductId = card.querySelector(".card-title").innerText;

      if (likedProductId === productId) {
        if (cartItems.some(item => item.id === productId)) {
          button.innerText = "Added";
          button.disabled = true;
        } else {
          button.innerText = "Add to Cart";
          button.disabled = false;
        }
      }
    });
  }

  function loadLikedItems() {
    const likedItems = getLikedItems();
    const likedPage = document.getElementById("liked-items");

    if (likedPage) {
      likedPage.innerHTML = ""; 
      likedItems.forEach(item => {
        const cardHTML = `
          <div class="col-12 col-sm-6 col-lg-3 mb-4">
            <div class="card shadow">
              <img src="${item.image}" class="card-img-top" alt="${item.id}">
              <div class="card-body text-center">
                <h5 class="card-title">${item.id}</h5>
                <p class="card-text">${item.price}</p>
                <div class="d-flex justify-content-between">
                  <button class="btn btn-outline-danger liked-btn">
                    <i class="fas fa-heart text-danger"></i>
                  </button>
                  <button class="btn btn-primary add-to-cart">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        `;
        likedPage.insertAdjacentHTML("beforeend", cardHTML);
      });

      document.querySelectorAll(".liked-btn").forEach(button => {
        button.addEventListener("click", function () {
          const card = this.closest(".card");
          toggleLike(this, card);
          card.parentElement.remove();
        });
      });

      document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
          const card = this.closest(".card");
          toggleCart(this, card);
        });
      });
    }
  }

  function loadCartItems() {
    const cartItems = getCartItems();
    const cartPage = document.getElementById("cart-items");

    if (cartPage) {
      cartPage.innerHTML = "";
      cartItems.forEach(item => {
        const cardHTML = `
          <div class="col-12 col-sm-6 col-lg-3 mb-4">
            <div class="card shadow">
              <img src="${item.image}" class="card-img-top" alt="${item.id}">
              <div class="card-body text-center">
                <h5 class="card-title">${item.id}</h5>
                <p class="card-text">${item.price}</p>
                <button class="btn btn-danger remove-cart">Remove</button>
              </div>
            </div>
          </div>
        `;
        cartPage.insertAdjacentHTML("beforeend", cardHTML);
      });

      document.querySelectorAll(".remove-cart").forEach(button => {
        button.addEventListener("click", function () {
          const card = this.closest(".card");
          const productId = card.querySelector(".card-title").innerText;
          let cartItems = getCartItems();

          cartItems = cartItems.filter(item => item.id !== productId);
          saveCartItems(cartItems);
          card.parentElement.remove();
          updateCartButtons();
        });
      });
    }
  }

  likeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      toggleLike(this, card);
    });
  });

  cartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      toggleCart(this, card);
    });
  });

  updateLikeIcons();
  updateCartButtons();
  loadLikedItems();
  loadCartItems();
});
