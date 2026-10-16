'use strict';

// 执行生产 sprite() 并检查 SVG 几何；不启动浏览器，也不修改素材。
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const appPath = path.join(root, 'dist/app.js');
const appSource = fs.readFileSync(appPath, 'utf8');
const runtime = { window: {} };
vm.createContext(runtime);
for (const filename of ['data.js', 'visuals.js', 'asset-layout.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'dist', filename), 'utf8'), runtime, { filename });
}

// 编译到第一个完整函数边界；模板字符串中的大括号不会被误判为结束。
function extractSprite(source) {
  const start = source.search(/\bfunction\s+sprite\s*\(/);
  assert(start >= 0, 'app.js 必须提供独立的 sprite() 函数');
  for (let end = source.indexOf('}', start); end >= 0; end = source.indexOf('}', end + 1)) {
    const candidate = source.slice(start, end + 1);
    try {
      new vm.Script(`(${candidate})`, { filename: 'sprite-extracted.js' });
    } catch (error) {
      if (error instanceof SyntaxError) continue;
      throw error;
    }
    return candidate;
  }
  assert.fail('无法从 app.js 提取完整 sprite() 函数');
}

const escapeAttribute = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const sprite = vm.runInNewContext(`(${extractSprite(appSource)})`, { esc: escapeAttribute });
const { SHIJIAN_DATA: data, SHIJIAN_VISUALS: visuals, SHIJIAN_ASSET_LAYOUT: layouts } = runtime.window;
assert(data && visuals && layouts, '生产数据与素材映射必须可读取');

const EPSILON = 2e-6;
const pngSizes = new Map();

function near(actual, expected, label, tolerance = EPSILON) {
  assert(Number.isFinite(actual) && Number.isFinite(expected), `${label} 必须为有限数`);
  assert(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)),
    `${label}: 期望 ${expected}，实际 ${actual}`);
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(match => [match[1], match[2]]));
}

function numbers(value, count, label) {
  assert.equal(typeof value, 'string', `${label} 属性缺失`);
  const parsed = value.trim().split(/[\s,]+/).map(Number);
  assert.equal(parsed.length, count, `${label} 数值数量`);
  assert(parsed.every(Number.isFinite), `${label} 必须为有限数`);
  return parsed;
}

function parseFrame(markup, label) {
  assert.equal(typeof markup, 'string', `${label} 返回 SVG 字符串`);
  const svgTags = [...markup.matchAll(/<svg\b[^>]*>/g)].map(match => attributes(match[0]));
  assert.equal(svgTags.length, 2, `${label} 保留外框与 sourceRect 两层 SVG`);
  const outer = svgTags[0], inner = svgTags[1];
  const [left, top, width, height] = numbers(outer.viewBox, 4, `${label} 外框 viewBox`);
  assert(width > 0 && height > 0, `${label} 外框尺寸必须为正`);
  assert.equal(outer.preserveAspectRatio, 'xMidYMid meet', `${label} 外框必须等比显示`);
  const group = markup.match(/<g\b[^>]*>/);
  assert(group, `${label} 缺少主体变换`);
  const transform = attributes(group[0]).transform;
  assert.equal(typeof transform, 'string', `${label} 缺少 transform`);
  const operations = [...transform.matchAll(/([a-zA-Z]+)\s*\(([^)]*)\)/g)];
  assert.equal(operations.length, 2, `${label} 只允许平移与等比缩放`);
  assert.equal(transform.replace(/[a-zA-Z]+\s*\([^)]*\)/g, '').trim(), '', `${label} 不含额外变换`);
  assert.equal(operations[0][1], 'translate', `${label} 先平移至舞台中心`);
  assert.equal(operations[1][1], 'scale', `${label} 再等比缩放`);
  const [tx, ty] = numbers(operations[0][2], 2, `${label} translate`);
  const scales = operations[1][2].trim().split(/[\s,]+/).map(Number);
  assert(scales.length === 1 || scales.length === 2, `${label} scale 维数`);
  assert(scales.every(value => Number.isFinite(value) && value > 0), `${label} scale 必须为有限正数`);
  if (scales.length === 2) near(scales[0], scales[1], `${label} 禁止非等比拉伸`);
  const crop = numbers(inner.viewBox, 4, `${label} sourceRect viewBox`);
  const ix = Number(inner.x), iy = Number(inner.y), iw = Number(inner.width), ih = Number(inner.height);
  assert([ix, iy, iw, ih].every(Number.isFinite) && iw > 0 && ih > 0, `${label} sourceRect 显示尺寸`);
  assert.equal(inner.overflow, 'hidden', `${label} sourceRect 不得透出邻格`);
  const image = markup.match(/<image\b[^>]*>/);
  assert(image, `${label} 原图引用缺失`);
  return { left, top, width, height, tx, ty, scale: scales[0], crop, ix, iy, iw, ih, image: attributes(image[0]) };
}

function inspectFrame(v, l, aspect, label, markup = null, fit = 'contain') {
  const frame = parseFrame(markup ?? sprite(v, l, aspect, fit), label);
  const [x, y, w, h] = v.sourceRect;
  const [x0, y0, x1, y1] = l.bounds;
  near(frame.width / frame.height, aspect, `${label} 舞台长宽比`);
  frame.crop.forEach((value, index) => near(value, v.sourceRect[index], `${label} 原图裁切坐标 ${index}`));
  near(frame.iw, w, `${label} 裁切宽度`);
  near(frame.ih, h, `${label} 裁切高度`);
  near(frame.iw / frame.ih, w / h, `${label} 内层保持原图比例`);
  near(Number(frame.image.width), v.sourceSize[0], `${label} 原图宽度`);
  near(Number(frame.image.height), v.sourceSize[1], `${label} 原图高度`);
  assert.equal(frame.image.href, `assets/${escapeAttribute(v.file)}`, `${label} 原图路径`);

  // 用实际 SVG 变换计算主体边界；各模式共用中心与等比要求。
  const left = frame.tx + (frame.ix + x0) * frame.scale;
  const right = frame.tx + (frame.ix + x1) * frame.scale;
  const top = frame.ty + (frame.iy + y0) * frame.scale;
  const bottom = frame.ty + (frame.iy + y1) * frame.scale;
  const margins = [
    (left - frame.left) / frame.width,
    (frame.left + frame.width - right) / frame.width,
    (top - frame.top) / frame.height,
    (frame.top + frame.height - bottom) / frame.height,
  ];
  assert(margins.every(Number.isFinite), `${label} 主体边界必须为有限数`);
  near(margins[0], margins[1], `${label} 水平居中`);
  near(margins[2], margins[3], `${label} 垂直居中`);
  const target = l.scale * Math.max(x1 - x0, y1 - y0) / Math.max(w, h);
  assert(target > 0 && target < 1, `${label} 归一化占比必须在 0 与 1 之间`);
  const occupationX = (right - left) / frame.width;
  const occupationY = (bottom - top) / frame.height;
  const occupation = Math.max(occupationX, occupationY);
  if (fit === 'cover') {
    // 两轴均覆盖窗口；允许裁掉边缘，不能通过拉伸或偏移消除留白。
    assert(margins.every(margin => margin <= EPSILON), `${label} 主体 bbox 覆盖舞台四边`);
    assert(occupationX >= 1 - EPSILON && occupationY >= 1 - EPSILON, `${label} 填充模式不留空边`);
    near(Math.min(occupationX, occupationY), 1.02, `${label} 填充模式仅保留规定的 2% 放大余量`);
  } else if (fit === 'dense') {
    assert(margins.every(margin => margin >= .03 - EPSILON), `${label} 完整大图四边至少保留 3% 安全留白`);
    near(occupation, .94, `${label} 完整大图占满 94% 可用窗口`);
    near(Math.min(...margins), .03, `${label} 完整大图最小安全留白一致`);
  } else {
    assert.equal(fit, 'contain', `${label} 已知完整显示模式`);
    assert(margins.every(margin => margin > 0), `${label} 主体完整且四边留白`);
    near(occupation, target, `${label} 在不同舞台保持可用占比`);
    near(Math.min(...margins), (1 - target) / 2, `${label} 保留一致的最小安全留白`);
  }
  // 防止测试仅凭相同 viewBox 比例掩盖非等比的内层缩放。
  near((right - left) / (x1 - x0), (bottom - top) / (y1 - y0), `${label} 主体横纵同倍率`);
  return frame;
}

function sourceSize(file) {
  if (pngSizes.has(file)) return pngSizes.get(file);
  const assetPath = path.resolve(root, 'dist/assets', file);
  const assetRoot = path.resolve(root, 'dist/assets') + path.sep;
  assert(assetPath.startsWith(assetRoot), `${file} 必须位于 assets 内`);
  assert(fs.existsSync(assetPath), `${file} 原图存在`);
  const header = Buffer.alloc(24), handle = fs.openSync(assetPath, 'r');
  try {
    assert.equal(fs.readSync(handle, header, 0, 24, 0), 24, `${file} PNG 头完整`);
  } finally {
    fs.closeSync(handle);
  }
  assert(header.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), `${file} 使用原始 PNG`);
  assert.equal(header.toString('ascii', 12, 16), 'IHDR', `${file} PNG IHDR`);
  const size = [header.readUInt32BE(16), header.readUInt32BE(20)];
  pngSizes.set(file, size);
  return size;
}

let recordsChecked = 0, framesChecked = 0;
const modeCounts = { contain: 0, cover: 0, dense: 0 };

function inspectFillModes(v, l, label) {
  for (const fit of ['cover', 'dense']) {
    // 方形缩略图、3:2 菜品卡与4:3食材图库均检查实际渲染行为。
    for (const aspect of [1, 1.5, 4 / 3]) {
      inspectFrame(v, l, aspect, `${label}/${fit}@${aspect}`, null, fit);
      framesChecked++;
      modeCounts[fit]++;
    }
  }
}
for (const kind of ['ingredients', 'recipes']) {
  const records = data[kind];
  assert(Array.isArray(records) && records.length > 0, `${kind} 生产数据存在`);
  assert.equal(new Set(records.map(record => record.id)).size, records.length, `${kind} ID 唯一`);
  const ids = Array.from(records, record => record.id).sort();
  assert.deepEqual(Object.keys(visuals[kind]).sort(), ids, `${kind} 素材覆盖全部且无多余 ID`);
  assert.deepEqual(Object.keys(layouts[kind]).sort(), ids, `${kind} 布局覆盖全部且无多余 ID`);
  for (const { id } of records) {
    const v = visuals[kind][id], l = layouts[kind][id], label = `${kind}/${id}`;
    assert.equal(v.sourceSize?.length, 2, `${label} sourceSize`);
    assert.equal(v.sourceRect?.length, 4, `${label} sourceRect`);
    assert.equal(l.bounds?.length, 4, `${label} alpha bounds`);
    assert([...v.sourceSize, ...v.sourceRect, ...l.bounds].every(Number.isFinite), `${label} 坐标有限`);
    const [x, y, w, h] = v.sourceRect, [W, H] = v.sourceSize, [x0, y0, x1, y1] = l.bounds;
    assert(x >= 0 && y >= 0 && w > 0 && h > 0 && x + w <= W && y + h <= H, `${label} sourceRect 在原图内`);
    assert(x0 > 0 && y0 > 0 && x1 > x0 && y1 > y0 && x1 < w && y1 < h, `${label} 主体在裁切窗口内`);
    const actualSize = sourceSize(v.file);
    near(W, actualSize[0], `${label} sourceSize 对应实际 PNG 宽度`, 0);
    near(H, actualSize[1], `${label} sourceSize 对应实际 PNG 高度`, 0);
    for (const aspect of [1, 1.5]) {
      inspectFrame(v, l, aspect, `${label}@${aspect}`);
      framesChecked++;
      modeCounts.contain++;
    }
    inspectFillModes(v, l, label);
    recordsChecked++;
  }
}

// 长条、稀疏主体与不对称裁切留白，覆盖方形旧算法容易漏掉的情况。
const synthetic = [
  { name: '横向长条', rect: [100, 30, 900, 64], size: [1200, 200], bounds: [40, 24, 850, 46], target: .8 },
  { name: '纵向长条', rect: [30, 100, 64, 900], size: [200, 1200], bounds: [24, 40, 46, 850], target: .85 },
  { name: '非方形稀疏主体', rect: [35, 10, 360, 200], size: [500, 220], bounds: [60, 20, 310, 180], target: .8 },
  { name: '边缘细小主体', rect: [5, 7, 101, 99], size: [180, 160], bounds: [2, 40, 99, 47], target: .85 },
];
for (const item of synthetic) {
  const v = { file: 'synthetic-frame.png', columns: 1, rows: 1, index: 0, sourceSize: item.size, sourceRect: item.rect };
  const [x0, y0, x1, y1] = item.bounds;
  const l = { bounds: item.bounds, scale: item.target * Math.max(item.rect[2], item.rect[3]) / Math.max(x1 - x0, y1 - y0) };
  for (const aspect of [1, 1.5]) {
    inspectFrame(v, l, aspect, `合成/${item.name}@${aspect}`);
    framesChecked++;
    modeCounts.contain++;
  }
  inspectFrame(v, l, 1, `合成/${item.name}@默认`, sprite(v, l));
  framesChecked++;
  modeCounts.contain++;
  inspectFillModes(v, l, `合成/${item.name}`);
}

const first = data.ingredients[0].id, invalidAspects = [0, -1, NaN, Infinity, -Infinity, 'wide', null];
let rejectedAspects = 0, recoveredAspects = 0;
for (const aspect of invalidAspects) {
  const label = `非法 aspect ${String(aspect)}`;
  let markup;
  try {
    markup = sprite(visuals.ingredients[first], layouts.ingredients[first], aspect);
  } catch (error) {
    assert(error && typeof error.message === 'string' && error.message.length, `${label} 错误可解释`);
    rejectedAspects++;
    continue;
  }
  const frame = parseFrame(markup, label), recoveredAspect = frame.width / frame.height;
  assert(recoveredAspect >= .5 && recoveredAspect <= 3, `${label} 必须回退到合理的显示比例`);
  inspectFrame(visuals.ingredients[first], layouts.ingredients[first], recoveredAspect, label, markup);
  recoveredAspects++;
}

console.log(`PASS: ${recordsChecked} 种生产素材、${framesChecked} 个方形/宽幅/长条 SVG（contain ${modeCounts.contain}、cover ${modeCounts.cover}、dense ${modeCounts.dense}）；实际等比缩放、居中、完整安全留白或覆盖裁切、PNG 尺寸与映射覆盖；非法比例拒绝 ${rejectedAspects}、安全回退 ${recoveredAspects}。`);
