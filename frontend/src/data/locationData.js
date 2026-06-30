// ============================================================
// LOCATION DATA — Countries, Indian States, Districts, Cities & Pincodes
// ============================================================

export const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda",
  "Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros",
  "Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark",
  "Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
  "Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji",
  "Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
  "Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras",
  "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait",
  "Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya",
  "Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
  "Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
  "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique",
  "Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan",
  "Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines",
  "Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
  "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino",
  "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
  "South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan",
  "Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania",
  "Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia",
  "Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu",
  "Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

// ---- INDIA DATA ----
// Structure: { stateName: { districtName: { cities: [{name, pincode}] } } }

export const INDIA_DATA = {
  "Andhra Pradesh": {
    "Visakhapatnam": {
      cities: [
        { name: "Visakhapatnam", pincode: "530001" },
        { name: "Gajuwaka", pincode: "530026" },
        { name: "Bheemunipatnam", pincode: "531163" },
        { name: "Anakapalle", pincode: "531001" },
        { name: "Pendurthi", pincode: "531173" }
      ]
    },
    "Krishna": {
      cities: [
        { name: "Vijayawada", pincode: "520001" },
        { name: "Machilipatnam", pincode: "521001" },
        { name: "Gudivada", pincode: "521301" },
        { name: "Nuzvid", pincode: "521201" }
      ]
    },
    "Guntur": {
      cities: [
        { name: "Guntur", pincode: "522001" },
        { name: "Tenali", pincode: "522201" },
        { name: "Narasaraopet", pincode: "522601" },
        { name: "Bapatla", pincode: "522101" }
      ]
    },
    "Nellore": {
      cities: [
        { name: "Nellore", pincode: "524001" },
        { name: "Kavali", pincode: "524201" },
        { name: "Gudur", pincode: "524101" }
      ]
    },
    "Kurnool": {
      cities: [
        { name: "Kurnool", pincode: "518001" },
        { name: "Adoni", pincode: "518301" },
        { name: "Nandyal", pincode: "518501" }
      ]
    },
    "Kadapa": {
      cities: [
        { name: "Kadapa", pincode: "516001" },
        { name: "Proddatur", pincode: "516360" },
        { name: "Rajampet", pincode: "516115" }
      ]
    },
    "Anantapur": {
      cities: [
        { name: "Anantapur", pincode: "515001" },
        { name: "Hindupur", pincode: "515201" },
        { name: "Guntakal", pincode: "515801" }
      ]
    },
    "Chittoor": {
      cities: [
        { name: "Chittoor", pincode: "517001" },
        { name: "Tirupati", pincode: "517501" },
        { name: "Madanapalle", pincode: "517325" }
      ]
    },
    "East Godavari": {
      cities: [
        { name: "Rajahmundry", pincode: "533101" },
        { name: "Kakinada", pincode: "533001" },
        { name: "Amalapuram", pincode: "533201" }
      ]
    },
    "West Godavari": {
      cities: [
        { name: "Eluru", pincode: "534001" },
        { name: "Bhimavaram", pincode: "534201" },
        { name: "Tanuku", pincode: "534211" }
      ]
    },
    "Srikakulam": {
      cities: [
        { name: "Srikakulam", pincode: "532001" },
        { name: "Narasannapeta", pincode: "532421" },
        { name: "Palasa", pincode: "532221" }
      ]
    },
    "Vizianagaram": {
      cities: [
        { name: "Vizianagaram", pincode: "535001" },
        { name: "Bobbili", pincode: "535558" }
      ]
    }
  },

  "Arunachal Pradesh": {
    "Itanagar Capital Complex": {
      cities: [
        { name: "Itanagar", pincode: "791111" },
        { name: "Naharlagun", pincode: "791110" }
      ]
    },
    "Tawang": {
      cities: [
        { name: "Tawang", pincode: "790104" }
      ]
    },
    "West Kameng": {
      cities: [
        { name: "Bomdila", pincode: "790001" },
        { name: "Dirang", pincode: "790101" }
      ]
    },
    "East Siang": {
      cities: [
        { name: "Pasighat", pincode: "791102" }
      ]
    }
  },

  "Assam": {
    "Kamrup Metropolitan": {
      cities: [
        { name: "Guwahati", pincode: "781001" },
        { name: "Dispur", pincode: "781006" },
        { name: "North Guwahati", pincode: "781031" },
        { name: "Amingaon", pincode: "781031" }
      ]
    },
    "Dibrugarh": {
      cities: [
        { name: "Dibrugarh", pincode: "786001" },
        { name: "Naharkatia", pincode: "786610" }
      ]
    },
    "Nagaon": {
      cities: [
        { name: "Nagaon", pincode: "782001" },
        { name: "Hojai", pincode: "782435" }
      ]
    },
    "Sonitpur": {
      cities: [
        { name: "Tezpur", pincode: "784001" },
        { name: "Biswanath Chariali", pincode: "784176" }
      ]
    },
    "Jorhat": {
      cities: [
        { name: "Jorhat", pincode: "785001" },
        { name: "Titabor", pincode: "785630" }
      ]
    },
    "Cachar": {
      cities: [
        { name: "Silchar", pincode: "788001" },
        { name: "Sonai", pincode: "788015" }
      ]
    },
    "Barpeta": {
      cities: [
        { name: "Barpeta", pincode: "781301" },
        { name: "Barpeta Road", pincode: "781315" }
      ]
    }
  },

  "Bihar": {
    "Patna": {
      cities: [
        { name: "Patna", pincode: "800001" },
        { name: "Danapur", pincode: "801503" },
        { name: "Phulwari Sharif", pincode: "801505" },
        { name: "Khagaul", pincode: "801105" },
        { name: "Fatuha", pincode: "803201" }
      ]
    },
    "Gaya": {
      cities: [
        { name: "Gaya", pincode: "823001" },
        { name: "Bodh Gaya", pincode: "824231" },
        { name: "Sherghati", pincode: "824202" }
      ]
    },
    "Muzaffarpur": {
      cities: [
        { name: "Muzaffarpur", pincode: "842001" },
        { name: "Kanti", pincode: "843109" }
      ]
    },
    "Bhagalpur": {
      cities: [
        { name: "Bhagalpur", pincode: "812001" },
        { name: "Naugachia", pincode: "853204" }
      ]
    },
    "Darbhanga": {
      cities: [
        { name: "Darbhanga", pincode: "846001" },
        { name: "Samastipur", pincode: "848101" }
      ]
    },
    "Nalanda": {
      cities: [
        { name: "Bihar Sharif", pincode: "803101" },
        { name: "Rajgir", pincode: "803116" },
        { name: "Nalanda", pincode: "803111" }
      ]
    },
    "Purnia": {
      cities: [
        { name: "Purnia", pincode: "854301" },
        { name: "Kishanganj", pincode: "855107" }
      ]
    }
  },

  "Chhattisgarh": {
    "Raipur": {
      cities: [
        { name: "Raipur", pincode: "492001" },
        { name: "Birgaon", pincode: "492015" },
        { name: "Abhanpur", pincode: "493661" }
      ]
    },
    "Bilaspur": {
      cities: [
        { name: "Bilaspur", pincode: "495001" },
        { name: "Korba", pincode: "495677" }
      ]
    },
    "Durg": {
      cities: [
        { name: "Durg", pincode: "491001" },
        { name: "Bhilai", pincode: "490001" },
        { name: "Rajnandgaon", pincode: "491441" }
      ]
    },
    "Surguja": {
      cities: [
        { name: "Ambikapur", pincode: "497001" }
      ]
    },
    "Bastar": {
      cities: [
        { name: "Jagdalpur", pincode: "494001" }
      ]
    }
  },

  "Goa": {
    "North Goa": {
      cities: [
        { name: "Panaji", pincode: "403001" },
        { name: "Mapusa", pincode: "403507" },
        { name: "Calangute", pincode: "403516" },
        { name: "Pernem", pincode: "403512" }
      ]
    },
    "South Goa": {
      cities: [
        { name: "Margao", pincode: "403601" },
        { name: "Vasco da Gama", pincode: "403802" },
        { name: "Ponda", pincode: "403401" }
      ]
    }
  },

  "Gujarat": {
    "Ahmedabad": {
      cities: [
        { name: "Ahmedabad", pincode: "380001" },
        { name: "Gandhinagar", pincode: "382010" },
        { name: "Maninagar", pincode: "380008" },
        { name: "Vatva", pincode: "382445" },
        { name: "Sanand", pincode: "382110" }
      ]
    },
    "Surat": {
      cities: [
        { name: "Surat", pincode: "395001" },
        { name: "Bardoli", pincode: "394601" },
        { name: "Navsari", pincode: "396445" }
      ]
    },
    "Vadodara": {
      cities: [
        { name: "Vadodara", pincode: "390001" },
        { name: "Anand", pincode: "388001" },
        { name: "Karjan", pincode: "391210" }
      ]
    },
    "Rajkot": {
      cities: [
        { name: "Rajkot", pincode: "360001" },
        { name: "Gondal", pincode: "360311" },
        { name: "Jetpur", pincode: "360370" }
      ]
    },
    "Bhavnagar": {
      cities: [
        { name: "Bhavnagar", pincode: "364001" },
        { name: "Palitana", pincode: "364270" }
      ]
    },
    "Jamnagar": {
      cities: [
        { name: "Jamnagar", pincode: "361001" },
        { name: "Dwarka", pincode: "361335" }
      ]
    },
    "Gandhinagar": {
      cities: [
        { name: "Gandhinagar", pincode: "382001" },
        { name: "Kalol", pincode: "382721" }
      ]
    },
    "Kutch": {
      cities: [
        { name: "Bhuj", pincode: "370001" },
        { name: "Gandhidham", pincode: "370201" },
        { name: "Mundra", pincode: "370421" }
      ]
    }
  },

  "Haryana": {
    "Gurugram": {
      cities: [
        { name: "Gurugram", pincode: "122001" },
        { name: "Manesar", pincode: "122051" },
        { name: "Sohna", pincode: "122103" }
      ]
    },
    "Faridabad": {
      cities: [
        { name: "Faridabad", pincode: "121001" },
        { name: "Ballabhgarh", pincode: "121004" },
        { name: "Palwal", pincode: "121102" }
      ]
    },
    "Ambala": {
      cities: [
        { name: "Ambala", pincode: "134003" },
        { name: "Ambala Cantt", pincode: "133001" },
        { name: "Naraingarh", pincode: "134203" }
      ]
    },
    "Hisar": {
      cities: [
        { name: "Hisar", pincode: "125001" },
        { name: "Hansi", pincode: "125033" }
      ]
    },
    "Rohtak": {
      cities: [
        { name: "Rohtak", pincode: "124001" },
        { name: "Bahadurgarh", pincode: "124507" }
      ]
    },
    "Karnal": {
      cities: [
        { name: "Karnal", pincode: "132001" },
        { name: "Panipat", pincode: "132103" },
        { name: "Assandh", pincode: "132039" }
      ]
    },
    "Sonipat": {
      cities: [
        { name: "Sonipat", pincode: "131001" },
        { name: "Gohana", pincode: "131301" }
      ]
    }
  },

  "Himachal Pradesh": {
    "Shimla": {
      cities: [
        { name: "Shimla", pincode: "171001" },
        { name: "Solan", pincode: "173212" },
        { name: "Rampur", pincode: "172001" }
      ]
    },
    "Kangra": {
      cities: [
        { name: "Dharamshala", pincode: "176215" },
        { name: "Palampur", pincode: "176061" },
        { name: "Nurpur", pincode: "176202" }
      ]
    },
    "Mandi": {
      cities: [
        { name: "Mandi", pincode: "175001" },
        { name: "Sundernagar", pincode: "175018" }
      ]
    },
    "Kullu": {
      cities: [
        { name: "Kullu", pincode: "175101" },
        { name: "Manali", pincode: "175131" }
      ]
    }
  },

  "Jharkhand": {
    "Ranchi": {
      cities: [
        { name: "Ranchi", pincode: "834001" },
        { name: "Hatia", pincode: "834003" },
        { name: "Namkum", pincode: "834010" }
      ]
    },
    "Dhanbad": {
      cities: [
        { name: "Dhanbad", pincode: "826001" },
        { name: "Jharia", pincode: "828111" },
        { name: "Sindri", pincode: "828122" }
      ]
    },
    "Bokaro": {
      cities: [
        { name: "Bokaro Steel City", pincode: "827001" },
        { name: "Chas", pincode: "827013" }
      ]
    },
    "Jamshedpur": {
      cities: [
        { name: "Jamshedpur", pincode: "831001" },
        { name: "Adityapur", pincode: "832109" }
      ]
    },
    "Hazaribagh": {
      cities: [
        { name: "Hazaribagh", pincode: "825301" }
      ]
    }
  },

  "Karnataka": {
    "Bengaluru Urban": {
      cities: [
        { name: "Bengaluru (City)", pincode: "560001" },
        { name: "Jayanagar", pincode: "560041" },
        { name: "Koramangala", pincode: "560034" },
        { name: "Whitefield", pincode: "560066" },
        { name: "Yelahanka", pincode: "560064" },
        { name: "Electronic City", pincode: "560100" },
        { name: "Marathahalli", pincode: "560037" },
        { name: "Indiranagar", pincode: "560038" },
        { name: "JP Nagar", pincode: "560078" },
        { name: "Bannerghatta", pincode: "560083" }
      ]
    },
    "Bengaluru Rural": {
      cities: [
        { name: "Devanahalli", pincode: "562110" },
        { name: "Doddaballapura", pincode: "561203" },
        { name: "Hosakote", pincode: "562114" },
        { name: "Nelamangala", pincode: "562123" }
      ]
    },
    "Mysuru": {
      cities: [
        { name: "Mysuru", pincode: "570001" },
        { name: "Nanjangud", pincode: "571301" },
        { name: "Hunsur", pincode: "571105" },
        { name: "Periyapatna", pincode: "571107" }
      ]
    },
    "Tumakuru": {
      cities: [
        { name: "Tumakuru", pincode: "572101" },
        { name: "Tiptur", pincode: "572201" },
        { name: "Sira", pincode: "572137" },
        { name: "Madhugiri", pincode: "572132" }
      ]
    },
    "Belagavi": {
      cities: [
        { name: "Belagavi", pincode: "590001" },
        { name: "Gokak", pincode: "591307" },
        { name: "Athani", pincode: "591304" }
      ]
    },
    "Hubballi-Dharwad": {
      cities: [
        { name: "Hubballi", pincode: "580020" },
        { name: "Dharwad", pincode: "580001" }
      ]
    },
    "Mangaluru": {
      cities: [
        { name: "Mangaluru", pincode: "575001" },
        { name: "Puttur", pincode: "574201" },
        { name: "Bantwal", pincode: "574211" }
      ]
    },
    "Kalaburagi": {
      cities: [
        { name: "Kalaburagi", pincode: "585101" },
        { name: "Aland", pincode: "585302" }
      ]
    },
    "Vijayapura": {
      cities: [
        { name: "Vijayapura", pincode: "586101" },
        { name: "Muddebihal", pincode: "586212" }
      ]
    },
    "Bagalkot": {
      cities: [
        { name: "Bagalkot", pincode: "587101" },
        { name: "Jamkhandi", pincode: "587301" },
        { name: "Badami", pincode: "587201" }
      ]
    },
    "Ballari": {
      cities: [
        { name: "Ballari", pincode: "583101" },
        { name: "Hospet", pincode: "583201" },
        { name: "Sandur", pincode: "583119" }
      ]
    },
    "Raichur": {
      cities: [
        { name: "Raichur", pincode: "584101" },
        { name: "Sindhanur", pincode: "584128" }
      ]
    },
    "Koppal": {
      cities: [
        { name: "Koppal", pincode: "583231" },
        { name: "Gangavathi", pincode: "583227" }
      ]
    },
    "Gadag": {
      cities: [
        { name: "Gadag", pincode: "582101" },
        { name: "Ron", pincode: "582209" }
      ]
    },
    "Haveri": {
      cities: [
        { name: "Haveri", pincode: "581110" },
        { name: "Savanur", pincode: "581118" }
      ]
    },
    "Uttara Kannada": {
      cities: [
        { name: "Karwar", pincode: "581301" },
        { name: "Kumta", pincode: "581343" },
        { name: "Sirsi", pincode: "581401" }
      ]
    },
    "Shivamogga": {
      cities: [
        { name: "Shivamogga", pincode: "577201" },
        { name: "Bhadravati", pincode: "577301" },
        { name: "Sagar", pincode: "577401" }
      ]
    },
    "Chikkamagaluru": {
      cities: [
        { name: "Chikkamagaluru", pincode: "577101" },
        { name: "Mudigere", pincode: "577132" }
      ]
    },
    "Hassan": {
      cities: [
        { name: "Hassan", pincode: "573201" },
        { name: "Arsikere", pincode: "573103" },
        { name: "Belur", pincode: "573115" }
      ]
    },
    "Kodagu": {
      cities: [
        { name: "Madikeri", pincode: "571201" },
        { name: "Kushalnagar", pincode: "571234" }
      ]
    },
    "Mandya": {
      cities: [
        { name: "Mandya", pincode: "571401" },
        { name: "Maddur", pincode: "571428" },
        { name: "Srirangapatna", pincode: "571438" }
      ]
    },
    "Chamarajanagar": {
      cities: [
        { name: "Chamarajanagar", pincode: "571313" },
        { name: "Kollegal", pincode: "571440" },
        { name: "Yelandur", pincode: "571441" }
      ]
    },
    "Ramanagara": {
      cities: [
        { name: "Ramanagara", pincode: "562159" },
        { name: "Channapatna", pincode: "571501" },
        { name: "Magadi", pincode: "562120" }
      ]
    },
    "Chikkaballapura": {
      cities: [
        { name: "Chikkaballapura", pincode: "562101" },
        { name: "Gudibanda", pincode: "561209" },
        { name: "Chintamani", pincode: "563125" }
      ]
    },
    "Kolar": {
      cities: [
        { name: "Kolar", pincode: "563101" },
        { name: "KGF (Kolar Gold Fields)", pincode: "563115" },
        { name: "Malur", pincode: "563130" }
      ]
    },
    "Udupi": {
      cities: [
        { name: "Udupi", pincode: "576101" },
        { name: "Manipal", pincode: "576104" },
        { name: "Kundapura", pincode: "576201" }
      ]
    },
    "Yadgir": {
      cities: [
        { name: "Yadgir", pincode: "585201" },
        { name: "Gurmatkal", pincode: "585214" }
      ]
    },
    "Bidar": {
      cities: [
        { name: "Bidar", pincode: "585401" },
        { name: "Basavakalyan", pincode: "585327" }
      ]
    }
  },

  "Kerala": {
    "Thiruvananthapuram": {
      cities: [
        { name: "Thiruvananthapuram", pincode: "695001" },
        { name: "Neyyattinkara", pincode: "695121" },
        { name: "Attingal", pincode: "695101" },
        { name: "Nedumangad", pincode: "695541" }
      ]
    },
    "Kollam": {
      cities: [
        { name: "Kollam", pincode: "691001" },
        { name: "Punalur", pincode: "691305" },
        { name: "Karunagappally", pincode: "690518" }
      ]
    },
    "Pathanamthitta": {
      cities: [
        { name: "Pathanamthitta", pincode: "689645" },
        { name: "Adoor", pincode: "691523" }
      ]
    },
    "Alappuzha": {
      cities: [
        { name: "Alappuzha", pincode: "688001" },
        { name: "Cherthala", pincode: "688524" },
        { name: "Kayamkulam", pincode: "690502" }
      ]
    },
    "Kottayam": {
      cities: [
        { name: "Kottayam", pincode: "686001" },
        { name: "Changanassery", pincode: "686101" },
        { name: "Pala", pincode: "686575" }
      ]
    },
    "Idukki": {
      cities: [
        { name: "Munnar", pincode: "685612" },
        { name: "Thodupuzha", pincode: "685584" }
      ]
    },
    "Ernakulam": {
      cities: [
        { name: "Kochi (Ernakulam)", pincode: "682001" },
        { name: "Aluva", pincode: "683101" },
        { name: "Perumbavoor", pincode: "683542" },
        { name: "Angamaly", pincode: "683572" }
      ]
    },
    "Thrissur": {
      cities: [
        { name: "Thrissur", pincode: "680001" },
        { name: "Chalakudy", pincode: "680307" },
        { name: "Irinjalakuda", pincode: "680121" }
      ]
    },
    "Palakkad": {
      cities: [
        { name: "Palakkad", pincode: "678001" },
        { name: "Ottapalam", pincode: "679101" },
        { name: "Shoranur", pincode: "679121" }
      ]
    },
    "Malappuram": {
      cities: [
        { name: "Malappuram", pincode: "676505" },
        { name: "Tirur", pincode: "676101" },
        { name: "Manjeri", pincode: "676121" }
      ]
    },
    "Kozhikode": {
      cities: [
        { name: "Kozhikode", pincode: "673001" },
        { name: "Vadakara", pincode: "673101" },
        { name: "Koyilandy", pincode: "673305" }
      ]
    },
    "Wayanad": {
      cities: [
        { name: "Kalpetta", pincode: "673121" },
        { name: "Mananthavady", pincode: "670645" }
      ]
    },
    "Kannur": {
      cities: [
        { name: "Kannur", pincode: "670001" },
        { name: "Thalassery", pincode: "670101" },
        { name: "Iritty", pincode: "670703" }
      ]
    },
    "Kasaragod": {
      cities: [
        { name: "Kasaragod", pincode: "671121" },
        { name: "Kanhangad", pincode: "671315" }
      ]
    }
  },

  "Madhya Pradesh": {
    "Bhopal": {
      cities: [
        { name: "Bhopal", pincode: "462001" },
        { name: "Berasia", pincode: "462038" },
        { name: "Mandideep", pincode: "462046" }
      ]
    },
    "Indore": {
      cities: [
        { name: "Indore", pincode: "452001" },
        { name: "Mhow", pincode: "453441" },
        { name: "Sanwer", pincode: "453551" }
      ]
    },
    "Gwalior": {
      cities: [
        { name: "Gwalior", pincode: "474001" },
        { name: "Morar", pincode: "474006" },
        { name: "Gird", pincode: "474011" }
      ]
    },
    "Jabalpur": {
      cities: [
        { name: "Jabalpur", pincode: "482001" },
        { name: "Katni", pincode: "483501" }
      ]
    },
    "Ujjain": {
      cities: [
        { name: "Ujjain", pincode: "456001" },
        { name: "Nagda", pincode: "456335" }
      ]
    },
    "Sagar": {
      cities: [
        { name: "Sagar", pincode: "470001" },
        { name: "Damoh", pincode: "470661" }
      ]
    },
    "Rewa": {
      cities: [
        { name: "Rewa", pincode: "486001" },
        { name: "Satna", pincode: "485001" }
      ]
    }
  },

  "Maharashtra": {
    "Mumbai City": {
      cities: [
        { name: "Colaba", pincode: "400005" },
        { name: "Fort", pincode: "400001" },
        { name: "Dadar", pincode: "400014" },
        { name: "Andheri", pincode: "400058" },
        { name: "Bandra", pincode: "400050" },
        { name: "Borivali", pincode: "400066" },
        { name: "Kurla", pincode: "400070" }
      ]
    },
    "Mumbai Suburban": {
      cities: [
        { name: "Thane", pincode: "400601" },
        { name: "Navi Mumbai", pincode: "400703" },
        { name: "Kalyan", pincode: "421301" },
        { name: "Dombivli", pincode: "421201" },
        { name: "Ulhasnagar", pincode: "421003" }
      ]
    },
    "Pune": {
      cities: [
        { name: "Pune", pincode: "411001" },
        { name: "Pimpri-Chinchwad", pincode: "411018" },
        { name: "Hadapsar", pincode: "411028" },
        { name: "Kothrud", pincode: "411038" },
        { name: "Wakad", pincode: "411057" }
      ]
    },
    "Nagpur": {
      cities: [
        { name: "Nagpur", pincode: "440001" },
        { name: "Wardha", pincode: "442001" },
        { name: "Kamptee", pincode: "441002" }
      ]
    },
    "Nashik": {
      cities: [
        { name: "Nashik", pincode: "422001" },
        { name: "Malegaon", pincode: "423203" },
        { name: "Sinnar", pincode: "422103" }
      ]
    },
    "Aurangabad": {
      cities: [
        { name: "Aurangabad", pincode: "431001" },
        { name: "Jalna", pincode: "431203" }
      ]
    },
    "Solapur": {
      cities: [
        { name: "Solapur", pincode: "413001" },
        { name: "Barshi", pincode: "413401" }
      ]
    },
    "Kolhapur": {
      cities: [
        { name: "Kolhapur", pincode: "416001" },
        { name: "Ichalkaranji", pincode: "416115" }
      ]
    },
    "Amravati": {
      cities: [
        { name: "Amravati", pincode: "444601" },
        { name: "Achalpur", pincode: "444806" }
      ]
    },
    "Satara": {
      cities: [
        { name: "Satara", pincode: "415001" },
        { name: "Karad", pincode: "415110" }
      ]
    }
  },

  "Manipur": {
    "Imphal West": {
      cities: [
        { name: "Imphal", pincode: "795001" },
        { name: "Lamphelpat", pincode: "795004" }
      ]
    },
    "Imphal East": {
      cities: [
        { name: "Porompat", pincode: "795005" },
        { name: "Heingang", pincode: "795009" }
      ]
    },
    "Bishnupur": {
      cities: [
        { name: "Bishnupur", pincode: "795126" },
        { name: "Moirang", pincode: "795133" }
      ]
    }
  },

  "Meghalaya": {
    "East Khasi Hills": {
      cities: [
        { name: "Shillong", pincode: "793001" },
        { name: "Cherrapunjee", pincode: "793108" }
      ]
    },
    "West Garo Hills": {
      cities: [
        { name: "Tura", pincode: "794001" }
      ]
    },
    "Jaintia Hills": {
      cities: [
        { name: "Jowai", pincode: "793150" }
      ]
    }
  },

  "Mizoram": {
    "Aizawl": {
      cities: [
        { name: "Aizawl", pincode: "796001" }
      ]
    },
    "Lunglei": {
      cities: [
        { name: "Lunglei", pincode: "796701" }
      ]
    }
  },

  "Nagaland": {
    "Kohima": {
      cities: [
        { name: "Kohima", pincode: "797001" },
        { name: "Chumukedima", pincode: "797103" }
      ]
    },
    "Dimapur": {
      cities: [
        { name: "Dimapur", pincode: "797112" }
      ]
    },
    "Mokokchung": {
      cities: [
        { name: "Mokokchung", pincode: "798601" }
      ]
    }
  },

  "Odisha": {
    "Khordha": {
      cities: [
        { name: "Bhubaneswar", pincode: "751001" },
        { name: "Khordha", pincode: "752055" },
        { name: "Jatni", pincode: "752050" }
      ]
    },
    "Cuttack": {
      cities: [
        { name: "Cuttack", pincode: "753001" },
        { name: "Choudwar", pincode: "754025" }
      ]
    },
    "Ganjam": {
      cities: [
        { name: "Berhampur", pincode: "760001" },
        { name: "Aska", pincode: "761110" }
      ]
    },
    "Sambalpur": {
      cities: [
        { name: "Sambalpur", pincode: "768001" },
        { name: "Jharsuguda", pincode: "768201" }
      ]
    },
    "Puri": {
      cities: [
        { name: "Puri", pincode: "752001" }
      ]
    },
    "Rourkela": {
      cities: [
        { name: "Rourkela", pincode: "769001" }
      ]
    }
  },

  "Punjab": {
    "Ludhiana": {
      cities: [
        { name: "Ludhiana", pincode: "141001" },
        { name: "Khanna", pincode: "141401" },
        { name: "Jagraon", pincode: "142026" }
      ]
    },
    "Amritsar": {
      cities: [
        { name: "Amritsar", pincode: "143001" },
        { name: "Attari", pincode: "143105" }
      ]
    },
    "Jalandhar": {
      cities: [
        { name: "Jalandhar", pincode: "144001" },
        { name: "Phagwara", pincode: "144401" }
      ]
    },
    "Patiala": {
      cities: [
        { name: "Patiala", pincode: "147001" },
        { name: "Rajpura", pincode: "140401" }
      ]
    },
    "Mohali": {
      cities: [
        { name: "Mohali", pincode: "160055" },
        { name: "Kharar", pincode: "140301" }
      ]
    },
    "Bathinda": {
      cities: [
        { name: "Bathinda", pincode: "151001" },
        { name: "Mansa", pincode: "151505" }
      ]
    },
    "Gurdaspur": {
      cities: [
        { name: "Gurdaspur", pincode: "143521" },
        { name: "Pathankot", pincode: "145001" }
      ]
    }
  },

  "Rajasthan": {
    "Jaipur": {
      cities: [
        { name: "Jaipur", pincode: "302001" },
        { name: "Sanganer", pincode: "302029" },
        { name: "Amber", pincode: "302028" },
        { name: "Bagru", pincode: "303007" }
      ]
    },
    "Jodhpur": {
      cities: [
        { name: "Jodhpur", pincode: "342001" },
        { name: "Pali", pincode: "306401" }
      ]
    },
    "Udaipur": {
      cities: [
        { name: "Udaipur", pincode: "313001" },
        { name: "Rajsamand", pincode: "313324" }
      ]
    },
    "Ajmer": {
      cities: [
        { name: "Ajmer", pincode: "305001" },
        { name: "Pushkar", pincode: "305022" },
        { name: "Kishangarh", pincode: "305801" }
      ]
    },
    "Kota": {
      cities: [
        { name: "Kota", pincode: "324001" },
        { name: "Bundi", pincode: "323001" }
      ]
    },
    "Bikaner": {
      cities: [
        { name: "Bikaner", pincode: "334001" },
        { name: "Nokha", pincode: "334803" }
      ]
    },
    "Alwar": {
      cities: [
        { name: "Alwar", pincode: "301001" },
        { name: "Bhiwadi", pincode: "301019" }
      ]
    },
    "Bharatpur": {
      cities: [
        { name: "Bharatpur", pincode: "321001" },
        { name: "Deeg", pincode: "321203" }
      ]
    }
  },

  "Sikkim": {
    "East Sikkim": {
      cities: [
        { name: "Gangtok", pincode: "737101" },
        { name: "Singtam", pincode: "737134" }
      ]
    },
    "West Sikkim": {
      cities: [
        { name: "Gyalshing", pincode: "737111" }
      ]
    },
    "North Sikkim": {
      cities: [
        { name: "Mangan", pincode: "737116" }
      ]
    }
  },

  "Tamil Nadu": {
    "Chennai": {
      cities: [
        { name: "Chennai (Egmore)", pincode: "600008" },
        { name: "Anna Nagar", pincode: "600040" },
        { name: "T. Nagar", pincode: "600017" },
        { name: "Velachery", pincode: "600042" },
        { name: "Tambaram", pincode: "600045" },
        { name: "Ambattur", pincode: "600053" },
        { name: "Avadi", pincode: "600054" }
      ]
    },
    "Coimbatore": {
      cities: [
        { name: "Coimbatore", pincode: "641001" },
        { name: "Tiruppur", pincode: "641601" },
        { name: "Pollachi", pincode: "642001" }
      ]
    },
    "Madurai": {
      cities: [
        { name: "Madurai", pincode: "625001" },
        { name: "Dindigul", pincode: "624001" }
      ]
    },
    "Salem": {
      cities: [
        { name: "Salem", pincode: "636001" },
        { name: "Namakkal", pincode: "637001" }
      ]
    },
    "Tiruchirappalli": {
      cities: [
        { name: "Tiruchirappalli", pincode: "620001" },
        { name: "Srirangam", pincode: "620006" }
      ]
    },
    "Tirunelveli": {
      cities: [
        { name: "Tirunelveli", pincode: "627001" },
        { name: "Tenkasi", pincode: "627811" }
      ]
    },
    "Vellore": {
      cities: [
        { name: "Vellore", pincode: "632001" },
        { name: "Katpadi", pincode: "632007" }
      ]
    },
    "Erode": {
      cities: [
        { name: "Erode", pincode: "638001" },
        { name: "Bhavani", pincode: "638301" }
      ]
    },
    "Thanjavur": {
      cities: [
        { name: "Thanjavur", pincode: "613001" },
        { name: "Kumbakonam", pincode: "612001" }
      ]
    },
    "Kancheepuram": {
      cities: [
        { name: "Kancheepuram", pincode: "631501" },
        { name: "Chengalpattu", pincode: "603001" }
      ]
    }
  },

  "Telangana": {
    "Hyderabad": {
      cities: [
        { name: "Hyderabad", pincode: "500001" },
        { name: "Secunderabad", pincode: "500003" },
        { name: "Kukatpally", pincode: "500072" },
        { name: "Dilsukhnagar", pincode: "500060" },
        { name: "Ameerpet", pincode: "500016" }
      ]
    },
    "Medchal-Malkajgiri": {
      cities: [
        { name: "Kompally", pincode: "500014" },
        { name: "Medchal", pincode: "501401" },
        { name: "Keesara", pincode: "501301" }
      ]
    },
    "Rangareddy": {
      cities: [
        { name: "Shamshabad", pincode: "501218" },
        { name: "Shadnagar", pincode: "509216" },
        { name: "Chevella", pincode: "501503" }
      ]
    },
    "Warangal Urban": {
      cities: [
        { name: "Warangal", pincode: "506001" },
        { name: "Hanamkonda", pincode: "506001" }
      ]
    },
    "Nizamabad": {
      cities: [
        { name: "Nizamabad", pincode: "503001" },
        { name: "Bodhan", pincode: "503185" }
      ]
    },
    "Karimnagar": {
      cities: [
        { name: "Karimnagar", pincode: "505001" },
        { name: "Ramagundam", pincode: "505208" }
      ]
    },
    "Khammam": {
      cities: [
        { name: "Khammam", pincode: "507001" },
        { name: "Kothagudem", pincode: "507101" }
      ]
    },
    "Nalgonda": {
      cities: [
        { name: "Nalgonda", pincode: "508001" },
        { name: "Miryalaguda", pincode: "508207" }
      ]
    }
  },

  "Tripura": {
    "West Tripura": {
      cities: [
        { name: "Agartala", pincode: "799001" },
        { name: "Jirania", pincode: "799046" }
      ]
    },
    "North Tripura": {
      cities: [
        { name: "Dharmanagar", pincode: "799253" }
      ]
    },
    "South Tripura": {
      cities: [
        { name: "Belonia", pincode: "799155" }
      ]
    }
  },

  "Uttar Pradesh": {
    "Lucknow": {
      cities: [
        { name: "Lucknow", pincode: "226001" },
        { name: "Amausi", pincode: "226101" },
        { name: "Chinhat", pincode: "226028" }
      ]
    },
    "Agra": {
      cities: [
        { name: "Agra", pincode: "282001" },
        { name: "Fatehpur Sikri", pincode: "283110" }
      ]
    },
    "Varanasi": {
      cities: [
        { name: "Varanasi", pincode: "221001" },
        { name: "Sarnath", pincode: "221007" }
      ]
    },
    "Kanpur Nagar": {
      cities: [
        { name: "Kanpur", pincode: "208001" },
        { name: "Kalyanpur", pincode: "208017" }
      ]
    },
    "Prayagraj": {
      cities: [
        { name: "Prayagraj (Allahabad)", pincode: "211001" },
        { name: "Naini", pincode: "211008" }
      ]
    },
    "Ghaziabad": {
      cities: [
        { name: "Ghaziabad", pincode: "201001" },
        { name: "Loni", pincode: "201102" },
        { name: "Hapur", pincode: "245101" }
      ]
    },
    "Noida (Gautam Buddha Nagar)": {
      cities: [
        { name: "Noida", pincode: "201301" },
        { name: "Greater Noida", pincode: "201308" },
        { name: "Dadri", pincode: "203207" }
      ]
    },
    "Meerut": {
      cities: [
        { name: "Meerut", pincode: "250001" },
        { name: "Hapur", pincode: "245101" }
      ]
    },
    "Mathura": {
      cities: [
        { name: "Mathura", pincode: "281001" },
        { name: "Vrindavan", pincode: "281121" }
      ]
    },
    "Bareilly": {
      cities: [
        { name: "Bareilly", pincode: "243001" },
        { name: "Pilibhit", pincode: "262001" }
      ]
    },
    "Aligarh": {
      cities: [
        { name: "Aligarh", pincode: "202001" },
        { name: "Hathras", pincode: "204101" }
      ]
    },
    "Gorakhpur": {
      cities: [
        { name: "Gorakhpur", pincode: "273001" },
        { name: "Deoria", pincode: "274001" }
      ]
    }
  },

  "Uttarakhand": {
    "Dehradun": {
      cities: [
        { name: "Dehradun", pincode: "248001" },
        { name: "Rishikesh", pincode: "249201" },
        { name: "Mussoorie", pincode: "248179" },
        { name: "Doiwala", pincode: "248140" }
      ]
    },
    "Haridwar": {
      cities: [
        { name: "Haridwar", pincode: "249401" },
        { name: "Roorkee", pincode: "247667" }
      ]
    },
    "Nainital": {
      cities: [
        { name: "Nainital", pincode: "263001" },
        { name: "Haldwani", pincode: "263139" },
        { name: "Ramnagar", pincode: "244715" }
      ]
    },
    "Udham Singh Nagar": {
      cities: [
        { name: "Rudrapur", pincode: "263153" },
        { name: "Kashipur", pincode: "244713" },
        { name: "Khatima", pincode: "262308" }
      ]
    },
    "Chamoli": {
      cities: [
        { name: "Gopeshwar", pincode: "246401" },
        { name: "Joshimath", pincode: "246443" }
      ]
    }
  },

  "West Bengal": {
    "Kolkata": {
      cities: [
        { name: "Kolkata (Central)", pincode: "700001" },
        { name: "Salt Lake City", pincode: "700064" },
        { name: "New Town", pincode: "700156" },
        { name: "Dum Dum", pincode: "700028" },
        { name: "Behala", pincode: "700034" }
      ]
    },
    "North 24 Parganas": {
      cities: [
        { name: "Barasat", pincode: "700124" },
        { name: "Habra", pincode: "743268" },
        { name: "Bongaon", pincode: "743235" }
      ]
    },
    "South 24 Parganas": {
      cities: [
        { name: "Baruipur", pincode: "700144" },
        { name: "Diamond Harbour", pincode: "743368" }
      ]
    },
    "Howrah": {
      cities: [
        { name: "Howrah", pincode: "711101" },
        { name: "Uluberia", pincode: "711315" }
      ]
    },
    "Hooghly": {
      cities: [
        { name: "Chinsurah", pincode: "712101" },
        { name: "Uttarpara", pincode: "712258" },
        { name: "Serampore", pincode: "712201" }
      ]
    },
    "Burdwan": {
      cities: [
        { name: "Burdwan", pincode: "713101" },
        { name: "Asansol", pincode: "713301" },
        { name: "Durgapur", pincode: "713201" }
      ]
    },
    "Murshidabad": {
      cities: [
        { name: "Berhampore", pincode: "742101" },
        { name: "Baharampur", pincode: "742101" },
        { name: "Jiaganj", pincode: "742123" }
      ]
    },
    "Nadia": {
      cities: [
        { name: "Krishnanagar", pincode: "741101" },
        { name: "Kalyani", pincode: "741235" },
        { name: "Santipur", pincode: "741404" }
      ]
    },
    "Darjeeling": {
      cities: [
        { name: "Darjeeling", pincode: "734101" },
        { name: "Siliguri", pincode: "734001" },
        { name: "Kurseong", pincode: "734203" }
      ]
    }
  },

  // Union Territories
  "Delhi": {
    "Central Delhi": {
      cities: [
        { name: "Connaught Place", pincode: "110001" },
        { name: "Karol Bagh", pincode: "110005" },
        { name: "Paharganj", pincode: "110055" }
      ]
    },
    "South Delhi": {
      cities: [
        { name: "Saket", pincode: "110017" },
        { name: "Hauz Khas", pincode: "110016" },
        { name: "Lajpat Nagar", pincode: "110024" },
        { name: "Kalkaji", pincode: "110019" }
      ]
    },
    "North Delhi": {
      cities: [
        { name: "Model Town", pincode: "110009" },
        { name: "Rohini", pincode: "110085" }
      ]
    },
    "East Delhi": {
      cities: [
        { name: "Preet Vihar", pincode: "110092" },
        { name: "Shahdara", pincode: "110032" },
        { name: "Laxmi Nagar", pincode: "110092" }
      ]
    },
    "West Delhi": {
      cities: [
        { name: "Janakpuri", pincode: "110058" },
        { name: "Rajouri Garden", pincode: "110027" }
      ]
    },
    "North West Delhi": {
      cities: [
        { name: "Pitampura", pincode: "110088" },
        { name: "Shalimar Bagh", pincode: "110088" }
      ]
    },
    "South West Delhi": {
      cities: [
        { name: "Dwarka", pincode: "110075" },
        { name: "Vasant Kunj", pincode: "110070" }
      ]
    }
  },

  "Jammu and Kashmir": {
    "Srinagar": {
      cities: [
        { name: "Srinagar", pincode: "190001" },
        { name: "Soura", pincode: "190011" }
      ]
    },
    "Jammu": {
      cities: [
        { name: "Jammu", pincode: "180001" },
        { name: "Bahu Fort", pincode: "180009" }
      ]
    },
    "Anantnag": {
      cities: [
        { name: "Anantnag", pincode: "192101" },
        { name: "Pahalgam", pincode: "192125" }
      ]
    },
    "Baramulla": {
      cities: [
        { name: "Baramulla", pincode: "193101" },
        { name: "Sopore", pincode: "193201" }
      ]
    }
  },

  "Ladakh": {
    "Leh": {
      cities: [
        { name: "Leh", pincode: "194101" },
        { name: "Nubra", pincode: "194401" }
      ]
    },
    "Kargil": {
      cities: [
        { name: "Kargil", pincode: "194103" }
      ]
    }
  },

  "Chandigarh": {
    "Chandigarh": {
      cities: [
        { name: "Chandigarh Sector 1", pincode: "160001" },
        { name: "Chandigarh Sector 17", pincode: "160017" },
        { name: "Chandigarh Industrial Area", pincode: "160002" }
      ]
    }
  },

  "Puducherry": {
    "Puducherry": {
      cities: [
        { name: "Puducherry", pincode: "605001" },
        { name: "Oulgaret", pincode: "605009" }
      ]
    },
    "Karaikal": {
      cities: [
        { name: "Karaikal", pincode: "609601" }
      ]
    }
  },

  "Andaman and Nicobar Islands": {
    "South Andaman": {
      cities: [
        { name: "Port Blair", pincode: "744101" }
      ]
    },
    "North and Middle Andaman": {
      cities: [
        { name: "Mayabunder", pincode: "744204" }
      ]
    }
  },

  "Dadra and Nagar Haveli and Daman and Diu": {
    "Daman": {
      cities: [
        { name: "Daman", pincode: "396210" }
      ]
    },
    "Dadra and Nagar Haveli": {
      cities: [
        { name: "Silvassa", pincode: "396230" }
      ]
    }
  },

  "Lakshadweep": {
    "Lakshadweep": {
      cities: [
        { name: "Kavaratti", pincode: "682555" }
      ]
    }
  }
};

// Helper to get all states for India
export const getIndiaStates = () => Object.keys(INDIA_DATA).sort();

// Helper to get districts for a given Indian state
export const getDistricts = (state) => {
  if (!INDIA_DATA[state]) return [];
  return Object.keys(INDIA_DATA[state]).sort();
};

// Helper to get cities for a given Indian state + district
export const getCities = (state, district) => {
  if (!INDIA_DATA[state] || !INDIA_DATA[state][district]) return [];
  return INDIA_DATA[state][district].cities;
};

// Helper to get pincode for a city in a district
export const getPincode = (state, district, cityName) => {
  const cities = getCities(state, district);
  const found = cities.find(c => c.name === cityName);
  return found ? found.pincode : '';
};
