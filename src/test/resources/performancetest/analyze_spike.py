import csv, re
from collections import defaultdict

CSV = "src/test/resources/performancetest/spike_results.csv"

phases = defaultdict(lambda: {"elapsed": [], "errors": 0})

with open(CSV, newline="") as f:
    for row in csv.DictReader(f):
        m = re.search(r"(Phase \d - [^-\s][^-]+)", row["threadName"])
        if not m:
            continue
        phase = m.group(1).strip()
        elapsed = int(row["elapsed"])
        phases[phase]["elapsed"].append(elapsed)
        if row["success"].strip().lower() == "false":
            phases[phase]["errors"] += 1

for phase in sorted(phases):
    data = sorted(phases[phase]["elapsed"])
    total = len(data)
    avg = sum(data) / total
    p90 = data[int(total * 0.90)]
    err_pct = phases[phase]["errors"] / total * 100
    print(f"{phase}: samples={total}  avg={avg:.0f}ms  p90={p90:.0f}ms  errors={err_pct:.1f}%")
