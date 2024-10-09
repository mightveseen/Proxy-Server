import axios from "axios";

export async function getApiData(startDate, endDate) {
    const apiUrl = `${process.env.API_URL}?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.API_KEY}`;
    return axios.get(apiUrl);
}