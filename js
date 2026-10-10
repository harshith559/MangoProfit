const summary=()=>({totalInvestment:C.inv(),totalSales:C.rev(),netProfit:C.net(),
 profitPercent:C.pct()==null?null:+C.pct().toFixed(2),mangoesHarvested:C.harv(),
 costPerMango:C.cpm(),incomePerMango:C.rpm()});

const expJ=()=>dl("mango-farm.json",JSON.stringify({...S,summary:summary()},null,2),"application/json");

const expC=()=>{
 const q=v=>`"${String(v??"").replace(/"/g,'""')}"`, row=a=>a.map(q).join(",");
 const s=summary();
 const lines=[
  row(["SUMMARY"]),
  row(["Farm",S.farm?S.farm.name:""]),
  row(["Total Investment",s.totalInvestment]),
  row(["Total Sales",s.totalSales]),
  row(["Net Profit",s.netProfit]),
  row(["Profit %",s.profitPercent==null?"N/A":s.profitPercent+"%"]),
  row(["Mangoes Harvested",s.mangoesHarvested]),
  row(["Cost Per Mango",s.costPerMango==null?"N/A":s.costPerMango.toFixed(2)]),
  row(["Income Per Mango",s.incomePerMango==null?"N/A":s.incomePerMango.toFixed(2)]),
  "",row(["EXPENSES"]),row(["date","category","description","amount","notes"]),
  ...S.exp.map(e=>row([e.date,e.category,e.description,e.amount,e.notes])),
  "",row(["SALES"]),row(["date","variety","type","quantity","price","total","buyer"]),
  ...S.sales.map(x=>row([x.date,x.variety,x.type,x.quantity,x.price,x.total,x.buyer]))
 ];
 dl("mango-farm-report.csv","\ufeff"+lines.join("\n"),"text/csv");
};