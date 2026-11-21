#!/usr/bin/env python3
import json
import os
import sys

TARGETS_FILE = os.path.join(os.path.dirname(__file__), '../content/outreach_targets.json')

def load_data():
    if not os.path.exists(TARGETS_FILE):
        print("Target file not found.")
        sys.exit(1)
    with open(TARGETS_FILE, 'r') as f:
        return json.load(f)

def save_data(data):
    with open(TARGETS_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def list_targets():
    data = load_data()
    print(f"=== OUTREACH TARGETS FOR {data['artist']['name']} ({data['artist']['email']}) ===")
    print(f"{'#':<3} {'Target Name':<32} {'Platform/Method':<25} {'Track':<20} {'Status':<15}")
    print("-" * 98)
    for idx, t in enumerate(data['targets'], 1):
        print(f"{idx:<3} {t['name']:<32} {t['method']:<25} {t['recommended_track']:<20} {t['status']:<15}")

def update_status(idx, status):
    data = load_data()
    if 1 <= idx <= len(data['targets']):
        target = data['targets'][idx-1]
        target['status'] = status
        save_data(data)
        print(f"Updated '{target['name']}' status to: {status}")
    else:
        print("Invalid target index.")

if __name__ == '__main__':
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == 'list':
            list_targets()
        elif cmd == 'status' and len(sys.argv) >= 4:
            idx = int(sys.argv[2])
            status = sys.argv[3]
            update_status(idx, status)
        else:
            print("Usage: python3 outreach_tracker.py [list | status <index> <new_status>]")
    else:
        list_targets()
