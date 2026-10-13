# 食间：内容来源与数据边界

初版核对日期：2026-10-11；食材与菜谱扩展核对日期：2026-10-13。适用范围：面向健康成年人的家常午餐、晚餐和水果规划。

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

以上来源支持科普原则，不是原始 43 个食材营养数字、菜谱营养或价格的出处。新增原料的公开营养参考另列于下文；文章采用食间自己的短文表述，不复制权威材料全文。

## 数字的性质

`dist/data.js` 中的营养、可食部和参考价格仍按**参考估算**展示。原始 43 个食材保留演示估算性质；新增 27 个食材中，部分通用原料已读取 USDA 官方 API 或香港食安中心公开报告，再作显示取整，但地区、成熟度、品种与部位仍不完全相同。没有导入或声称获得《中国食物成分表》的使用授权，也不把待校对的手工值标注为官方实测。不可将参考结果展示为精准营养结论或市场实时价格。

若将来需要可追溯营养结果，应使用合法授权数据库或核对具体 USDA FoodData Central 记录，并逐项保存食物代码、品种、原料状态、单位、提取时间和授权条件。不能仅为一组数字附上一个数据库首页链接。

当前价格为静态设计估算，单位为人民币元/千克，仅为预算功能提供演示基础；没有采集四川市场、商超或平台的实时行情。未来如采用价格采集，应保存实际城市、销售规格、采集日期和是否为可食部价格。

## 计算合同

- `ingredients[].nutrition`：每 100g **可食部原料**估算。米、燕麦、黑米为干原料；黑木耳为干品；其余按所注明的生鲜或成品状态。熟花生是无盐熟原味花生仁。`weightBasis` 区分 `raw-edible / dry / cooked-ready-to-eat`，不能把不同状态等重替换。
- `recipes[].ingredients[].g`：**双人份可食部原料重量**；鲜原料按生重，谷物和干木耳按干重，熟花生按成品重。不含水，不是整道菜烹调完成后的重量。
- 菜谱总营养：`sum(食材每 100g 营养 × g / 100)`。每人参考值可以将双人合计除以 2；实际分餐不同不能假定一模一样。
- 能量、蛋白质、脂肪、碳水化合物和纤维分别按来源字段汇总。不要用 `蛋白质×4+碳水×4+脂肪×9` 强制替换原有能量字段，因为数据库系数、纤维处理与显示取整可能不同。
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

图片映射由主界面补充。本轮界面可显示配方的双人原料克重与按两人均分的单人营养估算；克重不是成品重量，单人值不是全天目标。食材单价与静态参考价格仍不代表购物报价。

## 2026-10-13 扩展：70 个食材、18 种水果、49 道菜

新增 11 种水果、16 个具名食材、6 道蛋白质主菜与 6 道蔬菜。原 37 道菜 ID 和顺序不变，12 道新菜统一追加；旧 `shijian:v1` 菜单继续通过原 ID 关联。新增 6 组推荐组合覆盖新菜，藕片主菜不再搭土豆焖饭，避免同餐重复叠加薯类。

### 新增原料的核对状态

官方 API 通过系统 `curl` 按正常证书校验读取，核对了食品名称、FDC ID、原料状态与每 100g 核心营养；未使用第三方转录网站充当官方数据。后续接口返回 HTTP 429，本轮停止继续请求，未把失败查询称为核对成功。公开 API 的 `DEMO_KEY` 是官方示例入口，不是用户凭据。

“同类已读取”表示存在可追溯的通用原料记录，**并非**当前川渝具体品种、指定肉部位或批次的精确化验。应用使用一位小数等显示取整，`nutritionStatus` 仍为 `estimate`。

| 新增条目 | 公开参考或待校对状态 | 对应差异 |
| --- | --- | --- |
| 红颜草莓、水蜜桃、普通红瓤西瓜、白肉蜜柚、白心火龙果、丝瓜 | [香港食安中心果蔬营养报告](https://www.cfs.gov.hk/sc_chi/programme/programme_rafs/programme_rafs_n_01_04_01_fruit_veg_report.html) | 使用一般原料量级；不是指定品种实测，报告中的微量脂肪按演示近似处理。 |
| 油桃 | [FDC 169914](https://fdc.nal.usda.gov/food-details/169914/nutrients) | 一般鲜油桃；地区和成熟度有差异。 |
| 青脆李 | [FDC 169949](https://fdc.nal.usda.gov/food-details/169949/nutrients) | 一般鲜李，不能认作青脆李品种实测。 |
| 大五星枇杷 | [FDC 169908](https://fdc.nal.usda.gov/food-details/169908/nutrients) | 一般鲜枇杷，不能认作大五星品种实测。 |
| 黄杏 | [FDC 171697](https://fdc.nal.usda.gov/food-details/171697/nutrients) | 一般鲜杏，非杏干或糖渍杏。 |
| 西州蜜瓜 | [FDC 169092](https://fdc.nal.usda.gov/food-details/169092/nutrients) | 一般橙肉 cantaloupe，非西州蜜瓜实测。 |
| 脆柿 | [FDC 169941](https://fdc.nal.usda.gov/food-details/169941/nutrients) | 一般鲜亚洲柿，非具体脆柿品种实测。 |
| 上海青 | [FDC 170390](https://fdc.nal.usda.gov/food-details/170390/nutrients) | 一般 pak-choi；与本库青梗小白菜保持独立条目。 |
| 白萝卜 | [FDC 168451](https://fdc.nal.usda.gov/food-details/168451/nutrients) | 一般东方萝卜原料，非干萝卜。 |
| 白花藕 | [FDC 169250](https://fdc.nal.usda.gov/food-details/169250/nutrients) | 一般生莲藕，非白花藕品种实测；也不套用熟藕数值。 |
| 四季豆 | [FDC 169961](https://fdc.nal.usda.gov/food-details/169961/nutrients) | 营养基准是鲜原料重量，食用仍必须彻底煮熟。 |
| 去皮鸭胸肉 | [FDC 172410](https://fdc.nal.usda.gov/food-details/172410/nutrients) | 一般去皮生鸭肉；部位不等于鸭胸，因此仍为同类估算。 |
| 大白菜、豌豆尖、荷兰豆、西葫芦、芹菜、仔姜、金针菇、杏鲍菇、去刺鲢鱼净肉、鲜河虾仁 | **演示估算，尚待逐项核对** | 不把豌豆粒代替嫩梢、老姜代替仔姜、平菇代替杏鲍菇、鲤鱼代替鲢鱼、海虾代替河虾；失败请求不列为已读取来源。 |

新增条目的 `nutritionReference` 保存 `sourceId / foodCode / description / kind`。`kind=similar-food-estimate` 有上述公开同类参考；`kind=uncalibrated-estimate` 尚未逐项核对，`sourceId` 和 `foodCode` 保留空值。新原料的可食部比例与价格均继续是产品设计估算，**不来自上述营养来源**。

### 净料、购买重量和分量

去皮鸭胸、去刺鲢鱼净肉与去壳鲜河虾仁以购买时的净料为基准，`edible=1`；不能在这些原料上再扣整鸭的皮骨、整鱼的骨皮或整虾的壳。其他水果去核、去皮与蔬菜去老根的 `edible` 是理论估算，实际家庭损耗仍有差异。

新主菜的禽肉/肉/虾主体通常为双人 220–260g，丝瓜炒蛋使用双人 200g 可食部鸡蛋；新蔬菜菜谱中的蔬菜主体合计约 260–370g，另有少量调味原料。配方按菜式结构设置，没有因为显示克重而盲目增加。豆腐煲同时含虾仁与豆腐，不能把双蛋白误当成单一虾仁份额；藕含一定淀粉，搭配时一并考虑主食。

### 新增食品安全依据

- [香港食安中心：豆类与植物血球凝集素](https://www.cfs.gov.hk/tc_chi/multimedia/multimedia_pub/multimedia_pub_fsb_202402.html)：四季豆等豆类必须正确处理和彻底煮熟。新“蒜香四季豆”明确持续水煮后再炒，不只焯数秒，不低温慢煮，不以鲜绿颜色或固定炒制分钟数判断安全；干豆的浸泡示例不机械套作鲜豆荚的统一食谱。
- [香港食安中心：烹煮及翻热](https://www.cfs.gov.hk/sc_chi/trade_zone/safe_kitchen/Cooking_and_reheating.html)：生肉、禽、虾与蛋充分加热。建议使用温度计核对中心至少 75°C 并维持 30 秒，不将变色当作所有食材通用的熟度证明。豆类天然毒素仍按其专门彻底熟制要求处理。

新增菜谱的 `safetySourceIds` 可关联这些公开说明。鸡鸭不画也不保留粉红夹生中心，炒蛋完全凝固，虾仁彻底熟制；图像不能替代实际熟度确认。
