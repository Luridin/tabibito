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
                visited: true,
                cities: []
            },
            "WB": {
                id: "WB",
                geoId: "West Bengal",
                name: "West Bengal",
                description: "The land of literature, art, and the majestic Sundarbans.",
                visited: true,
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
                visited: true,
                cities: []
            },
            "LA": {
                id: "LA",
                geoId: "Ladakh",
                name: "Ladakh",
                description: "The land of high passes. A breathtaking union territory of rugged terrain, ancient monasteries, and pristine lakes.",
                visited: true,
                cities: []
            },
            "MP": {
                id: "MP",
                geoId: "Madhya Pradesh",
                name: "Madhya Pradesh",
                description: "The heart of India. Home to majestic temples, wildlife sanctuaries, and rich heritage.",
                visited: true,
                cities: []
            },
            "GJ": {
                id: "GJ",
                geoId: "Gujarat",
                name: "Gujarat",
                description: "Land of legends and diverse landscapes, from the Rann of Kutch to the Gir forests.",
                visited: true,
                cities: []
            },
            "AP": {
                id: "AP",
                geoId: "Andhra Pradesh",
                name: "Andhra Pradesh",
                description: "The land of temples and technology.",
                visited: true,
                cities: []
            },
            "AR": {
                id: "AR",
                geoId: "Arunachal Pradesh",
                name: "Arunachal Pradesh",
                description: "The land of dawn, where the sun rises first.",
                visited: true,
                cities: []
            },
            "AS": {
                id: "AS",
                geoId: "Assam",
                name: "Assam",
                description: "Gateway to northeast India, known for tea and rhinoceros.",
                visited: true,
                cities: []
            },
            "BR": {
                id: "BR",
                geoId: "Bihar",
                name: "Bihar",
                description: "The land of Buddha and enlightenment.",
                visited: true,
                cities: []
            },
            "CT": {
                id: "CT",
                geoId: "Chandigarh",
                name: "Chandigarh",
                description: "A planned city designed by Le Corbusier.",
                visited: true,
                cities: []
            },
            "CG": {
                id: "CG",
                geoId: "Chhattisgarh",
                name: "Chhattisgarh",
                description: "The rice bowl of India with mineral wealth.",
                visited: true,
                cities: []
            },
            "DN": {
                id: "DN",
                geoId: "Dadara & Nagar Havelli",
                name: "Dadara & Nagar Havelli",
                description: "A union territory with tribal culture.",
                visited: true,
                cities: []
            },
            "DD": {
                id: "DD",
                geoId: "Daman & Diu",
                name: "Daman & Diu",
                description: "Coastal union territories with Portuguese heritage.",
                visited: true,
                cities: []
            },
            "HR": {
                id: "HR",
                geoId: "Haryana",
                name: "Haryana",
                description: "The land of warriors, surrounding Delhi.",
                visited: true,
                cities: []
            },
            "HP": {
                id: "HP",
                geoId: "Himachal Pradesh",
                name: "Himachal Pradesh",
                description: "Land of gods, valleys, and adventure.",
                visited: true,
                cities: []
            },
            "JH": {
                id: "JH",
                geoId: "Jharkhand",
                name: "Jharkhand",
                description: "The land of waterfalls and mineral resources.",
                visited: true,
                cities: []
            },
            "LD": {
                id: "LD",
                geoId: "Lakshadweep",
                name: "Lakshadweep",
                description: "A beautiful archipelago in the Arabian Sea.",
                visited: true,
                cities: []
            },
            "MN": {
                id: "MN",
                geoId: "Manipur",
                name: "Manipur",
                description: "The jewel of India, known for dance and lakes.",
                visited: true,
                cities: []
            },
            "ML": {
                id: "ML",
                geoId: "Meghalaya",
                name: "Meghalaya",
                description: "The abode of clouds, the wettest place on earth.",
                visited: true,
                cities: []
            },
            "MZ": {
                id: "MZ",
                geoId: "Mizoram",
                name: "Mizoram",
                description: "The land of the blue hills.",
                visited: true,
                cities: []
            },
            "NL": {
                id: "NL",
                geoId: "Nagaland",
                name: "Nagaland",
                description: "Land of the Nagas with unique tribal culture.",
                visited: true,
                cities: []
            },
            "OR": {
                id: "OR",
                geoId: "Odisha",
                name: "Odisha",
                description: "The land of Lord Jagannath and beautiful beaches.",
                visited: true,
                cities: []
            },
            "PY": {
                id: "PY",
                geoId: "Puducherry",
                name: "Puducherry",
                description: "A former French colony with cultural charm.",
                visited: true,
                cities: []
            },
            "PB": {
                id: "PB",
                geoId: "Punjab",
                name: "Punjab",
                description: "The land of five rivers and Sikh heritage.",
                visited: true,
                cities: []
            },
            "SK": {
                id: "SK",
                geoId: "Sikkim",
                name: "Sikkim",
                description: "A northeastern state known for Kanchenjunga and tourism.",
                visited: true,
                cities: []
            },
            "TG": {
                id: "TG",
                geoId: "Telangana",
                name: "Telangana",
                description: "The youngest state, known for IT and biryani.",
                visited: true,
                cities: []
            },
            "TR": {
                id: "TR",
                geoId: "Tripura",
                name: "Tripura",
                description: "The land of maharajas in northeast India.",
                visited: true,
                cities: []
            },
            "UT": {
                id: "UT",
                geoId: "Uttarakhand",
                name: "Uttarakhand",
                description: "The land of gods with Himalayan beauty.",
                visited: true,
                cities: []
            },
            "AND": {
                id: "AND",
                geoId: "Andaman & Nicobar Island",
                name: "Andaman & Nicobar Island",
                description: "Remote island territory with pristine beaches.",
                visited: true,
                cities: []
            }
        }
    }
};
