# 食间 AI 图片素材记录

生成方式：Codex 内置 `image_gen`，未使用外部 API。食材与首页图片采用独立生成；本次熟食素材另有一次针对性修改，详见下方记录。以下四张 JPEG 由生成 PNG 使用 `sips` 转码压缩，未裁切、未重绘。

- `dist/assets/hero-bowl.jpg`：1536×1024，首页食物摄影。
- `dist/assets/ingredient-atlas.jpg`：1254×1254，4×4 写实食材图集。
- `dist/assets/ingredient-atlas-2.jpg`：1254×1254，4×4 补充食材图集。
- `dist/assets/ingredient-atlas-3.jpg`：1448×1086，4×3 调味品与补充食材图集。
- 原始 PNG 保留在 `dist/assets/originals/`，仅用于本地归档；发行包应排除此目录。

图集顺序（按行从左到右）：

1. 番茄、西兰花、紫皮长茄、二荆条青椒。
2. 嫩黄瓜、胡萝卜、小白菜、鲜香菇。
3. 鸡蛋、北豆腐、鸡胸肉、大米。
4. 橙子、红苹果、猕猴桃、南瓜。

图集 CSS 可使用 `background-size:400% 400%`，横纵定位依次为 `0%`、`33.333333%`、`66.666667%`、`100%`。生成图为视觉辅助素材，不构成品种鉴定或营养数据来源。

## 首页最终提示词

```text
Use case: photorealistic-natural
Asset type: premium healthy Sichuan home cooking website hero photograph, landscape 3:2
Primary request: A real white ceramic round rice bowl with beautifully arranged simple low-oil home cooked Sichuan food, on a warm ivory cream tabletop. The bowl contains separate tidy areas of fluffy white rice, small tender green bok choy, orange carrot slices, small broccoli florets, and stir-fried chicken with thin green Erjingtiao pepper strips. Food is appetizing and naturally cooked, delicate and cute in a believable small scale. Beside the bowl place only a few small real tomatoes, one slender glossy purple-skin long eggplant, and two slender curved green Erjingtiao peppers. Real Chinese ingredients, especially slender purple long eggplant and narrow long peppers; natural anatomy and textures.
Style/medium: luxury editorial food photography, realistic food and ceramic, refined Apple-like simplicity, subtly feminine warm home lifestyle visual, not an illustration.
Composition/framing: landscape 3:2, eye-level slight elevated 35 degree angle, centered bowl fully in frame with ample calm breathing space; all objects separate naturally and complete in frame.
Lighting/mood: soft afternoon window sunlight from upper left, gentle realistic shadows, warm creamy highlights, pale sage ambient accent.
Materials/textures: glossy fine porcelain, distinct rice grains, authentic chicken texture, fresh vegetable leaves with natural veins.
Constraints: no text, no hands or people, no face, no cartoon, no eyes or mouths on food, no logo, no watermark, no UI, no plates of extra food, no chopsticks, no exaggerated saturation, no distorted proportions.
```

## 图集最终提示词

```text
Use case: product-mockup
Asset type: photoreal ingredient sprite atlas for a premium home cooking web app
Primary request: A square photograph arranged as a PERFECT 4 by 4 uniform invisible grid, exactly 16 isolated realistic ingredients, ONE specified ingredient type centered in each cell. Each cell must be exactly one quarter of the canvas width and one quarter of the canvas height. Centers at 12.5%,37.5%,62.5%,87.5% for both horizontal and vertical dimensions. Give every object generous breathing room, contain it completely within its cell, centered, no overlap and absolutely no separators.
Exact grid reading left to right:
Row 1: a single ripe red tomato with green calyx; one fresh broccoli crown; one slender long purple-skin Chinese eggplant; two narrow curved green Sichuan Erjingtiao peppers (thin long peppers, not bell pepper).
Row 2: one tender slender cucumber; one small carrot; one small complete bok choy with white-green stems and leafy crown; two fresh shiitake mushrooms.
Row 3: two beige chicken eggs; one neat square block of firm northern Chinese tofu; one raw pink skinless chicken breast; one small simple ceramic bowl containing dry white rice grains.
Row 4: one orange; one red apple; one whole fuzzy kiwi alongside its cut half showing green flesh; one small squat orange pumpkin.
Scene/backdrop: completely uniform warm ivory cream solid background (hex F4F0E7 feel), same background throughout canvas, no horizon, no table edge, no props beyond the rice bowl.
Style/medium: real studio food product photography with adorable miniature scale, impeccable actual ingredient anatomy and familiar Sichuan grocery appearance, photographic textures, fine detail. Real food; not cartoon or 3D render.
Composition/framing: square canvas, strict 4x4 grid with equal size cells. Shoot all objects from slightly elevated front angle. Largest objects occupy at most 65% of their cell width and height. The eggplant lies diagonally but is complete inside its cell.
Lighting/mood: uniform soft diffuse upper-left light with small soft close shadows. Subtle warm feminine premium feel.
Constraints: exactly listed 16 cells in exact listed order. No additional produce, no lines, no borders, no card frames, no text, no labels, no symbols, no watermark, no hands, no face or anthropomorphic features, no stickers, no smiley food. No bell peppers. No round globe eggplant. No food extending across cell boundaries.
```


## 补充食材图集 2

文件：`dist/assets/ingredient-atlas-2.jpg`，1254×1254，4 列 × 4 行。原图保存为 `dist/assets/originals/ingredient-atlas-2.png`。顺序如下：

1. 猪里脊肉、去皮去骨鸡腿肉、尖叶菠菜、青皮莴笋。
2. 白皮冬瓜、紫皮洋葱、干黑木耳、青蒜苗。
3. 丰水梨、蜜橘、普通香芽蕉、巨峰葡萄。
4. 黄心土豆、鲜甜玉米、原味燕麦片、非糯性黑米。

CSS 与第一张图集相同，使用 `background-size:400% 400%`。

最终提示词：

```text
Use case: product-mockup
Asset type: precise photoreal ingredient sprite atlas for a Sichuan family cooking website
Primary request: A square studio photograph arranged as a PERFECT 4 by 4 uniform invisible grid, exactly 16 ingredient cells in strict listed order. Cell widths and heights exactly 25% of canvas; centers at 12.5%,37.5%,62.5%,87.5% for both axes. Every ingredient must be complete inside its cell and generously padded. No cross-cell overlap.
Exact grid, left to right:
Row 1: one whole small strip of raw pork tenderloin, lean light reddish pink with natural meat fibers and very little white fat; one piece of raw skinless boneless chicken thigh meat, darker pink than breast with authentic irregular thigh anatomy; a small bunch of pointed-leaf spinach with triangular pointed green leaves and slender stems; one entire green Chinese stem lettuce with a small leafy top alongside a peeled pale jade-green stem section.
Row 2: one chunk of winter melon with distinctive pale grey-white waxy rind and exposed white cut flesh (white-rind winter melon, not dark green rind); one purple-skinned onion; a small pile of DRIED black wood ear fungus with shriveled curled dark thin surfaces; a small bunch of young green garlic shoots with long FLAT leaves and white garlic bases, not scallions and no round hollow leaves.
Row 3: one Hosui Asian pear with mottled brown-golden skin and characteristic round Asian pear shape, not an apple; one mandarin orange with a small partially peeled wedge; one ordinary Cavendish banana with curved shape and yellow skin; one small bunch of large dark purple Kyoho grapes.
Row 4: one whole yellow-flesh potato alongside half a potato showing yellow flesh; one fresh sweet corn cob partly in husk with bright yellow kernels; one small simple white ceramic bowl of plain oat flakes (flat pale beige flakes, not rice); one small simple white ceramic bowl of dry non-glutinous black rice grains (long slender very dark purple black rice).
Scene/backdrop: absolutely uniform warm ivory cream solid background matching F4F0E7, same across all cells; no horizon or table edges. Small soft close shadows only.
Style/medium: refined real studio food product photography, authentic Sichuan market ingredients, adorable small scale but real anatomy and true proportions, exquisite natural textures, not illustration or 3D.
Composition/framing: square canvas strict 4x4 equal grid, slightly elevated front angle, one listed ingredient arrangement per cell, largest arrangement fits at most 65% cell width and height. Each object isolated with generous cream margins.
Lighting: uniform diffuse upper-left soft studio lighting.
Constraints: exact grid and exact varieties, exactly the listed sixteen cells, no labels or writing, no border or gridlines, no decoration, no face, no icon, no watermark, no additional ingredients, no food outside its assigned cell.
```

## 补充食材图集 3

文件：`dist/assets/ingredient-atlas-3.jpg`，1448×1086，4 列 × 3 行，原始画面比例 4:3。原图保存为 `dist/assets/originals/ingredient-atlas-3.png`。顺序如下：

1. 菜籽油、普通生抽、酿造香醋、白皮蒜瓣。
2. 老姜、郫县豆瓣酱、小香葱、加碘食盐。
3. 干红花椒、熟无盐花生仁、石膏嫩豆腐、空白。

CSS 使用 `background-size:400% 300%`，横向定位 `0% / 33.333333% / 66.666667% / 100%`，纵向定位 `0% / 50% / 100%`。

最终提示词：

```text
Use case: product-mockup
Asset type: precise realistic condiment sprite atlas for Sichuan home cooking app
Primary request: A landscape studio ingredient photograph with canvas aspect ratio EXACTLY 4:3, arranged as a PERFECT 4-column by 3-row invisible grid of equal SQUARE cells. Cell width 25% canvas, cell height 33.3333% canvas. Column centers at 12.5%,37.5%,62.5%,87.5%; row centers at 16.6667%,50%,83.3333%. Exactly the following 11 specified ingredient arrangements and one EMPTY bottom-right cell. Every ingredient complete in its square cell, generous margins and no cross-cell overlap.
Exact grid left to right:
Row 1: one small clean transparent glass bottle with a short open spout containing golden Chinese rapeseed cooking oil, NO label; one small simple round white dish of ordinary light soy sauce, clear dark brown liquid; one small simple round white dish of brewed Chinese rice vinegar, translucent deep reddish brown liquid; three peeled white garlic cloves.
Row 2: one knobby mature ginger rhizome with tan rough skin; one small simple white dish containing chunky red-brown Pixian doubanjiang fermented broad bean chili paste, distinctive chili and bean pieces; one small bunch of delicate Chinese scallions with long thin ROUND HOLLOW green leaves and tiny white bases, not broad flat garlic leaves; one small simple white dish of fine white iodized table salt crystals.
Row 3: one small pile of dried red Sichuan peppercorn husks (red-brown tiny opened split husks, several visible dark seeds, not red chili peppers); a little pile of shelled roasted unsalted peanut kernels, warm beige kernels with a few fine reddish skin flecks, no shells; one neat square block of Chinese calcium-sulfate SILKEN tofu, pale ivory, delicate smooth moist surface with absolutely no visible coarse pores (not firm northern tofu); the LAST bottom-right cell stays completely empty with only the uniform cream background.
Scene/backdrop: completely uniform warm ivory cream solid background F4F0E7 feel, matching previous premium ingredient atlas; no horizon, no table edge, no props beyond listed small bottle and dishes.
Style/medium: refined photoreal studio product food photography, real authentic Sichuan pantry ingredients, adorable small scale but accurate anatomy, natural fine textures, not illustration, not 3D render.
Composition/framing: EXACT 4:3 landscape canvas, 4x3 equal SQUARE cells, slightly elevated 35 degree front view. Largest arrangements occupy at most 65% of their cell width and height. Distinct complete objects evenly centered. All small dishes share one simple white ceramic style.
Lighting: uniform diffuse warm upper-left light and soft close realistic shadows.
Constraints: exact listed sequence, exactly 11 ingredient arrangements and completely empty final cell. No text, no labels on bottle, no lettering, no gridlines, no borders, no decoration, no cartoon face, no watermark, no extra food, no food outside assigned cells. Difference between soy sauce and vinegar in subtle liquid color, do not add labels.
```

## 2026-10-12 熟食与共用餐盘素材

本次使用内置 `image_gen` 独立生成三份资产，全部调用设置 `transparent_background: true`，随后针对主食与汤图集做一次内置局部修改，共四次调用。最终文件直接保留透明 PNG，未转成 JPEG，未在本地裁切、重绘或去背景。`sips` 元数据检查确认三份文件均为 `hasAlpha: yes`；只读像素检查确认其模式为 RGBA，透明通道范围均为 0–255。

| 最终文件 | 尺寸 | 用途与布局 | 透明通道 |
| --- | --- | --- | --- |
| `dist/assets/shared-plate.png` | 1254×1254 | 一只顶视奶油白陶瓷空餐盘，浅粉细圈，无食物 | 有 |
| `dist/assets/cooked-veg-atlas.png` | 1448×1086 | 4 列 × 3 行；10 道蔬菜成品，最后两格空透明 | 有 |
| `dist/assets/cooked-staple-soup-atlas.png` | 1448×1086 | 4 列 × 3 行；先 7 道主食，后 5 道汤 | 有 |

两张熟食图集均为严格 4:3，每格 362×362。格序按当前菜谱数据中 `veg`、`staple`、`soup` 的原始顺序固定。CSS 可使用 `background-size:400% 300%`，横向定位 `0% / 33.333333% / 66.666667% / 100%`，纵向定位 `0% / 50% / 100%`。单格物体的实际占比约为 80%–90%，组合到餐盘时需缩放留出空间。

### 蔬菜图集顺序

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 |
| --- | --- | --- | --- | --- |
| 1 | `garlicBroccoli` 蒜蓉西兰花 | `stirBokChoy` 清炒小白菜 | `garlicSpinach` 蒜蓉菠菜 | `cucumberSalad` 香醋凉拌黄瓜 |
| 2 | `steamedEggplant` 蒜香蒸紫皮长茄 | `pepperCarrot` 青椒胡萝卜丝 | `mushroomGreens` 香菇炒小白菜 | `stirLettuce` 清炒莴笋片 |
| 3 | `carrotWoodEar` 胡萝卜木耳小炒 | `tomatoGreens` 番茄炒小白菜 | 空透明 | 空透明 |

### 主食与汤图集顺序

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 |
| --- | --- | --- | --- | --- |
| 1 | `whiteRice` 松软籼米饭 | `oatRice` 燕麦米饭 | `blackRiceMix` 黑米杂粮饭 | `pumpkinOatCongee` 南瓜燕麦粥 |
| 2 | `cornOatCongee` 玉米燕麦粥 | `potatoRice` 土豆焖饭 | `cornRice` 玉米粒米饭 | `winterMelonPorkSoup` 冬瓜瘦肉汤 |
| 3 | `tomatoTofuSoup` 番茄嫩豆腐汤 | `spinachEggSoup` 菠菜蛋花汤 | `mushroomWinterSoup` 香菇冬瓜清汤 | `cornChickenSoup` 玉米胡萝卜鸡汤 |

### 配方与组合限制

- 成品形态按当前菜谱食材和步骤整理；炒菜与米饭使用无盘子的紧凑小堆，汤与粥保留小白碗，不将液体悬空展示。
- 菠菜、莴笋、小白菜与紫皮长茄分别表现实际成品形态，不用其他蔬菜替代。凉拌黄瓜是已经完成的冷菜，不要求加热或煎焦。
- 燕麦米饭使用湿软燕麦片，黑米饭表现同煮后的紫灰色米粒；玉米鸡汤使用玉米粒，不画整段玉米筒。
- 不加入配方外的芝麻、香菜、奶油、辣椒、花生或额外装饰。肉类应为熟制成品，无生肉；空餐盘不含任何食物。
- 首版汤图中的番茄豆腐汤出现少量黄色玉米粒，鸡汤出现绿色配料；内置修改已去除这两处，最终应用文件采用修改后的版本。修改也要求清理透明空白中的零散杂点，保留柔和投影与抗锯齿边缘。
- 图片用于展示搭配与成品形态，是 AI 生成的视觉辅助，并非实拍、精确份量或营养测量结果。网站仍应按真实菜谱名称说明食材。

### 原图与生成记录

原图仅在本地归档，均位于 `dist/assets/originals/`，不属于 GitHub 公开文件或发行包：

- `shared-plate-original.png`
- `cooked-veg-atlas-original.png`
- `cooked-staple-soup-atlas-original.png`：首次生成版本。
- `cooked-staple-soup-atlas-corrected-original.png`：针对性修改后的版本。
- `cooked-assets-prompts.json`：三份完整生成提示词与一次修改提示词、文件尺寸和格序。

以下记录本次实际使用的提示词。

### 共用空餐盘提示词

```text
Use case: product-mockup
Asset type: transparent PNG shared empty plate for realistic food compositing in a premium Chinese home-cooking web app.
Primary request: Create ONE empty round ceramic dinner plate, viewed from EXACTLY overhead at 90 degrees. The plate is creamy warm ivory white porcelain, with a subtle slightly irregular handmade rim and one very thin pale dusty-pink line around the outer rim. A shallow well and gently raised rim, refined tactile glazed ceramic, completely empty, pristine, realistic.
Scene/backdrop: genuinely transparent alpha background, including all four corners. No tabletop, no colored background, no checkerboard pixels. Preserve only the plate and a restrained natural soft contact shadow.
Composition/framing: square canvas; plate centered exactly at 50% x / 50% y; full plate visible, circle occupying about 80% of canvas width and height; generous equal transparent padding on every side. Camera directly overhead; circular not elliptical.
Style/medium: high-end photoreal studio product photography, subtle feminine elegance, warm gentle palette, actual ceramic texture rather than illustration or 3D cartoon.
Lighting: large diffuse soft light from upper left, gentle believable highlights and faint soft shadow consistent with overhead food photography.
Constraints: only the empty plate; NO food, no garnish, no cutlery, no napkin, no plants, no props, no lettering, no logo, no watermark, no decorative pattern, no face, no hands; do not cut off the rim. Transparent background is required.
```

### 蔬菜成品图集提示词

```text
Use case: product-mockup
Asset type: photoreal transparent PNG sprite atlas of ten finished Sichuan home-cooked vegetable dishes, for CSS cell cropping and compositing over a separate shared ceramic plate.
Canvas/layout: Landscape canvas with EXACT 4:3 aspect ratio, 4 columns by 3 rows of equally sized SQUARE invisible cells. No grid lines. Cell centers are x=12.5%,37.5%,62.5%,87.5%, y=16.6667%,50%,83.3333%. Exactly ONE compact finished-food mound centered in each occupied cell, contained wholly in its own cell with generous transparent padding. Objects occupy no more than 65% of cell width and height. EXACTLY TEN food mounds; row 3 columns 3 and 4 are completely EMPTY TRANSPARENT. Do not reorder, combine or skip any cell.
Exact occupied cells in reading order, left to right top to bottom:
Row 1 column 1: garlic broccoli 蒜蓉西兰花 — small cooked tender emerald-green broccoli florets with tiny minced garlic, lightly moist, not a whole raw broccoli crown.
Row 1 column 2: stir-fried green-stem small Chinese cabbage 清炒小白菜 — softened bright green leafy leaves and pale green slender stems, cut short or folded naturally; not rosette Shanghai bok choy; tiny garlic bits.
Row 1 column 3: garlic spinach 蒜蓉菠菜 — wilted cooked deep-green spinach leaves and tender slender stems with tiny minced garlic; visibly distinct from bok choy.
Row 1 column 4: smashed cucumber salad 香醋凉拌黄瓜 — irregular fresh smashed chunks with dark green bumpy skin and pale green interiors, tiny garlic, a restrained clear light-brown vinegar-soy sheen. This is ready-to-eat cold salad, not fried or charred.
Row 2 column 1: steamed purple long eggplant 蒜香蒸紫皮长茄 — soft slender purple-skin Chinese long eggplant cut into cooked longitudinal strips or short lengthwise halves, deep purple skin, pale beige softened flesh, tiny garlic and scallion bits, very light soy-vinegar sheen; not round eggplant, not fried cubes.
Row 2 column 2: stir-fried pepper and carrot threads 青椒胡萝卜丝 — fine long green Erjingtiao pepper strips and fine orange carrot strips in a compact lightly glossy cooked mound; tiny garlic; no bell-pepper chunks.
Row 2 column 3: shiitake and small cabbage 香菇炒小白菜 — cooked brown shiitake slices mixed with softened green-stem Chinese small cabbage leaves and pale green stems, tiny garlic, a slight soy sheen.
Row 2 column 4: stir-fried celtuce stem 清炒莴笋片 — pale jade-green thin diamond-shaped celtuce STEM slices, slightly translucent from cooking, with tiny garlic bits; no lettuce leaves, no cucumber.
Row 3 column 1: carrot and wood-ear stir fry 胡萝卜木耳小炒 — thin orange carrot slices, glossy black cooked folded wood-ear mushroom pieces, softened purple-onion slender strips and tiny garlic, lightly glossy.
Row 3 column 2: tomato and small cabbage 番茄炒小白菜 — softened red tomato chunks with cooked green small cabbage leaves and pale green stems, tiny garlic, a small amount of natural red tomato juices clinging to the mound.
Row 3 columns 3 and 4: blank transparent cells, no object at all.
Scene/background: REAL alpha transparency throughout all empty space. NO colored backing or tabletop, NO baked checkerboard. Each mound is a clean cutout, with only a very faint soft natural contact shadow immediately underneath.
Style/medium: Real high-end food photography, true finished edible home cooking; camera EXACTLY 90 degrees overhead; fine actual textures, realistic greens and warm orange/red, gentle feminine premium styling through neat compact placement. Soft diffuse upper-left lighting consistent across every cell.
Constraints: no plates, no bowls, no containers, no cutlery, no tabletop, no hands, no labels, no text, no watermark, no grid or borders. No raw meat, no cartoon face. No chili, sesame, cilantro, peanuts or any additional garnish; use ONLY the ingredients specified for each cell. No oil puddles. Food may not cross its cell boundary. Preserve the exact 4-by-3 layout and the two blank cells.
```

### 主食与汤成品图集提示词

```text
Use case: product-mockup
Asset type: photoreal transparent PNG sprite atlas of seven finished rice/porridge dishes followed by five finished Chinese soups, for CSS cell cropping and compositing into a web meal planner.
Canvas/layout: Landscape EXACT 4:3 canvas. Strict uniform invisible 4 columns x 3 rows, all twelve equally sized SQUARE cells filled. Centers at x=12.5%,37.5%,62.5%,87.5%, y=16.6667%,50%,83.3333%. EXACTLY ONE complete food subject in each cell, centered with generous even transparent padding. Food mound OR entire small bowl occupies no more than 65% of cell width and height. Never reorder, duplicate, combine or skip cells. Camera EXACTLY 90-degree overhead, so every bowl is circular rather than elliptical.
Exact cells in reading order, left to right top to bottom:
Row 1 column 1: whiteRice 松软籼米饭 — one tidy compact mound of fluffy fully COOKED long-grain white Chinese rice, distinguishable moist cooked grains; NO dish, NO bowl, NO garnish.
Row 1 column 2: oatRice 燕麦米饭 — one compact COOKED white rice mound mixed evenly with pale beige softened rolled-oat flakes, dry rice texture rather than porridge; NOT whole wheat kernels, NOT raw dry oats. NO dish, NO bowl, NO garnish.
Row 1 column 3: blackRiceMix 黑米杂粮饭 — one compact fully COOKED mound of white rice and black rice cooked TOGETHER, natural purple-grey rice color with distinguishable deep purple-black swollen rice grains; not white rice sprinkled with raw black rice. NO bowl, NO dish, NO garnish.
Row 1 column 4: pumpkinOatCongee 南瓜燕麦粥 — ONE very small plain shallow creamy-white bowl of thick golden porridge, soft orange pumpkin small cubes, visible moist cooked oat flakes and cooked rice grains; NOT cream soup. No milk, no sugar, no garnish.
Row 2 column 1: cornOatCongee 玉米燕麦粥 — ONE very small plain shallow creamy-white bowl of ivory-pale-yellow thick porridge with small whole yellow sweet-corn kernels, soft cooked oat flakes and rice grains. No milk, dates, sugar or garnish.
Row 2 column 2: potatoRice 土豆焖饭 — one compact mound of cooked white long-grain rice, soft small yellow-fleshed potato cubes and tiny orange carrot cubes, steamed and moist, NOT browned fried rice. NO bowl, NO plate, no additional ingredient or garnish.
Row 2 column 3: cornRice 玉米粒米饭 — one compact mound of fluffy cooked white long-grain rice mixed with small yellow sweet-corn kernels, clearly dry fluffy rice rather than liquid porridge. NO dish, NO bowl, NO garnish.
Row 2 column 4: winterMelonPorkSoup 冬瓜瘦肉汤 — ONE small plain white bowl containing clear pale broth, thin softly cooked translucent peeled white winter-melon slices, thin pale beige fully cooked lean pork-tenderloin slices, a few tiny ginger and scallion pieces. Pork is cooked, never raw pink. No tofu, mushroom or corn.
Row 3 column 1: tomatoTofuSoup 番茄嫩豆腐汤 — ONE small plain white bowl with clear light red-orange broth, softened red tomato chunks, tender creamy-white tofu cubes and tiny scallion pieces. NO egg, no pork, no cream.
Row 3 column 2: spinachEggSoup 菠菜蛋花汤 — ONE small plain white bowl with clear broth, fully cooked dark-green spinach leaves and pale-yellow delicate egg-drop ribbons, tiny ginger. No tofu, tomato or meat.
Row 3 column 3: mushroomWinterSoup 香菇冬瓜清汤 — ONE small plain white bowl with clear pale broth, softened translucent peeled white winter-melon thin slices, brown shiitake slices, tiny ginger and scallion. NO meat, NO tofu.
Row 3 column 4: cornChickenSoup 玉米胡萝卜鸡汤 — ONE small plain white bowl of clear pale broth with fully cooked off-white/beige skinless boneless chicken-thigh chunks, small yellow SWEET CORN KERNELS and soft orange carrot chunks, tiny ginger. NO whole corn cobs or corn sections, no bone, no tofu, no mushroom.
Scene/background: genuinely transparent alpha background across all negative space. No tabletop, no colored surface, no baked checkerboard, no separators. Preserve clean food cutouts and bowls plus only faint restrained soft contact shadows immediately underneath. Soup and porridge MUST stay inside their own complete small bowls; do not draw floating liquid.
Style/medium: premium realistic overhead food photography, appetizing fully prepared Chinese home cooking; delicate realistic grain and liquid textures; gentle consistent diffuse upper-left light. Containers are small plain white ceramic with restrained soft highlights, completely unmarked.
Constraints: exact 4 by 3 atlas; each subject complete with its full rim or mound inside its cell. No extra plates under rice or underneath bowls. No raw meat. No sesame, cilantro, chili, butter, cream, parsley, peanuts or any ingredient not specified per cell. No logos, text, labels, numbers, borders, hands, utensils, props, watermarks or cartoon faces. NO food spilling into neighboring cells. Keep transparent padding around each of all twelve subjects.
```

### 主食与汤图集局部修改提示词

```text
Use case: precise-object-edit
Asset type: correction of a transparent 4-column by 3-row overhead cooked-food sprite atlas.
Edit target: the provided local cooked-staple-soup-atlas.png. Keep its exact 4-by-3 grid, subject placement, canvas aspect ratio, cell centers, scale, camera, lighting, bowl geometry, alpha cutouts, and every correct food unchanged.
ONLY make these targeted corrections:
1. Row 3 column 1 (the bottom-left tomato tofu soup bowl): remove ALL yellow corn kernels or yellow vegetable pieces. This recipe contains only soft red tomato chunks, creamy white tender tofu cubes, tiny green scallion bits, and red-orange clear broth. Preserve the tomatoes, tofu, scallions, bowl and red broth; after removing the corn, fill only the affected spots with matching broth, never introduce egg or another garnish.
2. Row 3 column 4 (bottom-right corn chicken soup bowl): remove all small GREEN scallion/pea/leaf garnish pieces. This recipe contains only fully cooked pale beige boneless skinless chicken chunks, yellow sweet CORN KERNELS, soft orange carrot chunks, ginger and clear pale broth. Preserve all correct corn kernels, chicken, carrot and ginger. Fill only removed green-garnish spots with matching broth. Do not replace corn with corn cobs.
3. Clean tiny detached isolated pixel specks outside the food and bowl silhouettes across the transparent negative space. Retain natural anti-aliased edges and the very faint true soft contact shadows; do not eat into any subject or create white halos.
DO NOT alter the other ten food subjects. In particular keep every rice mound and porridge unchanged; keep corn in the corn-rice mound and corn-oat porridge; keep scallions in the other soup bowls that contain them. Keep the entire rice/porridge row order exactly unchanged.
Required: real alpha transparent PNG background everywhere outside the twelve complete subjects; no backdrop, no baked black or checkerboard, no text or grid lines, no props. Preserve the photorealistic finished-food textures and EXACT 4:3 / 4-by-3 geometry of the source.
```


## 15 道熟制主菜图集

文件：`dist/assets/cooked-main-atlas.png`，1254×1254，2.5 MB。图集为 4 列 × 4 行，第 16 格为空。已通过 `sips -g hasAlpha` 确认真正存在透明通道；使用原始 PNG，未做去背景或有损转换。

图集顺序（严格对应 `recipes.filter(recipe => recipe.type === 'main')`）：

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 |
| --- | --- | --- | --- | --- |
| 1 | `pepperPork` 二荆条青椒肉丝 | `kungPaoChicken` 少油宫保鸡丁 | `lettucePork` 莴笋木耳炒肉 | `potatoChicken` 土豆炖鸡腿肉 |
| 2 | `tomatoEgg` 家常番茄炒蛋 | `garlicPork` 青蒜苗肉丝 | `tofuEggSteam` 嫩豆腐蒸蛋 | `mushroomTofuPot` 香菇青菜豆腐煲 |
| 3 | `homeStyleTofu` 家常豆瓣烧豆腐 | `mushroomChicken` 香菇蒸鸡腿肉 | `cucumberChicken` 黄瓜木耳鸡丁 | `onionPork` 洋葱青椒炒里脊 |
| 4 | `tomatoTofuEgg` 番茄豆腐烩蛋 | `lettuceChicken` 莴笋鸡片 | `garlicTofu` 青蒜苗烧老豆腐 | 空白透明 |

所有菜品为无盘熟菜小堆，90° 顶视角，用于餐盘上组合显示。图集可使用 `background-size:400% 400%`，横纵定位 `0% / 33.333333% / 66.666667% / 100%`。食物小堆占格较大，组合层通过 CSS 缩放保留餐盘边缘。图像为 AI 成品效果示意，不是实际烹调照片；配方及营养信息仍以数据与说明文档为准。外观研究参见 `docs/COOKED-REFERENCES.md`。

原图归档：`dist/assets/originals/cooked-main-atlas.png`。

最终生成提示词：

```text
Use case: photorealistic-natural
Asset type: transparent RGBA 4x4 food sprite atlas for compositing cooked dishes onto a dinner plate in a web app.
Primary request: A square high-detail PHOTOGRAPHIC food atlas on a genuinely TRANSPARENT background. Strict 4 columns × 4 rows of equal invisible square cells. 15 different COOKED Sichuan home dishes in exact order below, bottom-right 16th cell completely empty transparent. Camera straight overhead at exactly 90 degrees, food surface clearly top-down. Each cell contains a single compact loose oval or round pile of REAL COOKED FOOD ONLY, WITHOUT any plate, bowl, saucer or vessel. Food is already cooked, appetizing, lightly moist rather than greasy. Each pile centered at the exact cell center and occupies only 60-65% cell width and height; generous transparent space, absolutely no overlap. Food mounds must have irregular natural edges, no decorative garnish beyond listed ingredients. Stews shown as their cooked solid ingredients coated with a little thick cooking juice that stays compact; no surrounding puddles. Egg custard shown as a small intact soft oval mound with tofu, not a bowl. Need true clear alpha background around all food pieces, no simulated checkerboard, no white matte.
EXACT grid, reading left to right:
ROW 1 CELL 1 pepperPork: thin slender green Sichuan Erjingtiao pepper strips mixed with thin beige/light brown thoroughly cooked pork tenderloin shreds, tiny ginger shreds, light soy sauce glaze, dry stir-fry; NO bell pepper cubes, NO onion.
ROW 1 CELL 2 kungPaoChicken: lightly cooked pale brown chicken breast CUBES with green-skinned cucumber CUBES, orange carrot CUBES and a few tan roasted PEANUT kernels, thin reddish-brown soy/vinegar/douban glaze, tiny ginger; NO whole dried chilies, no bell peppers.
ROW 1 CELL 3 lettucePork: pale jade green translucent celtuce STEM DIAMOND SLICES with curled shiny BLACK WOOD EAR and light beige-brown cooked pork tenderloin SLICES, fine garlic, light stir-fry; NO carrot.
ROW 1 CELL 4 potatoChicken: fully cooked BONELESS SKINLESS chicken thigh CHUNKS with soft golden yellow potato CHUNKS, orange carrot CHUNKS, translucent cooked purple onion, tiny ginger, light brown reduced stew glaze; NO whole drumstick, NO bones.
ROW 2 CELL 1 tomatoEgg: juicy softened bright red tomato CHUNKS with fluffy GOLDEN YELLOW COAGULATED SCRAMBLED EGG CURDS, a few tiny green scallion flecks, moist red tomato cooking juice; NO raw egg, no meat.
ROW 2 CELL 2 garlicPork: thin light brown cooked pork tenderloin SHREDS mixed with chopped flat GREEN GARLIC LEAF SECTIONS and white garlic shoot base sections, fine ginger, light soy glaze; NO round tubular garlic scapes, no carrot.
ROW 2 CELL 3 tofuEggSteam: pale yellow fully SET STEAMED EGG CUSTARD forming a soft intact compact oval with smooth creamy white SILKEN TOFU small cubes partly visible within, a small drizzle of light soy and tiny green scallion flecks; not scrambled egg, not sliced egg tofu, no raw egg, NO bowl.
ROW 2 CELL 4 mushroomTofuPot: milk-white unfried FIRM TOFU CUBES mixed with sliced brown shiitake mushrooms and soft cooked leafy green bok choy with pale green stems, a little clear pale cooking glaze and tiny ginger; NO golden fried tofu.
ROW 3 CELL 1 homeStyleTofu: milk-white unfried FIRM TOFU CUBES coated in gentle reddish brown Pixian douban chili-bean glaze with slender green Erjingtiao pepper SECTIONS and orange carrot THIN SLICES, fine garlic; not mapo minced-meat tofu, no meat.
ROW 3 CELL 2 mushroomChicken: pale brown fully STEAMED SKINLESS BONELESS chicken thigh CHUNKS with dark brown fresh shiitake SLICES, thin ginger shreds and a few scallion flecks, a light soy steaming glaze; NO raw meat, no skin, no bones, no peppers.
ROW 3 CELL 3 cucumberChicken: ivory beige fully COOKED chicken breast CUBES with green-skinned cucumber CHUNKS and curled glossy BLACK WOOD EAR, a clear light soy glaze and tiny ginger; NO carrots, NO eggs, NO peanuts.
ROW 3 CELL 4 onionPork: light brown fully cooked pork tenderloin SLICES with softened PURPLE ONION STRIPS and slender GREEN ERJINGTIAO PEPPER SECTIONS, fine garlic, light stir-fry; pork pieces broad thin slices NOT shredded.
ROW 4 CELL 1 tomatoTofuEgg: soft creamy white SILKEN TOFU CUBES with red cooked tomato pieces and delicate pale yellow COAGULATED EGG RIBBONS, tiny scallion flecks, a little thick red-orange braising tomato glaze; NO whole boiled eggs, no meat.
ROW 4 CELL 2 lettuceChicken: ivory beige fully cooked THIN CHICKEN BREAST SLICES with pale jade green CELTUCE STEM SLICES and orange CARROT THIN SLICES, tiny ginger, light moist stir-fry; NO broccoli, no peppers.
ROW 4 CELL 3 garlicTofu: milk-white unfried FIRM TOFU CUBES with white-green garlic shoot bases and flat green garlic LEAF SECTIONS, brown shiitake SLICES, tiny ginger, thin light brown soy braise glaze; NO yellow fried tofu, no pork.
ROW 4 CELL 4: completely EMPTY TRANSPARENT.
Style: authentic premium cooked food photography, gentle warm natural colors, refined small adorable portions but real ingredient shapes and delicious cooked textures. Uniform soft diffuse studio lighting, minimal close food shadow without a white surface. All mounds consistent visual scale and top-down camera. Square canvas, ideally 2048x2048 for sharp sprites.
Hard constraints: true transparent background, no background color, no plates, no bowls, no dishes, no cutlery, no table, no labels, no text, no frames, no grid lines, no watermark, no face, no illustration or 3D cartoon, no raw meats or raw eggs, no extra ingredients beyond each recipe. Preserve exact 4x4 order and empty final cell.
```

## 熟菜首页照片

文件：`dist/assets/cooked-hero.jpg`，1536×1024，596 KB，3:2。同一只奶油陶瓷餐盘盛二荆条青椒肉丝、蒜蓉西兰花、燕麦米饭，各区域清晰；旁配米白亚麻与一枝淡粉花，45° 摄影角度。由 PNG 以 `sips` 88% JPEG 质量转换，原图 `dist/assets/originals/cooked-hero.png`。旧的 `hero-bowl.jpg` 保留。

最终生成提示词：

```text
Use case: photorealistic-natural
Asset type: refined homepage hero for a cute premium Sichuan family meal planner, landscape 3:2
Primary request: A single large shallow cream ceramic dinner plate on a warm ivory tablecloth, photographed from a 45-degree overhead angle. Three foods are together on THIS ONE PLATE in beautifully clear separate areas: HALF of the plate surface is tender-cooked vivid green garlic broccoli florets with very fine minced garlic; ONE QUARTER is cooked thin pork tenderloin strips stir-fried with slender green Sichuan Erjingtiao pepper strips and a trace of ginger in light soy sauce; ONE QUARTER is fluffy cooked white long-grain rice mixed with some soft cooked plain oat flakes. Approximate 1/2 vegetable, 1/4 protein dish, 1/4 rice across the single plate. Food completely cooked and delicious, no raw red or pink meat. Pork is slender beige-brown cooked shreds and Erjingtiao are thin green pepper strips, not thick bell peppers. Broccoli is soft vibrant green cooked, oats are subtle soft beige flecks among rice, not uncooked cereal sprinkled on top. No noodles and no extra dishes.
Scene/backdrop: sweet refined calm morning home table, elegant ivory linen napkin beside the plate and a single small blush-pink flower in a tiny vase in the background. Soft sage-green and pale apricot-pink ambient accents. Lots of clean breathing room, premium gentle feminine warmth.
Style/medium: high-end editorial food photography with real delicious textures, clean Apple-like composition, naturally cute food proportions, true photographic realism rather than illustration.
Composition/framing: wide 3:2, full plate visible centered slightly to the right with generous margins. Single plate food regions distinct and proportioned, tabletop photographed at 45 degrees, subtle background depth.
Lighting/mood: soft warm morning window sunlight, luminous ivory, delicate shadows, restrained color grading, calm and tender.
Constraints: exactly one plate holding all three foods; no separate ingredient photography, no raw vegetables, no raw meat, no text, no logo, no UI, no border, no watermark, no person, no face, no cutlery, no chopsticks, no additional bowls or food.
```

