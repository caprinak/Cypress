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
      const result = []
      const currentMonth = 12;
      let stocks = ["HPG", "ADS", "NKG", "VCI", "PHR", "FCN","HHV", "TTF","CEO", "DIG","TV2", "ASP","BSI"]
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
             if(index > 5 && index < 9) {
              let rowElement = $tr.get(0);
              let cells = rowElement.cells;
              let date = cells[12].innerText.split("/");
              console.log(date)

                if(date) {
                  let day = date[2]?date[2].trim():"";
                  date = day + "/" + date[1] + "/" + date[0];
                 console.log(date)
      
                  let buyAmount = parseInt(cells[10].innerText.replaceAll(",",""))
                  console.log(new Date().getTime());
      
                  
                  console.log("now", now);
                  let millisecondsDiff = now - new Date(date).getTime();
                  console.log("mil diff", millisecondsDiff)
                  console.log("days diff", daysDiff(millisecondsDiff))
      
                  if (daysDiff(millisecondsDiff) < 100 && buyAmount > 0 )
                    result.push({
                      stock: stock,
                      date: new Date(date),
                      buyAmount : buyAmount
                    });
                }
            
             }})
            // }).then(()=>{
            // console.log(result)
            // })
  
           // .then()
          
        
        })
        cy.log("result", result);
      });
      
    });
        //Math.max(...array.map(o => o.y))


        // cy.get('tbody tr').eq(6).children('td').eq(4).invoke(text).then(text1 => {
        //   console.log(text1)
        // })
        //cy.xpath('//tbody/tr[4]').children('td').eq(4).contains("4400")
     

    