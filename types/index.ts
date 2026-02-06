export interface GalleryImage {
    id: string;
    url: string;
    caption: string;
}

export interface Location {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    visited: boolean;
    dateVisited?: string;
}

export interface CityData {
    id: string;
    name: string;
    description: string;
    visited: boolean;
    imageUrl?: string;
}

export interface StateData extends Location {
    cities: CityData[];
    geoId: string;
}

export interface Country {
    id: string;
    name: string;
    flag: string;
    mapUrl: string;
}

export interface TravelData {
    [countryId: string]: {
        states: {
            [stateId: string]: StateData;
        };
    };
}
