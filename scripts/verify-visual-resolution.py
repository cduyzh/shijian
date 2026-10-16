#!/usr/bin/env python3
"""按冻结的 v7 主体像素基线验证新生成素材，仅读取 PNG，不插值放大。"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--report', type=Path)
args = parser.parse_args()
baseline = json.loads((ROOT / 'scripts/fixtures/visual-v7-baseline.json').read_text())
loader = """
const fs=require('fs'),vm=require('vm'),path=require('path'),c={window:{}};
for(const f of ['visuals.js','asset-layout.js'])vm.runInNewContext(fs.readFileSync(path.join(process.argv[1],f),'utf8'),c);
process.stdout.write(JSON.stringify({visuals:c.window.SHIJIAN_VISUALS,layouts:c.window.SHIJIAN_ASSET_LAYOUT}));
"""
loaded = json.loads(subprocess.run(['node', '-e', loader, str(ROOT/'dist')], capture_output=True, text=True, check=True).stdout)
provenance = {}
manifests = [ROOT/'dist/assets'/name for name in ['ingredients-hires-v8-manifest.json', 'cooked-spread-v9-manifest.json']]
for path in manifests:
    manifest = json.loads(path.read_text())
    records = manifest.get('assets', manifest.get('generations', manifest.get('atlases', [])))
    if isinstance(records, dict):
        records = records.values()
    for record in records:
        if record.get('file') and record.get('sha256') and (record.get('prompt') or record.get('actualPrompt')):
            provenance[record['file']] = record
result = {'passed': False, 'baseline': 'scripts/fixtures/visual-v7-baseline.json', 'minimumLinearRatio': 1.5, 'minimumAreaRatio': 1.5, 'items': {}, 'failures': []}
images = {}
native_checks = {}
for kind, records in baseline['items'].items():
    result['items'][kind] = {}
    if set(records) != set(loaded['visuals'][kind]):
        result['failures'].append(f'{kind} ID 覆盖与基线不同')
    for item_id, old in records.items():
        v = loaded['visuals'][kind].get(item_id)
        l = loaded['layouts'][kind].get(item_id)
        if not v or not l:
            result['failures'].append(f'{kind}/{item_id} 缺少映射')
            continue
        f = ROOT/'dist/assets'/v['file']
        if v['file'] not in images:
            with Image.open(f) as original:
                images[v['file']] = original.convert('RGBA').getchannel('A')
            proof = provenance.get(v['file'], {})
            copied_hash = hashlib.sha256(f.read_bytes()).hexdigest()
            original_path = Path(proof.get('source', proof.get('original', '')))
            original_matches = original_path.is_file() and hashlib.sha256(original_path.read_bytes()).hexdigest() == copied_hash
            native_checks[v['file']] = {
                'newGeneration': bool(proof),
                'nativeCopyHash': copied_hash == proof.get('sha256'),
                'recordedNativeSize': list(images[v['file']].size) == proof.get('sourceSize', proof.get('nativeSize', proof.get('size'))),
                'originalSourceMatches': original_matches,
                'transparentAlpha': images[v['file']].getextrema()[0] == 0,
            }
        alpha = images[v['file']]
        x, y, w, h = v['sourceRect']
        crop = alpha.crop((x, y, x+w, y+h))
        b = l['bounds']
        longest = max(b[2]-b[0], b[3]-b[1])
        area = sum(value >= 128 for value in crop.getdata())
        checks = {
            **native_checks[v['file']],
            'sourceSizeMatches': list(alpha.size) == v['sourceSize'],
            'linearIncrease': longest >= old['minimumLongest'],
            'visibleAreaIncrease': area >= old['minimumAlphaArea'],
        }
        row = {'file': v['file'], 'sourceRect': v['sourceRect'], 'baselineLongest': old['longest'], 'longest': longest, 'minimumLongest': old['minimumLongest'], 'linearRatio': round(longest/old['longest'], 4), 'baselineAlphaArea': old['alphaArea'], 'alphaArea': area, 'areaRatio': round(area/old['alphaArea'], 4), 'checks': checks}
        result['items'][kind][item_id] = row
        if not all(checks.values()):
            result['failures'].append(f"{kind}/{item_id}: " + ', '.join(name for name, passed in checks.items() if not passed))
result['passed'] = not result['failures']
rows = [row for records in result['items'].values() for row in records.values()]
result['counts'] = {kind: len(records) for kind, records in result['items'].items()}
result['minimumMeasuredLinearRatio'] = min(row['linearRatio'] for row in rows)
result['minimumMeasuredAreaRatio'] = min(row['areaRatio'] for row in rows)
if args.report:
    destination = args.report if args.report.is_absolute() else ROOT/args.report
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({key: result[key] for key in ['passed', 'counts', 'minimumMeasuredLinearRatio', 'minimumMeasuredAreaRatio', 'failures']}, ensure_ascii=False))
sys.exit(0 if result['passed'] else 1)
