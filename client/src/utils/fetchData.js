export const exerciseOptions = {
    method: 'GET',

    headers: {
        'X-RapidAPI-Key': '914d3db231msh5871438e916f6dcp17650ajsnc0704da62c6c',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
}

export const videoOptions = {
    method: 'GET',

    headers: {
        'X-RapidAPI-Key': 'b61dcb1fcemsh017faca0c31d039p19a31ejsnd49fce8802b9',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
}

export const fetchData = async (url, options) => {
    const response = await fetch(url, options)
    const data = await response.json()
    return data;
}

export const fetchUser = async (setUsers) => {
    const response = await fetch("http://localhost:3000/STRETCHED-OUT");
    const userData = await response.json();
    setUsers(userData)
}