import os
import json

# Path to the data folder (adjust if needed)
data_dir = os.path.join("public", "data")
output_file = os.path.join(data_dir, "files_index.json")

# Ensure the folder exists
if not os.path.exists(data_dir):
    print(f"❌ Folder does not exist: {data_dir}")
    exit(1)

# List all JSON files
files = [f for f in os.listdir(data_dir) if f.endswith(".json")]

# Save to files_index.json
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(files, f, indent=2, ensure_ascii=False)

print(f"✅ files_index.json generated successfully with {len(files)} files!")
