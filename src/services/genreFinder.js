export const genreFinder = (data) => {
    let genreArray = [];
    for (let i = 0; i < data.genre_ids.length; i++) {
      switch (data.genre_ids[i]) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Adventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comedy`);
          break;
        case 80:
          genreArray.push(`Crime`);
          break;
        case 99:
          genreArray.push(`Documentary`);
          break;
        case 18:
          genreArray.push(`Drama`);
          break;
        case 10751:
          genreArray.push(`Family`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`History`);
          break;
        case 27:
          genreArray.push(`Horror`);
          break;
        case 10402:
          genreArray.push(`Music`);
          break;
        case 9648:
          genreArray.push(`Mystery`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-Fiction`);
          break;
        case 10770:
          genreArray.push(`TV Movie`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`War`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <span key={genre}>{genre} </span>);
};
