import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MOCK_DIR = ROOT / "dev" / "mock-data" / "generic-001"
OUTPUT = ROOT / "entry" / "src" / "main" / "ets" / "mock" / "Generic001MockData.ets"


def read_json(name: str):
    return json.loads((MOCK_DIR / name).read_text(encoding="utf-8"))


def to_arkts(value, indent=0):
    space = " " * indent
    next_space = " " * (indent + 2)
    if isinstance(value, dict):
        parts = []
        for key, item in value.items():
            parts.append(f"{next_space}{json.dumps(key, ensure_ascii=True)}: {to_arkts(item, indent + 2)}")
        return "{\n" + ",\n".join(parts) + f"\n{space}" + "}"
    if isinstance(value, list):
        parts = [f"{next_space}{to_arkts(item, indent + 2)}" for item in value]
        return "[\n" + ",\n".join(parts) + f"\n{space}" + "]"
    return json.dumps(value, ensure_ascii=True)


def main():
    page_meta = read_json("page-meta.json")
    location_state = read_json("location-state.json")
    ticket_products = read_json("ticket-products.json")
    detection_rules = read_json("detection-rules.json")
    checklist = read_json("checklist.json")

    content = f"""export interface PageMeta {{
  appName: string;
  pageTitle: string;
  pageSubtitle: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  tertiaryActionLabel: string;
  statusTitle: string;
  insightTitle: string;
  listTitle: string;
  checklistTitle: string;
}}

export interface LocationStateData {{
  selectedCity: string;
  selectedDistrict: string;
  currentCity: string;
  currentDistrict: string;
  locationSource: string;
  mismatchReason: string;
  mismatchImpact: string;
  resolvedMessage: string;
  keepMessage: string;
}}

export interface TicketProduct {{
  id: string;
  city: string;
  title: string;
  subtitle: string;
  distance: string;
  price: string;
  tag: string;
  highlight: boolean;
}}

export interface DetectionRule {{
  id: string;
  title: string;
  detail: string;
}}

export interface ChecklistItem {{
  id: string;
  title: string;
}}

export const pageMeta: PageMeta = {to_arkts(page_meta, 0)};

export const initialLocationState: LocationStateData = {to_arkts(location_state, 0)};

export const ticketProducts: TicketProduct[] = {to_arkts(ticket_products, 0)};

export const detectionRules: DetectionRule[] = {to_arkts(detection_rules, 0)};

export const checklistItems: ChecklistItem[] = {to_arkts(checklist, 0)};
"""
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(content, encoding="utf-8")


if __name__ == "__main__":
    main()
