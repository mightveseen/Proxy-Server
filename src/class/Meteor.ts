export interface MeteorRequest {
    near_earth_objects: NearObject
}

interface NearObject {
    [date: string]: Array<Meteor>
}

export interface Meteor {
    id: string,
    name: string,
    estimated_diameter: EstimatedDiameter,
    is_potentially_hazardous_asteroid: boolean,
    close_approach_data: CloseApproach[]
}

interface EstimatedDiameter {
    meters: Diameter
}

interface Diameter {
    estimated_diameter_min: string,
    estimated_diameter_max: string
}

interface CloseApproach {
    close_approach_date_full: string,
    relative_velocity: RelativeVelocity
}

interface RelativeVelocity {
    kilometers_per_second: string
}