// Custom Data-Driven Periodic Table - Developed for Strata STEM Guide
document.addEventListener('DOMContentLoaded', () => {
    
    // Core structural data avoiding 118 explicit lines of HTML (Memory efficient JS generation)
    // Structure: [Atomic#, Symbol, Name, Mass, Group, Period, Category, Melt(K), Boil(K)]
    const elementData = [
        [1, "H", "Hydrogen", "1.008", 1, 1, "nonmetal", "13.99", "20.271", "1", "2.2", "72.769", "1312", "N/A", "N/A", "N/A", "0.08988", "0.18 W/mK", "28.836 J/mol K", "75%", "Henry Cavendish", "1s1", "N/A"],
        [2, "He", "Helium", "4.0026022", 18, 1, "noble", "0.95", "4.222", "1", "N/A", "-48", "2372.3", "N/A", "N/A", "N/A", "0.1786", "0.15 W/mK", "N/A", "23%", "Pierre Janssen", "1s2", "N/A"],
        [3, "Li", "Lithium", "6.94", 1, 2, "alkali", "453.65", "1603", "2", "0.98", "59.6326", "520.2", "N/A", "N/A", "N/A", "0.534", "N/A", "24.86 J/mol K", "N/A", "Johan August Arfwedson", "1s2 2s1", "N/A"],
        [4, "Be", "Beryllium", "9.01218315", 2, 2, "alkaline", "1560", "2742", "2", "1.57", "-48", "899.5", "N/A", "N/A", "N/A", "1.85", "N/A", "16.443 J/mol K", "N/A", "Louis Nicolas Vauquelin", "1s2 2s2", "N/A"],
        [5, "B", "Boron", "10.81", 13, 2, "metalloid", "2349", "4200", "2", "2.04", "26.989", "800.6", "N/A", "N/A", "N/A", "2.08", "N/A", "11.087 J/mol K", "N/A", "Joseph Louis Gay-Lussac", "1s2 2s2 2p1", "N/A"],
        [6, "C", "Carbon", "12.011", 14, 2, "nonmetal", "N/A", "N/A", "2", "2.55", "121.7763", "1086.5", "N/A", "N/A", "N/A", "1.821", "140 W/mK", "8.517 J/mol K", "0.5%", "Ancient Egypt", "1s2 2s2 2p2", "N/A"],
        [7, "N", "Nitrogen", "14.007", 15, 2, "nonmetal", "63.15", "77.355", "2", "3.04", "-6.8", "1402.3", "N/A", "N/A", "N/A", "1.251", "0.026 W/mK", "N/A", "0.1%", "Daniel Rutherford", "1s2 2s2 2p3", "N/A"],
        [8, "O", "Oxygen", "15.999", 16, 2, "nonmetal", "54.36", "90.188", "2", "3.44", "140.976", "1313.9", "N/A", "N/A", "N/A", "1.429", "0.027 W/mK", "N/A", "1%", "Carl Wilhelm Scheele", "1s2 2s2 2p4", "N/A"],
        [9, "F", "Fluorine", "18.9984031636", 17, 2, "nonmetal", "53.48", "85.03", "2", "3.98", "328.1649", "1681", "N/A", "N/A", "N/A", "1.696", "0.027 W/mK", "N/A", "0.00004%", "André-Marie Ampère", "1s2 2s2 2p5", "N/A"],
        [10, "Ne", "Neon", "20.17976", 18, 2, "noble", "24.56", "27.104", "2", "N/A", "-116", "2080.7", "N/A", "N/A", "N/A", "0.9002", "0.049 W/mK", "N/A", "0.13%", "Morris Travers", "1s2 2s2 2p6", "N/A"],
        [11, "Na", "Sodium", "22.989769282", 1, 3, "alkali", "370.944", "1156.09", "3", "0.93", "52.867", "495.8", "N/A", "N/A", "N/A", "0.968", "N/A", "28.23 J/mol K", "N/A", "Humphry Davy", "1s2 2s2 2p6 3s1", "N/A"],
        [12, "Mg", "Magnesium", "24.305", 2, 3, "alkaline", "923", "1363", "3", "1.31", "-40", "737.7", "N/A", "N/A", "N/A", "1.738", "160 W/mK", "24.869 J/mol K", "0.06%", "Joseph Black", "1s2 2s2 2p6 3s2", "N/A"],
        [13, "Al", "Aluminium", "26.98153857", 13, 3, "transition", "933.47", "2743", "3", "1.61", "41.762", "577.5", "N/A", "N/A", "N/A", "2.7", "235 W/mK", "24.2 J/mol K", "0.005%", "N/A", "1s2 2s2 2p6 3s2 3p1", "N/A"],
        [14, "Si", "Silicon", "28.085", 14, 3, "metalloid", "1687", "3538", "3", "1.9", "134.0684", "786.5", "N/A", "N/A", "N/A", "2.329", "150 W/mK", "19.789 J/mol K", "0.07%", "Jöns Jacob Berzelius", "1s2 2s2 2p6 3s2 3p2", "N/A"],
        [15, "P", "Phosphorus", "30.9737619985", 15, 3, "nonmetal", "N/A", "N/A", "3", "2.19", "72.037", "1011.8", "N/A", "N/A", "N/A", "1.823", "N/A", "23.824 J/mol K", "N/A", "Hennig Brand", "1s2 2s2 2p6 3s2 3p3", "N/A"],
        [16, "S", "Sulfur", "32.06", 16, 3, "nonmetal", "388.36", "717.8", "3", "2.58", "200.4101", "999.6", "N/A", "N/A", "N/A", "2.07", "0.20 W/mK", "22.75 J/mol K", "0.04%", "Ancient china", "1s2 2s2 2p6 3s2 3p4", "N/A"],
        [17, "Cl", "Chlorine", "35.45", 17, 3, "nonmetal", "171.6", "239.11", "3", "3.16", "348.575", "1251.2", "N/A", "N/A", "N/A", "3.2", "N/A", "N/A", "N/A", "Carl Wilhelm Scheele", "1s2 2s2 2p6 3s2 3p5", "N/A"],
        [18, "Ar", "Argon", "39.9481", 18, 3, "noble", "83.81", "87.302", "3", "N/A", "-96", "1520.6", "N/A", "N/A", "N/A", "1.784", "N/A", "N/A", "N/A", "Lord Rayleigh", "1s2 2s2 2p6 3s2 3p6", "N/A"],
        [19, "K", "Potassium", "39.09831", 1, 4, "alkali", "336.7", "1032", "4", "0.82", "48.383", "418.8", "N/A", "N/A", "N/A", "0.862", "N/A", "29.6 J/mol K", "N/A", "Humphry Davy", "1s2 2s2 2p6 3s2 3p6 4s1", "N/A"],
        [20, "Ca", "Calcium", "40.0784", 2, 4, "alkaline", "1115", "1757", "4", "1", "2.37", "589.8", "N/A", "N/A", "N/A", "1.55", "N/A", "25.929 J/mol K", "N/A", "Humphry Davy", "1s2 2s2 2p6 3s2 3p6 4s2", "N/A"],
        [21, "Sc", "Scandium", "44.9559085", 3, 4, "transition", "1814", "3109", "4", "1.36", "18", "633.1", "N/A", "N/A", "N/A", "2.985", "N/A", "25.52 J/mol K", "N/A", "Lars Fredrik Nilson", "1s2 2s2 2p6 3s2 3p6 4s2 3d1", "N/A"],
        [22, "Ti", "Titanium", "47.8671", 4, 4, "transition", "1941", "3560", "4", "1.54", "7.289", "658.8", "N/A", "N/A", "N/A", "4.506", "N/A", "25.06 J/mol K", "N/A", "William Gregor", "1s2 2s2 2p6 3s2 3p6 4s2 3d2", "N/A"],
        [23, "V", "Vanadium", "50.94151", 5, 4, "transition", "2183", "3680", "4", "1.63", "50.911", "650.9", "N/A", "N/A", "N/A", "6", "N/A", "24.89 J/mol K", "N/A", "Andrés Manuel del Río", "1s2 2s2 2p6 3s2 3p6 4s2 3d3", "N/A"],
        [24, "Cr", "Chromium", "51.99616", 6, 4, "transition", "2180", "2944", "4", "1.66", "65.21", "652.9", "N/A", "N/A", "N/A", "7.19", "N/A", "23.35 J/mol K", "N/A", "Louis Nicolas Vauquelin", "1s2 2s2 2p6 3s2 3p6 4s1 3d5", "N/A"],
        [25, "Mn", "Manganese", "54.9380443", 7, 4, "transition", "1519", "2334", "4", "1.55", "-50", "717.3", "N/A", "N/A", "N/A", "7.21", "N/A", "26.32 J/mol K", "N/A", "Torbern Olof Bergman", "1s2 2s2 2p6 3s2 3p6 4s2 3d5", "N/A"],
        [26, "Fe", "Iron", "55.8452", 8, 4, "transition", "1811", "3134", "4", "1.83", "14.785", "762.5", "N/A", "N/A", "N/A", "7.874", "80 W/mK", "25.1 J/mol K", "0.11%", "5000 BC", "1s2 2s2 2p6 3s2 3p6 4s2 3d6", "N/A"],
        [27, "Co", "Cobalt", "58.9331944", 9, 4, "transition", "1768", "3200", "4", "1.88", "63.898", "760.4", "N/A", "N/A", "N/A", "8.9", "N/A", "24.81 J/mol K", "N/A", "Georg Brandt", "1s2 2s2 2p6 3s2 3p6 4s2 3d7", "N/A"],
        [28, "Ni", "Nickel", "58.69344", 10, 4, "transition", "1728", "3003", "4", "1.91", "111.65", "737.1", "N/A", "N/A", "N/A", "8.908", "N/A", "26.07 J/mol K", "N/A", "Axel Fredrik Cronstedt", "1s2 2s2 2p6 3s2 3p6 4s2 3d8", "N/A"],
        [29, "Cu", "Copper", "63.5463", 11, 4, "transition", "1357.77", "2835", "4", "1.9", "119.235", "745.5", "N/A", "N/A", "N/A", "8.96", "400 W/mK", "24.44 J/mol K", "0.00001%", "Middle East", "1s2 2s2 2p6 3s2 3p6 4s1 3d10", "N/A"],
        [30, "Zn", "Zinc", "65.382", 12, 4, "transition", "692.68", "1180", "4", "1.65", "-58", "906.4", "N/A", "N/A", "N/A", "7.14", "N/A", "25.47 J/mol K", "N/A", "India", "1s2 2s2 2p6 3s2 3p6 4s2 3d10", "N/A"],
        [31, "Ga", "Gallium", "69.7231", 13, 4, "transition", "302.9146", "2673", "4", "1.81", "41", "578.8", "N/A", "N/A", "N/A", "5.91", "N/A", "25.86 J/mol K", "N/A", "Lecoq de Boisbaudran", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1", "N/A"],
        [32, "Ge", "Germanium", "72.6308", 14, 4, "metalloid", "1211.4", "3106", "4", "2.01", "118.9352", "762", "N/A", "N/A", "N/A", "5.323", "N/A", "23.222 J/mol K", "N/A", "Clemens Winkler", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p2", "N/A"],
        [33, "As", "Arsenic", "74.9215956", 15, 4, "metalloid", "N/A", "N/A", "4", "2.18", "77.65", "947", "N/A", "N/A", "N/A", "5.727", "N/A", "24.64 J/mol K", "N/A", "Bronze Age", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p3", "N/A"],
        [34, "Se", "Selenium", "78.9718", 16, 4, "nonmetal", "494", "958", "4", "2.55", "194.9587", "941", "N/A", "N/A", "N/A", "4.81", "N/A", "25.363 J/mol K", "N/A", "Jöns Jakob Berzelius", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p4", "N/A"],
        [35, "Br", "Bromine", "79.904", 17, 4, "nonmetal", "265.8", "332", "4", "2.96", "324.537", "1139.9", "N/A", "N/A", "N/A", "3.1028", "N/A", "N/A", "N/A", "Antoine Jérôme Balard", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p5", "N/A"],
        [36, "Kr", "Krypton", "83.7982", 18, 4, "noble", "115.78", "119.93", "4", "3", "-96", "1350.8", "N/A", "N/A", "N/A", "3.749", "N/A", "N/A", "N/A", "William Ramsay", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6", "N/A"],
        [37, "Rb", "Rubidium", "85.46783", 1, 5, "alkali", "312.45", "961", "5", "0.82", "46.884", "403", "N/A", "N/A", "N/A", "1.532", "N/A", "31.06 J/mol K", "N/A", "Robert Bunsen", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1", "N/A"],
        [38, "Sr", "Strontium", "87.621", 2, 5, "alkaline", "1050", "1650", "5", "0.95", "5.023", "549.5", "N/A", "N/A", "N/A", "2.64", "N/A", "26.4 J/mol K", "N/A", "William Cruickshank (chemist)", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2", "N/A"],
        [39, "Y", "Yttrium", "88.905842", 3, 5, "transition", "1799", "3203", "5", "1.22", "29.6", "600", "N/A", "N/A", "N/A", "4.472", "N/A", "26.53 J/mol K", "N/A", "Johan Gadolin", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d1", "N/A"],
        [40, "Zr", "Zirconium", "91.2242", 4, 5, "transition", "2128", "4650", "5", "1.33", "41.806", "640.1", "N/A", "N/A", "N/A", "6.52", "N/A", "25.36 J/mol K", "N/A", "Martin Heinrich Klaproth", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d2", "N/A"],
        [41, "Nb", "Niobium", "92.906372", 5, 5, "transition", "2750", "5017", "5", "1.6", "88.516", "652.1", "N/A", "N/A", "N/A", "8.57", "N/A", "24.6 J/mol K", "N/A", "Charles Hatchett", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d4", "N/A"],
        [42, "Mo", "Molybdenum", "95.951", 6, 5, "transition", "2896", "4912", "5", "2.16", "72.1", "684.3", "N/A", "N/A", "N/A", "10.28", "N/A", "24.06 J/mol K", "N/A", "Carl Wilhelm Scheele", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d5", "N/A"],
        [43, "Tc", "Technetium", "98", 7, 5, "transition", "2430", "4538", "5", "1.9", "53", "702", "N/A", "N/A", "N/A", "11", "N/A", "24.27 J/mol K", "N/A", "Emilio Segrè", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d5", "N/A"],
        [44, "Ru", "Ruthenium", "101.072", 8, 5, "transition", "2607", "4423", "5", "2.2", "100.96", "710.2", "N/A", "N/A", "N/A", "12.45", "N/A", "24.06 J/mol K", "N/A", "Karl Ernst Claus", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d7", "N/A"],
        [45, "Rh", "Rhodium", "102.905502", 9, 5, "transition", "2237", "3968", "5", "2.28", "110.27", "719.7", "N/A", "N/A", "N/A", "12.41", "N/A", "24.98 J/mol K", "N/A", "William Hyde Wollaston", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d8", "N/A"],
        [46, "Pd", "Palladium", "106.421", 10, 5, "transition", "1828.05", "3236", "4", "2.2", "54.24", "804.4", "N/A", "N/A", "N/A", "12.023", "N/A", "25.98 J/mol K", "N/A", "William Hyde Wollaston", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 4d10", "N/A"],
        [47, "Ag", "Silver", "107.86822", 11, 5, "transition", "1234.93", "2435", "5", "1.93", "125.862", "731", "N/A", "N/A", "N/A", "10.49", "430 W/mK", "25.35 J/mol K", "Trace", "unknown, before 5000 BC", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s1 4d10", "N/A"],
        [48, "Cd", "Cadmium", "112.4144", 12, 5, "transition", "594.22", "1040", "5", "1.69", "-68", "867.8", "N/A", "N/A", "N/A", "8.65", "N/A", "26.02 J/mol K", "N/A", "Karl Samuel Leberecht Hermann", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10", "N/A"],
        [49, "In", "Indium", "114.8181", 13, 5, "transition", "429.7485", "2345", "5", "1.78", "37.043", "558.3", "N/A", "N/A", "N/A", "7.31", "N/A", "26.74 J/mol K", "N/A", "Ferdinand Reich", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p1", "N/A"],
        [50, "Sn", "Tin", "118.7107", 14, 5, "transition", "505.08", "2875", "5", "1.96", "107.2984", "708.6", "N/A", "N/A", "N/A", "7.365", "N/A", "27.112 J/mol K", "N/A", "unknown, before 3500 BC", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p2", "N/A"],
        [51, "Sb", "Antimony", "121.7601", 15, 5, "metalloid", "903.78", "1908", "5", "2.05", "101.059", "834", "N/A", "N/A", "N/A", "6.697", "N/A", "25.23 J/mol K", "N/A", "unknown, before 3000 BC", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p3", "N/A"],
        [52, "Te", "Tellurium", "127.603", 16, 5, "metalloid", "722.66", "1261", "5", "2.1", "190.161", "869.3", "N/A", "N/A", "N/A", "6.24", "N/A", "25.73 J/mol K", "N/A", "Franz-Joseph Müller von Reichenstein", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p4", "N/A"],
        [53, "I", "Iodine", "126.904473", 17, 5, "nonmetal", "386.85", "457.4", "5", "2.66", "295.1531", "1008.4", "N/A", "N/A", "N/A", "4.933", "N/A", "N/A", "N/A", "Bernard Courtois", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p5", "N/A"],
        [54, "Xe", "Xenon", "131.2936", 18, 5, "noble", "161.4", "165.051", "5", "2.6", "-77", "1170.4", "N/A", "N/A", "N/A", "5.894", "N/A", "N/A", "N/A", "William Ramsay", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6", "N/A"],
        [55, "Cs", "Cesium", "132.905451966", 1, 6, "alkali", "301.7", "944", "6", "0.79", "45.505", "375.7", "N/A", "N/A", "N/A", "1.93", "N/A", "32.21 J/mol K", "N/A", "Robert Bunsen", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1", "N/A"],
        [56, "Ba", "Barium", "137.3277", 2, 6, "alkaline", "1000", "2118", "6", "0.89", "13.954", "502.9", "N/A", "N/A", "N/A", "3.51", "N/A", "28.07 J/mol K", "N/A", "Carl Wilhelm Scheele", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2", "N/A"],
        [57, "La", "Lanthanum", "138.905477", 3, 9, "lanthanoid", "1193", "3737", "6", "1.1", "53", "538.1", "N/A", "N/A", "N/A", "6.162", "N/A", "27.11 J/mol K", "N/A", "Carl Gustaf Mosander", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 5d1", "N/A"],
        [58, "Ce", "Cerium", "140.1161", 4, 9, "lanthanoid", "1068", "3716", "6", "1.12", "55", "534.4", "N/A", "N/A", "N/A", "6.77", "N/A", "26.94 J/mol K", "N/A", "Martin Heinrich Klaproth", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 5d1 4f1", "N/A"],
        [59, "Pr", "Praseodymium", "140.907662", 5, 9, "lanthanoid", "1208", "3403", "6", "1.13", "93", "527", "N/A", "N/A", "N/A", "6.77", "N/A", "27.2 J/mol K", "N/A", "Carl Auer von Welsbach", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f3", "N/A"],
        [60, "Nd", "Neodymium", "144.2423", 6, 9, "lanthanoid", "1297", "3347", "6", "1.14", "184.87", "533.1", "N/A", "N/A", "N/A", "7.01", "N/A", "27.45 J/mol K", "N/A", "Carl Auer von Welsbach", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f4", "N/A"],
        [61, "Pm", "Promethium", "145", 7, 9, "lanthanoid", "1315", "3273", "6", "1.13", "12.45", "540", "N/A", "N/A", "N/A", "7.26", "N/A", "N/A", "N/A", "Chien Shiung Wu", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f5", "N/A"],
        [62, "Sm", "Samarium", "150.362", 8, 9, "lanthanoid", "1345", "2173", "6", "1.17", "15.63", "544.5", "N/A", "N/A", "N/A", "7.52", "N/A", "29.54 J/mol K", "N/A", "Lecoq de Boisbaudran", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f6", "N/A"],
        [63, "Eu", "Europium", "151.9641", 9, 9, "lanthanoid", "1099", "1802", "6", "1.2", "11.2", "547.1", "N/A", "N/A", "N/A", "5.264", "N/A", "27.66 J/mol K", "N/A", "Eugène-Anatole Demarçay", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7", "N/A"],
        [64, "Gd", "Gadolinium", "157.253", 10, 9, "lanthanoid", "1585", "3273", "6", "1.2", "13.22", "593.4", "N/A", "N/A", "N/A", "7.9", "N/A", "37.03 J/mol K", "N/A", "Jean Charles Galissard de Marignac", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f7 5d1", "N/A"],
        [65, "Tb", "Terbium", "158.925352", 11, 9, "lanthanoid", "1629", "3396", "6", "1.1", "112.4", "565.8", "N/A", "N/A", "N/A", "8.23", "N/A", "28.91 J/mol K", "N/A", "Carl Gustaf Mosander", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f9", "N/A"],
        [66, "Dy", "Dysprosium", "162.5001", 12, 9, "lanthanoid", "1680", "2840", "6", "1.22", "33.96", "573", "N/A", "N/A", "N/A", "8.54", "N/A", "27.7 J/mol K", "N/A", "Lecoq de Boisbaudran", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f10", "N/A"],
        [67, "Ho", "Holmium", "164.930332", 13, 9, "lanthanoid", "1734", "2873", "6", "1.23", "32.61", "581", "N/A", "N/A", "N/A", "8.79", "N/A", "27.15 J/mol K", "N/A", "Marc Delafontaine", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f11", "N/A"],
        [68, "Er", "Erbium", "167.2593", 14, 9, "lanthanoid", "1802", "3141", "6", "1.24", "30.1", "589.3", "N/A", "N/A", "N/A", "9.066", "N/A", "28.12 J/mol K", "N/A", "Carl Gustaf Mosander", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f12", "N/A"],
        [69, "Tm", "Thulium", "168.934222", 15, 9, "lanthanoid", "1818", "2223", "6", "1.25", "99", "596.7", "N/A", "N/A", "N/A", "9.32", "N/A", "27.03 J/mol K", "N/A", "Per Teodor Cleve", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f13", "N/A"],
        [70, "Yb", "Ytterbium", "173.0451", 16, 9, "lanthanoid", "1097", "1469", "6", "1.1", "-1.93", "603.4", "N/A", "N/A", "N/A", "6.9", "N/A", "26.74 J/mol K", "N/A", "Jean Charles Galissard de Marignac", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14", "N/A"],
        [71, "Lu", "Lutetium", "174.96681", 17, 9, "lanthanoid", "1925", "3675", "6", "1.27", "33.4", "523.5", "N/A", "N/A", "N/A", "9.841", "N/A", "26.86 J/mol K", "N/A", "Georges Urbain", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d1", "N/A"],
        [72, "Hf", "Hafnium", "178.492", 4, 6, "transition", "2506", "4876", "6", "1.3", "17.18", "658.5", "N/A", "N/A", "N/A", "13.31", "N/A", "25.73 J/mol K", "N/A", "Dirk Coster", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d2", "N/A"],
        [73, "Ta", "Tantalum", "180.947882", 5, 6, "transition", "3290", "5731", "6", "1.5", "31", "761", "N/A", "N/A", "N/A", "16.69", "N/A", "25.36 J/mol K", "N/A", "Anders Gustaf Ekeberg", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d3", "N/A"],
        [74, "W", "Tungsten", "183.841", 6, 6, "transition", "3695", "6203", "6", "2.36", "78.76", "770", "N/A", "N/A", "N/A", "19.25", "N/A", "24.27 J/mol K", "N/A", "Carl Wilhelm Scheele", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d4", "N/A"],
        [75, "Re", "Rhenium", "186.2071", 7, 6, "transition", "3459", "5869", "6", "1.9", "5.8273", "760", "N/A", "N/A", "N/A", "21.02", "N/A", "25.48 J/mol K", "N/A", "Masataka Ogawa", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d5", "N/A"],
        [76, "Os", "Osmium", "190.233", 8, 6, "transition", "3306", "5285", "6", "2.2", "103.99", "840", "N/A", "N/A", "N/A", "22.59", "N/A", "24.7 J/mol K", "N/A", "Smithson Tennant", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d6", "N/A"],
        [77, "Ir", "Iridium", "192.2173", 9, 6, "transition", "2719", "4403", "6", "2.2", "150.94", "880", "N/A", "N/A", "N/A", "22.56", "N/A", "25.1 J/mol K", "N/A", "Smithson Tennant", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d7", "N/A"],
        [78, "Pt", "Platinum", "195.0849", 10, 6, "transition", "2041.4", "4098", "6", "2.28", "205.041", "870", "N/A", "N/A", "N/A", "21.45", "N/A", "25.86 J/mol K", "N/A", "Antonio de Ulloa", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d9", "N/A"],
        [79, "Au", "Gold", "196.9665695", 11, 6, "transition", "1337.33", "3243", "6", "2.54", "222.747", "890.1", "N/A", "N/A", "N/A", "19.3", "320 W/mK", "25.418 J/mol K", "Trace", "Middle East", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s1 4f14 5d10", "N/A"],
        [80, "Hg", "Mercury", "200.5923", 12, 6, "transition", "234.321", "629.88", "6", "2", "-48", "1007.1", "N/A", "N/A", "N/A", "13.534", "N/A", "27.983 J/mol K", "N/A", "unknown, before 2000 BCE", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10", "N/A"],
        [81, "Tl", "Thallium", "204.38", 13, 6, "transition", "577", "1746", "6", "1.62", "36.4", "589.4", "N/A", "N/A", "N/A", "11.85", "N/A", "26.32 J/mol K", "N/A", "William Crookes", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p1", "N/A"],
        [82, "Pb", "Lead", "207.21", 14, 6, "transition", "600.61", "2022", "6", "1.87", "34.4204", "715.6", "N/A", "N/A", "N/A", "11.34", "N/A", "26.65 J/mol K", "N/A", "Middle East", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p2", "N/A"],
        [83, "Bi", "Bismuth", "208.980401", 15, 6, "transition", "544.7", "1837", "6", "2.02", "90.924", "703", "N/A", "N/A", "N/A", "9.78", "N/A", "25.52 J/mol K", "N/A", "Claude François Geoffroy", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p3", "N/A"],
        [84, "Po", "Polonium", "209", 16, 6, "transition", "527", "1235", "6", "2", "136", "812.1", "N/A", "N/A", "N/A", "9.196", "N/A", "26.4 J/mol K", "N/A", "Pierre Curie", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p4", "N/A"],
        [85, "At", "Astatine", "210", 17, 6, "metalloid", "575", "610", "6", "2.2", "233", "899.003", "N/A", "N/A", "N/A", "6.35", "N/A", "N/A", "N/A", "Dale R. Corson", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p5", "N/A"],
        [86, "Rn", "Radon", "222", 18, 6, "noble", "202", "211.5", "6", "2.2", "-68", "1037", "N/A", "N/A", "N/A", "9.73", "N/A", "N/A", "N/A", "Friedrich Ernst Dorn", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6", "N/A"],
        [87, "Fr", "Francium", "223", 1, 7, "alkali", "300", "950", "7", "0.79", "46.89", "380", "N/A", "N/A", "N/A", "1.87", "N/A", "N/A", "N/A", "Marguerite Perey", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s1", "N/A"],
        [88, "Ra", "Radium", "226", 2, 7, "alkaline", "1233", "2010", "7", "0.9", "9.6485", "509.3", "N/A", "N/A", "N/A", "5.5", "N/A", "N/A", "N/A", "Pierre Curie", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2", "N/A"],
        [89, "Ac", "Actinium", "227", 3, 10, "actinoid", "1500", "3500", "7", "1.1", "33.77", "499", "N/A", "N/A", "N/A", "10", "N/A", "27.2 J/mol K", "N/A", "Friedrich Oskar Giesel", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 6d1", "N/A"],
        [90, "Th", "Thorium", "232.03774", 4, 10, "actinoid", "2023", "5061", "7", "1.3", "112.72", "587", "N/A", "N/A", "N/A", "11.724", "N/A", "26.23 J/mol K", "N/A", "Jöns Jakob Berzelius", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 6d2", "N/A"],
        [91, "Pa", "Protactinium", "231.035882", 5, 10, "actinoid", "1841", "4300", "7", "1.5", "53.03", "568", "N/A", "N/A", "N/A", "15.37", "N/A", "N/A", "N/A", "William Crookes", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f2 6d1", "N/A"],
        [92, "U", "Uranium", "238.028913", 6, 10, "actinoid", "1405.3", "4404", "7", "1.38", "50.94", "597.6", "N/A", "N/A", "N/A", "19.1", "N/A", "27.665 J/mol K", "N/A", "Martin Heinrich Klaproth", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f3 6d1", "N/A"],
        [93, "Np", "Neptunium", "237", 7, 10, "actinoid", "912", "4447", "7", "1.36", "45.85", "604.5", "N/A", "N/A", "N/A", "20.45", "N/A", "29.46 J/mol K", "N/A", "Edwin McMillan", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f4 6d1", "N/A"],
        [94, "Pu", "Plutonium", "244", 8, 10, "actinoid", "912.5", "3505", "7", "1.28", "-48.33", "584.7", "N/A", "N/A", "N/A", "19.816", "N/A", "35.5 J/mol K", "N/A", "Glenn T. Seaborg", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f6", "N/A"],
        [95, "Am", "Americium", "243", 9, 10, "actinoid", "1449", "2880", "7", "1.13", "9.93", "578", "N/A", "N/A", "N/A", "12", "N/A", "62.7 J/mol K", "N/A", "Glenn T. Seaborg", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7", "N/A"],
        [96, "Cm", "Curium", "247", 10, 10, "actinoid", "1613", "3383", "7", "1.28", "27.17", "581", "N/A", "N/A", "N/A", "13.51", "N/A", "N/A", "N/A", "Glenn T. Seaborg", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f7 6d1", "N/A"],
        [97, "Bk", "Berkelium", "247", 11, 10, "actinoid", "1259", "2900", "7", "1.3", "-165.24", "601", "N/A", "N/A", "N/A", "14.78", "N/A", "N/A", "N/A", "Lawrence Berkeley National Laboratory", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f9", "N/A"],
        [98, "Cf", "Californium", "251", 12, 10, "actinoid", "1173", "1743", "7", "1.3", "-97.31", "608", "N/A", "N/A", "N/A", "15.1", "N/A", "N/A", "N/A", "Lawrence Berkeley National Laboratory", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f10", "N/A"],
        [99, "Es", "Einsteinium", "252", 13, 10, "actinoid", "1133", "1269", "7", "1.3", "-28.6", "619", "N/A", "N/A", "N/A", "8.84", "N/A", "N/A", "N/A", "Lawrence Berkeley National Laboratory", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f11", "N/A"],
        [100, "Fm", "Fermium", "257", 14, 10, "actinoid", "1800", "N/A", "7", "1.3", "33.96", "627", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "Lawrence Berkeley National Laboratory", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f12", "N/A"],
        [101, "Md", "Mendelevium", "258", 15, 10, "actinoid", "1100", "N/A", "7", "1.3", "93.91", "635", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "Lawrence Berkeley National Laboratory", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f13", "N/A"],
        [102, "No", "Nobelium", "259", 16, 10, "actinoid", "1100", "N/A", "7", "1.3", "-223.22", "642", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14", "N/A"],
        [103, "Lr", "Lawrencium", "266", 17, 10, "actinoid", "1900", "N/A", "7", "1.3", "-30.04", "470", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "Lawrence Berkeley National Laboratory", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 7p1", "N/A"],
        [104, "Rf", "Rutherfordium", "267", 4, 7, "transition", "2400", "5800", "7", "N/A", "N/A", "580", "N/A", "N/A", "N/A", "23.2", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d2", "N/A"],
        [105, "Db", "Dubnium", "268", 5, 7, "transition", "N/A", "N/A", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "29.3", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d3", "N/A"],
        [106, "Sg", "Seaborgium", "269", 6, 7, "transition", "N/A", "N/A", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "35", "N/A", "N/A", "N/A", "Lawrence Berkeley National Laboratory", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d4", "N/A"],
        [107, "Bh", "Bohrium", "270", 7, 7, "transition", "N/A", "N/A", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "37.1", "N/A", "N/A", "N/A", "Gesellschaft für Schwerionenforschung", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d5", "N/A"],
        [108, "Hs", "Hassium", "269", 8, 7, "transition", "126", "N/A", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "40.7", "N/A", "N/A", "N/A", "Gesellschaft für Schwerionenforschung", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d6", "N/A"],
        [109, "Mt", "Meitnerium", "278", 9, 7, "transition", "N/A", "N/A", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "37.4", "N/A", "N/A", "N/A", "Gesellschaft für Schwerionenforschung", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d7", "N/A"],
        [110, "Ds", "Darmstadtium", "281", 10, 7, "transition", "N/A", "N/A", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "34.8", "N/A", "N/A", "N/A", "Gesellschaft für Schwerionenforschung", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d8", "N/A"],
        [111, "Rg", "Roentgenium", "282", 11, 7, "transition", "N/A", "N/A", "7", "N/A", "151", "N/A", "N/A", "N/A", "N/A", "28.7", "N/A", "N/A", "N/A", "Gesellschaft für Schwerionenforschung", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d9", "N/A"],
        [112, "Cn", "Copernicium", "285", 12, 7, "transition", "N/A", "3570", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "14.0", "N/A", "N/A", "N/A", "Gesellschaft für Schwerionenforschung", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10", "N/A"],
        [113, "Nh", "Nihonium", "286", 13, 7, "transition", "700", "1430", "7", "N/A", "66.6", "N/A", "N/A", "N/A", "N/A", "16", "N/A", "N/A", "N/A", "RIKEN", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p1", "N/A"],
        [114, "Fl", "Flerovium", "289", 14, 7, "transition", "340", "420", "7", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "14", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p2", "N/A"],
        [115, "Mc", "Moscovium", "289", 15, 7, "transition", "670", "1400", "7", "N/A", "35.3", "N/A", "N/A", "N/A", "N/A", "13.5", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p3", "N/A"],
        [116, "Lv", "Livermorium", "293", 16, 7, "transition", "709", "1085", "7", "N/A", "74.9", "N/A", "N/A", "N/A", "N/A", "12.9", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p4", "N/A"],
        [117, "Ts", "Tennessine", "294", 17, 7, "metalloid", "723", "883", "7", "N/A", "165.9", "N/A", "N/A", "N/A", "N/A", "7.17", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p5", "N/A"],
        [118, "Og", "Oganesson", "294", 18, 7, "noble", "N/A", "350", "7", "N/A", "5.40318", "N/A", "N/A", "N/A", "N/A", "4.95", "N/A", "N/A", "N/A", "Joint Institute for Nuclear Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6", "N/A"],
        [119, "Uue", "Ununennium", "315", 1, 8, "alkali", "N/A", "630", "8", "N/A", "63.87", "N/A", "N/A", "N/A", "N/A", "3", "N/A", "N/A", "N/A", "GSI Helmholtz Centre for Heavy Ion Research", "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6 5s2 4d10 5p6 6s2 4f14 5d10 6p6 7s2 5f14 6d10 7p6 8s1", "N/A"]
    ];

    const grid = document.getElementById('pt-grid-area');
    
    // Create numerical Group mappings across the top
    for(let g = 1; g <= 18; g++) {
        const gl = document.createElement('div');
        gl.className = 'grid-group-label';
        gl.style.gridColumn = `${g+1}`; // +1 offset for periods
        gl.textContent = g;
        grid.appendChild(gl);
    }

    // Create Period mappings down left
    for(let p = 1; p <= 7; p++) {
        const pl = document.createElement('div');
        pl.className = 'grid-period-label';
        pl.style.gridRow = `${p+1}`;
        pl.textContent = p;
        grid.appendChild(pl);
    }

    // Create the visual key guide next to Hydrogen (Atomic, Symbol, Name, Weight)
    const guideBlock = document.createElement('div');
    guideBlock.className = 'grid-guide-block';
    guideBlock.style.gridRow = '2'; 
    guideBlock.style.gridColumn = '3 / span 2';
    guideBlock.innerHTML = `
        <div style="font-size: 0.55em; font-weight:bold;">Atomic</div>
        <div style="font-size: 1.2em; font-family:'Outfit'; font-weight:800; color:white;">Symbol</div>
        <div style="font-size: 0.7em; font-weight: 500;">Name</div>
        <div style="font-size: 0.7em;">Weight</div>
    `;
    grid.appendChild(guideBlock);

    // DOM construction variables
    const cardsMap = new Map();

    elementData.forEach(data => {
        let [num, sym, name, mass, group, period, category, melt, boil] = data;
        
        const card = document.createElement('div');
        card.className = `ele-card cat-${category}`;
        
        // Complex positional logic (Lanthanoids and Actinoids float below main grid)
        let row = period + 1;
        let col = group + 1;
        
        if (num >= 57 && num <= 71) {
            row = 10; // Lanthanoids sequence at bottom
            col = (num - 57) + 5; // Start at col 5 to leave space
        } else if (num >= 89 && num <= 103) {
            row = 11; // Actinoids below Lanthanoids
            col = (num - 89) + 5;
        }

        // Add special markers 57-71 to main grid
        if (num === 57) {
            const marker = document.createElement('div');
            marker.className = 'ele-card';
            marker.style.gridRow = '7'; marker.style.gridColumn = '4';
            marker.innerHTML = '<div style="text-align:center; font-size:0.7em; opacity:0.6; padding-top:10px;">57-71</div>';
            grid.appendChild(marker);
        }
        if (num === 89) {
            const marker2 = document.createElement('div');
            marker2.className = 'ele-card';
            marker2.style.gridRow = '8'; marker2.style.gridColumn = '4';
            marker2.innerHTML = '<div style="text-align:center; font-size:0.7em; opacity:0.6; padding-top:10px;">89-103</div>';
            grid.appendChild(marker2);
        }

        card.style.gridRow = `${row}`;
        card.style.gridColumn = `${col}`;
        
        card.innerHTML = `
            <div class="ele-num">${num}</div>
            <div class="ele-sym">${sym}</div>
            <div class="ele-name">${name}</div>
            <div class="ele-mass">${mass}</div>
        `;

        // Store data for interactivity
        card.dataset.num = num;
        card.dataset.cat = category;
        card.dataset.melt = melt;
        card.dataset.boil = boil;
        
        // Bind Interaction Logic natively
        card.addEventListener('mouseenter', () => updateSidebar(data, card));
        card.addEventListener('mouseleave', () => {
            if (window.lockedElementData && window.lockedCardNode) {
                updateSidebar(window.lockedElementData, window.lockedCardNode);
            }
        });
        card.addEventListener('click', () => {
            window.lockedElementData = data;
            window.lockedCardNode = card;
            updateSidebar(data, card);
            
            document.querySelectorAll('.ele-card').forEach(c => c.classList.remove('locked'));
            card.classList.add('locked');
        });

        cardsMap.set(num, card);
        grid.appendChild(card);
    });

    // Reference to sidebar elements
    const ui = {
        clAtomic: document.getElementById('cl-atomic'),
        clSymbol: document.getElementById('cl-symbol'),
        clName: document.getElementById('cl-name'),
        clMass: document.getElementById('cl-mass'),
        clBox: document.getElementById('pt-closeup'),
        pSeries: document.getElementById('p-series'),
        pPhase: document.getElementById('p-phase'),
        pWeight: document.getElementById('p-weight'),
        pConfig: document.getElementById('p-config'),
        pOxidation: document.getElementById('p-oxidation'),
        tempSlider: document.getElementById('temp-slider'),
        tempInput: document.getElementById('temp-input'),
        readoutC: document.getElementById('readout-c'),
        readoutF: document.getElementById('readout-f'),
        readoutK: document.getElementById('readout-k'),
        pWiki: document.getElementById('p-wiki'),
        pEnergy: document.getElementById('p-energy'),
        pElectro: document.getElementById('p-electro'),
        pMelt: document.getElementById('p-melt'),
        pBoil: document.getElementById('p-boil'),
        pAffinity: document.getElementById('p-affinity'),
        pIonization: document.getElementById('p-ionization'),
        pDensity: document.getElementById('p-density'),
        pCond: document.getElementById('p-cond'),
        pHeat: document.getElementById('p-heat'),
        pAbundance: document.getElementById('p-abundance'),
        pDiscovered: document.getElementById('p-discovered'),
        sidebar: document.getElementById('pt-sidebar'),
        sidebarToggle: document.getElementById('pt-sidebar-toggle'),
        sidebarClose: document.getElementById('pt-sidebar-close'),
        trendSelect: document.getElementById('trend-select'),
        trendLegend: document.getElementById('trend-legend')
    };

    // Sidebar Toggle Logic
    ui.sidebarToggle.addEventListener('click', () => {
        ui.sidebar.classList.remove('sidebar-closed');
    });
    ui.sidebarClose.addEventListener('click', () => {
        ui.sidebar.classList.add('sidebar-closed');
    });

    function updateSidebar(data, cardNode) {
        document.querySelectorAll('.ele-card').forEach(c => c.classList.remove('active'));
        cardNode.classList.add('active');

        let [num, sym, name, mass, group, period, category, melt, boil, energy, electro, affinity, ionization, radius, hardness, modulus, density, cond, heat, abundance, discovered, config, oxidation] = data;

        ui.clAtomic.textContent = num;
        ui.clSymbol.textContent = sym;
        ui.clName.textContent = name;
        ui.clMass.textContent = mass;
        
        ui.clBox.className = `pt-closeup cat-${category}`;
        
        ui.pSeries.textContent = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        ui.pWeight.textContent = `${mass} u`;
        ui.pConfig.textContent = config || 'N/A';
        ui.pOxidation.textContent = oxidation || 'N/A';

        if (ui.pWiki) {
            ui.pWiki.href = `https://en.wikipedia.org/wiki/${name}`;
            ui.pEnergy.textContent = energy || 'N/A';
            ui.pElectro.textContent = electro || 'N/A';
            ui.pMelt.textContent = (melt && melt !== 'N/A') ? `${(melt-273.15).toFixed(2)} °C` : 'N/A';
            ui.pBoil.textContent = (boil && boil !== 'N/A') ? `${(boil-273.15).toFixed(2)} °C` : 'N/A';
            ui.pAffinity.textContent = (affinity && affinity !== 'N/A') ? `${affinity} kJ/mol` : 'N/A';
            ui.pIonization.textContent = (ionization && ionization !== 'N/A') ? `${ionization} kJ/mol` : 'N/A';
            ui.pDensity.textContent = (density && density !== 'N/A') ? `${density} g/cm³` : 'N/A';
            ui.pCond.textContent = cond || 'N/A';
            ui.pHeat.textContent = heat || 'N/A';
            ui.pAbundance.textContent = abundance || 'N/A';
            ui.pDiscovered.textContent = discovered || 'N/A';
        }

        recalcSinglePhase(data);
    }

    // Periodic Trends Logic
    function applyTrendColors(trendType) {
        if (trendType === 'none') {
            ui.trendLegend.style.display = 'none';
            syncTemperatures(parseFloat(ui.tempSlider.value));
            return;
        }

        ui.trendLegend.style.display = 'flex';
        let values = [];

        elementData.forEach(el => {
            let rawVal = 'N/A';
            if (trendType === 'electronegativity') rawVal = el[10];
            if (trendType === 'ionization') rawVal = el[12];
            if (trendType === 'affinity') rawVal = el[11];
            if (trendType === 'radius') rawVal = el[13];
            
            let val = parseFloat(rawVal);
            if (!isNaN(val)) {
                values.push(val);
            }
        });

        const min = Math.min(...values);
        const max = Math.max(...values);

        cardsMap.forEach((card, num) => {
            const data = elementData[num - 1];
            let rawVal = 'N/A';
            if (trendType === 'electronegativity') rawVal = data[10];
            if (trendType === 'ionization') rawVal = data[12];
            if (trendType === 'affinity') rawVal = data[11];
            if (trendType === 'radius') rawVal = data[13];

            let val = parseFloat(rawVal);

            if (isNaN(val)) {
                card.style.backgroundColor = 'rgba(100, 116, 139, 0.2)';
                return;
            }

            // Map 0 to 1
            const normalized = (val - min) / (max - min);
            // HSL: 240 (Blue) to 0 (Red)
            const hue = 240 - (normalized * 240);
            card.style.backgroundColor = `hsla(${hue}, 70%, 50%, 0.6)`;
        });
    }

    ui.trendSelect.addEventListener('change', (e) => {
        applyTrendColors(e.target.value);
    });

    // Interactive Slider logic calculating state based on Thermodynamics
    function getPhase(tempK, meltK, boilK) {
        if (!meltK || meltK === 'N/A' || meltK === 0) return {txt: 'Unknown', cls: 'phase-unknown'};
        if (tempK < meltK) return {txt: 'Solid', cls: 'phase-solid'};
        if (tempK >= meltK && (boilK === 'N/A' || tempK < boilK)) return {txt: 'Liquid', cls: 'phase-liquid'};
        if (boilK !== 'N/A' && tempK >= boilK) return {txt: 'Gas', cls: 'phase-gas'};
        return {txt: 'Unknown', cls: 'phase-unknown'};
    }

    function recalcSinglePhase(data) {
        let tempC = parseFloat(ui.tempSlider.value);
        let tempK = tempC + 273.15;
        let phase = getPhase(tempK, data[7], data[8]);
        ui.pPhase.textContent = phase.txt;
        ui.pPhase.className = `p-val ${phase.cls}`;
    }

    function syncTemperatures(tempC) {
        let tempK = tempC + 273.15;
        let tempF = (tempC * 9/5) + 32;
        
        ui.readoutC.textContent = tempC.toFixed(1) + ' °C';
        ui.readoutK.textContent = tempK.toFixed(1) + ' K';
        ui.readoutF.textContent = tempF.toFixed(1) + ' °F';

        // Only apply phase color if no trend is selected
        if (ui.trendSelect.value !== 'none') return;

        cardsMap.forEach((card, num) => {
            const data = elementData[num - 1];
            let melt = data[7];
            let boil = data[8];
            
            card.style.opacity = '1';
            let phase = getPhase(tempK, melt, boil);
            
            // Revert background to category color if it was changed by trends
            const category = data[6];
            card.style.backgroundColor = ''; // CSS class handles it
            
            let symNode = card.querySelector('.ele-sym');
            if(phase.cls === 'phase-solid') symNode.style.color = '#ffffff';
            if(phase.cls === 'phase-liquid') symNode.style.color = '#60a5fa'; // Blue for liquid
            if(phase.cls === 'phase-gas') symNode.style.color = '#f87171'; // Red for gas
            if(phase.cls === 'phase-unknown') symNode.style.color = 'rgba(255,255,255,0.4)';
        });
    }

    ui.tempSlider.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        ui.tempInput.value = val.toFixed(1);
        syncTemperatures(val);
    });

    ui.tempInput.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        if(!isNaN(val)) {
            ui.tempSlider.value = val;
            syncTemperatures(val);
        }
    });

    // Initialize first element (Hydrogen)
    if(cardsMap.get(1)) {
        window.lockedElementData = elementData[0];
        window.lockedCardNode = cardsMap.get(1);
        cardsMap.get(1).classList.add('locked');
        updateSidebar(elementData[0], cardsMap.get(1));
    }
    syncTemperatures(25); // default at 25 C
    
    // Category Legend Filtering
    const seriesTags = document.querySelectorAll('.series-tag');
    seriesTags.forEach(tag => {
        const catClass = Array.from(tag.classList).find(c => c.startsWith('cat-'));
        
        tag.addEventListener('mouseenter', () => {
            if(!catClass) return;
            cardsMap.forEach(card => {
                if (card.classList.contains(catClass)) {
                    card.style.opacity = '1';
                    card.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.3))';
                    card.style.zIndex = '10';
                } else {
                    card.style.opacity = '0.15';
                    card.style.filter = 'grayscale(1)';
                    card.style.zIndex = '1';
                }
            });
        });

        tag.addEventListener('mouseleave', () => {
            cardsMap.forEach(card => {
                card.style.filter = '';
                card.style.zIndex = '1';
                card.style.opacity = '1';
            });
            if (ui.trendSelect.value === 'none') {
                syncTemperatures(parseFloat(ui.tempSlider.value));
            } else {
                applyTrendColors(ui.trendSelect.value);
            }
        });
    });
});
