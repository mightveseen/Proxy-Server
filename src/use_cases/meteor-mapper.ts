import { MeteorDTO, MeteorDTOResponse } from "../class/MeteorDTO";
import { Meteor, MeteorRequest } from "../class/Meteor";

interface RequestParameter { 
    date: string, 
    count: boolean, 
    isDangerous: boolean | string 
}

export async function mapMeteorsToDtoList(data: MeteorRequest, params: RequestParameter): Promise<MeteorDTOResponse> {
    const result: MeteorDTO[] = [];
    const meteors: Meteor[] = flatAndFilterArray(data, params)
    meteors.forEach(meteor => {
        result.push({
            id: meteor.id,
            name: meteor.name,
            diameter: meteor.estimated_diameter?.meters,
            is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
            close_approach_date_full: meteor.close_approach_data?.[0]?.close_approach_date_full,
            relative_velocity: meteor.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second,
        });
    });
    return {
        count: params.count ? result.length : undefined,
        meteors: result
    };
}

function flatAndFilterArray(data: MeteorRequest, params: RequestParameter): Meteor[] {
    const meteors = Object.values(data.near_earth_objects).flat();
    return params.isDangerous !== 'all'
        ? meteors.filter(meteor => meteor['is_potentially_hazardous_asteroid'] === params.isDangerous)
        : meteors;
}