import requests
import time
import random

API_URL = "https://urban-telemetry.vercel.app/"

# 🔑 The Python script must now present the exact same secret key to get in
HEADERS = {
    "Authorization": "Bearer super_secret_tangerang_key_123"
}

print("📡 Initializing Wide-Area South Tangerang Sensor Fleet...")
print("🔒 Security: Bearer Token Enabled")
print("Press Ctrl+C to stop.\n")

while True:
    # 🌍 Upgraded Bounding Box: Covers the whole city
    payload = {
        "sensor_id": f"ST-{random.randint(100, 199)}",
        "lat": round(random.uniform(-6.3600, -6.2200), 4),
        "lng": round(random.uniform(106.6500, 106.7700), 4),
        "value": round(random.uniform(15.0, 150.0), 2) 
    }

    try:
        # Notice we are passing the HEADERS variable now!
        response = requests.post(API_URL, json=payload, headers=HEADERS)
        
        if response.status_code == 201:
            print(f"✅ Secure Data Saved: {payload['sensor_id']} | PM2.5: {payload['value']}")
        elif response.status_code == 401:
            print("🚨 BOUNCER BLOCKED YOU: 401 Unauthorized (Check your API Key)")
        else:
            print(f"❌ API Error: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"⚠️ Connection Failed: {e}")

    time.sleep(3)