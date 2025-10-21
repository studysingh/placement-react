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
files = [f for f in os.listdir(data_dir) if f.endswith('.json')]

# Exclude the index itself if present
files = [f for f in files if f != os.path.basename(output_file)]

# Build metadata entries with filesystem mtime -> ISO string
from datetime import datetime, timezone
entries = []
for f in files:
    path = os.path.join(data_dir, f)
    try:
        mtime = os.path.getmtime(path)
        updated_at = datetime.fromtimestamp(mtime, tz=timezone.utc).isoformat()
    except Exception:
        updated_at = None
    entries.append({
        "fileName": f,
        "updatedAt": updated_at
    })

# Save to files_index.json
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(entries, f, indent=2, ensure_ascii=False)

print(f"✅ files_index.json generated successfully with {len(entries)} files!")
