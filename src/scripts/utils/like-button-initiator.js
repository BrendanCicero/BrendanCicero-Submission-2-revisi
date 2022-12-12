import FavoriteRestaIdb from "../data/favorite-resta-idb";
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from "../views/templates/template-creator";

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resta }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resta = resta;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._resta;

    if (await this._isRestaExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaExist(id) {
    const resta = await FavoriteRestaIdb.getResta(id);
    return !!resta;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await FavoriteRestaIdb.putResta(this._resta);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

    const likeButton = document.querySelector("#likeButton");
    likeButton.addEventListener("click", async () => {
      await FavoriteRestaIdb.deleteResta(this._resta.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
