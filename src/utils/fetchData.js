export const exerciseOptions = {

    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'X-RapidAPI-Key': 'cc47ed5b85mshe2bfc3afa4dcc47p147bb7jsn55475de629f4'
    },
};


export const youtubeOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
        'X-RapidAPI-Key': 'cc47ed5b85mshe2bfc3afa4dcc47p147bb7jsn55475de629f4'
    }
};


export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
};