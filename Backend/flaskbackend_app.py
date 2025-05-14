import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from PIL import Image
import io
import numpy as np
import tensorflow as tf
import json
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import requests
from flask import Flask, request, jsonify
import google.generativeai as genai
from googletrans import Translator
import os


app = Flask(__name__)
CORS(app)  # Apply CORS to allow cross-origin requests

# Load the pre-trained Keras model
eco_model = tf.keras.models.load_model("enviromind-platform/aimodels/trash_classifier.keras")

# Define the material classes
CLASSES = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]

# Define a simple EcoScore mapping (could be refined)
ECO_SCORE = {
    "cardboard": 8,
    "glass": 9,
    "metal": 7,
    "paper": 8,
    "plastic": 3,
    "trash": 2
}

# Define environmental tips for each material
ENV_TIPS = {
    "cardboard": "Recycle or compost cardboard to reduce landfill waste.",
    "glass": "Glass can be infinitely recycled, so make sure to drop it in the right bin.",
    "metal": "Reuse metal items when possible and recycle scrap metal responsibly.",
    "paper": "Paper recycling helps save trees—avoid excessive paper waste.",
    "plastic": "Plastic recycling varies by type; reduce single-use plastics when possible.",
    "trash": "Consider repurposing or minimizing waste to reduce environmental impact."
}

# Function to preprocess the image
def preprocess_imageecoscan(image_data):
    image = Image.open(io.BytesIO(image_data))
    image = image.resize((224, 224))  # Resize image to expected input size
    image = np.array(image) / 255.0   # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Reshape for model input
    return image

# Flask route for eco scan
@app.route('/eco_scan', methods=['POST'])
def eco_scan():
    if 'file' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['file']
    image_data = file.read()

    # Preprocess image and make prediction
    processed_image = preprocess_imageecoscan(image_data)
    predictions = eco_model.predict(processed_image)
    predicted_class_index = np.argmax(predictions)
    predicted_class = CLASSES[predicted_class_index]
    confidence = float(predictions[0][predicted_class_index]) * 100

    # Generate output details
    eco_score = ECO_SCORE[predicted_class]
    tip = ENV_TIPS[predicted_class]
    biodegradable = predicted_class in ["cardboard", "paper"]
    revive_friendly = predicted_class in ["glass", "plastic", "cardboard", "paper"]
    print("PREDICTED MATERIAL=",predicted_class)
    response = {
        'Predicted Class': predicted_class,
        'Confidence Score': f"{confidence:.2f}%",
        'EcoScore': eco_score,
        'Environmental Tips': tip,
        'Biodegradable': biodegradable,
        'ReVive Friendly': revive_friendly
    }

    return jsonify(response)




# Load the AI model for plant disease detection PLANT MODE**********************
plant_model = tf.keras.models.load_model("enviromind-platform/aimodels/plant_disease_model.h5")
print("PLANT Model Input Shape:", plant_model.input_shape)  # Debugging info
# Load class indices
with open("enviromind-platform/class_indices/class_indices.json", 'r') as f:
    class_indices = json.load(f)

# Reverse class indices for lookup
idx_to_class = {v: k for k, v in class_indices.items()}

# Extract plant details
def extract_details(class_name):
    if "Pepper" in class_name:
        return "Bell Pepper", "Capsicum annuum", "Healthy" if "healthy" in class_name else "Diseased"
    elif "Potato" in class_name:
        return "Potato", "Solanum tuberosum", "Healthy" if "healthy" in class_name else "Diseased"
    elif "Tomato" in class_name:
        return "Tomato", "Solanum lycopersicum", "Healthy" if "healthy" in class_name else "Diseased"
    else:
        return "Unknown", "Unknown", "Unknown"

# Function to preprocess image for the AI model
def preprocess_image(image_data):
    img = Image.open(io.BytesIO(image_data))
    img = img.resize((128, 128))  # Adjust based on model input size
    img_array = np.array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Reshape for model input
    return img_array

# Generate random nutrient values
def generate_nutrient_data():
    return {
        "Nitrogen": {"Current": random.randint(55, 75), "Optimal": 80},
        "Phosphorus": {"Current": random.randint(40, 55), "Optimal": 60},
        "Potassium": {"Current": random.randint(65, 80), "Optimal": 75},
        "Calcium": {"Current": random.randint(45, 60), "Optimal": 65},
        "Magnesium": {"Current": random.randint(35, 55), "Optimal": 50}
    }

# Flask route for plant disease detection (AgroVision Plant Mode)
@app.route('/agrovision/plant_mode', methods=['POST'])
def agrovision_plantmode():
    if 'file' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['file']
    print("file recieved")
    image_data = file.read()

    # Preprocess image and predict disease
    print("DOING PRE POCESS")
    processed_image = preprocess_image(image_data)
    print("PRE PROCESS WORKED")
    predictions = plant_model.predict(processed_image)
    print("PLANT PREDICTION WORKED")
    pred_idx = np.argmax(predictions)
    confidence = float(np.max(predictions)) * 100
    class_name = idx_to_class.get(pred_idx, "Unknown")

    # Get plant details
    plant, bio_name, health_status = extract_details(class_name)
    print("Plant health status:",health_status)
    # Generate random nutrient analysis data
    nutrient_data = generate_nutrient_data()
    print("plant nutrients data")
    print(nutrient_data)
    # Construct response JSON
    response = {
        "Plant Name": plant,
        "Biological Name": bio_name,
        "Health Condition": health_status,
        "Confidence Score": f"{confidence:.2f}%",
        "Nutrient Analysis": nutrient_data
    }

    return jsonify(response)


# Load the AI model for soil type detection
soil_model = tf.keras.models.load_model("enviromind-platform/aimodels/soilmodel.keras")
print("*****SOIL Model Input Shape:", soil_model.input_shape)  # Debugging info

# Soil information mapping
soil_info = {
    "Alluvial Soil": {"Ideal pH Level": "6.5–7.0", "Recommended Crops": "Rice, wheat, cotton"},
    "Clayey Soil": {"Ideal pH Level": "6.0–6.5", "Recommended Crops": "Rice, wheat, cereals"},
    "Laterite Soil": {"Ideal pH Level": "6.0–7.0", "Recommended Crops": "Coffee, tea, cashew nuts"},
    "Loamy Soil": {"Ideal pH Level": "6.5–7.0", "Recommended Crops": "Tomatoes, lettuce, vegetables"},
    "Sandy Loam": {"Ideal pH Level": "6.0–6.5", "Recommended Crops": "Peas, beans, root crops"},
    "Sandy Soil": {"Ideal pH Level": "6.0–6.5", "Recommended Crops": "Carrots, potatoes, root vegetables"}
}

# List of classes
class_names = list(soil_info.keys())

# Function to preprocess image for the AI model
def preprocess_image_soil(image_data):
    img = Image.open(io.BytesIO(image_data)).convert('RGB')
    img = img.resize((128, 128))  # Ensure correct size
    img_array = np.array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Reshape for model input
    return img_array

# Generate random nutrient data
def generate_nutrient_data_soil():
    return {
        "Macronutrients": {
            "Nitrogen (N)": random.randint(50, 80),
            "Phosphorus (P)": random.randint(40, 65),
            "Potassium (K)": random.randint(60, 85),
            "Calcium (Ca)": random.randint(45, 70),
            "Magnesium (Mg)": random.randint(35, 60)
        },
        "Micronutrients": {
            "Iron (Fe)": random.randint(10, 30),
            "Manganese (Mn)": random.randint(5, 25),
            "Zinc (Zn)": random.randint(5, 20),
            "Copper (Cu)": random.randint(3, 15),
            "Boron (B)": random.randint(2, 10)
        }
    }

# Generate random pH level classification
def determine_ph_level():
    ph_value = round(random.uniform(4.0, 8.0), 1)
    if ph_value < 6.0:
        return {"pH Level": ph_value, "Category": "Acidic"}
    elif 6.0 <= ph_value <= 7.0:
        return {"pH Level": ph_value, "Category": "Neutral"}
    else:
        return {"pH Level": ph_value, "Category": "Alkaline"}

# Flask route for soil type detection
@app.route('/agrovision/soil_mode', methods=['POST'])
def agrovision_soilmode():
    if 'file' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    file = request.files['file']
    image_data = file.read()
    print("FILE CAME IN SOIL MODE****************")
    # Preprocess image and predict soil type
    processed_image = preprocess_image_soil(image_data)
    print("DOING PRE POCESS soil modeeee")
    predictions = soil_model.predict(processed_image)
    print("SOIL************** PREDICTION WORKED")
    predicted_class = class_names[np.argmax(predictions)]

    # Generate nutrient data and pH level
    nutrient_data = generate_nutrient_data_soil()
    print("NUTRIENT DATA *********")
    print(nutrient_data)
    ph_level = determine_ph_level()
    print("PH LEVEL=",ph_level)

    # Construct response JSON
    response = {
        "Predicted Soil Type": predicted_class,
        "Ideal pH Level": soil_info[predicted_class]["Ideal pH Level"],
        "Recommended Crops": soil_info[predicted_class]["Recommended Crops"],
        "Nutrient Analysis": nutrient_data,
        "pH Level Info": ph_level
    }

    return jsonify(response)

#*********POLLUMAPS FUNCTION FROM HERE**************
# Air Quality API details
API_TOKEN = 'e44bbb4a767467b169484390a4462695175e74f6'  # Replace with your actual token
BASE_URL = 'https://api.waqi.info/feed'

@app.route('/worldcitiesaqi', methods=['GET'])
def get_world_cities_aqi():
    cities = {
        "Beijing": "beijing",
        "New Delhi": "new delhi",
        "New York": "new york",
        "Moscow": "moscow",
        "Tokyo": "tokyo",
        "London": "london"
    }

    results = {}

    for city_display, city_query in cities.items():
        try:
            url = f"{BASE_URL}/{city_query}/?token={API_TOKEN}"
            print(f"Fetching AQI for {city_display} ➜ {url}")
            response = requests.get(url, timeout=5)
            data = response.json()
            if data.get("status") == "ok":
                aqi_value = data["data"].get("aqi", "N/A")
                results[city_display] = aqi_value
            else:
                print(f"❌ Failed to fetch AQI for {city_display}")
                results[city_display] = "Unavailable"
        except Exception as e:
            print(f"❗ Exception for {city_display}: {str(e)}")
            results[city_display] = "Error"

    print("🌍 World Cities AQI Results:", results)
    return jsonify(results)


# Function to generate random AQI values for historical years
def generate_historical_aqi():
    return {str(year): random.randint(50, 200) for year in range(2018, 2024)}  # Generate AQI from 2018-2023


def generate_fallback_aqi_data(city):
    historical_aqi = generate_historical_aqi()
    print("Historical aqi")
    print(historical_aqi)
    return {
        "city": city + " (fallback data)",
        "aqi": random.randint(50, 150),
        "pm25": round(random.uniform(5, 80), 2),
        "pm10": round(random.uniform(10, 120), 2),
        "o3": round(random.uniform(10, 100), 2),
        "no2": round(random.uniform(5, 60), 2),
        "so2": round(random.uniform(1, 30), 2),
        "co": round(random.uniform(0.1, 2.0), 2),
        **historical_aqi
    }
    
    
@app.route('/pollumap', methods=['POST'])
def get_air_quality():
    data1 = request.json
    print("hereeeeeee in polllumapppppp")
    print(data1)
    city = data1.get("place", None)
    print(f"📍 Received Place: {city}")

    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    url = f"{BASE_URL}/{city}/?token={API_TOKEN}"
    print(url)
    print("WEATHER API WORKED or not worked")

    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        print(data)
        print("check data now")

        # Handle complete failure
        if data.get("status") != "ok":
            print("❗Fallback: City not found in weather station database.")
            fallback_data = generate_fallback_aqi_data(city)
            return jsonify(fallback_data)

        iaqi = data["data"].get("iaqi", {})

        def extract_value(key):
            return iaqi.get(key, {}).get("v", "N/A")

        # Extract all values
        aqi_val = data["data"].get("aqi", "N/A")
        pm25 = extract_value("pm25")
        pm10 = extract_value("pm10")
        o3 = extract_value("o3")
        no2 = extract_value("no2")
        so2 = extract_value("so2")
        co = extract_value("co")

        # Check for invalid values and trigger fallback if found
        if aqi_val in ["-", "N/A", None] or all(x in ["N/A", None] for x in [pm25, pm10, o3, no2, so2, co]):
            print("⚠️ API responded but with invalid/missing AQI data. Using fallback.")
            fallback_data = generate_fallback_aqi_data(city)
            return jsonify(fallback_data)

        # Historical AQI
        historical_aqi = generate_historical_aqi()
        print("Historical aqi")
        print(historical_aqi)

        # Final Response
        result = {
            "city": data["data"]["city"]["name"],
            "aqi": aqi_val,
            "pm25": pm25,
            "pm10": pm10,
            "o3": o3,
            "no2": no2,
            "so2": so2,
            "co": co,
            **historical_aqi
        }
        print("AQIIIII:")
        print(aqi_val)
        print(result)
        return jsonify(result)

    except Exception as e:
        print("❗Exception occurred, using fallback data.")
        fallback_data = generate_fallback_aqi_data(city or "Unknown")
        return jsonify(fallback_data)

#*******Pollumap climate backend starts from here

# Replace with your actual keys
WEATHERSTACK_API_KEY = '9c630e3ffa8eef2eb1ee1189745dbc62'
AMBEE_API_KEY = '025d80233a0ae701e604ea3634781879448b7875ed3ed24e89c0695dc899ac8b'

# Function to generate random historical temperatures (°C)
def generate_random_historical_temps():
    base = round(random.uniform(13.0, 15.0), 1)
    return {
        "2018": base,
        "2019": round(base + random.uniform(0.3, 0.5), 1),
        "2020": round(base + random.uniform(0.6, 0.9), 1),
        "2021": round(base + random.uniform(1.0, 1.3), 1),
        "2022": round(base + random.uniform(1.4, 1.6), 1),
        "2023": round(base + random.uniform(1.7, 2.0), 1)
    }

def generate_random_emission_breakdown():
    return {
        "transportation": round(random.uniform(10, 30), 2),
        "industry": round(random.uniform(20, 40), 2),
        "agriculture": round(random.uniform(5, 25), 2),
        "residential": round(random.uniform(5, 20), 2),
        "other": round(random.uniform(1, 10), 2),
    }
    
    
@app.route('/get_climate_data', methods=['POST'])
def get_climate_data():
    data = request.get_json()
    city = data.get('city')

    if not city:
        return jsonify({'error': 'City is required'}), 400

    try:
        # Weather API call
        weather_url = f"http://api.weatherstack.com/current?access_key={WEATHERSTACK_API_KEY}&query={city}"
        weather_response = requests.get(weather_url).json()
        current_temp = weather_response.get('current', {}).get('temperature', 'N/A')

        # CO2 API call
        ambee_url = "https://api.ambeedata.com/latest/by-city"
        headers = {"x-api-key": AMBEE_API_KEY}
        params = {"city": city}
        ambee_response = requests.get(ambee_url, headers=headers, params=params).json()

        stations = ambee_response.get('stations', [])
        if stations and 'CO2' in stations[0]:
            carbon_footprint = stations[0]['CO2'].get('concentration', 'N/A')
        else:
            carbon_footprint = 'N/A'

        historical_temps = generate_random_historical_temps()
        warming_trend = round(historical_temps["2023"] - historical_temps["2018"], 2)
        emissions = generate_random_emission_breakdown()
        print("EMISSIONS HEREEEE @@@@@@@@@@")
        print(emissions)
        
        return jsonify({
            "city": city,
            "current_temp": current_temp,
            "carbon_footprint": carbon_footprint,
            "warming_trend": warming_trend,
            **emissions,
            **historical_temps
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#************Pollumap Water quality functionality


# Function to generate random AQI values for historical years
def generate_historical_water():
    return {str(year): random.randint(50, 200) for year in range(2018, 2024)}  # Generate AQI from 2018-2023


@app.route('/get_water_quality_data', methods=['POST'])
def get_water_quality_data():
    try:
        data = request.get_json()
        city = data.get('city')

        if not city:
            return jsonify({'error': 'City is required'}), 400

        print(f"Fetching water quality data for {city}")

        # Random Quality Index
        quality_index = random.randint(40, 90)
        safe_for_drinking = "Yes" if quality_index >= 70 else "No"

        # Contaminants
        contaminants = ["Heavy Metals", "Nitrates", "Microplastics", "Pesticides", "Pharmaceuticals"]
        random_percentages = [random.uniform(5, 35) for _ in range(len(contaminants))]
        total = sum(random_percentages)
        contaminant_levels = {
            contaminant: round((val / total) * 100, 1)
            for contaminant, val in zip(contaminants, random_percentages)
        }

        # Random common contaminants (3 out of 5)
        common_contaminants = random.sample(contaminants, 3)


        historical_trend=generate_historical_water()
        print("QUALITY INDEXXX WATERRRR")
        print(quality_index)
        print("CONTAINMENTS******************** DISTRIBUTION")
        print(contaminant_levels)
        print("WATER HIST RECORDDD**************")
        print(historical_trend)
        return jsonify({
            "city": city,
            "quality_index": quality_index,
            "safe_for_drinking": safe_for_drinking,
            "common_contaminants": common_contaminants,
            "contaminant_levels": contaminant_levels,
            **historical_trend
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500




# DR R CHATBOT FUNCTIONALITY FROM HERE
# Gemini setup with correct API version and key
genai.configure(api_key="AIzaSyB5hg7-tqakTiqYW7walII7YNwACHeKBMc")

# Load the Gemini model
model = genai.GenerativeModel(model_name="gemini-1.5-flash")  # Make sure this model name is correct!

# Google Translate setup
translator = Translator()

# Detect if the user is asking environmental or medical queries
def detect_intent(user_input):
    environmental_keywords = ["pollution", "air", "climate", "carbon", "co2", "water", "temperature"]
    medical_keywords = ["medicine", "fever", "pain", "headache", "doctor", "pill", "symptoms", "health"]

    input_lower = user_input.lower()
    if any(kw in input_lower for kw in environmental_keywords):
        return "environmental"
    elif any(kw in input_lower for kw in medical_keywords):
        return "medical"
    return "general"



@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400

        # Detect language
        detected_lang = translator.detect(user_message).lang

        # Translate to English if necessary
        translated_input = translator.translate(user_message, src=detected_lang, dest='en').text

        # Detect intent
        intent = detect_intent(translated_input)

        # Prepare prompt
        prompt = f"""
        You are Dr. R, a friendly and expert assistant specializing in environmental science and medicine.
        Respond accurately and clearly to the following query in under 150 words. Don't include greetings in your message:
        "{translated_input}"
        """

        # Generate response from Gemini
        gemini_response = model.generate_content(prompt)
        english_response = gemini_response.text.strip()

        # Translate response back to user's language (only if not English)
        if detected_lang != 'en':
            translated_response = translator.translate(english_response, src='en', dest=detected_lang).text
            final_combined_response = f"{translated_response}\n\n(English: {english_response})"
        else:
            final_combined_response = english_response

        return jsonify({
            "message": final_combined_response,
            "detected_language": detected_lang,
            "intent": intent
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
    
    
if __name__ == '__main__':
    app.run(debug=True)
    
    
    
    
    
    
    
    
   