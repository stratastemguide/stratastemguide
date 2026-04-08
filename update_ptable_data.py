import urllib.request
import json
import re
import os

url = "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
try:
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read().decode())
except Exception as e:
    print("Failed to download data:", e)
    exit(1)

elements = data.get("elements", [])
# ptable.js array format:
# [num, sym, name, mass, group, period, category, melt, boil, energy, electro, affinity, ionization, radius, hardness, modulus, density, cond, heat, abundance, discovered, electron_configuration, oxidation_states]
# Wait, the original had 21 items. Let's add electron_configuration and oxidation_states at the end, and ionic radius.
# Let's map properties:
# 0: number
# 1: symbol
# 2: name
# 3: atomic_mass
# 4: xpos (group)
# 5: ypos (period)
# 6: category
# 7: melt
# 8: boil
# 9: shells (len) => energy
# 10: electronegativity_pauling
# 11: electron_affinity
# 12: ionization_energies[0]
# 13: atomic_radius
# 14: hardness (N/A)
# 15: modulus (N/A)
# 16: density
# 17: thermal_conductivity (N/A or none)
# 18: specific_heat (N/A)
# 19: abundance (N/A)
# 20: discovered_by
# 21: electron_configuration (new)
# 22: oxidation_states (new)
# 23: ionic_radius (not in this JSON unfortunately? Let's check if there is an ionic radius, if not we use atomic radius for the visualizer. Or we can just include electron_affinity, ionization, atomic_radius, electronegativity for the trends)

# Enrichment data for common elements (Conductivity W/mK, Abundance Universe %)
enrichment = {
    1: {"cond": "0.18", "abun": "75%"},
    2: {"cond": "0.15", "abun": "23%"},
    6: {"cond": "140", "abun": "0.5%"},
    7: {"cond": "0.026", "abun": "0.1%"},
    8: {"cond": "0.027", "abun": "1%"},
    9: {"cond": "0.027", "abun": "0.00004%"},
    10: {"cond": "0.049", "abun": "0.13%"},
    12: {"cond": "160", "abun": "0.06%"},
    13: {"cond": "235", "abun": "0.005%"},
    14: {"cond": "150", "abun": "0.07%"},
    16: {"cond": "0.20", "abun": "0.04%"},
    26: {"cond": "80", "abun": "0.11%"},
    29: {"cond": "400", "abun": "0.00001%"},
    47: {"cond": "430", "abun": "Trace"},
    79: {"cond": "320", "abun": "Trace"},
}

new_data_lines = []

def safe_val(val, suffix=""):
    if val is None or val == "N/A":
        return '"N/A"'
    if isinstance(val, (int, float)):
        return f'"{val}{suffix}"'
    if isinstance(val, list):
        if len(val) == 0:
            return '"N/A"'
        return '"' + ', '.join(str(v) for v in val) + '"'
    return '"' + str(val).replace('"', "'") + suffix + '"'

for el in elements:
    num = el.get('number')
    sym = '"' + el.get('symbol', '') + '"'
    name = '"' + el.get('name', '') + '"'
    mass = safe_val(el.get('atomic_mass'))
    group = el.get('xpos')
    period = el.get('ypos')
    
    cat = el.get('category', '').lower()
    if 'alkali metal' in cat: cat = 'alkali'
    elif 'alkaline earth' in cat: cat = 'alkaline'
    elif 'transition metal' in cat: cat = 'transition'
    elif 'post-transition' in cat: cat = 'post-transition'
    elif 'metalloid' in cat: cat = 'metalloid'
    elif 'nonmetal' in cat: cat = 'nonmetal'
    elif 'noble gas' in cat: cat = 'noble'
    elif 'lanthanide' in cat: cat = 'lanthanoid'
    elif 'actinide' in cat: cat = 'actinoid'
    else: cat = 'unknown'
    cat = '"' + cat + '"'
    
    melt = safe_val(el.get('melt'))
    boil = safe_val(el.get('boil'))
    energy = safe_val(len(el.get('shells', [])))
    electro = safe_val(el.get('electronegativity_pauling'))
    affinity = safe_val(el.get('electron_affinity'))
    ie = el.get('ionization_energies', [])
    ion1 = safe_val(ie[0]) if ie else '"N/A"'
    
    # Enrichment mapping
    e = enrichment.get(num, {})
    cond = safe_val(e.get('cond') or el.get('thermal_conductivity'), " W/mK")
    heat = safe_val(el.get('molar_heat') or el.get('specific_heat'), " J/mol K") # Molar heat as fallback
    abundance = safe_val(e.get('abun') or el.get('abundance'), "")
    
    row = f"        [{num}, {sym}, {name}, {mass}, {group}, {period}, {cat}, {melt}, {boil}, {energy}, {electro}, {affinity}, {ion1}, {safe_val(el.get('atomic_radius'))}, " \
          f"{safe_val(el.get('hardness', 'N/A'))}, {safe_val(el.get('modulus', 'N/A'))}, {safe_val(el.get('density'))}, " \
          f"{cond}, {heat}, {abundance}, " \
          f"{safe_val(el.get('discovered_by', 'N/A'))}, {safe_val(el.get('electron_configuration', 'N/A'))}, {safe_val(el.get('oxidation_states', 'N/A'))}]"
    
    new_data_lines.append(row)

new_array_str = "[\n" + ",\n".join(new_data_lines) + "\n    ]"
file_path = "c:/coding/website 2.0/Nowrin labs(company works)/sci hub - Copy/ptable.js"

with open(file_path, "r", encoding="utf-8") as f:
    js_content = f.read()

pattern = r"const elementData\s*=\s*\[.*?\];"
replaced = re.sub(pattern, "const elementData = " + new_array_str + ";", js_content, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(replaced)

print("ptable.js correctly updated with enriched elementData.")
