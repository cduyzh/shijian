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



## 2026-10-13 十二道扩展熟菜图集 v3

本次按数据整理负责人的最终配方与外观规范，使用 Codex 内置 `image_gen` 一次独立生成，设置 `transparent_background: true`。没有补充重绘或轮廓修改，没有用本地图像工具做裁切、去背景或有损转换。

- 最终文件：`dist/assets/cooked-extra-v3-atlas.png`。
- 尺寸：1448×1086，严格 4:3；4 列 × 3 行，每格 362×362，共 12 道菜。
- 文件大小：2,076,881 bytes，约 2.1 MB。
- 透明通道：`sips` 确认 `hasAlpha: yes`；只读像素检查为 RGBA、alpha 范围 0–255，完全透明像素占 48.53%。
- 原图：`dist/assets/originals/cooked-extra-v3-atlas-original.png`。
- 本地完整生成记录：`dist/assets/originals/cooked-extra-v3-prompts.json`。原图与记录不在 GitHub 公开或发行范围内。

格序固定如下，按行从左到右读取：

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 |
| --- | --- | --- | --- | --- |
| 1 | `celeryPork` 芹菜肉丝 | `gingerDuck` 仔姜鸭胸 | `radishChicken` 白萝卜炖鸡 | `lotusPork` 藕片炒里脊 |
| 2 | `luffaEgg` 丝瓜炒蛋 | `shrimpTofu` 河虾仁豆腐煲 | `stirShanghaibok` 清炒上海青 | `garlicPeaTender` 蒜蓉豌豆尖 |
| 3 | `snowPeaMushroom` 荷兰豆杏鲍菇 | `stirNapa` 清炒大白菜 | `wellCookedGreenBean` 蒜香四季豆 | `zucchiniMushroom` 西葫芦炒金针菇 |

CSS 图集定位为 `background-size:400% 300%`，横向 `0% / 33.333333% / 66.666667% / 100%`，纵向 `0% / 50% / 100%`。提示词要求紧凑小堆占单格 65%–70%；生成轮廓实际略大，显示时可沿现有组合层缩放保留餐盘空间，不拉伸食物形状。

配方和外观限制：

- 所有格只有熟食，没有盘子、碗、煲、桌面或文字；炖菜与豆腐煲只展示固体食材及少量附着的汁，不形成悬空汤块。
- 仔姜鸭胸使用熟去皮鸭胸薄片、仔姜薄片与二荆条段，不画鸭腿、鸭皮或鸭骨。白萝卜鸡肉为去皮去骨熟鸡腿块、白萝卜和鲜香菇。
- 河虾仁豆腐煲仅使用熟去壳河虾仁、老豆腐和上海青，不混入丝瓜、金针菇、番茄或胡萝卜。
- 上海青、豌豆尖、大白菜各自保留叶梗特征；荷兰豆为扁荚，四季豆为完全熟透的橄榄绿斜段，不能互相替代或画成生豆荚。
- 西葫芦为浅绿带皮半月片，金针菇为细茎小帽束，不借用黄瓜、杏鲍菇或香菇形态。
- 少油家常成品，不加入跨菜配料或配方外装饰；肉、虾与蛋均为熟制形态。AI 图片不作为实拍、份量或营养精确测量依据。

实际生成提示词：

```text
Use case: photorealistic-natural
Asset type: transparent RGBA cooked-food sprite atlas, twelve new Sichuan home-style finished dishes for CSS compositing onto a separate shared dinner plate.
Canvas and layout: landscape EXACT 4:3 aspect ratio, strict invisible 4-column by 3-row equal SQUARE cells. Cell centers x=12.5%,37.5%,62.5%,87.5%; y=16.6667%,50%,83.3333%. Exactly 12 food subjects, one in each cell, reading order fixed below. IMPORTANT FOOD SCALE: small compact mounds ONLY 65-70% of one cell width AND height, so each mound is about 17% of the TOTAL canvas width and 22% of total canvas height, with at least 15% of its cell as clear padding on all sides. Do NOT enlarge them to fill the grid. Each food has a natural irregular edge and stays completely inside its cell, ample transparent separation. True overhead camera at exactly 90 degrees, consistent size and lighting.
Exact cells, left to right top to bottom:
ROW 1 CELL 1 celeryPork 芹菜肉丝: slender thoroughly cooked light-brown pork tenderloin SHREDS mixed with THIN green Chinese celery STEM segments and a small amount of fine orange carrot threads. Chinese celery is slender rather than thick Western celery. No bean pods, no duck, no mushrooms.
ROW 1 CELL 2 gingerDuck 仔姜鸭胸: fully cooked light-brown skinless boneless DUCK BREAST thin slices, tender young ginger ivory thin slices and slender green Sichuan Erjingtiao pepper sections, lightly coated with a thin reddish-brown Sichuan sauce. No duck skin, bones, drumsticks or whole duck. Ginger slices must be visible and distinct, not onion.
ROW 1 CELL 3 radishChicken 白萝卜炖鸡: fully cooked beige SKINLESS BONELESS chicken thigh small chunks with soft translucent WHITE RADISH chunks and fresh brown SHIITAKE slices, a little pale clear stew moisture clinging to the solids. No potato, carrot, corn or bones, NO vessel or floating broth disk.
ROW 1 CELL 4 lotusPork 藕片炒里脊: thin ivory LOTUS ROOT round slices with recognizable NATURAL HOLES, thin fully cooked light-brown PORK tenderloin slices and slender green ERJINGTIAO pepper sections, lightly moist. No potato, carrot, mushroom or chicken.
ROW 2 CELL 1 luffaEgg 丝瓜炒蛋: tender cooked PALE GREEN LUFFA angled chunks with fully set golden-yellow SCRAMBLED EGG curds, very slight natural clear cooking juice clinging around the compact food. No tomato, tofu, cucumber, chili or raw egg.
ROW 2 CELL 2 shrimpTofu 河虾仁豆腐煲: small pink-orange FULLY COOKED PEELED RIVER SHRIMP kernels mixed with creamy-white firm TOFU cubes and softened SHANGHAI BOK CHOY dark green leaves with short pale-green stems. Little clear pale cooking moisture clinging to the solids. No shells, tails, meat, tomato or mushrooms. NO bowl, no pot, no floating soup puddle.
ROW 2 CELL 3 stirShanghaibok 清炒上海青: fully cooked Shanghai bok choy with THICK dark-green intact leafy portions and SHORT PALE-GREEN stems, a little minced garlic. Distinct from thin green-stem small cabbage, not a raw ornamental rosette. No meat, tofu, peas, pepper or carrot.
ROW 2 CELL 4 garlicPeaTender 蒜蓉豌豆尖: gently wilted cooked tender GREEN PEA SHOOT small leaflets, fine stems and clearly visible delicate CURLING TENDRILS, tiny minced garlic. Pea shoots, not spinach, not bok choy. No bean pods or carrots.
ROW 3 CELL 1 snowPeaMushroom 荷兰豆杏鲍菇: fully cooked green FLAT SNOW PEA PODS mixed with IVORY KING OYSTER MUSHROOM thin slices with pale tan edges. The peas are flat intact pods, NOT loose green peas, NOT round green beans. No shiitake, meat or carrot.
ROW 3 CELL 2 stirNapa 清炒大白菜: softened cooked short pieces of PALE YELLOW-GREEN NAPA CABBAGE leaves and TRANSLUCENT THICK WHITE cabbage ribs, tiny minced garlic. No whole plant, no Shanghai bok choy, no meat, no carrot.
ROW 3 CELL 3 wellCookedGreenBean 蒜香四季豆: fully and thoroughly COOKED OLIVE-GREEN ROUND GREEN BEAN diagonal segments with tiny minced garlic. Cooked softened olive-green beans, NOT hard bright raw green pods, not flat snow peas. No meat or other garnish.
ROW 3 CELL 4 zucchiniMushroom 西葫芦炒金针菇: thin cooked pale-green-skinned ZUCCHINI HALF-MOON slices with moist softened ivory ENOKI MUSHROOM fine STEM CLUSTERS and tiny small caps, tiny minced garlic. Enoki are slender needle mushrooms, NOT oyster or shiitake. Zucchini, NOT cucumber.
Style: real premium finished-food photography, gentle soft diffuse upper-left studio light, fine appetizing cooked textures, natural warm colors, low-oil everyday Sichuan home dishes. Pretty compact natural food portions rather than cartoon or CGI. Very faint close contact shadows only.
Required background: genuinely transparent alpha, clear empty negative space. NO backdrop of any color, no tabletop, no baked checkerboard, no white matte. Subjects are FOOD ONLY. The separate plate will be added later by web code.
Hard constraints: ABSOLUTELY NO plates, dishes, bowls, pots, saucers, cups, vessels, containers, serving trays or decorative circles beneath ANY of the twelve dishes. No cutlery, hands, table, plants, symbols, labels, text, grid lines, borders, watermark, cartoon faces, raw meat or raw eggs. Only the exact listed ingredients in each cell; no mixing ingredients across cells. No sesame, cilantro, scallion, red chili, peanuts, butter, cheese or other decorative garnish. Stew and tofu dishes are solid cooked food lightly coated by their own reduced/clinging moisture, NOT a free-floating circular liquid puddle. No subject overlaps or touches a cell boundary. Keep the precise 4x3 reading order and the requested SMALL 65-70% food scale.
```


## v3 水果透明图集

文件：`dist/assets/fruits-v3-atlas.png`，1402×1122，约 1.6 MB。5 列 × 4 行，前 18 格为水果，最后两格透明空白；原图归档为 `dist/assets/originals/fruits-v3-atlas.png`。使用 Codex 内置 `image_gen` 一次生成，`transparent_background:true`；以 `sips -g hasAlpha` 确认透明通道存在。未裁切、去背景、重绘或有损压缩。

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 | 第 5 列 |
| --- | --- | --- | --- | --- | --- |
| 1 | `apple` 红富士苹果 | `pear` 丰水梨 | `orange` 脐橙 | `mandarin` 蜜橘 | `kiwi` 绿心猕猴桃 |
| 2 | `banana` 普通香芽蕉 | `grape` 巨峰葡萄 | `strawberry` 红颜草莓 | `peach` 水蜜桃 | `nectarine` 油桃 |
| 3 | `plum` 青脆李 | `watermelon` 普通红瓤西瓜 | `pomelo` 白肉蜜柚 | `loquat` 大五星枇杷 | `apricot` 黄杏 |
| 4 | `cantaloupe` 西州蜜瓜 | `dragonFruit` 白心火龙果 | `persimmon` 脆柿 | 透明空白 | 透明空白 |

目标构图为每格 45° 同角度、几何中心对齐、主体约 65% 尺寸。模型实际水果主体有部分偏满格，首行位置较理想中心略下偏；应用展示需通过各水果裁切定位与统一居中容器处理，不能把提示词目标当作已达到的像素级结果。图像在黑底预览可见少量彩色 alpha 羽边，应以真实页面底色验收。基础等格采样参数为 `background-size:500% 400%`，横向 `0% / 25% / 50% / 75% / 100%`，纵向 `0% / 33.333333% / 66.666667% / 100%`；实际映射可依展示框调整。品种文字及营养资料仍以数据说明为准，图片不构成植物品种鉴定依据。

最终提示词：

```text
Use case: product-mockup
Asset type: transparent RGBA fruit sprite atlas for a refined Sichuan home nutrition web app.
Primary request: A photographic FRUIT SPRITE SHEET, exactly FIVE COLUMNS × FOUR ROWS of equal SQUARE invisible cells, with true TRANSPARENT BACKGROUND. Canvas landscape aspect ratio EXACTLY 5:4. There are eighteen fruit types in exact listed order, last two cells completely empty transparent. Each fruit arrangement is geometrically CENTERED inside its own cell: horizontal centers at 10%,30%,50%,70%,90%; vertical centers at 12.5%,37.5%,62.5%,87.5%. The overall bounding box of each arrangement occupies ONLY 60-65% of cell width AND cell height. Wide transparent padding on every side; no clipping and no crossing cell boundaries. All subjects shown from the SAME 45-degree slightly elevated front camera angle, clean warm diffuse light from upper left, real accurate food textures and cute small scale but no cartoon styling. Each arrangement is one whole fruit with a small cut section ONLY where specified, grouped closely and centered together.
Exact grid order left to right:
ROW 1: 1 apple: one Red Fuji apple, true red-pink streaked skin with subtle yellow-green undertones, short brown stem. 2 pear: one Hosui Asian pear, round golden-brown russet speckled skin, not apple or elongated European pear. 3 orange: one navel orange, orange finely dimpled skin with a small attached cut wedge showing orange flesh. 4 mandarin: one ordinary honey mandarin, slightly flattened round easy-peel orange fruit with one small peeled mandarin segment beside it. 5 kiwi: one fuzzy brown GREEN-FLESH kiwifruit plus a small half exposing vivid green flesh and black seeds, not yellow or red kiwi.
ROW 2: 1 banana: one ordinary yellow curved Cavendish banana with tapered tips. 2 grape: one small compact bunch of large round dark purple Kyoho grapes with natural bloom. 3 strawberry: two Hongyan red strawberries, conical heart-like natural shape, tiny real seeds and green calyx. 4 peach: one ripe Chinese honey peach, pale cream pink blush fuzzy skin, one small section showing creamy pale white flesh and the brown stone. 5 nectarine: one red-yellow smooth-skinned nectarine with one small wedge exposing yellow flesh, clearly smooth and shiny rather than fuzzy peach.
ROW 3: 1 plum: two crisp GREEN plums (Qingcui Li), smooth light green skin, one cut half showing pale green flesh and brown stone, not purple plums. 2 watermelon: one small ordinary striped green WATERMELON with one compact triangular cut section revealing vivid red flesh and small black seeds, no huge slice. 3 pomelo: one pale yellow-green white-fleshed honey POMELO with one small peeled thick-rind section revealing ivory white juicy segments, not pink/red pomelo. 4 loquat: three big orange-yellow Daxingxing LOQUATS, oval shape with distinctive small dark calyx at bottom, one cut half showing glossy brown seeds. 5 apricot: two yellow-orange apricots with slight red blush and velvety skin, one cut half showing orange flesh and one brown stone, visibly smaller than peaches.
ROW 4: 1 cantaloupe: one small oval Xizhou honey melon with fine netted beige-green skin and a compact wedge showing orange cantaloupe flesh and light seeds, not a smooth yellow melon. 2 dragonFruit: one pink-red dragon fruit with natural green-tipped scales plus one small half exposing WHITE flesh dotted with tiny BLACK seeds, not purple flesh. 3 persimmon: one firm crisp orange persimmon with a natural broad brown-green leaf-like calyx, squat smooth orange shape, no leaves attached beyond calyx. 4 empty transparent. 5 empty transparent.
Materials: authentic fresh fruit with realistic peel, fuzz, seeds and moisture. Exact recognizable varieties, no imitation generic food. Style: high-end gentle real product photography, refined cute miniature scale, warm natural color palette. Lighting uniform between every cell. No background or surface is visible; only each fruit with a very faint small soft alpha shadow if necessary.
Constraints: exact 5x4 equally spaced grid with SQUARE cells, EIGHTEEN centered fruit arrangements and TWO empty bottom-right cells. Genuine transparent PNG alpha, never white matte or painted checkerboard. No plates, bowls, trays, props, labels, text, watermark, dividers, card frames, decorative sparkle, face, eyes or mouths. Complete subjects never clipped, at most 65% of cell dimensions, substantial transparent margins.
```

## v3 新食材透明图集

文件：`dist/assets/ingredients-v3-atlas.png`，1254×1254，约 1.7 MB。4 列 × 4 行，16 格全部为生鲜原料；原图归档为 `dist/assets/originals/ingredients-v3-atlas.png`。使用 Codex 内置 `image_gen` 一次生成，`transparent_background:true`；`sips -g hasAlpha` 已确认透明通道存在。PNG 原尺寸已适合网页图集，未进行破坏 alpha 的格式转换。

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 |
| --- | --- | --- | --- | --- |
| 1 | `shanghaiBok` 上海青 | `napaCabbage` 大白菜 | `whiteRadish` 白萝卜 | `lotusRoot` 白花藕 |
| 2 | `greenBean` 四季豆 | `peaTender` 豌豆尖 | `snowPea` 荷兰豆 | `zucchini` 西葫芦 |
| 3 | `luffa` 丝瓜 | `celeryChinese` 中国芹菜 | `tenderGinger` 仔姜 | `enoki` 金针菇 |
| 4 | `kingOyster` 杏鲍菇 | `duckBreast` 去皮鸭胸肉 | `silverCarp` 去刺鲢鱼净肉 | `shrimp` 鲜河虾仁 |

上海青按青梗厚叶呈现，大白菜为长圆浅绿白梗；四季豆为圆形长豆荚，荷兰豆为扁豆荚；仔姜为乳白嫩皮带自然红尖；鸭胸为去皮深红生肉，鲢鱼为白色净鱼肉，虾仁为灰白半透明生鲜。主体有部分偏满格，边缘有模型产生的彩色 alpha 羽边，需由真实页面检验裁切留白与底色效果。基础等格采样为 `background-size:400% 400%`，横纵均为 `0% / 33.333333% / 66.666667% / 100%`。未启动浏览器，也未修改应用代码。

最终提示词：

```text
Use case: product-mockup
Asset type: fresh ingredient transparent RGBA atlas for a Sichuan home cooking planner.
Primary request: A perfectly regular FOUR COLUMNS × FOUR ROWS photographic sprite sheet of SIXTEEN raw fresh ingredient types, true transparent background. Square canvas, 4x4 equal invisible square cells. Exact geometric cell centers: x and y at 12.5%,37.5%,62.5%,87.5%. Each food arrangement is precisely centered at its own cell center, combined object bounding box occupies ONLY 60-65% of cell width AND height, generous completely transparent padding on all sides. Complete objects, no clipping, no cross-cell overlap. All subjects shown from same 45-degree slightly elevated front angle with uniform soft warm diffuse upper-left studio light, realistically true food anatomy and textures, delicate cute small scale but not illustration. Arrange each ingredient in a small compact isolated group, accurately recognizable regional types.
Exact sequence left to right:
ROW 1: 1 shanghaiBok: one compact SHANGHAI BOK CHOY, broad rounded spoon-like dark green leaves and thick curved PALE GREEN fleshy stems, compact rosette, not white-stem napa cabbage. 2 napaCabbage: one small complete NAPA CABBAGE, elongated dense oval head with softly ruffled pale green leaves and broad white ribs; short thick compact shape, not round cabbage. 3 whiteRadish: one WHITE DAIKON RADISH, long smooth tapered white root with a few short green leaf stems, plus one small white round cut section. 4 lotusRoot: two short beige-white sections of WHITE-FLOWER LOTUS ROOT, one small round cut slice prominently shows the natural characteristic ring of about nine clean holes, realistic starchy white flesh, not ginger.
ROW 2: 1 greenBean: small tidy group of five Chinese GREEN STRING BEANS, slender long ROUND CROSS-SECTION green pods, no exposed peas, no flat pods. 2 peaTender: compact bunch of TENDER PEA SHOOTS, soft light green round leaves with delicate curly tendrils and slender stems, distinct from spinach. 3 snowPea: three flat crisp green SNOW PEA PODS, broad thin flat edible pods with tiny young peas under skin, visibly FLAT and not round string beans. 4 zucchini: one short ordinary GREEN ZUCCHINI, smooth slightly speckled cylindrical green skin with broad rounded ends, one small round cut slice showing pale cream flesh and tiny seeds.
ROW 3: 1 luffa: one slender green LUFFA SPONGE GOURD, long cylinder with pronounced parallel ridges, tapering ends, one small angled cut showing pale soft inner flesh; not cucumber or zucchini. 2 celeryChinese: a small bunch of CHINESE CELERY, many thin pale green ribbed stalks and delicate small deeply lobed green leaves, narrow stems not thick Western celery. 3 tenderGinger: a small piece of YOUNG TENDER GINGER (Zijiang), smooth creamy ivory skin, plump branching rhizome, naturally pink-red pointed young tips, not mature rough tan ginger. 4 enoki: a small compact cluster of ENOKI MUSHROOMS, many delicate very thin creamy white long stems and tiny pale cream round caps, trimmed clean base.
ROW 4: 1 kingOyster: two KING OYSTER MUSHROOMS, thick cylindrical creamy white stems and small broad brown-gray caps, one lying horizontally, not thin-stem shiitake. 2 duckBreast: one RAW SKINLESS DUCK BREAST meat fillet, realistic deep wine-red dense muscle, elongated thick breast shape, absolutely no yellow duck skin and no cooking, no beef marbling. 3 silverCarp: one RAW BONELESS SILVER CARP FISH FLESH fillet and a small thick cut section, pearly pale white translucent freshwater fish flesh with fine visible muscle lines, skinless and clean, NOT red salmon, no fish head, no bones, no whole fish. 4 shrimp: small compact pile of RAW PEELED FRESH RIVER SHRIMP MEAT, realistic small curved gray-translucent off-white shrimp kernels with tiny subtle pale pink hints, shelled and deveined, no heads/tails/shells, not cooked orange prawns.
Scene/backdrop: absolutely no surface or colored background; true clear alpha transparency around every isolated arrangement, minimal very faint natural contact shadow in alpha only if necessary.
Style: premium real studio ingredient product photography, authentic vegetable varieties and raw fresh meat/fish/prawns, warm gentle natural color, realistic texture, same angle and scale throughout.
Constraints: exactly sixteen cells in the exact sequence, strict 4x4 equally spaced square grid, every arrangement centered and at most 65% cell dimensions, no food crosses its cell, no plates, bowls, trays, props, text, labels, logo, face, decorative marks, borders or gridlines, no cooked meat, no background matte or simulated checkerboard. Save true RGBA PNG transparency.
```



## 2026-10-13 全部 49 道熟菜图集 v4

本次按当前 `data.js` 的原始菜谱数组顺序，将 49 道菜分为前三组：16、16、17 道。三张图分别通过 Codex 内置 `image_gen` 一次独立生成，均设置 `transparent_background: true`；中断后复用已完成的 A，没有重新生成。素材只用于菜库与食谱预览，整餐的三维餐盘由另外的渲染实现提供。

新的提示词采用约 60° 斜俯摄影角度，强调自然松散、低矮、不规则或长条形构图，肉片与蔬菜交错，米饭保留松散熟米粒。固体菜不加盘、托盘或背景；汤和粥使用低矮极简方碗，以合理盛放液体。目标最长边为单格的 65%，但生成结果中部分主体仍偏大，消费端需留白缩放，不应拉伸图片。

| 文件 | 尺寸 | 格数与覆盖 | 透明通道 |
| --- | --- | --- | --- |
| `dist/assets/cooked-v4-a.png` | 1254×1254 | 4×4，16 道 | RGBA，`hasAlpha: yes` |
| `dist/assets/cooked-v4-b.png` | 1254×1254 | 4×4，16 道 | RGBA，`hasAlpha: yes` |
| `dist/assets/cooked-v4-c.png` | 1402×1122 | 5×4，17 道 | RGBA，`hasAlpha: yes` |

A、B 为正方形，C 为 1402×1122，接近 5:4。三张 PNG 均直接保留内置输出，未裁切、重绘、去背景或有损转换；只读检查确认 alpha 范围均为 0–255。完全透明像素占比 A 40.70%、B 43.17%、C 47.90%。

映射文件：`dist/assets/cooked-v4-manifest.json`。其中 `recipes` 按菜谱 ID 提供 `file / index / columns / rows / row / column / globalIndex`，`index / row / column` 使用从 0 开始的编号，覆盖 49 个唯一 ID，与当前数据数组顺序一致。C 的最后三个空格索引为 17、18、19。

### 图集 A 顺序

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 |
| --- | --- | --- | --- | --- |
| 1 | `pepperPork` 二荆条青椒肉丝 | `kungPaoChicken` 少油宫保鸡丁 | `lettucePork` 莴笋木耳炒肉 | `potatoChicken` 土豆炖鸡腿肉 |
| 2 | `tomatoEgg` 家常番茄炒蛋 | `garlicPork` 青蒜苗肉丝 | `tofuEggSteam` 嫩豆腐蒸蛋 | `mushroomTofuPot` 香菇青菜豆腐煲 |
| 3 | `homeStyleTofu` 家常豆瓣烧豆腐 | `mushroomChicken` 香菇蒸鸡腿肉 | `cucumberChicken` 黄瓜木耳鸡丁 | `onionPork` 洋葱青椒炒里脊 |
| 4 | `tomatoTofuEgg` 番茄豆腐烩蛋 | `lettuceChicken` 莴笋鸡片 | `garlicTofu` 青蒜苗烧老豆腐 | `garlicBroccoli` 蒜蓉西兰花 |

### 图集 B 顺序

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 |
| --- | --- | --- | --- | --- |
| 1 | `stirBokChoy` 清炒小白菜 | `garlicSpinach` 蒜蓉菠菜 | `cucumberSalad` 香醋凉拌黄瓜 | `steamedEggplant` 蒜香蒸紫皮长茄 |
| 2 | `pepperCarrot` 青椒胡萝卜丝 | `mushroomGreens` 香菇炒小白菜 | `stirLettuce` 清炒莴笋片 | `carrotWoodEar` 胡萝卜木耳小炒 |
| 3 | `tomatoGreens` 番茄炒小白菜 | `winterMelonPorkSoup` 冬瓜瘦肉汤 | `tomatoTofuSoup` 番茄嫩豆腐汤 | `spinachEggSoup` 菠菜蛋花汤 |
| 4 | `mushroomWinterSoup` 香菇冬瓜清汤 | `cornChickenSoup` 玉米胡萝卜鸡汤 | `whiteRice` 松软籼米饭 | `oatRice` 燕麦米饭 |

### 图集 C 顺序

| 行 | 第 1 列 | 第 2 列 | 第 3 列 | 第 4 列 | 第 5 列 |
| --- | --- | --- | --- | --- | --- |
| 1 | `blackRiceMix` 黑米杂粮饭 | `pumpkinOatCongee` 南瓜燕麦粥 | `cornOatCongee` 玉米燕麦粥 | `potatoRice` 土豆焖饭 | `cornRice` 玉米粒米饭 |
| 2 | `celeryPork` 芹菜肉丝 | `gingerDuck` 仔姜鸭胸 | `radishChicken` 白萝卜炖鸡 | `lotusPork` 藕片炒里脊 | `luffaEgg` 丝瓜炒蛋 |
| 3 | `shrimpTofu` 河虾仁豆腐煲 | `stirShanghaibok` 清炒上海青 | `garlicPeaTender` 蒜蓉豌豆尖 | `snowPeaMushroom` 荷兰豆杏鲍菇 | `stirNapa` 清炒大白菜 |
| 4 | `wellCookedGreenBean` 蒜香四季豆 | `zucchiniMushroom` 西葫芦炒金针菇 | 空透明 | 空透明 | 空透明 |

### 使用与配方边界

A、B 的 CSS 图集大小为 `400% 400%`，两轴定位 `0% / 33.333333% / 66.666667% / 100%`；C 为 `500% 400%`，横向 `0% / 25% / 50% / 75% / 100%`，纵向与 A、B 相同。素材保留自然不规则轮廓与一些高度变化，不作为三维模型使用。

提示词逐格限定原配方的食材、切法、熟制颜色；肉、虾、蛋与四季豆均要求熟制，不加入网络参考中的显著额外配料。菜谱总数、原料克重、营养数据均未因这轮生图调整。

需要留意的生成偏差已经在 manifest 的 `qualityNotes` 中保留：部分主体占格偏大；B 的 `mushroomWinterSoup` 中有一块形态疑似肉片的浅色部分，不能据此改变仅香菇与冬瓜的配方；透明边缘可能有少量半透明杂点或光晕。应结合当前菜谱文字识别食材，不能把 AI 图当作精确配料鉴定、实拍或食品安全验收。

原图保存在 `dist/assets/originals/cooked-v4-a-original.png`、`cooked-v4-b-original.png`、`cooked-v4-c-original.png`。完整实际提示词保存在 `dist/assets/originals/cooked-v4-prompts.json`。这些本地归档与全部应用素材不进入公开 GitHub 仓库，也不随发行包公开原图记录。

本节只记录生成、落盘与静态映射检查，不表示本轮网页视觉验收或线上更新已经完成。


## 2026-10-14 全部 70 种食材透明图集 v4

本轮将原来的多套圆形或带背景图片统一替换为两张 5 列 × 7 行透明摄影图集。A、B 均为 1060×1484 RGBA PNG，每格 212×212，分别对应 `data.js` 食材原始顺序 0–34 与 35–69。全部 70 个 ID 的映射位于 `dist/assets/ingredients-v4-manifest.json`。形状和品种按川渝常用食材限定，包括二荆条青椒、紫皮长茄、青蒜苗、小香葱、上海青、小白菜、四季豆和荷兰豆的分别呈现。

| 文件 | 覆盖 | 全透明像素占比 | Alpha 范围 |
| --- | --- | --- | --- |
| `dist/assets/ingredients-v4-a.png` | 35 种，籼米至生抽 | 49.48% | 0–255 |
| `dist/assets/ingredients-v4-b.png` | 35 种，香醋至河虾仁 | 44.58% | 0–255 |

两张图片均由 Codex 内置 `image_gen` 设置 `transparent_background:true` 生成。B 在中断后从已完成生成输出中找到并复用，没有重复生图。原图按字节复制归档为 `dist/assets/originals/ingredients-v4-a-original.png` 与 `ingredients-v4-b-original.png`，没有进行位图裁切、抠图或背景重绘。实际完整提示词分别保存在同目录 `ingredients-v4-a-prompt.txt` 与 `ingredients-v4-b-prompt.txt`。

提示词统一要求 45° 斜俯真实摄影、左上柔光、原料的完整自然轮廓、每格最长边约 65%、透明留白、无圆形遮罩或底板、无文字或标签。液体与豆瓣酱使用小方玻璃瓶罐，干粮调料为松散原物。生成结果部分主体仍偏满格，页面应按 alpha 主体边界等比缩放和居中，不能拉伸或重新套圆形裁切。极少量半透明边缘杂点是生成输出本身的偏差，已保留如实记录。

静态检查已核对 A/B 共 70 种顺序、具体品类、真实透明通道和映射唯一性；图片资源检查不代表页面交互和发布验收已经完成。

### v4 最终显示校正（2026-10-14）

70 种食材和 49 道成品均接入 v4 透明图集。根据完整原图 alpha 连通主体记录独立 `sourceRect`，保留自然轮廓并避开等分格线切边；用保持原始比例的 SVG 窗口显示原始 PNG，未编辑图片像素。食材的可见最长边约占方形窗口 80%，成品约 85%，均居中显示。此比例只用于界面一致性，不代表食材真实大小或份量。

B 组熟菜使用新的生成版本：汤改为深鼠尾草色方碗，已在页面奶油白底上核对透明边界；香菇冬瓜汤不再含肉样块。原版本与修复版本均保留在本地素材档案。

119 个显示框均通过透明边界检查，没有触边警告；桌面食材库、手机水果库和熟菜汤品卡片已检查实际渲染。归一化数学检查与视觉检查分别留证，不把生成提示词当作验收通过。

## 2026-10-14 真实照片 2D 餐盘 v5

用户指定恢复的首页参考图已与原资源核对：`dist/assets/cooked-hero.jpg`（1536×1024）即青椒肉丝、蒜蓉西兰花和燕麦饭的同盘照片。复用该图及 `originals/cooked-hero.png`，没有重复生成；建议首页以 `object-position:65% 55%` 保留右侧食物细节。

动态搭配新增 `dist/assets/plate-photo-v5.png`（1337×1177 RGBA）和 `dist/assets/linen-table-v5.png`（1536×1024 RGB）。前者是近俯拍的薄沿奶白陶瓷空盘，后者是中央留白的奶油亚麻餐桌底图，两者均由 Codex 内置 `image_gen` 生成并按字节复制到项目。餐盘 alpha 范围 0–255，主体范围 `(39,23)–(1309,1145)`；图片完整、未裁切或重绘。页面组合时应为完整餐盘保留边距，按原比例显示，避免强透视或强阴影。

文件尺寸、原图路径、复用来源和完整实际提示词记录于 `dist/assets/meal-photo-v5-manifest.json`；生成原图归档在 `dist/assets/originals/v5/`。摄影风格生成图仍为 AI 视觉示意，不能称为实际制作的实拍照片。本节记录资源生成和静态检查，网页组合效果由主 agent 统一验收。

### v5 新增食材、菜品和高细节常用菜

新增原料图集 `ingredients-v5.png`（1448×1086，4×3 RGBA）覆盖 12 种：绿球甘蓝、青叶韭菜、嫩蒜薹、绿梗空心菜、鲜平菇、紧实白花菜、绿豆芽、原味压制白豆干、红心红薯、黄小米、普通鲜山药、小毛芋。图形具体品种与 `data.js` 的条目核对，分别保留白豆干的米白表面、红薯的橙红断面、白花菜的紧实花球以及小毛芋的棕褐毛皮；不使用卤香干、松花菜或大香芋代替。

新增成品图集 `cooked-v5.png`（1305×1205，4×4 RGBA）依次覆盖：韭菜炒蛋、蒜薹肉丝、青椒豆干、番茄鲢鱼片、小芋头炖鸡、平菇炒蛋、蒜香手撕莲花白、蒜蓉空心菜、醋香绿豆芽、白花菜胡萝卜小炒、山药木耳小炒、平菇嫩豆腐汤、白萝卜蛋花汤、丝瓜河虾仁汤、红薯米饭、小米大米粥。汤粥使用深鼠尾草色低方碗，其余保留直接上盘的自然食物轮廓。番茄鱼片初始结果带有灰色鱼皮，已用内置生成工具针对该格修复为去皮熟白鱼片，原始和修复结果均归档；未宣称其他格像素完全相同。

两份映射分别为 `ingredients-v5-manifest.json` 与 `cooked-v5-manifest.json`，字典键沿用数据 ID，包含 `file / columns / rows / index / sourceSize / sourceRect`。原始 RGBA 的全透明像素占比分别为 51.79% 与 46.34%，alpha 范围均为 0–255。仅读取 alpha 连通主体生成显示窗口，未裁切、抠图、拉伸或重绘位图；28 个映射均无邻格主体包含、无 alpha≥128 边缘触界。静态报告为 `.qa/v5/new-assets-report.json`，完整实际提示词归档为 `originals/v5/expansion-prompts.json`。

为常用餐盘提高细节，另生成 `cooked-detail-v5-a.png`、`cooked-detail-v5-b.png` 两张 1254×1254 的 2×2 RGBA 图集，并生成独立 `bokchoy-detail-v5.png`。`cooked-detail-v5-manifest.json` 覆盖原有 8 个菜谱 ID：青椒肉丝、少油宫保鸡丁、蒜蓉西兰花、燕麦米饭、土豆炖鸡、黑米杂粮饭、番茄炒蛋、清炒小白菜。前 7 道主体实际长边为 580–615 像素；小白菜独立图主体长边 1164 像素。B 图右上原先生成成偏粗绿梗、近似上海青，未采用该格；独立图改为薄白梗、深绿叶的小白菜，保留品种区别。

8 道高细节图全部通过静态透明边界、邻格分离和主体长边≥400px 检查，记录于 `.qa/v5/detail-assets-report.json`；实际完整提示词归档于 `originals/v5/detail-prompts.json`。上述检查只证明素材和显示映射条件，浏览器布局、交互与最终餐盘效果由主 agent 单轮统一验收，资源生成本身不代表上线已完成。
