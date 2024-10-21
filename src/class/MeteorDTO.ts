export interface MeteorDTOResponse {
    count?: number, 
    meteors: MeteorDTO[]
}

export interface MeteorDTO {
    id: string,
    name: string,
    diameter: DiameterDTO,
    is_potentially_hazardous_asteroid: boolean,
    close_approach_date_full: string,
    relative_velocity: string,
}

interface DiameterDTO {
    estimated_diameter_min: string,
    estimated_diameter_max: string
}