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
      const maxResult = []
      const differences = []
        cy.visit("https://s.cafef.vn/Lich-su-giao-dich-CTI-3.chn#data")

        cy.get('tbody tr').each(($tr, index) => {
           if(index > 3 && index < 25) {
            const rowElement = $tr.get(0);
            const cells = rowElement.cells;
            maxResult.push({
              date: cells[0].innerText,
              buyAmount: parseInt(cells[4].innerText.replaceAll(",",""))
            });
            if(index < 8) {
              let buyValue = parseInt(cells[5].innerText.replaceAll(",",""));
              let saleValue = parseInt(cells[7].innerText.replaceAll(",",""));
            differences.push({
              date: cells[0].innerText,
              buyValue:  buyValue,
              saleValue:  saleValue,
              difference: (buyValue - saleValue) > 0 ? "+" : "-"
            })
            }
           }
        }).then(()=>{
          console.log(differences)
          let maxByIndex;
          
          let MaxValue = Math.max(...maxResult.map((item, index) => {
            return item.buyAmount}))
          maxByIndex = maxResult.map(item => item.buyAmount).indexOf(MaxValue);
          console.log(`max value  ${MaxValue}
            date : ${maxResult[maxByIndex].date} ` )
          })
         // .then()
        })
      });
      

        //Math.max(...array.map(o => o.y))


        // cy.get('tbody tr').eq(6).children('td').eq(4).invoke(text).then(text1 => {
        //   console.log(text1)
        // })
        //cy.xpath('//tbody/tr[4]').children('td').eq(4).contains("4400")
     

    