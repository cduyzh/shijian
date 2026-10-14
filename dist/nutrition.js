/* 食间的营养与原料计算：所有菜谱采用双人份可食部生重，干木耳按干重。 */
(() => {
 const D=window.SHIJIAN_DATA,I=Object.fromEntries(D.ingredients.map(i=>[i.id,i])),R=Object.fromEntries(D.recipes.map(r=>[r.id,r]));
 const keys=['kcal','protein','fat','carbs','fiber'],zero=()=>Object.fromEntries(keys.map(k=>[k,0]));
 const kinds=mode=>mode==='dinner'?['dinner']:['lunch','dinner'];
 function totals(amounts){const nutrients=zero();for(const [id,g] of Object.entries(amounts)){if(!I[id]||!Number.isFinite(g)||g<0)continue;for(const k of keys)nutrients[k]+=(I[id].nutrition[k]||0)*g/100;}return nutrients;}
 function amountsForRecipe(id,servings=2){const r=R[id],amounts={};if(!r)return amounts;const scale=servings/(r.servings||2);r.ingredients.forEach(x=>{amounts[x.id]=(amounts[x.id]||0)+x.g*scale;});return amounts;}
 function amountsForMeal(meal,servings=2){const amounts={};Object.values(meal||{}).forEach(id=>{for(const [ingredient,g] of Object.entries(amountsForRecipe(id,servings)))amounts[ingredient]=(amounts[ingredient]||0)+g;});return amounts;}
 const add=(to,from)=>{for(const [id,g] of Object.entries(from))to[id]=(to[id]||0)+g;return to;};
 function amountsForDay(day,mode='both',servings=2){const amounts={};for(const k of kinds(mode))add(amounts,amountsForMeal(day[k],servings));if(I[day.fruit])amounts[day.fruit]=(amounts[day.fruit]||0)+(D.meta.fruitEdibleGramsPerPerson||200)*servings;return amounts;}
 function planAmounts(plan){const amounts={};plan.days.forEach(d=>add(amounts,amountsForDay(d,plan.mealMode||'both',2)));return amounts;}
 function estimateCost(plan,pantry={}){return Object.entries(planAmounts(plan)).reduce((sum,[id,g])=>sum+(pantry[id]?0:g/1000/(I[id].edible||1)*(I[id].pricePerKg||0)),0);}
 function rows(amounts,servings=2){return Object.entries(amounts).map(([id,g])=>({id,name:I[id]?.name||id,g,perPersonG:g/servings,basis:I[id]?.weightBasis==='dry'?'干品重量':I[id]?.weightBasis==='cooked-ready-to-eat'?(id==='driedTofu'?'产品状态重量':'直接食用重量'):I[id]?.category==='seasoning'?'调味品加入量':'可食部生重',nutrition:I[id]?.nutrition}));}
 const result=(amounts,servings)=>({servings,amounts,rows:rows(amounts,servings),total:totals(amounts),perPerson:totals(Object.fromEntries(Object.entries(amounts).map(([id,g])=>[id,g/servings])))});
 window.SHIJIAN_NUTRITION={keys,kinds,totals,amountsForRecipe,amountsForMeal,amountsForDay,planAmounts,estimateCost,rows,recipe:(id,servings=2)=>result(amountsForRecipe(id,servings),servings),day:(day,mode='both',servings=2)=>result(amountsForDay(day,mode,servings),servings)};
})();
