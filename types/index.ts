export interface Location {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    visited: boolean;
    dateVisited?: string;
}

export interface StateData extends Location {
    cities: Location[];
    geoId: string; // ID to match map topology
}

export interface Country {
    id: string; // ISO code usually
    name: string;
    flag: string;
    mapUrl: string; // Path to topojson
}

export interface TravelData {
    [countryId: string]: {
        states: {
            [stateId: string]: StateData;
        };
    };
}
