import axios from "axios";
import apiNetflix from "../utils/endPointApi"

const apiBuilder = {
    tryGet: async (entity, state, language, page) => {
        const url= `${apiNetflix.access.url}${apiNetflix.entity[entity]}${apiNetflix.state[state]}?${apiNetflix.access.apiKey}${apiNetflix.language[language]}${apiNetflix.access.pagination}${page}`;
        try {
            const res = await axios(url);
            return res.data.results;
        } catch (error) {
            return [];
        }
    },
    tryGetImg: (quality, path) => {
        return `${apiNetflix.access.imageUrl}${apiNetflix.quality[quality]}${path}`
    },
    tryGetVideo: async (entity, id, language) => {
        const url = `${apiNetflix.access.url}${apiNetflix.entity[entity]}/${id}${apiNetflix.access.video}?${apiNetflix.access.apiKey}${apiNetflix.language[language]}`
        try {
            const res = await axios(url);
            return res.data.results[0];
        } catch (error) {
            return [];
        }
    },
    tryGetSimilar: async(entity, id, language = "english", page = 1) => {
        const url = `${apiNetflix.access.url}${apiNetflix.entity[entity]}/${id}${apiNetflix.state.similar}?${apiNetflix.access.apiKey}${apiNetflix.language[language]}${apiNetflix.access.pagination}${page}`
        try {
            const res = await axios(url);
            return res.data.results;
        } catch (error) {
            return [];
        }
    }
    ,tryGetSearch: async(value ,adult ,language , page = 1) => {
        const url = `${apiNetflix.access.url}${apiNetflix.access.search}${apiNetflix.access.multi}${apiNetflix.access.query}${value}${apiNetflix.access.adult}${adult}&${apiNetflix.access.apiKey}${apiNetflix.language[language]}${apiNetflix.access.pagination}${page}`
        try {
            const res = await axios(url);
            return res.data.results;
        } catch (error) {
            return [];
        }
    }
}

export default apiBuilder;