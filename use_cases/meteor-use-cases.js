export function getMeteors(data, params) {
    const result = [];
    const meteors = flatAndFilterArray(data, params)
    if (params.count > 0) meteors.length = params.count;
    meteors.forEach(meteor => {
        result.push({
            id: meteor['id'],
            name: meteor['name'],
            diameter: meteor['estimated_diameter']['meters'],
            is_potentially_hazardous_asteroid: meteor['is_potentially_hazardous_asteroid'],
            close_approach_date_full: meteor['close_approach_data'][0]['close_approach_date_full'],
            relative_velocity: meteor['close_approach_data'][0]['relative_velocity']['kilometers_per_second'],
        });
    });
    return result;
}

function flatAndFilterArray(data, params) {
    const meteors = Object.values(data['near_earth_objects']).flat();
    return params.isDangerous !== undefined
        ? meteors.filter(meteor => meteor['is_potentially_hazardous_asteroid'] === params.isDangerous)
        : meteors;
}