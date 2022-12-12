import UrlParser from "../../routes/url-parser";
import RestaurantSource from "../../data/restaurant-source";
import { createRestaDetailTemplate } from "../templates/template-creator";
import LikeButtonInitiator from "../../utils/like-button-initiator";

const Detail = {
  async render() {
    return `
      <div id="resta__detail" class="resta__detail"></div>
      <div id='likeButtonContainer'></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resta = await RestaurantSource.getRestaurantDetail(url.id);
    const restaItem = resta.restaurant;
    const restaDetail = document.querySelector("#resta__detail");
    restaDetail.innerHTML = createRestaDetailTemplate(restaItem);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      resta: {
        id: restaItem.id,
        name: restaItem.name,
        description: restaItem.description,
        city: restaItem.city,
        rating: restaItem.rating,
        address: restaItem.address,
        pictureId: restaItem.pictureId,
      },
    });
  },
};

export default Detail;
