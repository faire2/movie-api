import axios from "axios";
import {Address, apiKey, Language, QueryType, SortBy} from "../../enums";
import {getApiPage} from "./getApiPage";

export function getCarouselData(queryType, genre, searchQuery, pageNumber) {
    const address = Address.API_ADDRESS;
    const language = Language.CZECH;

    // querry structure is different between search and category fetch
    const query = queryType === QueryType.SEARCH_MULTI ?
        searchQuery && address + queryType + apiKey + language + "&query=" + searchQuery
        + getApiPage(1) + genre
        : address + queryType + apiKey + language + SortBy.POPULARITY_DESC
        + getApiPage(pageNumber) + genre;
    console.log("Query: " + query);

    return axios.get(query);
}