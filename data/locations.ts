import { Country, TravelData } from "@/types";

export const COUNTRIES: Country[] = [
    {
        "id": "IN",
        "name": "India",
        "flag": "🇮🇳"
    },
    {
        "id": "TH",
        "name": "Thailand",
        "flag": "🇹🇭"
    },
    {
        "id": "AE",
        "name": "United Arab Emirates",
        "flag": "🇦🇪"
    },
    {
        "id": "JP",
        "name": "Japan",
        "flag": "🇯🇵"
    }
];

export const TRAVEL_DATA: TravelData = {
    "IN": {
        "destinations": {
            "bengaluru": {
                "id": "bengaluru",
                "name": "Bengaluru",
                "description": "Visited Bengaluru in Karnataka, India.",
                "visited": true,
                "travelOrder": 1,
                "photoFolder": "India/Bengaluru"
            },
            "kukke-subramanya": {
                "id": "kukke-subramanya",
                "name": "Kukke Subramanya",
                "description": "Visited Kukke Subramanya in India.",
                "travelOrder": 2,
                "photoFolder": "India/Kukke Subramanya",
                "visited": true
            },
            "gokarna": {
                "id": "gokarna",
                "name": "Gokarna",
                "description": "Visited Gokarna in Karnataka, India.",
                "visited": true,
                "travelOrder": 3,
                "photoFolder": "India/Gokarna"
            },
            "mysuru": {
                "id": "mysuru",
                "name": "Mysuru",
                "description": "Visited Mysuru in India.",
                "visited": true,
                "photoFolder": "India/Mysuru",
                "travelOrder": 4
            },
            "madikeri": {
                "id": "madikeri",
                "name": "Madikeri",
                "description": "Visited Madikeri in India.",
                "visited": true,
                "photoFolder": "India/Madikeri",
                "travelOrder": 5
            },
            "chikkamagalur": {
                "id": "chikkamagalur",
                "name": "Chikkamagalur",
                "description": "Visited Chikkamagalur in India.",
                "photoFolder": "India/Chikkamagalur",
                "visited": true,
                "travelOrder": 6
            },
            "hampi": {
                "id": "hampi",
                "name": "Hampi",
                "description": "Visited Hampi in Karnataka, India.",
                "visited": true,
                "travelOrder": 7,
                "photoFolder": "India/Hampi"
            },
            "udhagamandalam": {
                "id": "udhagamandalam",
                "name": "Udhagamandalam",
                "description": "Visited Udhagamandalam in India.",
                "photoFolder": "India/Udhagamandalam",
                "visited": true,
                "travelOrder": 8
            },
            "kochi": {
                "id": "kochi",
                "name": "Kochi",
                "description": "Visited Kochi in Kerala, India.",
                "visited": true,
                "travelOrder": 9,
                "photoFolder": "India/Kochi"
            },
            "alappuzha": {
                "id": "alappuzha",
                "name": "Alappuzha",
                "description": "Visited Alappuzha in India.",
                "photoFolder": "India/Alappuzha",
                "visited": true,
                "travelOrder": 10
            },
            "puducherry": {
                "id": "puducherry",
                "name": "Puducherry",
                "description": "Visited Puducherry in Puducherry, India.",
                "visited": true,
                "travelOrder": 11,
                "photoFolder": "India/Puducherry"
            },
            "goa": {
                "id": "goa",
                "name": "Goa",
                "description": "Visited Goa in Goa, India.",
                "visited": true,
                "travelOrder": 12,
                "photoFolder": "India/Goa"
            },
            "mumbai": {
                "id": "mumbai",
                "name": "Mumbai",
                "description": "Visited Mumbai in Maharashtra, India.",
                "visited": true,
                "travelOrder": 13,
                "photoFolder": "India/Mumbai"
            },
            "pune": {
                "id": "pune",
                "name": "Pune",
                "description": "Visited Pune in Maharashtra, India.",
                "visited": true,
                "travelOrder": 14,
                "photoFolder": "India/Pune"
            },
            "sambhajinagar": {
                "id": "sambhajinagar",
                "name": "Sambhajinagar",
                "description": "Visited Sambhajinagar in India.",
                "photoFolder": "India/Sambhajinagar",
                "visited": true,
                "travelOrder": 15
            },
            "nashik": {
                "id": "nashik",
                "name": "Nashik",
                "description": "Visited Nashik in Maharashtra, India.",
                "visited": true,
                "travelOrder": 16,
                "photoFolder": "India/Nashik"
            },
            "surat": {
                "id": "surat",
                "name": "Surat",
                "description": "Visited Surat in Gujarat, India.",
                "visited": true,
                "travelOrder": 17,
                "photoFolder": "India/Surat"
            },
            "vadodara": {
                "id": "vadodara",
                "name": "Vadodara",
                "description": "Visited Vadodara in Gujarat, India.",
                "visited": true,
                "travelOrder": 18,
                "photoFolder": "India/Vadodara"
            },
            "delhi": {
                "id": "delhi",
                "name": "Delhi",
                "description": "Visited Delhi in Delhi, India.",
                "visited": true,
                "travelOrder": 19,
                "photoFolder": "India/Delhi"
            },
            "manali": {
                "id": "manali",
                "name": "Manali",
                "description": "Visited Manali in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 20,
                "photoFolder": "India/Manali"
            },
            "kasol": {
                "id": "kasol",
                "name": "Kasol",
                "description": "Visited Kasol in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 21,
                "photoFolder": "India/Kasol"
            },
            "manikaran": {
                "id": "manikaran",
                "name": "Manikaran",
                "description": "Visited Manikaran in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 22,
                "photoFolder": "India/Manikaran"
            },
            "bir-billing": {
                "id": "bir-billing",
                "name": "Bir Billing",
                "description": "Visited Bir Billing in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 23,
                "photoFolder": "India/Bir Billing"
            },
            "mcleodganj": {
                "id": "mcleodganj",
                "name": "McLeodganj",
                "description": "Visited McLeodganj in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 24,
                "photoFolder": "India/McLeodganj"
            },
            "dharamshala": {
                "id": "dharamshala",
                "name": "Dharamshala",
                "description": "Visited Dharamshala in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 25,
                "photoFolder": "India/Dharamshala"
            },
            "tosh": {
                "id": "tosh",
                "name": "Tosh",
                "description": "Visited Tosh in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 26,
                "photoFolder": "India/Tosh"
            },
            "malana": {
                "id": "malana",
                "name": "Malana",
                "description": "Visited Malana in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 27,
                "photoFolder": "India/Malana"
            },
            "rishikesh": {
                "id": "rishikesh",
                "name": "Rishikesh",
                "description": "Visited Rishikesh in Uttarakhand, India.",
                "visited": true,
                "travelOrder": 28,
                "photoFolder": "India/Rishikesh"
            },
            "jaipur": {
                "id": "jaipur",
                "name": "Jaipur",
                "description": "Visited Jaipur in Rajasthan, India.",
                "visited": true,
                "travelOrder": 29,
                "photoFolder": "India/Jaipur"
            },
            "jaisalmer": {
                "id": "jaisalmer",
                "name": "Jaisalmer",
                "description": "Visited Jaisalmer in Rajasthan, India.",
                "visited": true,
                "travelOrder": 30,
                "photoFolder": "India/Jaisalmer"
            },
            "hyderabad": {
                "id": "hyderabad",
                "name": "Hyderabad",
                "description": "Visited Hyderabad in Telangana, India.",
                "visited": true,
                "travelOrder": 31,
                "photoFolder": "India/Hyderabad"
            },
            "dehradun": {
                "id": "dehradun",
                "name": "Dehradun",
                "description": "Visited Dehradun in Uttarakhand, India.",
                "visited": true,
                "travelOrder": 32,
                "photoFolder": "India/Dehradun"
            },
            "sankri": {
                "id": "sankri",
                "name": "Sankri",
                "description": "Visited Sankri in Uttarakhand, India.",
                "visited": true,
                "travelOrder": 33,
                "photoFolder": "India/Sankri"
            },
            "muthathi": {
                "id": "muthathi",
                "name": "Muthathi",
                "description": "Visited Muthathi in Karnataka, India.",
                "visited": true,
                "travelOrder": 36,
                "photoFolder": "India/Muthathi"
            },
            "mulki": {
                "id": "mulki",
                "name": "Mulki",
                "description": "Visited Mulki in Karnataka, India.",
                "visited": true,
                "travelOrder": 37,
                "photoFolder": "India/Mulki"
            },
            "coimbatore": {
                "id": "coimbatore",
                "name": "Coimbatore",
                "description": "Visited Coimbatore in Tamil Nadu, India.",
                "visited": true,
                "travelOrder": 38,
                "photoFolder": "India/Coimbatore"
            },
            "munnar": {
                "id": "munnar",
                "name": "Munnar",
                "description": "Visited Munnar in Kerala, India.",
                "visited": true,
                "travelOrder": 39,
                "photoFolder": "India/Munnar"
            },
            "kodaikanal": {
                "id": "kodaikanal",
                "name": "Kodaikanal",
                "description": "Visited Kodaikanal in Tamil Nadu, India.",
                "visited": true,
                "travelOrder": 40,
                "photoFolder": "India/Kodaikanal"
            },
            "chennai": {
                "id": "chennai",
                "name": "Chennai",
                "description": "Visited Chennai in Tamil Nadu, India.",
                "visited": true,
                "travelOrder": 41,
                "photoFolder": "India/Chennai"
            },
            "mahabalipuram": {
                "id": "mahabalipuram",
                "name": "Mahabalipuram",
                "description": "Visited Mahabalipuram in Tamil Nadu, India.",
                "visited": true,
                "travelOrder": 42,
                "photoFolder": "India/Mahabalipuram"
            },
            "madurai": {
                "id": "madurai",
                "name": "Madurai",
                "description": "Visited Madurai in Tamil Nadu, India.",
                "visited": true,
                "travelOrder": 43,
                "photoFolder": "India/Madurai"
            },
            "nagercoil": {
                "id": "nagercoil",
                "name": "Nagercoil",
                "description": "Visited Nagercoil in Tamil Nadu, India.",
                "visited": true,
                "travelOrder": 44,
                "photoFolder": "India/Nagercoil"
            },
            "kanyakumari": {
                "id": "kanyakumari",
                "name": "Kanyakumari",
                "description": "Visited Kanyakumari in Tamil Nadu, India.",
                "visited": true,
                "travelOrder": 45,
                "photoFolder": "India/Kanyakumari"
            },
            "kozhikode": {
                "id": "kozhikode",
                "name": "Kozhikode",
                "description": "Visited Kozhikode in Kerala, India.",
                "visited": true,
                "travelOrder": 46,
                "photoFolder": "India/Kozhikode"
            },
            "varkala": {
                "id": "varkala",
                "name": "Varkala",
                "description": "Visited Varkala in Kerala, India.",
                "visited": true,
                "travelOrder": 47,
                "photoFolder": "India/Varkala"
            },
            "chadayamangalam": {
                "id": "chadayamangalam",
                "name": "Chadayamangalam",
                "description": "Visited Chadayamangalam in Kerala, India.",
                "visited": true,
                "travelOrder": 48,
                "photoFolder": "India/Chadayamangalam"
            },
            "thiruvunanthapuram": {
                "id": "thiruvunanthapuram",
                "name": "Thiruvunanthapuram",
                "description": "Visited Thiruvunanthapuram in Kerala, India.",
                "visited": true,
                "travelOrder": 49,
                "photoFolder": "India/Thiruvunanthapuram"
            },
            "amritsar": {
                "id": "amritsar",
                "name": "Amritsar",
                "description": "Visited Amritsar in Punjab, India.",
                "visited": true,
                "travelOrder": 50,
                "photoFolder": "India/Amritsar"
            },
            "chandigarh": {
                "id": "chandigarh",
                "name": "Chandigarh",
                "description": "Visited Chandigarh in Punjab, India.",
                "visited": true,
                "travelOrder": 51,
                "photoFolder": "India/Chandigarh"
            },
            "wagah": {
                "id": "wagah",
                "name": "Wagah",
                "description": "Visited Wagah in Punjab, India.",
                "visited": true,
                "travelOrder": 52,
                "photoFolder": "India/Wagah"
            },
            "govindghat": {
                "id": "govindghat",
                "name": "Govindghat",
                "description": "Visited Govindghat in Uttarakhand, India.",
                "visited": true,
                "travelOrder": 53,
                "photoFolder": "India/Govindghat"
            },
            "gangharia": {
                "id": "gangharia",
                "name": "Gangharia",
                "description": "Visited Gangharia in Uttarakhand, India.",
                "visited": true,
                "travelOrder": 54,
                "photoFolder": "India/Gangharia"
            },
            "valley-of-flowers": {
                "id": "valley-of-flowers",
                "name": "Valley of Flowers",
                "description": "Visited Valley of Flowers in Uttarakhand, India.",
                "visited": true,
                "travelOrder": 55,
                "photoFolder": "India/Valley of Flowers"
            },
            "hemkund-sahib": {
                "id": "hemkund-sahib",
                "name": "Hemkund sahib",
                "description": "Visited Hemkund Sahib in Uttarakhand, India.",
                "visited": true,
                "travelOrder": 56,
                "photoFolder": "India/Hemkund sahib"
            },
            "khandala": {
                "id": "khandala",
                "name": "Khandala",
                "description": "Visited Khandala in Maharashtra, India.",
                "visited": true,
                "travelOrder": 57,
                "photoFolder": "India/Khandala"
            },
            "lonavala": {
                "id": "lonavala",
                "name": "Lonavala",
                "description": "Visited Lonavala in Maharashtra, India.",
                "visited": true,
                "travelOrder": 58,
                "photoFolder": "India/Lonavala"
            },
            "manguluru": {
                "id": "manguluru",
                "name": "Manguluru",
                "description": "Visited Manguluru in India.",
                "visited": true,
                "photoFolder": "India/Manguluru",
                "travelOrder": 59
            },
            "udupi": {
                "id": "udupi",
                "name": "Udupi",
                "description": "Visited Udupi in Karnataka, India.",
                "visited": true,
                "travelOrder": 60,
                "photoFolder": "India/Udupi"
            },
            "kundapura": {
                "id": "kundapura",
                "name": "Kundapura",
                "description": "Visited Kundapura in India.",
                "photoFolder": "India/Kundapura",
                "visited": true,
                "travelOrder": 61
            },
            "murudeshwar": {
                "id": "murudeshwar",
                "name": "Murudeshwar",
                "description": "Visited Murudeshwar in Karnataka, India.",
                "visited": true,
                "travelOrder": 62,
                "photoFolder": "India/Murudeshwar"
            },
            "manipal": {
                "id": "manipal",
                "name": "Manipal",
                "description": "Visited Manipal in Karnataka, India.",
                "visited": true,
                "travelOrder": 63,
                "photoFolder": "India/Manipal"
            },
            "belum": {
                "id": "belum",
                "name": "Belum",
                "description": "Visited Belum in Andhra Pradesh, India.",
                "visited": true,
                "travelOrder": 64,
                "photoFolder": "India/Belum"
            },
            "gandikota": {
                "id": "gandikota",
                "name": "Gandikota",
                "description": "Visited Gandikota in Andhra Pradesh, India.",
                "visited": true,
                "travelOrder": 65,
                "photoFolder": "India/Gandikota"
            },
            "vijayawada": {
                "id": "vijayawada",
                "name": "Vijayawada",
                "description": "Visited Vijayawada in Andhra Pradesh, India.",
                "visited": true,
                "travelOrder": 66,
                "photoFolder": "India/Vijayawada"
            },
            "visakapatnam": {
                "id": "visakapatnam",
                "name": "Visakapatnam",
                "description": "Visited Visakapatnam in India.",
                "photoFolder": "India/Visakapatnam",
                "visited": true,
                "travelOrder": 67
            },
            "tirupati": {
                "id": "tirupati",
                "name": "Tirupati",
                "description": "Visited Tirupati in Andhra Pradesh, India.",
                "visited": true,
                "travelOrder": 68,
                "photoFolder": "India/Tirupati"
            },
            "ajmer": {
                "id": "ajmer",
                "name": "Ajmer",
                "description": "Visited Ajmer in Rajasthan, India.",
                "visited": true,
                "travelOrder": 69,
                "photoFolder": "India/Ajmer"
            },
            "pushkar": {
                "id": "pushkar",
                "name": "Pushkar",
                "description": "Visited Pushkar in Rajasthan, India.",
                "visited": true,
                "travelOrder": 70,
                "photoFolder": "India/Pushkar"
            },
            "jodhpur": {
                "id": "jodhpur",
                "name": "Jodhpur",
                "description": "Visited Jodhpur in Rajasthan, India.",
                "visited": true,
                "travelOrder": 71,
                "photoFolder": "India/Jodhpur"
            },
            "udaipur": {
                "id": "udaipur",
                "name": "Udaipur",
                "description": "Visited Udaipur in Rajasthan, India.",
                "visited": true,
                "travelOrder": 72,
                "photoFolder": "India/Udaipur"
            },
            "ahmedabad": {
                "id": "ahmedabad",
                "name": "Ahmedabad",
                "description": "Visited Ahmedabad in Gujarat, India.",
                "visited": true,
                "travelOrder": 73,
                "photoFolder": "India/Ahmedabad"
            },
            "wayanad": {
                "id": "wayanad",
                "name": "Wayanad",
                "description": "Visited Wayanad in Kerala, India.",
                "visited": true,
                "travelOrder": 74,
                "photoFolder": "India/Wayanad"
            },
            "kalasa": {
                "id": "kalasa",
                "name": "Kalasa",
                "description": "Visited Kalasa in Karnataka, India.",
                "visited": true,
                "travelOrder": 75,
                "photoFolder": "India/Kalasa"
            },
            "belur": {
                "id": "belur",
                "name": "Belur",
                "description": "Visited Belur in Karnataka, India.",
                "visited": true,
                "travelOrder": 76,
                "photoFolder": "India/Belur"
            },
            "leh": {
                "id": "leh",
                "name": "Leh",
                "description": "Visited Leh in Ladakh, India.",
                "visited": true,
                "travelOrder": 77,
                "photoFolder": "India/Leh"
            },
            "diskit": {
                "id": "diskit",
                "name": "Diskit",
                "description": "Visited Diskit in Ladakh, India.",
                "visited": true,
                "travelOrder": 78,
                "photoFolder": "India/Diskit"
            },
            "hundar": {
                "id": "hundar",
                "name": "Hundar",
                "description": "Visited Hundar in Ladakh, India.",
                "visited": true,
                "travelOrder": 79,
                "photoFolder": "India/Hundar"
            },
            "pangong": {
                "id": "pangong",
                "name": "Pangong",
                "description": "Visited Pangong in Ladakh, India.",
                "visited": true,
                "travelOrder": 80,
                "photoFolder": "India/Pangong"
            },
            "hemis": {
                "id": "hemis",
                "name": "Hemis",
                "description": "Visited Hemis in Ladakh, India.",
                "visited": true,
                "travelOrder": 81,
                "photoFolder": "India/Hemis"
            },
            "guruvayur": {
                "id": "guruvayur",
                "name": "Guruvayur",
                "description": "Visited Guruvayur in Kerala, India.",
                "visited": true,
                "travelOrder": 83,
                "photoFolder": "India/Guruvayur"
            },
            "srinagar": {
                "id": "srinagar",
                "name": "Srinagar",
                "description": "Visited Srinagar in India.",
                "photoFolder": "India/Srinagar",
                "visited": true,
                "travelOrder": 84
            },
            "sonamarg": {
                "id": "sonamarg",
                "name": "Sonamarg",
                "description": "Visited Sonamarg in Jammu & Kashmir, India.",
                "visited": true,
                "travelOrder": 85,
                "photoFolder": "India/Sonamarg"
            },
            "kashmir-great-lakes": {
                "id": "kashmir-great-lakes",
                "name": "Kashmir Great Lakes",
                "description": "Visited Kashmir Great Lakes in Jammu & Kashmir, India.",
                "visited": true,
                "travelOrder": 86,
                "photoFolder": "India/Kashmir Great Lakes"
            },
            "varanasi": {
                "id": "varanasi",
                "name": "Varanasi",
                "description": "Visited Varanasi in Uttar Pradesh, India.",
                "visited": true,
                "travelOrder": 87,
                "photoFolder": "India/Varanasi"
            },
            "sarnath": {
                "id": "sarnath",
                "name": "Sarnath",
                "description": "Visited Sarnath in Uttar Pradesh, India.",
                "visited": true,
                "travelOrder": 88,
                "photoFolder": "India/Sarnath"
            },
            "prayagraj": {
                "id": "prayagraj",
                "name": "Prayagraj",
                "description": "Visited Prayagraj in Uttar Pradesh, India.",
                "visited": true,
                "travelOrder": 89,
                "photoFolder": "India/Prayagraj"
            },
            "agra": {
                "id": "agra",
                "name": "Agra",
                "description": "Visited Agra in Uttar Pradesh, India.",
                "visited": true,
                "travelOrder": 90,
                "photoFolder": "India/Agra"
            },
            "lucknow": {
                "id": "lucknow",
                "name": "Lucknow",
                "description": "Visited Lucknow in Uttar Pradesh, India.",
                "visited": true,
                "travelOrder": 91,
                "photoFolder": "India/Lucknow"
            },
            "chikkaballapur": {
                "id": "chikkaballapur",
                "name": "Chikkaballapur",
                "description": "Visited Chikkaballapur in India.",
                "photoFolder": "India/Chikkaballapur",
                "visited": true,
                "travelOrder": 92
            },
            "bhubaneshwar": {
                "id": "bhubaneshwar",
                "name": "Bhubaneshwar",
                "description": "Visited Bhubaneshwar in India.",
                "travelOrder": 93,
                "photoFolder": "India/Bhubaneshwar",
                "visited": true
            },
            "konark": {
                "id": "konark",
                "name": "Konark",
                "description": "Visited Konark in Odisha, India.",
                "visited": true,
                "travelOrder": 94,
                "photoFolder": "India/Konark"
            },
            "puri": {
                "id": "puri",
                "name": "Puri",
                "description": "Visited Puri in Odisha, India.",
                "visited": true,
                "travelOrder": 95,
                "photoFolder": "India/Puri"
            },
            "chilika": {
                "id": "chilika",
                "name": "Chilika",
                "description": "Visited Chilika in Odisha, India.",
                "visited": true,
                "travelOrder": 96,
                "photoFolder": "India/Chilika"
            },
            "shillong": {
                "id": "shillong",
                "name": "Shillong",
                "description": "Visited Shillong in Meghalaya, India.",
                "visited": true,
                "travelOrder": 97,
                "photoFolder": "India/Shillong"
            },
            "sohra": {
                "id": "sohra",
                "name": "Sohra",
                "description": "Visited Sohra in Meghalaya, India.",
                "visited": true,
                "travelOrder": 98,
                "photoFolder": "India/Sohra"
            },
            "dawki": {
                "id": "dawki",
                "name": "Dawki",
                "description": "Visited Dawki in Meghalaya, India.",
                "visited": true,
                "travelOrder": 99,
                "photoFolder": "India/Dawki"
            },
            "sri-vijaya-puram": {
                "id": "sri-vijaya-puram",
                "name": "Sri Vijaya Puram",
                "description": "Visited Sri Vijaya Puram in India.",
                "photoFolder": "India/Sri Vijaya Puram",
                "visited": true,
                "travelOrder": 100
            },
            "swaraj-dweep": {
                "id": "swaraj-dweep",
                "name": "Swaraj Dweep",
                "description": "Visited Swaraj Dweep in India.",
                "photoFolder": "India/Swaraj Dweep",
                "visited": true,
                "travelOrder": 101
            },
            "shaheed-dweep": {
                "id": "shaheed-dweep",
                "name": "Shaheed Dweep",
                "description": "Visited Shaheed Dweep in India.",
                "photoFolder": "India/Shaheed Dweep",
                "visited": true,
                "travelOrder": 102
            },
            "shivamogga": {
                "id": "shivamogga",
                "name": "Shivamogga",
                "description": "Visited Shivamogga in Karnataka, India.",
                "visited": true,
                "travelOrder": 106,
                "photoFolder": "India/Shivamogga"
            },
            "bhadravathi": {
                "id": "bhadravathi",
                "name": "Bhadravathi",
                "description": "Visited Bhadravathi in India.",
                "travelOrder": 107,
                "photoFolder": "India/Bhadravathi",
                "visited": true
            },
            "yuksum": {
                "id": "yuksum",
                "name": "Yuksum",
                "description": "Visited Yuksum in Sikkim, India.",
                "visited": true,
                "travelOrder": 108,
                "photoFolder": "India/Yuksum"
            },
            "siliguri": {
                "id": "siliguri",
                "name": "Siliguri",
                "description": "Visited Siliguri in West Bengal, India.",
                "visited": true,
                "travelOrder": 109,
                "photoFolder": "India/Siliguri"
            },
            "tumkur": {
                "id": "tumkur",
                "name": "Tumkur",
                "description": "Visited Tumkur in Karnataka, India.",
                "visited": true,
                "travelOrder": 110,
                "photoFolder": "India/Tumkur"
            },
            "doddaballapur": {
                "id": "doddaballapur",
                "name": "Doddaballapur",
                "description": "Visited Doddaballapur in India.",
                "photoFolder": "India/Doddaballapur",
                "visited": true,
                "travelOrder": 111
            },
            "kalsubai": {
                "id": "kalsubai",
                "name": "Kalsubai",
                "description": "Visited Kalsubai in India.",
                "photoFolder": "India/Kalsubai",
                "visited": true,
                "travelOrder": 112
            },
            "guwahati": {
                "id": "guwahati",
                "name": "Guwahati",
                "description": "Visited Guwahati in India.",
                "photoFolder": "India/Guwahati",
                "visited": true,
                "travelOrder": 113
            },
            "itanagar": {
                "id": "itanagar",
                "name": "Itanagar",
                "description": "Visited Itanagar in Arunachal Pradesh, India.",
                "visited": true,
                "travelOrder": 114,
                "photoFolder": "India/Itanagar"
            },
            "ziro": {
                "id": "ziro",
                "name": "Ziro",
                "description": "Visited Ziro in Arunachal Pradesh, India.",
                "visited": true,
                "travelOrder": 115,
                "photoFolder": "India/Ziro"
            },
            "agumbe": {
                "id": "agumbe",
                "name": "Agumbe",
                "description": "Visited Agumbe in Karnataka, India.",
                "visited": true,
                "travelOrder": 116,
                "photoFolder": "India/Agumbe"
            },
            "dimapur": {
                "id": "dimapur",
                "name": "Dimapur",
                "description": "Visited Dimapur in Nagaland, India.",
                "visited": true,
                "travelOrder": 117,
                "photoFolder": "India/Dimapur"
            },
            "kohima": {
                "id": "kohima",
                "name": "Kohima",
                "description": "Visited Kohima in Nagaland, India.",
                "visited": true,
                "travelOrder": 118,
                "photoFolder": "India/Kohima"
            },
            "kisama": {
                "id": "kisama",
                "name": "Kisama",
                "description": "Visited Kisama in Nagaland, India.",
                "visited": true,
                "travelOrder": 119,
                "photoFolder": "India/Kisama"
            },
            "dzuleke": {
                "id": "dzuleke",
                "name": "Dzuleke",
                "description": "Visited Dzuleke in Nagaland, India.",
                "visited": true,
                "travelOrder": 120,
                "photoFolder": "India/Dzuleke"
            },
            "dzukou-valley": {
                "id": "dzukou-valley",
                "name": "Dzukou Valley",
                "description": "Visited Dzukou Valley in India.",
                "photoFolder": "India/Dzukou Valley",
                "visited": true,
                "travelOrder": 121
            },
            "khonoma": {
                "id": "khonoma",
                "name": "Khonoma",
                "description": "Visited Khonoma in Nagaland, India.",
                "visited": true,
                "travelOrder": 122,
                "photoFolder": "India/Khonoma"
            },
            "agartala": {
                "id": "agartala",
                "name": "Agartala",
                "description": "Visited Agartala in Tripura, India.",
                "visited": true,
                "travelOrder": 123,
                "photoFolder": "India/Agartala"
            },
            "bodhgaya": {
                "id": "bodhgaya",
                "name": "Bodhgaya",
                "description": "Visited Bodhgaya in Bihar, India.",
                "visited": true,
                "travelOrder": 124,
                "photoFolder": "India/Bodhgaya"
            },
            "jamshedpur": {
                "id": "jamshedpur",
                "name": "Jamshedpur",
                "description": "Visited Jamshedpur in Jharkhand, India.",
                "visited": true,
                "travelOrder": 125,
                "photoFolder": "India/Jamshedpur"
            },
            "kolkata": {
                "id": "kolkata",
                "name": "Kolkata",
                "description": "Visited Kolkata in West Bengal, India.",
                "visited": true,
                "travelOrder": 126,
                "photoFolder": "India/Kolkata"
            },
            "imphal": {
                "id": "imphal",
                "name": "Imphal",
                "description": "Visited Imphal in Manipur, India.",
                "visited": true,
                "travelOrder": 127,
                "photoFolder": "India/Imphal"
            },
            "aizawl": {
                "id": "aizawl",
                "name": "Aizawl",
                "description": "Visited Aizawl in Mizoram, India.",
                "visited": true,
                "travelOrder": 128,
                "photoFolder": "India/Aizawl"
            },
            "banikhet": {
                "id": "banikhet",
                "name": "Banikhet",
                "description": "Visited Banikhet in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 129,
                "photoFolder": "India/Banikhet"
            },
            "dalhousie": {
                "id": "dalhousie",
                "name": "Dalhousie",
                "description": "Visited Dalhousie in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 130,
                "photoFolder": "India/Dalhousie"
            },
            "khajjiar": {
                "id": "khajjiar",
                "name": "Khajjiar",
                "description": "Visited Khajjiar in Himachal Pradesh, India.",
                "visited": true,
                "travelOrder": 131,
                "photoFolder": "India/Khajjiar"
            },
            "gurugram": {
                "id": "gurugram",
                "name": "Gurugram",
                "description": "Visited Gurugram in Haryana, India.",
                "visited": true,
                "travelOrder": 132,
                "photoFolder": "India/Gurugram"
            },
            "jabalpur": {
                "id": "jabalpur",
                "name": "Jabalpur",
                "description": "Visited Jabalpur in Madhya Pradesh, India.",
                "visited": true,
                "travelOrder": 133,
                "photoFolder": "India/Jabalpur"
            },
            "khajuraho": {
                "id": "khajuraho",
                "name": "Khajuraho",
                "description": "Visited Khajuraho in Madhya Pradesh, India.",
                "visited": true,
                "travelOrder": 134,
                "photoFolder": "India/Khajuraho"
            },
            "raipur": {
                "id": "raipur",
                "name": "Raipur",
                "description": "Visited Raipur in Chhattisgarh, India.",
                "visited": true,
                "travelOrder": 135,
                "photoFolder": "India/Raipur"
            },
            "coonoor": {
                "id": "coonoor",
                "name": "Coonoor",
                "description": "Visited Coonoor in India.",
                "photoFolder": "India/Coonoor",
                "visited": true,
                "travelOrder": 136
            },
            "irandadi": {
                "id": "irandadi",
                "name": "Irandadi",
                "description": "Visited Irandadi in Karnataka, India.",
                "visited": true,
                "travelOrder": 137,
                "photoFolder": "India/Irandadi"
            }
        }
    },
    "AE": {
        "destinations": {
            "dubai": {
                "id": "dubai",
                "name": "Dubai",
                "description": "Visited Dubai in United Arab Emirates.",
                "visited": true,
                "photoFolder": "UAE/Dubai",
                "travelOrder": 34
            },
            "abu-dhabi": {
                "id": "abu-dhabi",
                "name": "Abu Dhabi",
                "description": "Visited Abu Dhabi in United Arab Emirates.",
                "visited": true,
                "photoFolder": "UAE/Abu Dhabi",
                "travelOrder": 35
            }
        }
    },
    "TH": {
        "destinations": {
            "bangkok": {
                "id": "bangkok",
                "name": "Bangkok",
                "description": "Visited Bangkok in Bangkok, Thailand.",
                "visited": true,
                "travelOrder": 103,
                "photoFolder": "Thailand/Bangkok"
            },
            "pattaya": {
                "id": "pattaya",
                "name": "Pattaya",
                "description": "Visited Pattaya in Pattaya, Thailand.",
                "visited": true,
                "travelOrder": 104,
                "photoFolder": "Thailand/Pattaya"
            },
            "phuket": {
                "id": "phuket",
                "name": "Phuket",
                "description": "Visited Phuket in Phuket, Thailand.",
                "visited": true,
                "travelOrder": 105,
                "photoFolder": "Thailand/Phuket"
            }
        }
    }
};
