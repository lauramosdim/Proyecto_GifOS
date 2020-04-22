class GiphyAPI {
  async GetGiphy(cantidad) {
    const apiResponse = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=ExcuwYMs8iItjhYZLNLm2uyYg4qCVnSi&limit=${cantidad}&rating=G`
    );
    const gif = await apiResponse.json();
    // console.log ("respuesta giphy"+gif);
    return {
      gif,
    };
  }
  async BuscarGifs(palabraBusqueda) {
    const apiResponse = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=ExcuwYMs8iItjhYZLNLm2uyYg4qCVnSi&q=${palabraBusqueda}&limit=25&offset=0&rating=G&lang=en`
    );
    const gif = await apiResponse.json();
    //console.log("respuesta busqueda" + gif);
    return {
      gif,
    };
  }
  async corona(palabrasug) {
    const apiResponse = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=ExcuwYMs8iItjhYZLNLm2uyYg4qCVnSi&q=${palabrasug}&limit=25&offset=0&rating=G&lang=en`
    );
    const gif = await apiResponse.json();
    //console.log("respuesta busqueda" + gif);
    return {
      gif,
    };
  }
}