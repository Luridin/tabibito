import { Country, TravelData } from "@/types";
import { TRIP_PHOTO_BASE_URL } from "@/lib/constants";

export const COUNTRIES: Country[] = [
    {
        "id": "IN",
        "name": "India",
        "flag": "🇮🇳",
        "mapUrl": "/tabibito/maps/india-states.geojson"
    },
    {
        "id": "TH",
        "name": "Thailand",
        "flag": "🇹🇭",
        "mapUrl": "/tabibito/maps/th-adm1.geojson"
    },
    {
        "id": "AE",
        "name": "United Arab Emirates",
        "flag": "🇦🇪",
        "mapUrl": "/tabibito/maps/ae-adm1.geojson"
    },
    {
        "id": "JP",
        "name": "Japan",
        "flag": "🇯🇵",
        "mapUrl": "/tabibito/maps/jp-adm1.geojson"
    }
];

export const TRAVEL_DATA: TravelData = {
    "IN": {
        "states": {
            "AND": {
                "id": "AND",
                "geoId": "Andaman & Nicobar Island",
                "name": "Andaman & Nicobar Island",
                "description": "An island territory in the Bay of Bengal known for beaches, forests, and remote archipelagos.",
                "visited": true,
                "cities": [
                    {
                        "id": "portblair",
                        "name": "Portblair",
                        "description": "Visited Portblair in Andaman & Nicobar Island, India.",
                        "visited": true
                    },
                    {
                        "id": "swarajdeep",
                        "name": "Swarajdeep",
                        "description": "Visited Swarajdeep in Andaman & Nicobar Island, India.",
                        "visited": true
                    },
                    {
                        "id": "shaheedweep",
                        "name": "Shaheedweep",
                        "description": "Visited Shaheedweep in Andaman & Nicobar Island, India.",
                        "visited": true
                    }
                ]
            },
            "AP": {
                "id": "AP",
                "geoId": "Andhra Pradesh",
                "name": "Andhra Pradesh",
                "description": "A southeastern state of temple towns, long coastlines, and major pilgrimage centers.",
                "visited": true,
                "cities": [
                    {
                        "id": "belum",
                        "name": "Belum",
                        "description": "Visited Belum in Andhra Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "gandikota",
                        "name": "Gandikota",
                        "description": "Visited Gandikota in Andhra Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "vijayawada",
                        "name": "Vijayawada",
                        "description": "Visited Vijayawada in Andhra Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "vishakapatnam",
                        "name": "Vishakapatnam",
                        "description": "Visited Vishakapatnam in Andhra Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "tirupati",
                        "name": "Tirupati",
                        "description": "Visited Tirupati in Andhra Pradesh, India.",
                        "visited": true
                    }
                ]
            },
            "AR": {
                "id": "AR",
                "geoId": "Arunachal Pradesh",
                "name": "Arunachal Pradesh",
                "description": "India's northeastern frontier of mountains, monasteries, valleys, and remote roads.",
                "visited": true,
                "cities": [
                    {
                        "id": "itanagar",
                        "name": "Itanagar",
                        "description": "Visited Itanagar in Arunachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "ziro",
                        "name": "Ziro",
                        "description": "Visited Ziro in Arunachal Pradesh, India.",
                        "visited": true
                    }
                ]
            },
            "AS": {
                "id": "AS",
                "geoId": "Assam",
                "name": "Assam",
                "description": "A northeastern state of tea gardens, river islands, wildlife, and cultural festivals.",
                "visited": true,
                "cities": [
                    {
                        "id": "gauhati",
                        "name": "Gauhati",
                        "description": "Visited Gauhati in Assam, India.",
                        "visited": true
                    }
                ]
            },
            "BR": {
                "id": "BR",
                "geoId": "Bihar",
                "name": "Bihar",
                "description": "A historic Gangetic plain state tied to ancient kingdoms, Buddhism, and river cities.",
                "visited": true,
                "cities": [
                    {
                        "id": "bodhgaya",
                        "name": "Bodhgaya",
                        "description": "Visited Bodhgaya in Bihar, India.",
                        "visited": true
                    }
                ]
            },
            "CG": {
                "id": "CG",
                "geoId": "Chhattisgarh",
                "name": "Chhattisgarh",
                "description": "A central-eastern state of forests, waterfalls, temples, and tribal regions.",
                "visited": true,
                "cities": [
                    {
                        "id": "raipur",
                        "name": "Raipur",
                        "description": "Visited Raipur in Chhattisgarh, India.",
                        "visited": true
                    }
                ]
            },
            "DL": {
                "id": "DL",
                "geoId": "NCT of Delhi",
                "name": "Delhi",
                "description": "India's capital region, where monuments, dense neighborhoods, and political power meet.",
                "visited": true,
                "cities": [
                    {
                        "id": "delhi",
                        "name": "Delhi",
                        "description": "Visited Delhi in Delhi, India.",
                        "visited": true
                    }
                ]
            },
            "GA": {
                "id": "GA",
                "geoId": "Goa",
                "name": "Goa",
                "description": "A small coastal state known for beaches, food, music, and Indo-Portuguese heritage.",
                "visited": true,
                "cities": [
                    {
                        "id": "goa",
                        "name": "Goa",
                        "description": "Visited Goa in Goa, India.",
                        "visited": true
                    }
                ]
            },
            "GJ": {
                "id": "GJ",
                "geoId": "Gujarat",
                "name": "Gujarat",
                "description": "A western state of vibrant cities, sacred sites, white deserts, and long coastlines.",
                "visited": true,
                "cities": [
                    {
                        "id": "surat",
                        "name": "Surat",
                        "description": "Visited Surat in Gujarat, India.",
                        "visited": true
                    },
                    {
                        "id": "vadodara",
                        "name": "Vadodara",
                        "description": "Visited Vadodara in Gujarat, India.",
                        "visited": true
                    },
                    {
                        "id": "ahmedabad",
                        "name": "Ahmedabad",
                        "description": "Visited Ahmedabad in Gujarat, India.",
                        "visited": true
                    }
                ]
            },
            "HR": {
                "id": "HR",
                "geoId": "Haryana",
                "name": "Haryana",
                "description": "A northern state surrounding Delhi, mixing farmland, highways, and satellite cities.",
                "visited": true,
                "cities": [
                    {
                        "id": "gurugram",
                        "name": "Gurugram",
                        "description": "Visited Gurugram in Haryana, India.",
                        "visited": true
                    }
                ]
            },
            "HP": {
                "id": "HP",
                "geoId": "Himachal Pradesh",
                "name": "Himachal Pradesh",
                "description": "A Himalayan state of mountain towns, valleys, monasteries, and road-trip landscapes.",
                "visited": true,
                "cities": [
                    {
                        "id": "manali",
                        "name": "Manali",
                        "description": "Visited Manali in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "kasol",
                        "name": "Kasol",
                        "description": "Visited Kasol in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "manikaran",
                        "name": "Manikaran",
                        "description": "Visited Manikaran in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "bir-billing",
                        "name": "Bir Billing",
                        "description": "Visited Bir Billing in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "mcleodganj",
                        "name": "McLeodganj",
                        "description": "Visited McLeodganj in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "dharamshala",
                        "name": "Dharamshala",
                        "description": "Visited Dharamshala in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "tosh",
                        "name": "Tosh",
                        "description": "Visited Tosh in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "malana",
                        "name": "Malana",
                        "description": "Visited Malana in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "banikhet",
                        "name": "Banikhet",
                        "description": "Visited Banikhet in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "dalhousie",
                        "name": "Dalhousie",
                        "description": "Visited Dalhousie in Himachal Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "khajjiar",
                        "name": "Khajjiar",
                        "description": "Visited Khajjiar in Himachal Pradesh, India.",
                        "visited": true
                    }
                ]
            },
            "JK": {
                "id": "JK",
                "geoId": "Jammu & Kashmir",
                "name": "Jammu & Kashmir",
                "description": "A Himalayan region of valleys, lakes, mountains, and historic towns.",
                "visited": true,
                "cities": [
                    {
                        "id": "srinanagar",
                        "name": "Srinanagar",
                        "description": "Visited Srinanagar in Jammu & Kashmir, India.",
                        "visited": true
                    },
                    {
                        "id": "sonamarg",
                        "name": "Sonamarg",
                        "description": "Visited Sonamarg in Jammu & Kashmir, India.",
                        "visited": true
                    },
                    {
                        "id": "kashmir-great-lakes",
                        "name": "Kashmir Great Lakes",
                        "description": "Visited Kashmir Great Lakes in Jammu & Kashmir, India.",
                        "visited": true
                    }
                ]
            },
            "JH": {
                "id": "JH",
                "geoId": "Jharkhand",
                "name": "Jharkhand",
                "description": "A mineral-rich eastern state of forests, plateaus, waterfalls, and industrial towns.",
                "visited": true,
                "cities": [
                    {
                        "id": "jamshedpur",
                        "name": "Jamshedpur",
                        "description": "Visited Jamshedpur in Jharkhand, India.",
                        "visited": true
                    }
                ]
            },
            "KA": {
                "id": "KA",
                "geoId": "Karnataka",
                "name": "Karnataka",
                "description": "The land of sandalwood, coffee hills, coastlines, and layered heritage across the Deccan.",
                "visited": true,
                "cities": [
                    {
                        "id": "bengaluru",
                        "name": "Bengaluru",
                        "description": "Visited Bengaluru in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "kukke",
                        "name": "Kukke",
                        "description": "Visited Kukke in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "gokarna",
                        "name": "Gokarna",
                        "description": "Visited Gokarna in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "mysuru",
                        "name": "Mysuru",
                        "description": "Visited Mysuru in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "madikeri",
                        "name": "Madikeri",
                        "description": "Visited Madikeri in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "chikmagalur",
                        "name": "Chikmagalur",
                        "description": "Visited Chikmagalur in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "hampi",
                        "name": "Hampi",
                        "description": "Visited Hampi in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "muthathi",
                        "name": "Muthathi",
                        "description": "Visited Muthathi in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "mulki",
                        "name": "Mulki",
                        "description": "Visited Mulki in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "manguluru",
                        "name": "Manguluru",
                        "description": "Visited Manguluru in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "udupi",
                        "name": "Udupi",
                        "description": "Visited Udupi in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "kundapur",
                        "name": "Kundapur",
                        "description": "Visited Kundapur in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "murudeshwar",
                        "name": "Murudeshwar",
                        "description": "Visited Murudeshwar in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "manipal",
                        "name": "Manipal",
                        "description": "Visited Manipal in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "kalasa",
                        "name": "Kalasa",
                        "description": "Visited Kalasa in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "belur",
                        "name": "Belur",
                        "description": "Visited Belur in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "chikkabalapur",
                        "name": "Chikkabalapur",
                        "description": "Visited Chikkabalapur in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "shivamogga",
                        "name": "Shivamogga",
                        "description": "Visited Shivamogga in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "bhadravati",
                        "name": "Bhadravati",
                        "description": "Visited Bhadravati in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "tumkur",
                        "name": "Tumkur",
                        "description": "Visited Tumkur in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "doddabalpur",
                        "name": "Doddabalpur",
                        "description": "Visited Doddabalpur in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "agumbe",
                        "name": "Agumbe",
                        "description": "Visited Agumbe in Karnataka, India.",
                        "visited": true
                    },
                    {
                        "id": "irandadi",
                        "name": "Irandadi",
                        "description": "Visited Irandadi in Karnataka, India.",
                        "visited": true
                    }
                ]
            },
            "KL": {
                "id": "KL",
                "geoId": "Kerala",
                "name": "Kerala",
                "description": "Backwaters, hill country, beaches, and lush green landscapes define this southern state.",
                "visited": true,
                "cities": [
                    {
                        "id": "kochi",
                        "name": "Kochi",
                        "description": "Visited Kochi in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "allepey",
                        "name": "Allepey",
                        "description": "Visited Allepey in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "munnar",
                        "name": "Munnar",
                        "description": "Visited Munnar in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "kozhikode",
                        "name": "Kozhikode",
                        "description": "Visited Kozhikode in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "varkala",
                        "name": "Varkala",
                        "description": "Visited Varkala in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "chadayamangalam",
                        "name": "Chadayamangalam",
                        "description": "Visited Chadayamangalam in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "thiruvunanthapuram",
                        "name": "Thiruvunanthapuram",
                        "description": "Visited Thiruvunanthapuram in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "wayanad",
                        "name": "Wayanad",
                        "description": "Visited Wayanad in Kerala, India.",
                        "visited": true
                    },
                    {
                        "id": "guruvayur",
                        "name": "Guruvayur",
                        "description": "Visited Guruvayur in Kerala, India.",
                        "visited": true
                    }
                ]
            },
            "LA": {
                "id": "LA",
                "geoId": "Ladakh",
                "name": "Ladakh",
                "description": "A high-altitude cold desert region known for monasteries, mountain passes, and stark landscapes.",
                "visited": true,
                "cities": [
                    {
                        "id": "leh",
                        "name": "Leh",
                        "description": "Visited Leh in Ladakh, India.",
                        "visited": true
                    },
                    {
                        "id": "diskit",
                        "name": "Diskit",
                        "description": "Visited Diskit in Ladakh, India.",
                        "visited": true
                    },
                    {
                        "id": "hundar",
                        "name": "Hundar",
                        "description": "Visited Hundar in Ladakh, India.",
                        "visited": true
                    },
                    {
                        "id": "pangong",
                        "name": "Pangong",
                        "description": "Visited Pangong in Ladakh, India.",
                        "visited": true
                    },
                    {
                        "id": "hemis",
                        "name": "Hemis",
                        "description": "Visited Hemis in Ladakh, India.",
                        "visited": true
                    },
                    {
                        "id": "nimmu",
                        "name": "Nimmu",
                        "description": "Visited Nimmu in Ladakh, India.",
                        "visited": true
                    }
                ]
            },
            "MP": {
                "id": "MP",
                "geoId": "Madhya Pradesh",
                "name": "Madhya Pradesh",
                "description": "A central Indian state of heritage cities, forests, temples, and wildlife reserves.",
                "visited": true,
                "cities": [
                    {
                        "id": "jabalpur",
                        "name": "Jabalpur",
                        "description": "Visited Jabalpur in Madhya Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "khajuraho",
                        "name": "Khajuraho",
                        "description": "Visited Khajuraho in Madhya Pradesh, India.",
                        "visited": true
                    }
                ]
            },
            "MH": {
                "id": "MH",
                "geoId": "Maharashtra",
                "name": "Maharashtra",
                "description": "A vast western state spanning megacities, forts, hills, coastlines, and pilgrimage routes.",
                "visited": true,
                "cities": [
                    {
                        "id": "mumbai",
                        "name": "Mumbai",
                        "description": "Visited Mumbai in Maharashtra, India.",
                        "visited": true
                    },
                    {
                        "id": "pune",
                        "name": "Pune",
                        "description": "Visited Pune in Maharashtra, India.",
                        "visited": true
                    },
                    {
                        "id": "aurangabad",
                        "name": "Aurangabad",
                        "description": "Visited Aurangabad in Maharashtra, India.",
                        "visited": true
                    },
                    {
                        "id": "nashik",
                        "name": "Nashik",
                        "description": "Visited Nashik in Maharashtra, India.",
                        "visited": true
                    },
                    {
                        "id": "khandala",
                        "name": "Khandala",
                        "description": "Visited Khandala in Maharashtra, India.",
                        "visited": true
                    },
                    {
                        "id": "lonavala",
                        "name": "Lonavala",
                        "description": "Visited Lonavala in Maharashtra, India.",
                        "visited": true
                    },
                    {
                        "id": "akole",
                        "name": "Akole",
                        "description": "Visited Akole in Maharashtra, India.",
                        "visited": true
                    }
                ]
            },
            "MN": {
                "id": "MN",
                "geoId": "Manipur",
                "name": "Manipur",
                "description": "A northeastern state of valleys, lakes, and layered cultural traditions.",
                "visited": true,
                "cities": [
                    {
                        "id": "imphal",
                        "name": "Imphal",
                        "description": "Visited Imphal in Manipur, India.",
                        "visited": true
                    }
                ]
            },
            "ML": {
                "id": "ML",
                "geoId": "Meghalaya",
                "name": "Meghalaya",
                "description": "A northeastern hill state of clouds, waterfalls, caves, and living root bridges.",
                "visited": true,
                "cities": [
                    {
                        "id": "shillong",
                        "name": "Shillong",
                        "description": "Visited Shillong in Meghalaya, India.",
                        "visited": true
                    },
                    {
                        "id": "sohra",
                        "name": "Sohra",
                        "description": "Visited Sohra in Meghalaya, India.",
                        "visited": true
                    },
                    {
                        "id": "dawki",
                        "name": "Dawki",
                        "description": "Visited Dawki in Meghalaya, India.",
                        "visited": true
                    }
                ]
            },
            "MZ": {
                "id": "MZ",
                "geoId": "Mizoram",
                "name": "Mizoram",
                "description": "A mountainous northeastern state of steep ridges, bamboo forests, and quiet towns.",
                "visited": true,
                "cities": [
                    {
                        "id": "aizawl",
                        "name": "Aizawl",
                        "description": "Visited Aizawl in Mizoram, India.",
                        "visited": true
                    }
                ]
            },
            "NL": {
                "id": "NL",
                "geoId": "Nagaland",
                "name": "Nagaland",
                "description": "A hill state in northeast India known for tribal cultures, ridges, and village landscapes.",
                "visited": true,
                "cities": [
                    {
                        "id": "dimapur",
                        "name": "Dimapur",
                        "description": "Visited Dimapur in Nagaland, India.",
                        "visited": true
                    },
                    {
                        "id": "kohima",
                        "name": "Kohima",
                        "description": "Visited Kohima in Nagaland, India.",
                        "visited": true
                    },
                    {
                        "id": "kisama",
                        "name": "Kisama",
                        "description": "Visited Kisama in Nagaland, India.",
                        "visited": true
                    },
                    {
                        "id": "dzuleke",
                        "name": "Dzuleke",
                        "description": "Visited Dzuleke in Nagaland, India.",
                        "visited": true
                    },
                    {
                        "id": "dzukou",
                        "name": "Dzukou",
                        "description": "Visited Dzukou in Nagaland, India.",
                        "visited": true
                    },
                    {
                        "id": "khonoma",
                        "name": "Khonoma",
                        "description": "Visited Khonoma in Nagaland, India.",
                        "visited": true
                    }
                ]
            },
            "OR": {
                "id": "OR",
                "geoId": "Odisha",
                "name": "Odisha",
                "description": "An eastern coastal state known for temples, beaches, tribal culture, and classical art traditions.",
                "visited": true,
                "cities": [
                    {
                        "id": "bhubaneshwar",
                        "name": "Bhubaneshwar",
                        "description": "Visited Bhubaneshwar in Odisha, India.",
                        "visited": true
                    },
                    {
                        "id": "konark",
                        "name": "Konark",
                        "description": "Visited Konark in Odisha, India.",
                        "visited": true
                    },
                    {
                        "id": "puri",
                        "name": "Puri",
                        "description": "Visited Puri in Odisha, India.",
                        "visited": true
                    },
                    {
                        "id": "chilika",
                        "name": "Chilika",
                        "description": "Visited Chilika in Odisha, India.",
                        "visited": true
                    }
                ]
            },
            "PY": {
                "id": "PY",
                "geoId": "Puducherry",
                "name": "Puducherry",
                "description": "A compact coastal union territory shaped by French colonial history and seaside promenades.",
                "visited": true,
                "cities": [
                    {
                        "id": "puducherry",
                        "name": "Puducherry",
                        "description": "Visited Puducherry in Puducherry, India.",
                        "visited": true
                    }
                ]
            },
            "PB": {
                "id": "PB",
                "geoId": "Punjab",
                "name": "Punjab",
                "description": "A northwestern state of agriculture, Sikh heritage, and border history.",
                "visited": true,
                "cities": [
                    {
                        "id": "amritsar",
                        "name": "Amritsar",
                        "description": "Visited Amritsar in Punjab, India.",
                        "visited": true
                    },
                    {
                        "id": "chandigarh",
                        "name": "Chandigarh",
                        "description": "Visited Chandigarh in Punjab, India.",
                        "visited": true
                    },
                    {
                        "id": "wagah",
                        "name": "Wagah",
                        "description": "Visited Wagah in Punjab, India.",
                        "visited": true
                    }
                ]
            },
            "RJ": {
                "id": "RJ",
                "geoId": "Rajasthan",
                "name": "Rajasthan",
                "description": "A desert state of forts, palaces, old cities, and dramatic landscapes.",
                "visited": true,
                "cities": [
                    {
                        "id": "jaipur",
                        "name": "Jaipur",
                        "description": "Visited Jaipur in Rajasthan, India.",
                        "visited": true
                    },
                    {
                        "id": "jaisalmer",
                        "name": "Jaisalmer",
                        "description": "Visited Jaisalmer in Rajasthan, India.",
                        "visited": true
                    },
                    {
                        "id": "ajmer",
                        "name": "Ajmer",
                        "description": "Visited Ajmer in Rajasthan, India.",
                        "visited": true
                    },
                    {
                        "id": "pushkar",
                        "name": "Pushkar",
                        "description": "Visited Pushkar in Rajasthan, India.",
                        "visited": true
                    },
                    {
                        "id": "jodhpur",
                        "name": "Jodhpur",
                        "description": "Visited Jodhpur in Rajasthan, India.",
                        "visited": true
                    },
                    {
                        "id": "udaipur",
                        "name": "Udaipur",
                        "description": "Visited Udaipur in Rajasthan, India.",
                        "visited": true
                    }
                ]
            },
            "SK": {
                "id": "SK",
                "geoId": "Sikkim",
                "name": "Sikkim",
                "description": "A Himalayan state of mountain views, monasteries, and winding hill roads.",
                "visited": true,
                "cities": [
                    {
                        "id": "yuksum",
                        "name": "Yuksum",
                        "description": "Visited Yuksum in Sikkim, India.",
                        "visited": true
                    }
                ]
            },
            "TN": {
                "id": "TN",
                "geoId": "Tamil Nadu",
                "name": "Tamil Nadu",
                "description": "A state of temple towns, hill stations, coastal cities, and a deep classical cultural tradition.",
                "visited": true,
                "cities": [
                    {
                        "id": "udagamandalam",
                        "name": "Udagamandalam",
                        "description": "Visited Udagamandalam in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "coimbatore",
                        "name": "Coimbatore",
                        "description": "Visited Coimbatore in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "kodaikanal",
                        "name": "Kodaikanal",
                        "description": "Visited Kodaikanal in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "chennai",
                        "name": "Chennai",
                        "description": "Visited Chennai in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "mahabalipuram",
                        "name": "Mahabalipuram",
                        "description": "Visited Mahabalipuram in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "madurai",
                        "name": "Madurai",
                        "description": "Visited Madurai in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "nagercoil",
                        "name": "Nagercoil",
                        "description": "Visited Nagercoil in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "kanyakumari",
                        "name": "Kanyakumari",
                        "description": "Visited Kanyakumari in Tamil Nadu, India.",
                        "visited": true
                    },
                    {
                        "id": "conoor",
                        "name": "Conoor",
                        "description": "Visited Conoor in Tamil Nadu, India.",
                        "visited": true
                    }
                ]
            },
            "TG": {
                "id": "TG",
                "geoId": "Telangana",
                "name": "Telangana",
                "description": "A Deccan state anchored by Hyderabad and shaped by forts, cuisine, and dry plateau landscapes.",
                "visited": true,
                "cities": [
                    {
                        "id": "hyderabad",
                        "name": "Hyderabad",
                        "description": "Visited Hyderabad in Telangana, India.",
                        "visited": true
                    }
                ]
            },
            "TR": {
                "id": "TR",
                "geoId": "Tripura",
                "name": "Tripura",
                "description": "A small northeastern state with royal history, temples, and green landscapes.",
                "visited": true,
                "cities": [
                    {
                        "id": "agartala",
                        "name": "Agartala",
                        "description": "Visited Agartala in Tripura, India.",
                        "visited": true
                    }
                ]
            },
            "UP": {
                "id": "UP",
                "geoId": "Uttar Pradesh",
                "name": "Uttar Pradesh",
                "description": "A populous northern state of historic cities, pilgrimage centers, and Mughal landmarks.",
                "visited": true,
                "cities": [
                    {
                        "id": "varanasi",
                        "name": "Varanasi",
                        "description": "Visited Varanasi in Uttar Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "sarnath",
                        "name": "Sarnath",
                        "description": "Visited Sarnath in Uttar Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "prayagraj",
                        "name": "Prayagraj",
                        "description": "Visited Prayagraj in Uttar Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "agra",
                        "name": "Agra",
                        "description": "Visited Agra in Uttar Pradesh, India.",
                        "visited": true
                    },
                    {
                        "id": "lucknow",
                        "name": "Lucknow",
                        "description": "Visited Lucknow in Uttar Pradesh, India.",
                        "visited": true
                    }
                ]
            },
            "UT": {
                "id": "UT",
                "geoId": "Uttarakhand",
                "name": "Uttarakhand",
                "description": "A northern Himalayan state of pilgrimage routes, forests, lakes, and mountain escapes.",
                "visited": true,
                "cities": [
                    {
                        "id": "rishikesh",
                        "name": "Rishikesh",
                        "description": "Visited Rishikesh in Uttarakhand, India.",
                        "visited": true
                    },
                    {
                        "id": "dehradun",
                        "name": "Dehradun",
                        "description": "Visited Dehradun in Uttarakhand, India.",
                        "visited": true
                    },
                    {
                        "id": "sankri",
                        "name": "Sankri",
                        "description": "Visited Sankri in Uttarakhand, India.",
                        "visited": true
                    },
                    {
                        "id": "govindghat",
                        "name": "Govindghat",
                        "description": "Visited Govindghat in Uttarakhand, India.",
                        "visited": true
                    },
                    {
                        "id": "gangharia",
                        "name": "Gangharia",
                        "description": "Visited Gangharia in Uttarakhand, India.",
                        "visited": true
                    },
                    {
                        "id": "valley-of-flowers",
                        "name": "Valley of Flowers",
                        "description": "Visited Valley of Flowers in Uttarakhand, India.",
                        "visited": true
                    },
                    {
                        "id": "hemkund-sahib",
                        "name": "Hemkund sahib",
                        "description": "Visited Hemkund sahib in Uttarakhand, India.",
                        "visited": true
                    }
                ]
            },
            "WB": {
                "id": "WB",
                "geoId": "West Bengal",
                "name": "West Bengal",
                "description": "An eastern state that ranges from Kolkata and river plains to Himalayan foothills.",
                "visited": true,
                "cities": [
                    {
                        "id": "siliguri",
                        "name": "Siliguri",
                        "description": "Visited Siliguri in West Bengal, India.",
                        "visited": true
                    },
                    {
                        "id": "kolkata",
                        "name": "Kolkata",
                        "description": "Visited Kolkata in West Bengal, India.",
                        "visited": true
                    }
                ]
            }
        }
    },
    "AE": {
        "states": {
            "ABU_DHABI": {
                "id": "ABU_DHABI",
                "geoId": "Abu Dhabi",
                "name": "Abu Dhabi",
                "description": "The capital emirate of the UAE, combining museums, mosques, coastline, and modern urban planning.",
                "visited": true,
                "cities": [
                    {
                        "id": "abu-dhabi",
                        "name": "Abu Dhabi",
                        "description": "Visited Abu Dhabi in Abu Dhabi, United Arab Emirates.",
                        "visited": true
                    }
                ]
            },
            "AJMAN": {
                "id": "AJMAN",
                "geoId": "Ajman",
                "name": "Ajman",
                "description": "A first-level administrative region in United Arab Emirates.",
                "visited": false,
                "cities": []
            },
            "DUBAI": {
                "id": "DUBAI",
                "geoId": "Dubai",
                "name": "Dubai",
                "description": "An emirate of futuristic skylines, desert highways, luxury retail, and global tourism.",
                "visited": true,
                "cities": [
                    {
                        "id": "dubai",
                        "name": "Dubai",
                        "description": "Visited Dubai in Dubai, United Arab Emirates.",
                        "visited": true
                    }
                ]
            },
            "FUJAIRAH": {
                "id": "FUJAIRAH",
                "geoId": "Fujairah",
                "name": "Fujairah",
                "description": "A first-level administrative region in United Arab Emirates.",
                "visited": false,
                "cities": []
            },
            "RAS_AL_KHAIMAH": {
                "id": "RAS_AL_KHAIMAH",
                "geoId": "Ras al-Khaimah",
                "name": "Ras al-Khaimah",
                "description": "A first-level administrative region in United Arab Emirates.",
                "visited": false,
                "cities": []
            },
            "SHARJAH": {
                "id": "SHARJAH",
                "geoId": "Sharjah",
                "name": "Sharjah",
                "description": "A first-level administrative region in United Arab Emirates.",
                "visited": false,
                "cities": []
            },
            "UMM_AL_QUWAIN": {
                "id": "UMM_AL_QUWAIN",
                "geoId": "Umm al-Quwain",
                "name": "Umm al-Quwain",
                "description": "A first-level administrative region in United Arab Emirates.",
                "visited": false,
                "cities": []
            }
        }
    },
    "TH": {
        "states": {
            "AMNAT_CHAROEN_PROVINCE": {
                "id": "AMNAT_CHAROEN_PROVINCE",
                "geoId": "Amnat Charoen Province",
                "name": "Amnat Charoen Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "ANG_THONG_PROVINCE": {
                "id": "ANG_THONG_PROVINCE",
                "geoId": "Ang Thong Province",
                "name": "Ang Thong Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "BANGKOK": {
                "id": "BANGKOK",
                "geoId": "Bangkok",
                "name": "Bangkok",
                "description": "Thailand's capital region of canals, temples, markets, nightlife, and dense urban energy.",
                "visited": true,
                "cities": [
                    {
                        "id": "bangkok",
                        "name": "Bangkok",
                        "description": "Visited Bangkok in Bangkok, Thailand.",
                        "visited": true
                    }
                ]
            },
            "BUENG_KAN_PROVINCE": {
                "id": "BUENG_KAN_PROVINCE",
                "geoId": "Bueng Kan Province",
                "name": "Bueng Kan Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "BURI_RAM_PROVINCE": {
                "id": "BURI_RAM_PROVINCE",
                "geoId": "Buri Ram Province",
                "name": "Buri Ram Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHACHOENGSAO_PROVINCE": {
                "id": "CHACHOENGSAO_PROVINCE",
                "geoId": "Chachoengsao Province",
                "name": "Chachoengsao Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHAI_NAT_PROVINCE": {
                "id": "CHAI_NAT_PROVINCE",
                "geoId": "Chai Nat Province",
                "name": "Chai Nat Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHAIYAPHUM_PROVINCE": {
                "id": "CHAIYAPHUM_PROVINCE",
                "geoId": "Chaiyaphum Province",
                "name": "Chaiyaphum Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHANTHABURI_PROVINCE": {
                "id": "CHANTHABURI_PROVINCE",
                "geoId": "Chanthaburi Province",
                "name": "Chanthaburi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHIANG_MAI_PROVINCE": {
                "id": "CHIANG_MAI_PROVINCE",
                "geoId": "Chiang Mai Province",
                "name": "Chiang Mai Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHIANG_RAI_PROVINCE": {
                "id": "CHIANG_RAI_PROVINCE",
                "geoId": "Chiang Rai Province",
                "name": "Chiang Rai Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHON_BURI_PROVINCE": {
                "id": "CHON_BURI_PROVINCE",
                "geoId": "Chon Buri Province",
                "name": "Chon Buri Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "CHUMPHON_PROVINCE": {
                "id": "CHUMPHON_PROVINCE",
                "geoId": "Chumphon Province",
                "name": "Chumphon Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "KALASIN": {
                "id": "KALASIN",
                "geoId": "Kalasin",
                "name": "Kalasin",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "KAMPHAENG_PHET_PROVINCE": {
                "id": "KAMPHAENG_PHET_PROVINCE",
                "geoId": "Kamphaeng Phet Province",
                "name": "Kamphaeng Phet Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "KANCHANABURI_PROVINCE": {
                "id": "KANCHANABURI_PROVINCE",
                "geoId": "Kanchanaburi Province",
                "name": "Kanchanaburi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "KHON_KAEN_PROVINCE": {
                "id": "KHON_KAEN_PROVINCE",
                "geoId": "Khon Kaen Province",
                "name": "Khon Kaen Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "KRABI_PROVINCE": {
                "id": "KRABI_PROVINCE",
                "geoId": "Krabi Province",
                "name": "Krabi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "LAMPANG_PROVINCE": {
                "id": "LAMPANG_PROVINCE",
                "geoId": "Lampang Province",
                "name": "Lampang Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "LAMPHUN_PROVINCE": {
                "id": "LAMPHUN_PROVINCE",
                "geoId": "Lamphun Province",
                "name": "Lamphun Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "LOEI_PROVINCE": {
                "id": "LOEI_PROVINCE",
                "geoId": "Loei Province",
                "name": "Loei Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "LOPBURI_PROVINCE": {
                "id": "LOPBURI_PROVINCE",
                "geoId": "Lopburi Province",
                "name": "Lopburi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "MAE_HONG_SON_PROVINCE": {
                "id": "MAE_HONG_SON_PROVINCE",
                "geoId": "Mae Hong Son Province",
                "name": "Mae Hong Son Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "MAHA_SARAKHAM_PROVINCE": {
                "id": "MAHA_SARAKHAM_PROVINCE",
                "geoId": "Maha Sarakham Province",
                "name": "Maha Sarakham Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "MUKDAHAN_PROVINCE": {
                "id": "MUKDAHAN_PROVINCE",
                "geoId": "Mukdahan Province",
                "name": "Mukdahan Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NAKHON_NAYOK_PROVINCE": {
                "id": "NAKHON_NAYOK_PROVINCE",
                "geoId": "Nakhon Nayok Province",
                "name": "Nakhon Nayok Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NAKHON_PATHOM_PROVINCE": {
                "id": "NAKHON_PATHOM_PROVINCE",
                "geoId": "Nakhon Pathom Province",
                "name": "Nakhon Pathom Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NAKHON_PHANOM_PROVINCE": {
                "id": "NAKHON_PHANOM_PROVINCE",
                "geoId": "Nakhon Phanom Province",
                "name": "Nakhon Phanom Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NAKHON_RATCHASIMA_PROVINCE": {
                "id": "NAKHON_RATCHASIMA_PROVINCE",
                "geoId": "Nakhon Ratchasima Province",
                "name": "Nakhon Ratchasima Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NAKHON_SAWAN_PROVINCE": {
                "id": "NAKHON_SAWAN_PROVINCE",
                "geoId": "Nakhon Sawan Province",
                "name": "Nakhon Sawan Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NAKHON_SI_THAMMARAT_PROVINCE": {
                "id": "NAKHON_SI_THAMMARAT_PROVINCE",
                "geoId": "Nakhon Si Thammarat Province",
                "name": "Nakhon Si Thammarat Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NAN_PROVINCE": {
                "id": "NAN_PROVINCE",
                "geoId": "Nan Province",
                "name": "Nan Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NARATHIWAT_PROVINCE": {
                "id": "NARATHIWAT_PROVINCE",
                "geoId": "Narathiwat Province",
                "name": "Narathiwat Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NONG_BUA_LAM_PHU_PROVINCE": {
                "id": "NONG_BUA_LAM_PHU_PROVINCE",
                "geoId": "Nong Bua Lam Phu Province",
                "name": "Nong Bua Lam Phu Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NONG_KHAI_PROVINCE": {
                "id": "NONG_KHAI_PROVINCE",
                "geoId": "Nong Khai Province",
                "name": "Nong Khai Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "NONTHABURI_PROVINCE": {
                "id": "NONTHABURI_PROVINCE",
                "geoId": "Nonthaburi Province",
                "name": "Nonthaburi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PATHUM_THANI_PROVINCE": {
                "id": "PATHUM_THANI_PROVINCE",
                "geoId": "Pathum Thani Province",
                "name": "Pathum Thani Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PATTANI_PROVINCE": {
                "id": "PATTANI_PROVINCE",
                "geoId": "Pattani Province",
                "name": "Pattani Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHANGNGA_PROVINCE": {
                "id": "PHANGNGA_PROVINCE",
                "geoId": "Phangnga Province",
                "name": "Phangnga Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHATTHALUNG_PROVINCE": {
                "id": "PHATTHALUNG_PROVINCE",
                "geoId": "Phatthalung Province",
                "name": "Phatthalung Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHAYAO_PROVINCE": {
                "id": "PHAYAO_PROVINCE",
                "geoId": "Phayao Province",
                "name": "Phayao Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHETCHABUN_PROVINCE": {
                "id": "PHETCHABUN_PROVINCE",
                "geoId": "Phetchabun Province",
                "name": "Phetchabun Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHETCHABURI_PROVINCE": {
                "id": "PHETCHABURI_PROVINCE",
                "geoId": "Phetchaburi Province",
                "name": "Phetchaburi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHICHIT_PROVINCE": {
                "id": "PHICHIT_PROVINCE",
                "geoId": "Phichit Province",
                "name": "Phichit Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHITSANULOK_PROVINCE": {
                "id": "PHITSANULOK_PROVINCE",
                "geoId": "Phitsanulok Province",
                "name": "Phitsanulok Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHRA_NAKHON_SI_AYUTTHAYA_PROVINCE": {
                "id": "PHRA_NAKHON_SI_AYUTTHAYA_PROVINCE",
                "geoId": "Phra Nakhon Si Ayutthaya Province",
                "name": "Phra Nakhon Si Ayutthaya Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHRAE_PROVINCE": {
                "id": "PHRAE_PROVINCE",
                "geoId": "Phrae Province",
                "name": "Phrae Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PHUKET_PROVINCE": {
                "id": "PHUKET_PROVINCE",
                "geoId": "Phuket Province",
                "name": "Phuket Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PRACHIN_BURI_PROVINCE": {
                "id": "PRACHIN_BURI_PROVINCE",
                "geoId": "Prachin Buri Province",
                "name": "Prachin Buri Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PRACHUAP_KHIRI_KHAN_PROVINCE": {
                "id": "PRACHUAP_KHIRI_KHAN_PROVINCE",
                "geoId": "Prachuap Khiri Khan Province",
                "name": "Prachuap Khiri Khan Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "RANONG_PROVINCE": {
                "id": "RANONG_PROVINCE",
                "geoId": "Ranong Province",
                "name": "Ranong Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "RATCHABURI_PROVINCE": {
                "id": "RATCHABURI_PROVINCE",
                "geoId": "Ratchaburi Province",
                "name": "Ratchaburi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "RAYONG_PROVINCE": {
                "id": "RAYONG_PROVINCE",
                "geoId": "Rayong Province",
                "name": "Rayong Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "ROI_ET_PROVINCE": {
                "id": "ROI_ET_PROVINCE",
                "geoId": "Roi Et Province",
                "name": "Roi Et Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SA_KAEO_PROVINCE": {
                "id": "SA_KAEO_PROVINCE",
                "geoId": "Sa Kaeo Province",
                "name": "Sa Kaeo Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SAKON_NAKHON_PROVINCE": {
                "id": "SAKON_NAKHON_PROVINCE",
                "geoId": "Sakon Nakhon Province",
                "name": "Sakon Nakhon Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SAMUT_PRAKAN_PROVINCE": {
                "id": "SAMUT_PRAKAN_PROVINCE",
                "geoId": "Samut Prakan Province",
                "name": "Samut Prakan Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SAMUT_SAKHON_PROVINCE": {
                "id": "SAMUT_SAKHON_PROVINCE",
                "geoId": "Samut Sakhon Province",
                "name": "Samut Sakhon Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SAMUT_SONGKHRAM_PROVINCE": {
                "id": "SAMUT_SONGKHRAM_PROVINCE",
                "geoId": "Samut Songkhram Province",
                "name": "Samut Songkhram Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SARABURI_PROVINCE": {
                "id": "SARABURI_PROVINCE",
                "geoId": "Saraburi Province",
                "name": "Saraburi Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SATUN_PROVINCE": {
                "id": "SATUN_PROVINCE",
                "geoId": "Satun Province",
                "name": "Satun Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SI_SA_KET_PROVINCE": {
                "id": "SI_SA_KET_PROVINCE",
                "geoId": "Si Sa Ket Province",
                "name": "Si Sa Ket Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SING_BURI_PROVINCE": {
                "id": "SING_BURI_PROVINCE",
                "geoId": "Sing Buri Province",
                "name": "Sing Buri Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SONGKHLA_PROVINCE": {
                "id": "SONGKHLA_PROVINCE",
                "geoId": "Songkhla Province",
                "name": "Songkhla Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SUKHOTHAI_PROVINCE": {
                "id": "SUKHOTHAI_PROVINCE",
                "geoId": "Sukhothai Province",
                "name": "Sukhothai Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SUPHAN_BURI_PROVINCE": {
                "id": "SUPHAN_BURI_PROVINCE",
                "geoId": "Suphan Buri Province",
                "name": "Suphan Buri Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SURAT_THANI_PROVINCE": {
                "id": "SURAT_THANI_PROVINCE",
                "geoId": "Surat Thani Province",
                "name": "Surat Thani Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "SURIN_PROVINCE": {
                "id": "SURIN_PROVINCE",
                "geoId": "Surin Province",
                "name": "Surin Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "TAK_PROVINCE": {
                "id": "TAK_PROVINCE",
                "geoId": "Tak Province",
                "name": "Tak Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "TRANG_PROVINCE": {
                "id": "TRANG_PROVINCE",
                "geoId": "Trang Province",
                "name": "Trang Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "TRAT_PROVINCE": {
                "id": "TRAT_PROVINCE",
                "geoId": "Trat Province",
                "name": "Trat Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "UBON_RATCHATHANI_PROVINCE": {
                "id": "UBON_RATCHATHANI_PROVINCE",
                "geoId": "Ubon Ratchathani Province",
                "name": "Ubon Ratchathani Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "UDON_THANI_PROVINCE": {
                "id": "UDON_THANI_PROVINCE",
                "geoId": "Udon Thani Province",
                "name": "Udon Thani Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "UTHAI_THANI_PROVINCE": {
                "id": "UTHAI_THANI_PROVINCE",
                "geoId": "Uthai Thani Province",
                "name": "Uthai Thani Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "UTTARADIT_PROVINCE": {
                "id": "UTTARADIT_PROVINCE",
                "geoId": "Uttaradit Province",
                "name": "Uttaradit Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "YALA_PROVINCE": {
                "id": "YALA_PROVINCE",
                "geoId": "Yala Province",
                "name": "Yala Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "YASOTHON_PROVINCE": {
                "id": "YASOTHON_PROVINCE",
                "geoId": "Yasothon Province",
                "name": "Yasothon Province",
                "description": "A first-level administrative region in Thailand.",
                "visited": false,
                "cities": []
            },
            "PATTAYA": {
                "id": "PATTAYA",
                "geoId": "Pattaya",
                "name": "Pattaya",
                "description": "A coastal resort region known for beaches, nightlife, and quick escapes from Bangkok.",
                "visited": true,
                "cities": [
                    {
                        "id": "pattaya",
                        "name": "Pattaya",
                        "description": "Visited Pattaya in Pattaya, Thailand.",
                        "visited": true
                    }
                ]
            },
            "PHUKET": {
                "id": "PHUKET",
                "geoId": "Phuket",
                "name": "Phuket",
                "description": "Thailand's island province known for beaches, resorts, old town streets, and nearby islands.",
                "visited": true,
                "cities": [
                    {
                        "id": "phuket",
                        "name": "Phuket",
                        "description": "Visited Phuket in Phuket, Thailand.",
                        "visited": true
                    }
                ]
            }
        }
    },
    "JP": {
        "states": {
            "AICHI_PREFECTURE": {
                "id": "AICHI_PREFECTURE",
                "geoId": "Aichi Prefecture",
                "name": "Aichi Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "AKITA": {
                "id": "AKITA",
                "geoId": "Akita",
                "name": "Akita",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "AOMORI": {
                "id": "AOMORI",
                "geoId": "Aomori",
                "name": "Aomori",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "CHIBA": {
                "id": "CHIBA",
                "geoId": "Chiba",
                "name": "Chiba",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "EHIME_PREFECTURE": {
                "id": "EHIME_PREFECTURE",
                "geoId": "Ehime Prefecture",
                "name": "Ehime Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "FUKUI_PREFECTURE": {
                "id": "FUKUI_PREFECTURE",
                "geoId": "Fukui Prefecture",
                "name": "Fukui Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "FUKUOKA_PREFECTURE": {
                "id": "FUKUOKA_PREFECTURE",
                "geoId": "Fukuoka Prefecture",
                "name": "Fukuoka Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "FUKUSHIMA": {
                "id": "FUKUSHIMA",
                "geoId": "Fukushima",
                "name": "Fukushima",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "GIFU_PREFECTURE": {
                "id": "GIFU_PREFECTURE",
                "geoId": "Gifu Prefecture",
                "name": "Gifu Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "GUNMA": {
                "id": "GUNMA",
                "geoId": "Gunma",
                "name": "Gunma",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "HIROSHIMA": {
                "id": "HIROSHIMA",
                "geoId": "Hiroshima",
                "name": "Hiroshima",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "HOKKAIDO": {
                "id": "HOKKAIDO",
                "geoId": "Hokkaido",
                "name": "Hokkaido",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "HYOGO_PREFECTURE": {
                "id": "HYOGO_PREFECTURE",
                "geoId": "Hyogo Prefecture",
                "name": "Hyogo Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "IBARAKI": {
                "id": "IBARAKI",
                "geoId": "Ibaraki",
                "name": "Ibaraki",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "ISHIKAWA_PREFECTURE": {
                "id": "ISHIKAWA_PREFECTURE",
                "geoId": "Ishikawa Prefecture",
                "name": "Ishikawa Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "IWATE": {
                "id": "IWATE",
                "geoId": "Iwate",
                "name": "Iwate",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "KAGAWA_PREFECTURE": {
                "id": "KAGAWA_PREFECTURE",
                "geoId": "Kagawa Prefecture",
                "name": "Kagawa Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "KAGOSHIMA_PREFECTURE": {
                "id": "KAGOSHIMA_PREFECTURE",
                "geoId": "Kagoshima Prefecture",
                "name": "Kagoshima Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "KANAGAWA": {
                "id": "KANAGAWA",
                "geoId": "Kanagawa",
                "name": "Kanagawa",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "KOCHI_PREFECTURE": {
                "id": "KOCHI_PREFECTURE",
                "geoId": "Kochi Prefecture",
                "name": "Kochi Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "KUMAMOTO": {
                "id": "KUMAMOTO",
                "geoId": "Kumamoto",
                "name": "Kumamoto",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "KYOTO_PREFECTURE": {
                "id": "KYOTO_PREFECTURE",
                "geoId": "Kyoto Prefecture",
                "name": "Kyoto Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "MIE_PREFECTURE": {
                "id": "MIE_PREFECTURE",
                "geoId": "Mie Prefecture",
                "name": "Mie Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "MIYAGI": {
                "id": "MIYAGI",
                "geoId": "Miyagi",
                "name": "Miyagi",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "MIYAZAKI_PREFECTURE": {
                "id": "MIYAZAKI_PREFECTURE",
                "geoId": "Miyazaki Prefecture",
                "name": "Miyazaki Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "NAGANO": {
                "id": "NAGANO",
                "geoId": "Nagano",
                "name": "Nagano",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "NAGASAKI_PREFECTURE": {
                "id": "NAGASAKI_PREFECTURE",
                "geoId": "Nagasaki Prefecture",
                "name": "Nagasaki Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "NARA_PREFECTURE": {
                "id": "NARA_PREFECTURE",
                "geoId": "Nara Prefecture",
                "name": "Nara Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "NIIGATA": {
                "id": "NIIGATA",
                "geoId": "Niigata",
                "name": "Niigata",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "OITA": {
                "id": "OITA",
                "geoId": "Oita",
                "name": "Oita",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "OKAYAMA_PREFECTURE": {
                "id": "OKAYAMA_PREFECTURE",
                "geoId": "Okayama Prefecture",
                "name": "Okayama Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "OKINAWA_PREFECTURE": {
                "id": "OKINAWA_PREFECTURE",
                "geoId": "Okinawa Prefecture",
                "name": "Okinawa Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "OSAKA_PREFECTURE": {
                "id": "OSAKA_PREFECTURE",
                "geoId": "Osaka Prefecture",
                "name": "Osaka Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "SAGA_PREFECTURE": {
                "id": "SAGA_PREFECTURE",
                "geoId": "Saga Prefecture",
                "name": "Saga Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "SAITAMA": {
                "id": "SAITAMA",
                "geoId": "Saitama",
                "name": "Saitama",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "SHIGA": {
                "id": "SHIGA",
                "geoId": "Shiga",
                "name": "Shiga",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "SHIMANE": {
                "id": "SHIMANE",
                "geoId": "Shimane",
                "name": "Shimane",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "SHIZUOKA": {
                "id": "SHIZUOKA",
                "geoId": "Shizuoka",
                "name": "Shizuoka",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "TOCHIGI": {
                "id": "TOCHIGI",
                "geoId": "Tochigi",
                "name": "Tochigi",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "TOKUSHIMA_PREFECTURE": {
                "id": "TOKUSHIMA_PREFECTURE",
                "geoId": "Tokushima Prefecture",
                "name": "Tokushima Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "TOKYO": {
                "id": "TOKYO",
                "geoId": "Tokyo",
                "name": "Tokyo",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "TOTTORI_PREFECTURE": {
                "id": "TOTTORI_PREFECTURE",
                "geoId": "Tottori Prefecture",
                "name": "Tottori Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "TOYAMA": {
                "id": "TOYAMA",
                "geoId": "Toyama",
                "name": "Toyama",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "WAKAYAMA_PREFECTURE": {
                "id": "WAKAYAMA_PREFECTURE",
                "geoId": "Wakayama Prefecture",
                "name": "Wakayama Prefecture",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "YAMAGATA": {
                "id": "YAMAGATA",
                "geoId": "Yamagata",
                "name": "Yamagata",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "YAMAGUCHI": {
                "id": "YAMAGUCHI",
                "geoId": "Yamaguchi",
                "name": "Yamaguchi",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            },
            "YAMANASHI": {
                "id": "YAMANASHI",
                "geoId": "Yamanashi",
                "name": "Yamanashi",
                "description": "A first-level administrative region in Japan.",
                "visited": false,
                "cities": []
            }
        }
    }
};
