import requests
import json
import time
import os
import re

# 🔧 CONFIG
START_ID = 570
END_ID = 700
# Save files directly into React app's public/data folder
OUTPUT_DIR = os.path.join("public", "data")  

# ✅ Ensure folder exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

for company_id in range(START_ID, END_ID + 1):
    url = "https://oahelper.in/question.php"
    params = {
        "action": "get_questions_by_company",
        "company_id": company_id
    }
    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code != 200:
            print(f"⚠️ Skipping company_id={company_id}, HTTP {response.status_code}")
            continue

        data = response.json()

        if data.get("status") != "success" or not data.get("data"):
            # No questions for this company
            continue

        # Extract company name from first question
        company_name = data["data"][0].get("company_name", f"company_{company_id}")

        # Sanitize company name for file system (remove invalid chars)
        safe_name = re.sub(r'[\\/:"*?<>|]+', "_", company_name.strip())

        filename = f"{company_id}_{safe_name}.json"
        filepath = os.path.join(OUTPUT_DIR, filename)

        # Save the questions
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data["data"], f, indent=4, ensure_ascii=False)

        print(f"✅ Saved company_id={company_id}, name={company_name}, questions={len(data['data'])}")

        # Be polite to the server
        time.sleep(0.2)

    except requests.exceptions.RequestException as e:
        print(f"⚠️ Error fetching company_id={company_id}: {e}")
    except Exception as e:
        print(f"⚠️ Unexpected error for company_id={company_id}: {e}")

print(f"\n💾 All available companies' questions saved in folder '{OUTPUT_DIR}'")
