export const enums = () => {
  enum UrlPaths {
    HOME = "/",
    SIGNUP = "/signup",
    SIGNIN = "/signin",
  }
  enum ImageURL {
    menclothing = "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    jewelery = "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    electronics = "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    womenClothing = "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  }

  return {
    UrlPaths,
    ImageURL,
  };
};
