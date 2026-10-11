# 食间 AI 图片素材记录

生成方式：Codex 内置 `image_gen`，每张一次独立调用；未使用外部 API。以下四张 JPEG 由生成 PNG 使用 `sips` 转码压缩，未裁切、未重绘。

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


