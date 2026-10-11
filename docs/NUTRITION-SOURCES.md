# 食间：内容来源与数据边界

核对日期：2026-10-11。适用范围：面向健康成年人的家常午餐、晚餐和水果规划演示。

## 已核对的公开权威来源

| 主题 | 来源 | 用途 |
| --- | --- | --- |
| 一般膳食原则 | [中国营养学会《中国居民膳食指南（2022）》](https://dg.cnsoc.org/article/2021b.html) | 食物多样、合理搭配的一般原则 |
| 能量平衡 | [准则二：吃动平衡，健康体重](https://dg.cnsoc.org/article/04/k9W2iu8FT6K5oWaQKArU9g.html) | 解释减重与整体能量收支有关；不生成个人热量缺口 |
| 蔬菜、水果与全谷物 | [准则三：多吃蔬果、奶类、全谷、大豆](https://dg.cnsoc.org/article/04/70JvPbFmTlyZbjoO67LeRg.html) | 全谷物搭配、整果与蔬菜安排 |
| 蛋白质食物 | [准则四：适量吃鱼、禽、蛋、瘦肉](https://dg.cnsoc.org/article/04/3tyM8WoTTUmc_oFHMymk3Q.html) | 蛋白质食物轮换与烹调的一般原则 |
| 健康膳食 | [WHO Healthy diet](https://www.who.int/news-room/fact-sheets/detail/healthy-diet) | 食物多样性、全谷物、蔬果、少盐少糖；页面更新日期 2026-01-26 |
| 烹调与生熟分开 | [WHO Five keys to safer food 官方海报](https://www.who.int/docs/librariesprovider2/default-document-library/5keys_en.pdf) | 清洁、生熟分开、煮熟、及时冷藏 |
| 冷藏与常温时间 | [FDA Are You Storing Food Safely?](https://www.fda.gov/consumers/consumer-updates/are-you-storing-food-safely) | 冷藏不高于 4°C；易腐食物常温放置控制；炎热环境缩短时间 |

这些来源支持科普原则，不是应用中逐个食材营养数字、菜谱营养或价格的出处。文章采用食间自己的短文表述，不复制权威材料全文。

## 数字的性质

`dist/data.js` 中的能量、蛋白质、脂肪、碳水化合物、膳食纤维、可食部比例、参考价格均为**产品演示估算，待逐项校对**。没有导入或声称获得《中国食物成分表》的数据使用授权，也没有把手工参考值标注为已核对的 USDA 官方记录。不可将其展示为精确营养结论或市场实时价格。

若将来需要可追溯营养结果，应使用合法授权数据库或核对具体 USDA FoodData Central 记录，并逐项保存食物代码、品种、原料状态、单位、提取时间和授权条件。不能仅为一组数字附上一个数据库首页链接。

当前价格为静态设计估算，单位为人民币元/千克，仅为预算功能提供演示基础；没有采集四川市场、商超或平台的实时行情。未来如采用价格采集，应保存实际城市、销售规格、采集日期和是否为可食部价格。

## 计算合同

- `ingredients[].nutrition`：每 100g **可食部原料**估算。米、燕麦、黑米为干原料；黑木耳为干品；其余按所注明的生鲜或成品状态。熟花生是无盐熟原味花生仁。
- `recipes[].ingredients[].g`：**双人份可食部生重**，或干木耳等干品的原料重；不含水，不是烹调完成后的重量。
- 菜谱总营养：`sum(食材每 100g 营养 × g / 100)`。每人参考值可以将双人合计除以 2；实际分餐不同不能假定一模一样。
- 理论采购重量：`可食部需求重量 / edible`。这个换算忽略包装、最小采购单位、骨皮差异、库存及损耗变化。
- 理论食材成本：`理论采购重量(g) / 1000 × pricePerKg`。不含燃气、水电、配送费，也不代表整包商品的实际结算账单。
- 全餐比例提示只用于帮助搭配；“约半盘蔬菜、其余主食与蛋白质”是产品的视觉辅助，并非经计算的体积、重量或能量标准。
- `recommendedMeals` 固定主菜、蔬菜、主食三个槽位；纯清汤不会代替主蛋白。南瓜、土豆和玉米的角色已注明；含土豆的炖菜应提示同时考虑主食份额。

烹调后水分变化、用油残留、留锅酱汁和营养损失均未校正。数据未计算钠、微量营养素或营养素达标率。

## 名称与地区边界

本库选择川渝常见食材，并明确当前条目对应类型。例如紫皮长茄不泛指圆茄或白茄；二荆条青椒不是灯笼甜椒；青蒜苗不是蒜薹；青皮莴笋只计去皮茎；卤水老豆腐与石膏嫩豆腐分开，均不等同油豆腐或鸡蛋豆腐。别名仅帮助搜索，不能因此将同一俗称下的其他品种混入营养计算。

菜谱为少油家常版本，宫保鸡丁属于家常改良版，包含花生；配方不声称传统做法唯一正确。应根据食材过敏标签自行替换，替换后不能沿用原菜谱精确营养值。大豆、小麦、蛋和花生等过敏信息是提示，包装标签与个人已知过敏要求优先。

## 食品安全与医学边界

菜单可以规划 3–7 天，不能据此把全部熟食冷藏一整周。建议按生活节奏分批采购和烹调。熟食及时浅盒分装并冷藏，通常以离开温控不超过 2 小时为上限；环境高于约 32°C 时以 1 小时为上限。冷藏设备保持不高于 4°C；彻底复热，生熟分开。

应用对留餐采用“**次日吃完**”的保守建议，这是产品选择，不宣称为 WHO 或 FDA 给所有菜式规定的统一保质期。凉拌菜现拌现吃。不能只凭气味判断安全，也不能认为再次煮沸一定消除此前不当储存产生的所有风险。干黑木耳建议冷藏泡发并尽快煮熟，不鼓励长时间常温浸泡。

应用只规划午晚餐和水果；早餐、奶类、鱼类、饮品、零食和实际活动都未完整纳入。不能从局部菜单宣称全天营养已经满足需求，不能声称单一食材“燃脂、排毒、降糖或治病”。不提供孕期、儿童、肾病、糖尿病等人群的个体化医疗营养处方。

## 数据结构

运行后读取 `window.SHIJIAN_DATA`。

- `meta`：版本、更新时间、适用地区、默认双人份、营养/价格/重量/储存统一说明。
- `categories`：`grain / protein / vegetable / fruit / seasoning`。
- `ingredients`：`id, name, alias[], category, role, benefit, selection, storage, season, color, visual, nutrition, edible, pricePerKg, updated, nutritionStatus, priceStatus`；部分有 `allergies[] / spicy / weightBasis / soakNote`。
- `recipes`：`id, name, type, minutes, servings, ingredients:[{id,g}], tags[], benefit, pairing, steps[], storage, color, visual, nutritionNote, allergies[]`，类型为 `main / veg / soup / staple`。`allergies` 从配方食材自动去重汇总，不等于包装标签上全部过敏风险。
- `recommendedMeals`：`[{main:recipeId, veg:recipeId, staple:recipeId, note?}]`，可顺序轮换生成午晚餐。
- `science`：6 条 `id, title, summary, explanation, advice, sourceIds[], color`。
- `sources`：`id, title, url, updated, checked, note`；`sourceIds` 可以直接关联到真实公开权威页面。

图片映射由主界面补充。数据未要求 UI 展示食材克重或食材单价；搭配、食材作用、菜谱与图片是主要阅读内容。
