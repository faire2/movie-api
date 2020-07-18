export const QueryType = Object.freeze({
    DISCOVER_MOVIE: "discover/movie?",
    DISCOVER_TV: "discover/tv?",
    SEARCH_MULTI: "search/multi?"
});

export const Language = Object.freeze({
    CZECH: "&language=cs",
    ENGLISH: "&language=en",
    GERMAN: "&language=de",
});

export const SortBy = Object.freeze({
    POPULARITY_DESC: "&sort_by=popularity.desc",
    POPULARITY_ASC: "&sort_by=popularity.asc",
});

export const Genre = Object.freeze({
    ACTION: "&with_genres=28",
    ADVENTURE: "&with_genres=12",
    ANIMATION: "&with_genres=16",
    COMEDY: "&with_genres=35",
    CRIME: "&with_genres=80",
    DOCUMENTARY: "&with_genres=99",
    DRAMA: "&with_genres=18",
    FAMILY: "&with_genres=10751",
    FANTASY: "&with_genres=14",
    HISTORY: "&with_genres=36",
    HORROR: "&with_genres=27",
    MUSIC: "&with_genres=10402",
    MYSTERY: "&with_genres=9648",
    ROMANCE: "&with_genres=10749",
    SCI_FI: "&with_genres=878",
    TV_MOVIE: "&with_genres=10770",
    THRILLER: "&with_genres=53",
    WAR: "&with_genres=10752",
    WESTERN: "&with_genres=37",
});

export const ImgSize = Object.freeze({
    LARGE: "w780/",
    SMALL: "w200",
});

export const Medium = Object.freeze({
    MOVIE: "https://api.themoviedb.org/3/",
    IMG: "http://image.tmdb.org/t/p/",
});

export const Direction = Object.freeze({
        LEFT: "left",
        RIGHT: "right",
    }
);

export const Routes = Object.freeze({
    HOME: "/",
    SEARCH: "/search"
});