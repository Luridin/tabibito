export interface GalleryImage {
    id: string;
    url: string;
    caption: string;
}

export interface DestinationOption {
    key: string;
    countryId: string;
    countryName: string;
    destination: DestinationData;
}

export interface DestinationContentResponse {
    images: GalleryImage[];
    experience: string;
    experienceFormat: "markdown" | "text" | "none";
    configured: boolean;
    prefix: string | null;
    missing?: string[];
}

export interface JournalPageData {
    countries: Country[];
    destinationsByCountry: Record<string, DestinationOption[]>;
    totalDestinations: number;
    totalCountries: number;
}

export interface DestinationData {
    id: string;
    name: string;
    description: string;
    visited: boolean;
    travelOrder?: number;
    photoFolder?: string;
}

export interface Country {
    id: string;
    name: string;
    flag: string;
}

export interface TravelData {
    [countryId: string]: {
        destinations: {
            [destinationId: string]: DestinationData;
        };
    };
}
