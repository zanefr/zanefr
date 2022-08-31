const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "./images/item-1.jpeg",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
  },
  {
    id: 2,
    title: "diner double",
    category: "lunch",
    price: 13.99,
    img: "./images/item-2.jpeg",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
  },
  {
    id: 3,
    title: "godzilla milkshake",
    category: "shakes",
    price: 6.99,
    img: "./images/item-3.jpeg",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
  },
  {
    id: 4,
    title: "country delight",
    category: "breakfast",
    price: 20.99,
    img: "./images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut, `,
  },
  {
    id: 5,
    title: "egg attack",
    category: "lunch",
    price: 22.99,
    img: "./images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "oreo dream",
    category: "shakes",
    price: 18.99,
    img: "./images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "bacon overflow",
    category: "breakfast",
    price: 8.99,
    img: "./images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird `,
  },
  {
    id: 8,
    title: "american classic",
    category: "lunch",
    price: 12.99,
    img: "./images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut  `,
  },
  {
    id: 9,
    title: "quarantine buddy",
    category: "shakes",
    price: 16.99,
    img: "./images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "steak",
    category: "dinner",
    price: 26.99,
    img: "./images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];
const sectionCenter = document.querySelector(".section-center");

// atlasa tiesi .btn-container klasi
const container = document.querySelector(".btn-container");

//load items
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu); // izsauc funkciju un padod argumentu - menu

  //izsauc funkciju
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  // meklēs menuItems masīvu
  let displayMenu = menuItems.map(function (item) {
    //
    // console.log(item);

    return `<article class="menu-item">
          <img src=${item.img} alt=${item.title} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`;
  });
  displayMenu = displayMenu.join(""); // apvieno visu kopa
  console.log(displayMenu);

  sectionCenter.innerHTML = displayMenu; // pievieno teksta saturu elementā, ieskaitot atstarpes un iekšējos HTML tagus
}

function displayMenuButtons() {
  // iegūst unikālas kategorijas, lai neatkārtotos
  const categories = menu.reduce(
    // values-atsaucas uz ["all"] masīvu, item - atsaucas uz katru itemu
    function (values, item) {
      // pārbauda vai viss, kas ir item.category ir iekš ["all"] masīvā
      if (!values.includes(item.category)) {
        //ja tā ir tad pievieno to
        values.push(item.category);
      }
      return values;
    },
    // šis nav iekš kategorijām, tāpēc to pievieno klāt
    ["all"]
  );
  //lai dinamiski ievietotu pogas, ja uzrodas vel kada kategorija
  const categoryBtns = categories
    .map(function (category) {
      // lai nav random string, nemts no html... ${category} -lai virknē ievietotu mainīgo no klases category
      return `<button class="filter-btn" type="button" data-id = ${category}> ${category} </button>`;
    })
    // apvieno visu
    .join("");

  // console.log(categoryBtns);

  // pievieno teksta saturu elementā, ieskaitot atstarpes un iekšējos HTML tagus
  container.innerHTML = categoryBtns;

  const filterBtns = document.querySelectorAll(".filter-btn"); //atlasa pogas, kad tās ir pievienotas dinamiski

  // izsauc f-ju katram masīva elementam
  filterBtns.forEach(function (btn) {
    //ļauj iestatīt funkcijas izsaukšanu, kad notiek noteikts notikums
    btn.addEventListener("click", function (e) {
      //identificē notikuma pašreizējo mērķi ar jaunu masīvu
      const category = e.currentTarget.dataset.id;
      // jaunā masīvā filtrē visus items, kas ir palikuši jaunajā masīvā - menuItems
      const menuCategory = menu.filter(function (menuItems) {
        //noskaidrot vai "item" ir vienāds ar jebko, kas ir iekš masīva "category"
        if (menuItems.category === category) {
          return menuItems;
        }
      });
      // ja category = all, tad parādīs, visu, kas ir galvenajā "menu" masīvā
      if (category === "all") {
        displayMenuItems(menu);
      }
      // bet, ja "category" != "all", tad filtrē visus "items" un izmanto masīvu, kurā to dara
      else {
        displayMenuItems(menuCategory);
      }
    });
  });
}
