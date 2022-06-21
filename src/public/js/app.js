console.log("soy el frontend");

//dar conectividad a la webview
/* window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
}); */

//let contenedorPrincProd = document.querySelectorAll(".card");

//funciones

//black code carrito de compras
//loadEventListener();
//function loadEventListener() {

const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCarrito = document.getElementById("template-carrito").content;
const templateFooter = document.getElementById("template-footer").content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito();
  }
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});
document.addEventListener("click", (e) => {
  addCarrito(e);
});

const addCarrito = (e) => {
  //console.log(e.target);
  e.preventDefault();
  if (e.target.classList.contains("btn-primary")) {
    setCarrito(e.target.parentElement);
    //readTheContent(seleccionado);
    //console.log(seleccionado);
  }
  e.stopPropagation();
};

const setCarrito = (objeto) => {
  //console.log(objeto);

  const alert = document.querySelector(".alert");

  setTimeout(function () {
    alert.classList.add("hide");
  }, 2000);
  alert.classList.remove("hide");

  const producto = {
    image: objeto.querySelector(".card img").src,
    title: objeto.querySelector(".card-title").textContent,
    price: objeto.querySelector(".price").textContent,
    productId: objeto.querySelector(".card a").getAttribute("data-id"),
    amount: 1,
  };

  if (carrito.hasOwnProperty(producto.productId)) {
    producto.amount = carrito[producto.productId].amount + 1;
  }

  carrito[producto.productId] = { ...producto };
  pintarCarrito();
};

const pintarCarrito = () => {
  //console.log(carrito);
  items.innerHTML = "";
  Object.values(carrito).forEach((producto) => {
    templateCarrito.querySelector("th").textContent = producto.productId;
    templateCarrito.querySelectorAll(
      "td"
    )[0].textContent = `${producto.title} (${producto.productId})`;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.amount;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.productId;
    templateCarrito.querySelector(".btn-danger").dataset.id =
      producto.productId;
    templateCarrito.querySelector("span").textContent =
      producto.amount * producto.price;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  pintarFooter();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar</th>`;
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { amount }) => acc + amount,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { amount, price }) => acc + amount * price,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  const btnVaciar = document.getElementById("vaciar-carrito");
  btnVaciar.addEventListener("click", () => {
    carrito = {};
    pintarCarrito();
  });

  const btnPagar = document.getElementById("pagar");
  btnPagar.addEventListener("click", () => {
    ventas();
  });

  const ventas = () => {
    console.log("módulo de ventas");
  };
};

const btnAccion = (e) => {
  //console.log(e.target);
  //Acción de aumentar
  if (e.target.classList.contains("btn-info")) {
    //console.log(carrito[e.target.dataset.id]);
    const producto = carrito[e.target.dataset.id];
    //producto.amount = carrito[e.target.dataset.id].amount + 1;  linea simplificada abajo hace lo mismo
    producto.amount++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }
  //Disminuir
  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.amount--;
    if (producto.amount === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
  }
  e.stopPropagation();
};
