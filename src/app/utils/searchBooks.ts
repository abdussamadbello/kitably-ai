import axios from 'axios';


export const searchBooks = async (searchTerm: string) => {
    try {
        const searchUrl = `https://gutendex.com/books/?search=${searchTerm}`;
    
        const searchResponse = await axios.get(searchUrl);
    
        return searchResponse.data;
    } catch (error) {
        console.log(error);
        throw new Error('Error searching for books');
    }
    }