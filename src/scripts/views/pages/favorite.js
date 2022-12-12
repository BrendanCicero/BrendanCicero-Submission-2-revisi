import FavoriteRestaIdb from "../../data/favorite-resta-idb";
import { createRestaItemTemplate } from "../templates/template-creator";

const Favorite = {
  async render() {
    return `
    <section class='content'>
        <div class='explore'>
          <h2 class='resta__header'>Favorite Restaurant</h2>
          <div class='resta' id='resta'>
          
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const restas = await FavoriteRestaIdb.getAllRestas();
    const restaList = document.querySelector("#resta");

    restas.forEach((resta) => {
      restaList.innerHTML += createRestaItemTemplate(resta);
    });
  },
};

export default Favorite;
