import { Country, TravelData } from "@/types";

export const COUNTRIES: Country[] = [
    {
        id: "IN",
        name: "India",
        flag: "🇮🇳",
        mapUrl: "/maps/india-states.geojson"
    }
];

export const TRAVEL_DATA: TravelData = {
    "IN": {
        states: {
            "KA": {
                id: "KA",
                geoId: "Karnataka",
                name: "Karnataka",
                description: "The land of sandalwood and coffee. From the hustle of Bangalore to the serene hills of Coorg.",
                visited: true,
                cities: [
                    { id: "blr", name: "Bangalore", description: "The Silicon Valley of India, known for its parks and nightlife.", visited: true },
                    { id: "mys", name: "Mysore", description: "The city of palaces and heritage.", visited: true },
                    { id: "crg", name: "Coorg", description: "Scotland of India, famous for coffee plantations.", visited: true }
                ]
            },
            "KL": {
                id: "KL",
                geoId: "Kerala",
                name: "Kerala",
                description: "God's Own Country. Serene backwaters, emerald tea gardens, and pristine beaches.",
                visited: true,
                cities: [
                    { id: "mun", name: "Munnar", description: "Breathtaking tea plantations and mist-covered hills.", visited: true },
                    { id: "koc", name: "Kochi", description: "A historic port city with a mix of cultures.", visited: true },
                    { id: "tvm", name: "Trivandrum", description: "The capital city with stunning temples and beaches.", visited: true }
                ]
            },
            "MH": {
                id: "MH",
                geoId: "Maharashtra",
                name: "Maharashtra",
                description: "A land of diverse experiences, from the buzzing streets of Mumbai to the ancient Ajanta Caves.",
                visited: true,
                cities: [
                    { id: "mum", name: "Mumbai", description: "The City of Dreams and the financial capital.", visited: true },
                    { id: "pun", name: "Pune", description: "The cultural capital of Maharashtra.", visited: true }
                ]
            },
            "DL": {
                id: "DL",
                geoId: "NCT of Delhi",
                name: "Delhi",
                description: "The heart of India. A city where history meets modernity at every corner.",
                visited: true,
                cities: [
                    { id: "nd", name: "New Delhi", description: "Planned city with wide avenues and historical monuments.", visited: true }
                ]
            },
            "RJ": {
                id: "RJ",
                geoId: "Rajasthan",
                name: "Rajasthan",
                description: "The land of kings, desert sands, and majestic forts that whisper tales of valor.",
                visited: true,
                cities: [
                    { id: "jpr", name: "Jaipur", description: "The Pink City, famous for its architecture and bazaars.", visited: true },
                    { id: "jdr", name: "Jodhpur", description: "The Blue City, home to the Mehrangarh Fort.", visited: true },
                    { id: "udp", name: "Udaipur", description: "The City of Lakes and romantic settings.", visited: true }
                ]
            },
            "UP": {
                id: "UP",
                geoId: "Uttar Pradesh",
                name: "Uttar Pradesh",
                description: "The spiritual heartland of India, home to the timeless Taj Mahal.",
                visited: true,
                cities: [
                    { id: "agr", name: "Agra", description: "City of the Taj Mahal, a wonder of the world.", visited: true },
                    { id: "vns", name: "Varanasi", description: "One of the oldest living cities in the world.", visited: true }
                ]
            },
            "TN": {
                id: "TN",
                geoId: "Tamil Nadu",
                name: "Tamil Nadu",
                description: "A land of temples, classical music, and a rich Dravidian culture.",
                visited: false,
                cities: []
            },
            "WB": {
                id: "WB",
                geoId: "West Bengal",
                name: "West Bengal",
                description: "The land of literature, art, and the majestic Sundarbans.",
                visited: false,
                cities: []
            },
            "GA": {
                id: "GA",
                geoId: "Goa",
                name: "Goa",
                description: "Sun, sand, and seafood. A tropical paradise with a unique Indo-Portuguese heritage.",
                visited: true,
                cities: [
                    { id: "pn", name: "Panaji", description: "The charming capital city.", visited: true }
                ]
            },
            "JK": {
                id: "JK",
                geoId: "Jammu & Kashmir",
                name: "Jammu & Kashmir",
                description: "The crown of India. Home to the legendary Dal Lake and snow-capped Himalayan peaks.",
                visited: false,
                cities: []
            },
            "MP": {
                id: "MP",
                geoId: "Madhya Pradesh",
                name: "Madhya Pradesh",
                description: "The heart of India. Home to majestic temples, wildlife sanctuaries, and rich heritage.",
                visited: false,
                cities: []
            },
            "GJ": {
                id: "GJ",
                geoId: "Gujarat",
                name: "Gujarat",
                description: "Land of legends and diverse landscapes, from the Rann of Kutch to the Gir forests.",
                visited: false,
                cities: []
            }
        }
    }
};
