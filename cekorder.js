const puppeteer = require('puppeteer');
const chalk = require('chalk');
const moment = require('moment');
const delay = require('delay');
const readline = require("readline-sync");
const fs = require('fs-extra');
var random = require('random-name')
var randomize = require('randomatic');
var Fakerator = require("fakerator");
const randomstring = require("randomstring");


(async () => {


    //INPUT TOKEN
    var linklogin = readline.question(chalk.yellow('[?] List account (ex: link): '))

    console.log('\n');
    const read = fs.readFileSync(linklogin, 'UTF-8');
    const list = read.split(/\r?\n/);
    for (var i = 0; i < list.length; i++) {
    var token = list[i];

    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Account => ${i}`))       
    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Token => ${token}`))

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        ignoreHTTPSErrors: true
    })

    const optionlink = {
        waitUntil : 'networkidle2',
        setTimeout : 90000,
    };
    const optionbtn = {
        visible:true,
        timeout:60000
    };
    
    const page = await browser.newPage();

    console.log(chalk.yellow(`[${(moment().format('HH:mm:ss'))}] Wait for login`))

    await page.goto(`${token}`,optionlink);
    console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Login success`))


        await page.goto("https://www.aliexpress.com/item/1005003426591180.html",optionlink)
        const productname1 = await page.$eval('#store-info-wrap > div.store-container > h3 > a',(el) => el.innerText);
        
        

    //CEK ORDER STATUS
    await page.goto("https://trade.aliexpress.com/orderList.htm",{waitUntil : 'load'})

    try{
    var prodname1 = await page.$eval('#buyer-ordertable > tbody:nth-child(3) > tr.order-head > td.store-info > p.first-row > span.info-body',(el) => el.innerText)
    var prodname2 = await page.$eval('#buyer-ordertable > tbody.order-item-wraper.last-tbody > tr.order-head > td.store-info > p.first-row > span.info-body',(el) => el.innerText)
    
}catch(err){
        console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] ORDER NOT FOUND`))
        // seve file
        await fs.appendFile('belomorder.txt', `${token}`+'\r\n', err => {
            if (err) throw err;
            })
            await browser.close()
        
            var files = fs.readFileSync(linklogin, 'utf-8');
            var lines = files.split('\n')
            lines.splice(0,1)
            await fs.writeFileSync(linklogin, lines.join('\n'))
            continue;
    }

    if(prodname1 == productname1){
        const orderid1= await page.$eval('#buyer-ordertable > tbody:nth-child(3) > tr.order-head > td.order-info > p.first-row > span.info-body',(el) => el.innerText);
        const orderstatus1= await page.$eval('#buyer-ordertable > tbody:nth-child(3) > tr.order-body > td.order-status > span',(el) => el.innerText);
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Order ID : ${orderid1}`))
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Order ID : ${orderstatus1}`))
    
        if(orderstatus1 == "Awaiting delivery")
        {
            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] SUCCESS MAKE A ORDER`))

            // seve file
            await fs.appendFile('sukses.txt', `${token};'${orderid1};${orderstatus1}`+'\r\n', err => {
            if (err) throw err;
            })
            await browser.close()
        
            var files = fs.readFileSync(linklogin, 'utf-8');
            var lines = files.split('\n')
            lines.splice(0,1)
            await fs.writeFileSync(linklogin, lines.join('\n'))

           

        }else if(orderstatus1 == "Awaiting Shipment")
        {
            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] SUCCESS MAKE A ORDER`))

            // seve file
            await fs.appendFile('sukses.txt', `${token};'${orderid1};${orderstatus1}`+'\r\n', err => {
            if (err) throw err;
            })
            await browser.close()
        
            var files = fs.readFileSync(linklogin, 'utf-8');
            var lines = files.split('\n')
            lines.splice(0,1)
            await fs.writeFileSync(linklogin, lines.join('\n'))

           



        }else if(orderstatus1 == "Finished")
        {
            console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] FAILED MAKE A ORDER`))
            
            // seve file
            await fs.appendFile('closed.txt', `${token};CLOSED`+'\r\n', err => {
                if (err) throw err;
                })
                await browser.close()
            
                var files = fs.readFileSync(linklogin, 'utf-8');
                var lines = files.split('\n')
                lines.splice(0,1)
                await fs.writeFileSync(linklogin, lines.join('\n'))
            
        }else if(orderstatus1 == "Awaiting Payment")
        {
            console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] Pease Make a payment`))
            
            // seve file
            await fs.appendFile('belombayar.txt', `${token}`+'\r\n', err => {
                if (err) throw err;
                })
                await browser.close()
            
                var files = fs.readFileSync(linklogin, 'utf-8');
                var lines = files.split('\n')
                lines.splice(0,1)
                await fs.writeFileSync(linklogin, lines.join('\n'))
        }

    }else if(prodname2 == productname1){
        const orderid2= await page.$eval('#buyer-ordertable > tbody.order-item-wraper.last-tbody > tr.order-head > td.order-info > p.first-row > span.info-body',(el) => el.innerText);
        const orderstatus2= await page.$eval('#buyer-ordertable > tbody.order-item-wraper.last-tbody > tr.order-body > td.order-status > span',(el) => el.innerText);
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Order ID : ${orderid2}`))
        console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] Order Status : ${orderstatus2}`))

        if(orderstatus2 == "Awaiting delivery")
        {
            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] SUCCESS MAKE A ORDER`))
            
            // seve file
            await fs.appendFile('sukses.txt', `${token};'${orderid2};${orderstatus2}`+'\r\n', err => {
                if (err) throw err;
                })
                await browser.close()
            
                var files = fs.readFileSync(linklogin, 'utf-8');
                var lines = files.split('\n')
                lines.splice(0,1)
                await fs.writeFileSync(linklogin, lines.join('\n'))

               

                
        
        }else if(orderstatus2 == "Awaiting Shipment")
        {
            console.log(chalk.green(`[${(moment().format('HH:mm:ss'))}] SUCCESS MAKE A ORDER`))
            // seve file
            await fs.appendFile('sukses.txt', `${token};'${orderid2};${orderstatus2}`+'\r\n', err => {
                if (err) throw err;
                })
                await browser.close()
            
                var files = fs.readFileSync(linklogin, 'utf-8');
                var lines = files.split('\n')
                lines.splice(0,1)
                await fs.writeFileSync(linklogin, lines.join('\n'))

               

                
        
        }else if(orderstatus2 == "Finished")
        {
            console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] FAILED MAKE A ORDER`))
            // seve file
            await fs.appendFile('closed.txt', `${token};CLOSED`+'\r\n', err => {
                if (err) throw err;
                })
                await browser.close()
            
                var files = fs.readFileSync(linklogin, 'utf-8');
                var lines = files.split('\n')
                lines.splice(0,1)
                await fs.writeFileSync(linklogin, lines.join('\n'))

               

                
        }else if(orderstatus2 == "Awaiting Payment")
        {
            console.log(chalk.red(`[${(moment().format('HH:mm:ss'))}] Please make a payment`))
            
            // seve file
            await fs.appendFile('belombayar.txt', `${token}`+'\r\n', err => {
                if (err) throw err;
                })
                await browser.close()
            
                var files = fs.readFileSync(linklogin, 'utf-8');
                var lines = files.split('\n')
                lines.splice(0,1)
                await fs.writeFileSync(linklogin, lines.join('\n'))  
            }
    
         
    }
}
})();