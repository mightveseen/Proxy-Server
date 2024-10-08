import axios from 'axios';

const now = new Date();
const date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
const apiKey = 'q6R7KIYkpLoWCPqebxgyFDbIxL3PQOLRESF3Xhce';
const apiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`;

function getApiData() {
    axios.get(apiUrl)
        .then(response => {
            console.log(JSON.stringify(response.data, 0, 1));
        }).catch(error => {
            console.error(`Error occurred during API call [${error}]`);
        })
}

getApiData();