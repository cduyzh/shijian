/* 食间的真实几何餐食预览。
 * 画面用于认识食材与餐盘搭配，不作为真实份量、热量或成品照片。
 * Three.js r186；食物、陶瓷、布垫均为 mesh，没有食物图片 billboard。
 */
import * as THREE from './vendor/three.module.js';

const MAX_RENDERERS = 3;
const records = new Map();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const recipeById = new Map((window.SHIJIAN_DATA?.recipes || []).map(recipe => [recipe.id, recipe]));
const ingredientById = new Map((window.SHIJIAN_DATA?.ingredients || []).map(ingredient => [ingredient.id, ingredient]));
const lifetime = { created: 0, disposed: 0, contextLosses: 0, renderCalls: 0 };
let unavailable = false;
let disposedPage = false;
let sequence = 0;
const selector = '.meal-scene[data-meal][data-scene-key]';
const clamp = THREE.MathUtils.clamp;
const ROOT_HEIGHT = 0.018;
const FOOD_FLOOR = 0.24;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const dummy = new THREE.Object3D();

function seedFor(value) {
  let seed = 2166136261;
  for (const character of String(value)) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function roundedShape(width, depth, radius, hole = false) {
  const shape = hole ? new THREE.Path() : new THREE.Shape();
  const x = -width / 2;
  const z = -depth / 2;
  const r = Math.min(radius, width / 2, depth / 2);
  shape.moveTo(x + r, z);
  shape.lineTo(x + width - r, z);
  shape.quadraticCurveTo(x + width, z, x + width, z + r);
  shape.lineTo(x + width, z + depth - r);
  shape.quadraticCurveTo(x + width, z + depth, x + width - r, z + depth);
  shape.lineTo(x + r, z + depth);
  shape.quadraticCurveTo(x, z + depth, x, z + depth - r);
  shape.lineTo(x, z + r);
  shape.quadraticCurveTo(x, z, x + r, z);
  shape.closePath();
  return shape;
}

function solidShape(shape, height, bevel = 0.025) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: bevel > 0,
    bevelSegments: 3,
    bevelSize: bevel,
    bevelThickness: bevel
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function roundedSolid(width, depth, height, radius = 0.12, bevel = 0.025) {
  return solidShape(roundedShape(width, depth, radius), height, bevel);
}

function ringSolid(width, depth, wall, height, radius = 0.22, bevel = 0.025) {
  const shape = roundedShape(width, depth, radius);
  shape.holes.push(roundedShape(width - wall * 2, depth - wall * 2, Math.max(radius - wall, 0.04), true));
  return solidShape(shape, height, bevel);
}

function leafGeometry(width = 0.38, length = 0.86, curl = 0.13, jagged = false) {
  const rows = 10;
  const columns = 4;
  const positions = [];
  const colors = [];
  const indices = [];
  for (let row = 0; row <= rows; row++) {
    const t = row / rows;
    const halfWidth = Math.pow(Math.sin(t * Math.PI), 0.73) * width / 2;
    for (let column = 0; column <= columns; column++) {
      const u = column / columns * 2 - 1;
      const serration = jagged && Math.abs(u) > 0.9 ? 1 + Math.sin(t * Math.PI * 10) * 0.14 : 1;
      positions.push(u * halfWidth * serration, Math.sin(t * Math.PI) * curl + u * u * curl * 0.45 + Math.sin(t * 16 + u * 3) * 0.016, (t - 0.5) * length);
      const lightness = 0.85 + 0.15 * (1 - Math.abs(u));
      colors.push(lightness, lightness, lightness);
      if (row < rows && column < columns) {
        const a = row * (columns + 1) + column;
        indices.push(a, a + 1, a + columns + 1, a + 1, a + columns + 2, a + columns + 1);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function tubeGeometry(length, radius, curl = 0.1) {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-length / 2, 0, curl),
    new THREE.Vector3(-length / 6, 0.04, -curl / 2),
    new THREE.Vector3(length / 6, -0.015, -curl),
    new THREE.Vector3(length / 2, 0.015, curl / 2)
  ]);
  return new THREE.TubeGeometry(curve, 12, radius, 6, false);
}

function lotusGeometry() {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 0.29, 0, Math.PI * 2, false);
  for (let hole = 0; hole < 7; hole++) {
    const angle = hole * Math.PI * 2 / 7;
    const path = new THREE.Path();
    path.absarc(Math.cos(angle) * 0.17, Math.sin(angle) * 0.17, 0.045, 0, Math.PI * 2, true);
    shape.holes.push(path);
  }
  const center = new THREE.Path();
  center.absarc(0, 0, 0.035, 0, Math.PI * 2, true);
  shape.holes.push(center);
  return solidShape(shape, 0.065, 0.008);
}

function shrimpGeometry() {
  const points = [];
  for (let n = 0; n < 9; n++) {
    const angle = -0.7 + n / 8 * Math.PI * 1.5;
    points.push(new THREE.Vector3(Math.cos(angle) * 0.18, Math.sin(n / 8 * Math.PI) * 0.045, Math.sin(angle) * 0.18));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 20, 0.065, 8, false);
}

class FoodFactory {
  constructor(sceneRoot) {
    this.root = sceneRoot;
    this.geometries = new Map();
    this.materials = new Map();
    this.batches = new Map();
    this.meshes = [];
    this.random = seedFor('shijian');
  }
  geometry(key, create) {
    if (!this.geometries.has(key)) this.geometries.set(key, create());
    return this.geometries.get(key);
  }
  material(key = 'food') {
    if (!this.materials.has(key)) {
      const wet = ['food', 'leaf', 'broccoli', 'sauce'].includes(key);
      const options = {
        color: 0xffffff,
        roughness: key === 'sauce' ? 0.26 : wet ? 0.45 : 0.63,
        metalness: 0,
        clearcoat: key === 'sauce' ? 0.42 : wet ? 0.23 : 0.06,
        clearcoatRoughness: 0.32,
        side: ['leaf', 'ear'].includes(key) ? THREE.DoubleSide : THREE.FrontSide,
        vertexColors: key === 'leaf'
      };
      this.materials.set(key, new THREE.MeshPhysicalMaterial(options));
    }
    return this.materials.get(key);
  }
  add(key, geometry, position, scale, rotation, color, material = 'food', recipeId = '') {
    const batchKey = `${key}:${material}:${recipeId}`;
    if (!this.batches.has(batchKey)) this.batches.set(batchKey, { geometry, material: this.material(material), entries: [], recipeId });
    this.batches.get(batchKey).entries.push({ position, scale, rotation, color });
  }
  sphere(key, position, scale, color, recipeId, material = 'food') {
    this.add(key, this.geometry('sphere', () => new THREE.SphereGeometry(1, 12, 8)), position, scale, [0, this.random() * Math.PI, 0], color, material, recipeId);
  }
  finalize() {
    for (const [name, batch] of this.batches) {
      const mesh = new THREE.InstancedMesh(batch.geometry, batch.material, batch.entries.length);
      mesh.name = `food:${name}`;
      mesh.userData.recipeId = batch.recipeId;
      batch.entries.forEach((entry, index) => {
        dummy.position.set(...entry.position);
        dummy.scale.set(...entry.scale);
        dummy.rotation.set(...entry.rotation);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
        mesh.setColorAt(index, new THREE.Color(entry.color));
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.computeBoundingSphere();
      this.root.add(mesh);
      this.meshes.push(mesh);
    }
    this.batches.clear();
  }
  dispose() {
    for (const geometry of this.geometries.values()) geometry.dispose();
    for (const material of this.materials.values()) material.dispose();
    for (const mesh of this.meshes) mesh.dispose();
    this.geometries.clear();
    this.materials.clear();
    this.meshes.length = 0;
  }
}

function tint(hex, random, amount = 0.055) {
  const color = new THREE.Color(hex);
  color.multiplyScalar(1 - amount / 2 + random() * amount);
  return color;
}

function ingredientPiece(factory, id, at, scale, recipeId, style = '') {
  const random = factory.random;
  const [x, y, z] = at;
  const angle = random() * Math.PI * 2;
  const tilt = (random() - 0.5) * 0.23;
  const rotation = [tilt, angle, (random() - 0.5) * 0.12];
  const add = (key, geometry, color, size = [scale, scale, scale], material = 'food', position = at, turn = rotation) => factory.add(key, geometry, position, size, turn, tint(color, random), material, recipeId);
  const sphere = (key, position, size, color, material = 'food') => factory.sphere(key, position, size, tint(color, random), recipeId, material);
  if (['pork', 'duckBreast'].includes(id)) {
    add(id, factory.geometry('meat-strip', () => tubeGeometry(0.57, 0.045, 0.075)), id === 'duckBreast' ? '#a77752' : '#ad754d', [scale * (0.8 + random() * 0.4), scale, scale]);
    return;
  }
  if (['chickenBreast', 'chickenThigh', 'silverCarp'].includes(id)) {
    const shape = recipeId.includes('Chicken') && !recipeId.includes('Pao') ? 'meat-chunk' : 'meat-piece';
    const color = id === 'silverCarp' ? '#e0d6ba' : id === 'chickenThigh' ? '#b98d64' : '#d7b88d';
    add(shape, factory.geometry(shape, () => roundedSolid(shape === 'meat-chunk' ? 0.34 : 0.4, 0.27, 0.17, 0.075, 0.035)), color, [scale * (0.85 + random() * 0.4), scale, scale]);
    return;
  }
  if (['firmTofu', 'silkenTofu'].includes(id)) {
    const width = id === 'firmTofu' ? 0.34 : 0.38;
    add(id, factory.geometry(id, () => roundedSolid(width, width * 0.9, 0.24, 0.025, 0.008)), id === 'firmTofu' && /homeStyle|garlicTofu/.test(recipeId) ? '#d6b985' : '#f3e8c8');
    return;
  }
  if (id === 'shrimp') {
    add(id, factory.geometry(id, shrimpGeometry), '#edc8aa');
    return;
  }
  if (id === 'egg') {
    add('egg-fold', factory.geometry('egg-fold', () => leafGeometry(0.36, 0.43, 0.085)), '#e7ba51', [scale, scale, scale], 'leaf');
    sphere('egg-lobe', [x + 0.05, y + 0.025, z - 0.015], [0.15 * scale, 0.045 * scale, 0.13 * scale], '#f1ce67');
    return;
  }
  if (id === 'broccoli') {
    const floretHeight = 0.26 * scale;
    add('broccoli-stem', factory.geometry('broccoli-stem', () => new THREE.CylinderGeometry(0.06, 0.04, 0.28, 8)), '#84a45c', [scale, scale, scale], 'food', [x, y + floretHeight / 2, z]);
    sphere('broccoli-crown', [x, y + floretHeight, z], [0.19 * scale, 0.14 * scale, 0.19 * scale], '#4f793c', 'broccoli');
    for (let bud = 0; bud < 12; bud++) {
      const azimuth = random() * Math.PI * 2;
      const radius = Math.sqrt(random()) * 0.18 * scale;
      const by = y + floretHeight + Math.sqrt(Math.max(0, 1 - radius * radius / (0.19 * scale) ** 2)) * 0.1 * scale;
      sphere('broccoli-bud', [x + Math.cos(azimuth) * radius, by, z + Math.sin(azimuth) * radius], [0.05 * scale, 0.054 * scale, 0.048 * scale], bud % 3 ? '#527b38' : '#628741', 'broccoli');
    }
    return;
  }
  if (['bokChoy', 'shanghaiBok', 'spinach', 'peaTender', 'napaCabbage'].includes(id)) {
    const leafColor = id === 'spinach' ? '#3e6940' : id === 'napaCabbage' ? '#94ad65' : id === 'peaTender' ? '#5d8245' : '#527d42';
    const leafWidth = id === 'peaTender' ? 0.28 : 0.43;
    const leafKey = id === 'peaTender' ? 'small-leaf' : 'leaf';
    add(leafKey, factory.geometry(leafKey, () => leafGeometry(leafWidth, id === 'peaTender' ? 0.58 : 0.9, 0.15, id === 'spinach')), leafColor, [scale, scale, scale], 'leaf');
    if (['bokChoy', 'shanghaiBok', 'napaCabbage'].includes(id)) {
      const stemColor = id === 'napaCabbage' ? '#e9e1c3' : '#bed29a';
      const stemGeo = factory.geometry('leaf-stem', () => roundedSolid(0.13, 0.52, 0.045, 0.055, 0.008));
      add('leaf-stem', stemGeo, stemColor, [scale, scale, scale], 'food', [x + Math.sin(angle) * 0.18 * scale, y - 0.006, z + Math.cos(angle) * 0.18 * scale]);
    }
    return;
  }
  if (['greenPepper', 'garlicSprout', 'celeryChinese', 'greenBean', 'enoki'].includes(id)) {
    const length = id === 'greenPepper' ? 0.71 : id === 'enoki' ? 0.63 : 0.55;
    const radius = id === 'enoki' ? 0.018 : id === 'greenBean' ? 0.05 : 0.038;
    const key = `stem:${id}`;
    const color = id === 'enoki' ? '#e9dfc2' : id === 'greenPepper' ? '#38751d' : id === 'celeryChinese' ? '#93ac64' : '#6e944e';
    add(key, factory.geometry(key, () => tubeGeometry(length, radius, 0.055)), color);
    if (id === 'enoki') sphere('enoki-cap', [x - Math.cos(angle) * length / 2 * scale, y + 0.018, z + Math.sin(angle) * length / 2 * scale], [0.044 * scale, 0.025 * scale, 0.044 * scale], '#f1e7d0');
    return;
  }
  if (id === 'snowPea') {
    add(id, factory.geometry(id, () => leafGeometry(0.21, 0.74, 0.025)), '#9abb67', [scale, scale, scale], 'leaf');
    for (let pea = 0; pea < 3; pea++) {
      const offset = (pea - 1) * 0.15 * scale;
      sphere('pea-pod-bead', [x + Math.sin(angle) * offset, y + 0.023 * scale, z + Math.cos(angle) * offset], [0.038 * scale, 0.02 * scale, 0.038 * scale], '#b2c777');
    }
    return;
  }
  if (id === 'lotusRoot') {
    add(id, factory.geometry(id, lotusGeometry), '#d9d1ad');
    return;
  }
  if (id === 'woodEar') {
    add(id, factory.geometry(id, () => leafGeometry(0.32, 0.35, 0.15, true)), '#49362c', [scale, scale, scale], 'ear', at, [tilt + 0.2, angle, (random() - 0.5) * 0.6]);
    return;
  }
  if (id === 'shiitake') {
    sphere('mushroom-cap', [x, y + 0.07 * scale, z], [0.23 * scale, 0.09 * scale, 0.2 * scale], '#907451');
    sphere('mushroom-gill', [x, y + 0.015 * scale, z], [0.18 * scale, 0.025 * scale, 0.16 * scale], '#c8b48b');
    add('mushroom-stem', factory.geometry('mushroom-stem', () => new THREE.CylinderGeometry(0.035, 0.05, 0.16, 7)), '#d8c6a4', [scale, scale, scale], 'food', [x, y - 0.01 * scale, z], [tilt, angle, 0.3]);
    return;
  }
  if (id === 'kingOyster') {
    add(id, factory.geometry(id, () => roundedSolid(0.3, 0.4, 0.07, 0.12, 0.015)), '#dfd2ab');
    return;
  }
  if (id === 'cucumber' || id === 'zucchini' || id === 'luffa') {
    const rindColor = id === 'cucumber' ? '#65854a' : id === 'zucchini' ? '#8aa666' : '#9db07d';
    const pulpColor = id === 'cucumber' ? '#c8d49b' : '#d9dfb0';
    const key = id === 'luffa' ? 'gourd-chunk' : 'gourd-slice';
    add(`${id}:rind`, factory.geometry(key, () => roundedSolid(0.35, 0.27, id === 'luffa' ? 0.23 : 0.095, 0.12, 0.012)), rindColor);
    add(`${id}:pulp`, factory.geometry('gourd-pulp', () => roundedSolid(0.3, 0.21, 0.014, 0.09, 0.003)), pulpColor, [scale, scale, scale], 'food', [x, y + (id === 'luffa' ? 0.238 : 0.1) * scale, z]);
    return;
  }
  if (id === 'tomato') {
    add('tomato-wedge', factory.geometry('tomato-wedge', () => new THREE.CylinderGeometry(0.27, 0.23, 0.14, 12, 1, false, 0, Math.PI * 0.62)), '#bf5b3c');
    add('tomato-flesh', factory.geometry('tomato-flesh', () => new THREE.CylinderGeometry(0.22, 0.18, 0.01, 10, 1, false, 0, Math.PI * 0.59)), '#dc8a56', [scale, scale, scale], 'food', [x, y + 0.078 * scale, z]);
    return;
  }
  if (id === 'onion') {
    add('onion-edge', factory.geometry('onion-edge', () => new THREE.TorusGeometry(0.17, 0.028, 6, 13, Math.PI * 1.35)), '#b78d8c', [scale, scale, scale], 'food', at, [Math.PI / 2 + tilt, angle, 0]);
    add('onion-heart', factory.geometry('onion-heart', () => new THREE.TorusGeometry(0.12, 0.021, 6, 11, Math.PI * 1.35)), '#ddd2b8', [scale, scale, scale], 'food', [x, y + 0.008, z], [Math.PI / 2 + tilt, angle, 0]);
    return;
  }
  if (id === 'eggplant') {
    add('eggplant-skin', factory.geometry('eggplant-skin', () => roundedSolid(0.19, 0.61, 0.09, 0.055, 0.012)), '#6d5369');
    add('eggplant-pulp', factory.geometry('eggplant-pulp', () => roundedSolid(0.145, 0.59, 0.035, 0.03, 0.008)), '#b8bd8b', [scale, scale, scale], 'food', [x, y + 0.085 * scale, z]);
    return;
  }
  if (id === 'carrot' && /pepperCarrot|celeryPork/.test(recipeId)) {
    add('carrot-strip', factory.geometry('carrot-strip', () => tubeGeometry(0.54, 0.028, 0.027)), '#dba150');
    return;
  }
  if (id === 'corn') {
    add('corn-kernel', factory.geometry('corn-kernel', () => roundedSolid(0.13, 0.095, 0.095, 0.035, 0.018)), '#e6c068');
    return;
  }
  if (id === 'peanut') {
    sphere('peanut', at, [0.08 * scale, 0.05 * scale, 0.052 * scale], '#b78e55', 'dry');
    return;
  }
  if (id === 'garlic' || id === 'ginger') {
    add('aromatic-dice', factory.geometry('aromatic-dice', () => roundedSolid(0.08, 0.055, 0.035, 0.01, 0.006)), id === 'garlic' ? '#e4d8af' : '#d5be8a');
    return;
  }
  const colors = {
    potato: '#d8b976', pumpkin: '#dba253', carrot: '#ce934c', winterMelon: '#ced7b3',
    whiteRadish: '#e7e1bd', lettuceStem: '#afc38a', tenderGinger: '#e2cea0'
  };
  const slice = ['carrot', 'lettuceStem', 'tenderGinger'].includes(id);
  add(slice ? 'root-slice' : 'root-chunk', factory.geometry(slice ? 'root-slice' : 'root-chunk', () => roundedSolid(slice ? 0.34 : 0.32, slice ? 0.23 : 0.28, slice ? 0.055 : 0.23, 0.04, 0.018)), colors[id] || '#c4bb91');
}

function spreadPoint(region, random, high = 0.22) {
  const u = random() * 2 - 1;
  const v = random() * 2 - 1;
  // 宽松的不规则长方形摆盘，避免把整道菜压成圆球。
  const edge = Math.max(Math.abs(u), Math.abs(v));
  return [region.x + u * region.width * 0.39, FOOD_FLOOR + random() * 0.07 + (1 - edge * edge) * high, region.z + v * region.depth * 0.39];
}

function fillRice(factory, recipe, region) {
  const random = factory.random;
  const count = 760;
  const entries = recipe.ingredients.filter(item => ['rice', 'blackRice', 'oats'].includes(item.id));
  const weight = entries.reduce((sum, item) => sum + item.g, 0);
  const cumulative = entries.map((entry, index) => ({ id: entry.id, limit: entries.slice(0, index + 1).reduce((sum, item) => sum + item.g, 0) / weight }));
  const grain = factory.geometry('rice-grain', () => new THREE.SphereGeometry(1, 9, 6));
  const width = region.width * 0.36;
  const depth = region.depth * 0.34;
  for (let n = 0; n < count; n++) {
    const r = Math.sqrt(random());
    const angle = random() * Math.PI * 2;
    const x = Math.cos(angle) * r * width;
    const z = Math.sin(angle) * r * depth;
    const y = FOOD_FLOOR + 0.065 + Math.pow(1 - r * r, 0.72) * 0.37 + random() * 0.045;
    const selector = random();
    const id = cumulative.find(entry => selector <= entry.limit)?.id || 'rice';
    const color = id === 'blackRice' ? '#6e5f66' : id === 'oats' ? '#d9caa3' : '#f4ead3';
    factory.add('rice-grain', grain, [region.x + x, y, region.z + z], id === 'oats' ? [0.1, 0.025, 0.054] : [0.1, 0.036, 0.042], [(random() - 0.5) * 0.8, random() * Math.PI * 2, (random() - 0.5) * 0.6], tint(color, random, 0.07), 'dry', recipe.id);
  }
  recipe.ingredients.filter(item => ['potato', 'carrot', 'corn'].includes(item.id)).forEach(item => {
    const n = item.id === 'corn' ? 26 : 12;
    for (let i = 0; i < n; i++) ingredientPiece(factory, item.id, spreadPoint(region, random, 0.4), item.id === 'corn' ? 0.9 : 0.7, recipe.id);
  });
}

function addBowl(sceneRoot, region, material, soup = false) {
  const width = region.width * (soup ? 0.91 : 0.9);
  const depth = region.depth * (soup ? 0.91 : 0.88);
  const floor = soup ? 0.06 : FOOD_FLOOR;
  const bottom = new THREE.Mesh(roundedSolid(width, depth, 0.11, 0.22, 0.028), material);
  bottom.name = 'ceramic:bowl-bottom';
  bottom.position.set(region.x, floor, region.z);
  bottom.castShadow = bottom.receiveShadow = true;
  const sides = new THREE.Mesh(ringSolid(width, depth, 0.1, 0.35, 0.22, 0.023), material);
  sides.name = 'ceramic:bowl-wall';
  sides.position.set(region.x, floor + 0.1, region.z);
  sides.castShadow = sides.receiveShadow = true;
  sceneRoot.add(bottom, sides);
  return floor + 0.38;
}

function fillFluid(factory, recipe, region, sceneRoot, bowlMaterial, soup) {
  const surface = addBowl(sceneRoot, region, bowlMaterial, soup);
  const fluid = new THREE.Mesh(roundedSolid(region.width * 0.78, region.depth * 0.76, 0.012, 0.17, 0), new THREE.MeshPhysicalMaterial({ color: soup ? '#ceb783' : '#dec79b', roughness: 0.3, clearcoat: 0.55, clearcoatRoughness: 0.23 }));
  fluid.name = soup ? 'food:broth' : 'food:congee';
  fluid.position.set(region.x, surface - 0.034, region.z);
  fluid.receiveShadow = true;
  fluid.userData.recipeId = recipe.id;
  sceneRoot.add(fluid);
  const entries = recipe.ingredients.filter(entry => ingredientById.get(entry.id)?.category !== 'seasoning' && !['rice', 'oats'].includes(entry.id));
  for (const entry of entries) {
    const n = entry.id === 'corn' ? 16 : soup ? 5 : 10;
    for (let i = 0; i < n; i++) {
      const at = spreadPoint(region, factory.random, 0.01);
      at[1] = surface - 0.03 + factory.random() * 0.025;
      ingredientPiece(factory, entry.id, at, entry.id === 'corn' ? 0.78 : soup ? 0.64 : 0.67, recipe.id, 'soup');
    }
  }
  // 粥中的软谷粒仍为立体颗粒。
  if (!soup) {
    const geometry = factory.geometry('congee-grain', () => new THREE.SphereGeometry(1, 8, 6));
    for (let i = 0; i < 120; i++) {
      const at = spreadPoint(region, factory.random, 0);
      at[1] = surface - 0.015;
      factory.add('congee-grain', geometry, at, [0.065, 0.023, 0.035], [0, factory.random() * Math.PI, 0], tint('#e4d6b4', factory.random), 'food', recipe.id);
    }
  }
}

function fillDish(factory, recipe, region, sceneRoot, bowlMaterial) {
  if (!recipe) return;
  factory.random = seedFor(recipe.id);
  if (recipe.type === 'soup' || /Congee$/.test(recipe.id)) {
    fillFluid(factory, recipe, region, sceneRoot, bowlMaterial, recipe.type === 'soup');
    return;
  }
  if (recipe.type === 'staple') {
    fillRice(factory, recipe, region);
    return;
  }
  if (recipe.id === 'tofuEggSteam') {
    const custard = new THREE.Mesh(roundedSolid(region.width * 0.69, region.depth * 0.67, 0.19, 0.15, 0.045), new THREE.MeshPhysicalMaterial({ color: '#efce82', roughness: 0.33, clearcoat: 0.34 }));
    custard.name = 'food:steamed-egg';
    custard.position.set(region.x, FOOD_FLOOR, region.z);
    custard.castShadow = custard.receiveShadow = true;
    custard.userData.recipeId = recipe.id;
    sceneRoot.add(custard);
    for (let i = 0; i < 8; i++) {
      const at = spreadPoint(region, factory.random, 0.06);
      at[1] = FOOD_FLOOR + 0.16;
      ingredientPiece(factory, 'silkenTofu', at, 0.75, recipe.id);
    }
    return;
  }
  const entries = recipe.ingredients.filter(entry => ingredientById.get(entry.id)?.category !== 'seasoning');
  const visualWeight = entry => entry.g * (entry.id === 'woodEar' ? 6 : 1);
  const total = entries.reduce((sum, entry) => sum + visualWeight(entry), 0);
  const portions = recipe.type === 'veg' ? 66 : 142;
  if (/Pot|Tofu|Chicken|tomato|Duck|radish/.test(recipe.id)) {
    const sauce = new THREE.Mesh(roundedSolid(region.width * 0.72, region.depth * 0.69, 0.009, 0.2, 0), new THREE.MeshPhysicalMaterial({ color: /tomato/.test(recipe.id) ? '#bc855b' : /Tofu/.test(recipe.id) ? '#ac8c5d' : '#bca279', roughness: 0.29, clearcoat: 0.48 }));
    sauce.name = 'food:light-sauce';
    sauce.position.set(region.x, FOOD_FLOOR + 0.014, region.z);
    sauce.receiveShadow = true;
    sauce.userData.recipeId = recipe.id;
    sceneRoot.add(sauce);
  }
  for (const entry of entries) {
    const count = Math.max(entry.id === 'broccoli' ? 13 : 4, Math.round(visualWeight(entry) / Math.max(total, 1) * portions));
    const scale = entry.id === 'broccoli' ? 1.24 : ['bokChoy', 'shanghaiBok', 'napaCabbage', 'spinach', 'peaTender'].includes(entry.id) ? 1.14 : recipe.type === 'veg' ? 1.12 : 1.12;
    for (let i = 0; i < count; i++) {
      const high = ['bokChoy', 'spinach', 'shanghaiBok', 'peaTender', 'napaCabbage'].includes(entry.id) ? 0.34 : 0.30;
      ingredientPiece(factory, entry.id, spreadPoint(region, factory.random, high), scale * (0.88 + factory.random() * 0.24), recipe.id);
    }
  }
  for (const entry of recipe.ingredients.filter(entry => entry.id === 'garlic' || entry.id === 'ginger')) {
    for (let i = 0; i < 9; i++) ingredientPiece(factory, entry.id, spreadPoint(region, factory.random, 0.25), 0.95, recipe.id);
  }
}

function createEnvironment(renderer) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#ded9cd');
  const objects = [];
  const room = new THREE.Mesh(new THREE.BoxGeometry(16, 14, 16), new THREE.MeshBasicMaterial({ color: '#ded9cd', side: THREE.BackSide }));
  scene.add(room);
  objects.push(room);
  for (const [position, size, intensity] of [[[-4, 5, 2], [3, 0.05, 5], 3.8], [[5, 3, -2], [0.05, 3, 5], 2.2], [[0, 5, -4], [5, 0.05, 2], 1.3]]) {
    const color = new THREE.Color().setRGB(intensity, intensity * 0.98, intensity * 0.94);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshBasicMaterial({ color }));
    panel.position.set(...position);
    objects.push(panel);
    scene.add(panel);
  }
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(scene, 0.06, 0.1, 40);
  generator.dispose();
  for (const object of objects) { object.geometry.dispose(); object.material.dispose(); }
  return target;
}

function createComposition(record) {
  const scene = new THREE.Scene();
  const root = new THREE.Group();
  root.name = 'meal:ceramic-and-food';
  root.position.y = ROOT_HEIGHT;
  scene.add(root);
  const ceramic = new THREE.MeshPhysicalMaterial({ color: '#eee6d2', roughness: 0.31, metalness: 0, clearcoat: 0.47, clearcoatRoughness: 0.27 });
  const bowlMaterial = new THREE.MeshPhysicalMaterial({ color: '#e5e0ca', roughness: 0.33, clearcoat: 0.45, clearcoatRoughness: 0.28 });
  const cloth = new THREE.Mesh(roundedSolid(7.36, 4.97, 0.022, 0.17, 0.008), new THREE.MeshStandardMaterial({ color: '#d9d1b8', roughness: 0.99 }));
  cloth.name = 'table:linen-mat';
  cloth.position.set(-0.15, -0.057, 0.075);
  cloth.rotation.y = -0.075;
  cloth.receiveShadow = true;
  scene.add(cloth);
  const base = new THREE.Mesh(roundedSolid(6.7, 4.4, 0.17, 0.38, 0.065), ceramic);
  base.name = 'ceramic:tray-base';
  base.position.y = 0.022;
  const rim = new THREE.Mesh(ringSolid(6.7, 4.4, 0.18, 0.2, 0.38, 0.035), ceramic);
  rim.name = 'ceramic:tray-rim';
  rim.position.y = 0.18;
  const mainDivider = new THREE.Mesh(roundedSolid(0.13, 3.99, 0.115, 0.065, 0.025), ceramic);
  mainDivider.name = 'ceramic:half-divider';
  mainDivider.position.set(0.025, 0.182, 0);
  const quarterDivider = new THREE.Mesh(roundedSolid(3.09, 0.13, 0.115, 0.065, 0.025), ceramic);
  quarterDivider.name = 'ceramic:quarter-divider';
  quarterDivider.position.set(1.625, 0.182, 0);
  root.add(base, rim, mainDivider, quarterDivider);
  for (const mesh of [base, rim, mainDivider, quarterDivider]) mesh.castShadow = mesh.receiveShadow = true;
  const regionBySlot = {
    veg: { x: -1.56, z: 0, width: 2.87, depth: 3.78 },
    main: { x: 1.65, z: -1, width: 2.88, depth: 1.7 },
    staple: { x: 1.65, z: 1, width: 2.88, depth: 1.7 },
    soup: { x: 4.13, z: -0.57, width: 1.55, depth: 1.55 }
  };
  const factory = new FoodFactory(root);
  const targets = [];
  const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, colorWrite: false, depthWrite: false, side: THREE.DoubleSide });
  for (const slot of ['veg', 'main', 'staple', 'soup']) {
    const id = record.meal[slot];
    if (slot === 'soup' && !id) continue;
    const region = regionBySlot[slot];
    const recipe = recipeById.get(id);
    fillDish(factory, recipe, region, root, bowlMaterial);
    const target = new THREE.Mesh(new THREE.PlaneGeometry(region.width * 0.98, region.depth * 0.98), targetMaterial);
    target.name = `hit:${slot}`;
    target.rotation.x = -Math.PI / 2;
    target.position.set(region.x, slot === 'soup' ? 0.49 : FOOD_FLOOR + 0.21, region.z);
    target.userData = { slot, recipeId: recipe?.id || null };
    root.add(target);
    targets.push(target);
  }
  factory.finalize();
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(35, 35), new THREE.ShadowMaterial({ color: '#4f442f', opacity: 0.18 }));
  shadow.name = 'table:soft-shadow';
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -0.085;
  shadow.receiveShadow = true;
  scene.add(shadow);
  const hemisphere = new THREE.HemisphereLight('#fffaeb', '#b7b69a', 0.95);
  const key = new THREE.DirectionalLight('#fff5e2', 2.0);
  key.position.set(-4, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 6;
  key.shadow.camera.bottom = -6;
  key.shadow.camera.near = 0.1;
  key.shadow.camera.far = 28;
  key.shadow.normalBias = 0.045;
  key.shadow.bias = -0.0004;
  key.shadow.radius = 3;
  const fill = new THREE.DirectionalLight('#f0f6e8', 0.8);
  fill.position.set(5, 4, -5);
  scene.add(hemisphere, key, fill);
  return { scene, root, targets, factory, materials: [ceramic, bowlMaterial, targetMaterial], regionBySlot };
}

function readMeal(node) {
  try {
    const meal = JSON.parse(node.dataset.meal);
    return meal && typeof meal === 'object' && !Array.isArray(meal) ? meal : {};
  } catch { return {}; }
}

function sceneNames(meal) {
  return ['veg', 'main', 'staple', 'soup'].map(slot => recipeById.get(meal[slot])?.name).filter(Boolean).join('、');
}

function showFallback(record, reason = '') {
  record.node.classList.remove('scene-live');
  record.node.classList.add('scene-unavailable');
  record.node.dataset.sceneStatus = 'fallback';
  record.lastError = reason;
  record.status.textContent = '成品照片预览';
  record.reset.hidden = true;
  record.help.textContent = reason === 'capacity' ? '点菜品查看做法' : '此设备暂未开启立体预览，可继续查看菜谱照片';
  record.retry.hidden = reason === 'capacity';
  record.fallback.hidden = false;
  const existing = record.node.querySelector('.scene-photo-fallback');
  if (existing) existing.hidden = false;
  record.fallback.querySelector('.scene-fallback-message').textContent = existing ? '' : '已选菜品的成品照片在下方菜谱中';
}

function showReady(record) {
  record.node.classList.remove('scene-unavailable');
  record.node.classList.add('scene-live');
  record.node.dataset.sceneStatus = 'ready';
  record.status.textContent = record.interactive ? '拖动餐盘 · 点菜查看' : '拖动餐盘看看';
  record.help.textContent = '方向键调整视角，0 键复位';
  record.reset.hidden = false;
  record.fallback.hidden = true;
  const existing = record.node.querySelector('.scene-photo-fallback');
  if (existing) existing.hidden = true;
}

function updateCamera(record) {
  if (!record.camera) return;
  const width = Math.max(record.node.clientWidth, 1);
  const stageHeight = getComputedStyle(record.node).getPropertyValue('--scene-canvas-height').trim();
  const preferred = parseFloat(stageHeight);
  const canvasHeight = Number.isFinite(preferred) ? preferred : width < 430 ? 286 : 334;
  const canvas = record.renderer.domElement;
  canvas.style.width = '100%';
  canvas.style.height = `${canvasHeight}px`;
  const aspect = width / canvasHeight;
  record.camera.aspect = aspect;
  // 不同屏幕宽度均保留餐具四边，汤碗加入后稍向右取景。
  const hasSoup = Boolean(record.meal.soup);
  const fittedWidth = hasSoup ? 10.4 : 8.7;
  const fittedHeight = 5.85;
  const tangent = Math.tan(THREE.MathUtils.degToRad(record.camera.fov) / 2);
  const distance = Math.max(fittedWidth / (2 * tangent * aspect), fittedHeight / (2 * tangent)) * 1.025;
  const direction = new THREE.Vector3(0.29, 0.95, 1).normalize();
  const target = new THREE.Vector3(hasSoup ? 0.46 : 0, 0.18, 0);
  record.camera.position.copy(target).addScaledVector(direction, distance);
  record.camera.lookAt(target);
  record.camera.updateProjectionMatrix();
  record.renderer.setPixelRatio(Math.min(devicePixelRatio || 1, width < 500 ? 1.7 : 2));
  record.renderer.setSize(width, canvasHeight, false);
  record.dimensions = { width, height: canvasHeight };
  scheduleRender(record);
}

function scheduleRender(record) {
  if (!record.renderer || record.destroyed || record.frame || !record.visible || document.hidden) return;
  record.frame = requestAnimationFrame(() => {
    record.frame = 0;
    if (!record.renderer || record.destroyed || !record.node.isConnected || !record.visible) return;
    try {
      record.root.rotation.set(record.pitch, record.yaw, 0);
      record.root.updateMatrixWorld(true);
      record.renderer.render(record.scene, record.camera);
      record.renderedTriangles = record.renderer.info.render.triangles;
      record.renderedCalls = record.renderer.info.render.calls;
      record.renderCount++;
      lifetime.renderCalls++;
      showReady(record);
    } catch (error) {
      destroyGPU(record);
      showFallback(record, 'render-failed');
      console.warn('食间餐盘预览暂不可用', error?.message || 'render');
    }
  });
}

function openDish(record, slot, id) {
  if (!record.interactive) return;
  record.node.dispatchEvent(new CustomEvent('shijian-dish-open', { bubbles: true, detail: { id, slot, sceneKey: record.key } }));
}

function hitDish(record, event) {
  if (!record.renderer || !record.interactive) return;
  const rect = record.renderer.domElement.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height * 2 - 1));
  raycaster.setFromCamera(pointer, record.camera);
  record.root.updateMatrixWorld(true);
  const hit = raycaster.intersectObjects(record.targets, false)[0];
  if (hit) openDish(record, hit.object.userData.slot, hit.object.userData.recipeId);
}

function setRotation(record, yaw, pitch) {
  record.yaw = clamp(yaw, -0.6, 0.6);
  record.pitch = clamp(pitch, -0.19, 0.16);
  scheduleRender(record);
}

function attachCanvasEvents(record, canvas) {
  const signal = record.gpuEvents.signal;
  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0 || record.pointerDown) return;
    record.pointerDown = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw: record.yaw, pitch: record.pitch, moved: false };
    canvas.setPointerCapture?.(event.pointerId);
  }, { signal });
  canvas.addEventListener('pointermove', event => {
    const start = record.pointerDown;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.hypot(dx, dy) > 6) start.moved = true;
    if (start.moved) {
      record.node.classList.add('scene-dragging');
      setRotation(record, start.yaw + dx * 0.006, start.pitch + dy * 0.003);
    }
  }, { signal });
  canvas.addEventListener('pointerup', event => {
    const start = record.pointerDown;
    if (!start || start.id !== event.pointerId) return;
    record.pointerDown = null;
    record.node.classList.remove('scene-dragging');
    if (canvas.hasPointerCapture?.(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    if (!start.moved) hitDish(record, event);
  }, { signal });
  canvas.addEventListener('pointercancel', () => {
    record.pointerDown = null;
    record.node.classList.remove('scene-dragging');
  }, { signal });
  canvas.addEventListener('keydown', event => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '0', 'Home', 'Escape'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      if (['0', 'Home', 'Escape'].includes(event.key)) setRotation(record, 0, 0);
      if (event.key === 'ArrowLeft') setRotation(record, record.yaw - 0.11, record.pitch);
      if (event.key === 'ArrowRight') setRotation(record, record.yaw + 0.11, record.pitch);
      if (event.key === 'ArrowUp') setRotation(record, record.yaw, record.pitch - 0.055);
      if (event.key === 'ArrowDown') setRotation(record, record.yaw, record.pitch + 0.055);
    }
    const slots = { '1': 'veg', '2': 'main', '3': 'staple', '4': 'soup', Enter: 'main', ' ': 'main' };
    if (slots[event.key] && record.interactive) {
      event.preventDefault();
      openDish(record, slots[event.key], record.meal[slots[event.key]] || null);
    }
  }, { signal });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    lifetime.contextLosses++;
    destroyGPU(record);
    showFallback(record, 'context-lost');
  }, { signal });
}

function createGPU(record) {
  if (record.renderer || record.destroyed || !record.visible || !record.node.isConnected) return;
  const active = [...records.values()].filter(item => item.renderer).length;
  if (active >= MAX_RENDERERS) { showFallback(record, 'capacity'); return; }
  if (unavailable) { showFallback(record, 'webgl-unavailable'); return; }
  record.node.dataset.sceneStatus = 'loading';
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.91;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    record.renderer = renderer;
    record.gpuEvents = new AbortController();
    record.environment = createEnvironment(renderer);
    const composition = createComposition(record);
    Object.assign(record, composition);
    record.scene.environment = record.environment.texture;
    record.scene.environmentIntensity = 0.47;
    record.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 70);
    const canvas = renderer.domElement;
    canvas.className = 'meal-scene-canvas';
    canvas.setAttribute('tabindex', '0');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', `可转动的立体餐盘${sceneNames(record.meal) ? '：' + sceneNames(record.meal) : '，尚未选择菜品'}。方向键转动、0键复位${record.interactive ? '，数字1到4查看对应菜品' : ''}。`);
    canvas.setAttribute('aria-describedby', record.help.id);
    canvas.style.display = 'block';
    canvas.style.touchAction = 'pan-y';
    canvas.style.outlineOffset = '-4px';
    record.node.prepend(canvas);
    attachCanvasEvents(record, canvas);
    lifetime.created++;
    record.lastError = '';
    updateCamera(record);
  } catch (error) {
    if (!record.renderer && renderer) record.renderer = renderer;
    destroyGPU(record);
    unavailable = true;
    showFallback(record, 'webgl-unavailable');
    console.warn('食间立体预览未能启动', error?.message || 'WebGL2');
  }
}

function destroyGPU(record) {
  if (record.frame) cancelAnimationFrame(record.frame);
  record.frame = 0;
  record.pointerDown = null;
  record.gpuEvents?.abort();
  record.gpuEvents = null;
  record.node.classList.remove('scene-dragging');
  if (!record.renderer) return;
  const renderer = record.renderer;
  const geometries = new Set();
  const materials = new Set();
  record.scene?.traverse(object => {
    if (object.geometry) geometries.add(object.geometry);
    if (object.material) (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material));
    if (object.isLight) object.shadow?.dispose();
  });
  record.factory?.dispose();
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  record.environment?.dispose();
  renderer.renderLists.dispose();
  renderer.dispose();
  renderer.forceContextLoss();
  renderer.domElement.remove();
  record.renderer = null;
  record.scene = null;
  record.camera = null;
  record.root = null;
  record.targets = null;
  record.factory = null;
  record.environment = null;
  record.materials = null;
  lifetime.disposed++;
}

function disposeRecord(record) {
  if (record.destroyed) return;
  record.destroyed = true;
  intersection?.unobserve(record.node);
  record.resize?.disconnect();
  record.events.abort();
  destroyGPU(record);
  const photoFallback = record.fallback.querySelector('.scene-photo-fallback');
  if (photoFallback) { photoFallback.hidden = true; record.node.append(photoFallback); }
  record.toolbar.remove();
  record.help.remove();
  record.fallback.remove();
  records.delete(record.node);
}

function makeRecord(node) {
  node.querySelector('.scene-loading')?.remove();
  const meal = readMeal(node);
  const toolbar = document.createElement('div');
  toolbar.className = 'scene-toolbar';
  const status = document.createElement('span');
  status.className = 'scene-status';
  status.textContent = '餐盘预览';
  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'scene-reset';
  reset.setAttribute('aria-label', '恢复餐盘初始视角');
  reset.title = '恢复初始视角';
  reset.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 7v5h5M5 12a7 7 0 1 1 2 5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>复位</span>';
  toolbar.append(status, reset);
  const help = document.createElement('p');
  help.className = 'scene-help';
  help.id = `meal-scene-help-${++sequence}`;
  help.textContent = '方向键调整视角，0 键复位';
  const fallback = document.createElement('div');
  fallback.className = 'scene-fallback';
  fallback.hidden = true;
  const message = document.createElement('p');
  message.className = 'scene-fallback-message';
  const retry = document.createElement('button');
  retry.type = 'button';
  retry.className = 'scene-retry';
  retry.textContent = '重新开启立体预览';
  const photoFallback = node.querySelector('.scene-photo-fallback');
  if (photoFallback) fallback.append(photoFallback);
  fallback.append(message, retry);
  node.append(toolbar, help, fallback);
  const record = {
    node, key: node.dataset.sceneKey, signature: node.dataset.meal, meal, toolbar, status, reset, help, fallback, retry,
    yaw: 0, pitch: 0, frame: 0, renderer: null, visible: false, destroyed: false,
    interactive: node.dataset.interactive !== 'false', events: new AbortController(), renderCount: 0,
    renderedTriangles: 0, renderedCalls: 0, lastError: ''
  };
  const signal = record.events.signal;
  reset.addEventListener('click', event => { event.stopPropagation(); setRotation(record, 0, 0); record.renderer?.domElement.focus({ preventScroll: true }); }, { signal });
  retry.addEventListener('click', event => { event.stopPropagation(); unavailable = false; createGPU(record); }, { signal });
  if (typeof ResizeObserver !== 'undefined') {
    record.resize = new ResizeObserver(() => { if (record.renderer) updateCamera(record); });
    record.resize.observe(node);
  }
  records.set(node, record);
  const bounds = node.getBoundingClientRect();
  record.visible = bounds.bottom >= -80 && bounds.top <= innerHeight + 80 && bounds.width > 0;
  if (record.visible) createGPU(record);
  intersection?.observe(node);
  return record;
}

const intersection = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
  for (const entry of entries) {
    const record = records.get(entry.target);
    if (!record || record.destroyed) continue;
    record.visible = entry.isIntersecting;
    if (record.visible) createGPU(record);
    else destroyGPU(record);
  }
  for (const record of records.values()) if (record.visible && !record.renderer && record.lastError === 'capacity') createGPU(record);
}, { rootMargin: '80px 0px', threshold: 0 });

function prune() {
  for (const record of records.values()) if (!record.node.isConnected) disposeRecord(record);
}

const removalObserver = new MutationObserver(prune);
removalObserver.observe(document.documentElement, { childList: true, subtree: true });

function mountAll(root = document) {
  if (disposedPage) return;
  prune();
  const nodes = [...root.querySelectorAll(selector)];
  if (root.matches?.(selector)) nodes.unshift(root);
  for (const node of nodes) {
    const previous = records.get(node);
    if (previous && previous.signature === node.dataset.meal && previous.interactive === (node.dataset.interactive !== 'false')) continue;
    if (previous) disposeRecord(previous);
    makeRecord(node);
  }
}

function disposeAll() {
  for (const record of [...records.values()]) disposeRecord(record);
}

function stats() {
  const scenes = [...records.values()].map(record => {
    let meshes = 0;
    let instances = 0;
    const geometryTypes = new Set();
    record.scene?.traverse(object => {
      if (object.isMesh && !object.name.startsWith('hit:')) meshes++;
      if (object.isInstancedMesh) instances += object.count;
      if (object.geometry) geometryTypes.add(object.geometry.type);
    });
    return {
      key: record.key, meal: { ...record.meal }, status: record.node.dataset.sceneStatus,
      connected: record.node.isConnected, visible: record.visible, interactive: record.interactive,
      renderer: Boolean(record.renderer), webgl2: Boolean(record.renderer?.getContext()?.constructor?.name === 'WebGL2RenderingContext'),
      meshes, instances, geometryTypes: [...geometryTypes], renderedTriangles: record.renderedTriangles,
      renderedCalls: record.renderedCalls, renderCount: record.renderCount,
      rotation: { yaw: record.yaw, pitch: record.pitch }, camera: record.camera?.position.toArray() || null,
      dimensions: record.dimensions || null, bitmapBillboards: 0, environmentTextures: record.environment ? 1 : 0,
      gpuMemory: record.renderer ? { ...record.renderer.info.memory, programs: record.renderer.info.programs?.length || 0 } : null,
      dishTargets: (record.targets || []).map(target => {
        const position = target.getWorldPosition(new THREE.Vector3()).project(record.camera);
        return { slot: target.userData.slot, id: target.userData.recipeId, x: (position.x + 1) / 2, y: (1 - position.y) / 2 };
      }),
      error: record.lastError || null
    };
  });
  return {
    version: '4.0.0', threeVersion: THREE.REVISION, rendererLimit: MAX_RENDERERS,
    rendererCount: scenes.filter(scene => scene.renderer).length, sceneCount: scenes.length,
    pendingFrames: [...records.values()].filter(record => record.frame).length,
    reducedMotion: reducedMotion.matches, webglUnavailable: unavailable, ...lifetime, scenes
  };
}

document.addEventListener('visibilitychange', () => {
  for (const record of records.values()) {
    if (document.hidden && record.frame) { cancelAnimationFrame(record.frame); record.frame = 0; }
    else if (!document.hidden) scheduleRender(record);
  }
});
window.addEventListener('pagehide', () => {
  disposeAll();
  removalObserver.disconnect();
  disposedPage = true;
});
window.addEventListener('pageshow', event => {
  if (!event.persisted) return;
  disposedPage = false;
  removalObserver.observe(document.documentElement, { childList: true, subtree: true });
  mountAll();
});
window.SHJ_SCENE = Object.freeze({ mountAll, disposeAll, stats });
window.dispatchEvent(new Event('shijian-scene-ready'));
mountAll();
