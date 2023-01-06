/// <reference types="cypress" />
 
 

describe("Find best deals", () => {
    it("buy and sell difference", () => {
       // cy.once('uncaught:exception', () => false);
       Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      //set up data
      const buyResult = []
      const sellResult = []
      const currentMonth = 12;
     // let stocks = ["VGI"]
      function hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
     }
      let stocks = ['ADS', 'AMV', 'ASP', 'BSI', 'CEO', 'CKG', 'CTR', 'DIG', 'DPM', 'FCN', 'GAS', 'HAX', 'HHV', 'HPG', 'HTN', 'IPA', 'KDH', 
      'LTG', 'MSH', 'NKG', 'NLG', 'PDB', 'PGV', 'PHR', 'PLC', 'PLX', 'PTB', 'RAL', 'SHB', 'SKG', 'SSI', 'TTF', 'TV2', 'VCG', 'VCI', 'VGI', 'VND', 'VPB']
     //console.log("duplicated: ",hasDuplicates(stocks2))
    // console.log(stocks2.sort())
      const now = new Date().getTime();

      stocks.forEach(stock => {
        const url =  "https://s.cafef.vn/Lich-su-giao-dich-" + stock + "-4.chn#data"
        const goodHint = []
        function daysDiff(millisecondsDiff) {return Math.round(
          millisecondsDiff / (86400000)
        )}
          //console.log(24 * 60 * 60 * 1000);              // = 5184000
  
          cy.visit(url)
  
         // cy.get('tbody tr').eq(6)
  
          cy.get('tbody tr').each(($tr, index) => {
            let rowElement = $tr.get(0);
            let cells = rowElement.cells;
            
             if(index > 5 && index < 9 && cells.length == 16) {
              //console.log("count", cells.length);
              let date = cells[12].innerText.split("/");
              let daysGap;
              console.log(date)

                if(date) {
                  let day = date[2]?date[2].trim():"";
                  date = day + "/" + date[1] + "/" + date[0];
                 console.log(date)
      
                  let buyAmount = parseInt(cells[10].innerText.replaceAll(",",""))
                  let sellAmount = parseInt(cells[11].innerText.replaceAll(",",""))
                  console.log(new Date().getTime());
                  
                  
                  console.log("now", now);
                  let millisecondsDiff = now - new Date(date).getTime();
                  daysGap = daysDiff(millisecondsDiff);
                  // console.log("mil diff", millisecondsDiff)
                  // console.log("days diff", daysDiff)
      
                  if (daysGap < 60){
                    if(buyAmount > 0 ){
                      buyResult.push({
                        stock: stock,
                        date: new Date(date),
                        buyAmount : buyAmount
                      });
                    }
                    if(sellAmount > 0 ){
                      sellResult.push({
                        stock: stock,
                        date: new Date(date),
                        sellAmount : sellAmount
                      });
                    }
                  } 
                }
            
             }})
            // }).then(()=>{
            // console.log(result)
            // })
  
           // .then()
          
        
        })
        cy.log("buy result", buyResult);
        cy.log("sell result", sellResult);

        cy.writeFile('./cypress/e2e/stocks/buy.json', buyResult)
        cy.writeFile('./cypress/e2e/stocks/sell.json', sellResult)
 
      });
      
    });
        //Math.max(...array.map(o => o.y))


        // cy.get('tbody tr').eq(6).children('td').eq(4).invoke(text).then(text1 => {
        //   console.log(text1)
        // })
        //cy.xpath('//tbody/tr[4]').children('td').eq(4).contains("4400")
     

    