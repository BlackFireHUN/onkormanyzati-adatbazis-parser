require("./list")();
const superagent = require("superagent");
const chalk = require('chalk');
const log = console.log;
    var id = 0;
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
      }
    const varj = (ms) => new Promise(r => setTimeout(r, ms));
    asyncForEach(links, async (element) => {
        id = id+1;
        await varj(50);
        function fetch(id, link){
            superagent.get(link).end((err, response) => {
                try {
                // ----------------------------- ----- -----------------------------
                // ----------------------------- MEGYE -----------------------------
                // ----------------------------- ----- -----------------------------
                var megye = response.text.substring(response.text.indexOf('<option value="">Válasszon megyét!</option>'),response.text.lastIndexOf('</option></select></div></div></form><form role="form" name="jaras"'));
                megye = megye.substring(megye.indexOf('selected >'));
                megye = megye.replace('selected >','');
                var megye_selected_hossz = megye.search("</option>");
                if (megye_selected_hossz != '-1') {
                megye = megye.slice(0,megye_selected_hossz);
                }
                //console.log(megye); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                // ----------------------------- ----- -----------------------------
                // ----------------------------- JÁRÁS -----------------------------
                // ----------------------------- ----- -----------------------------
                var jaras = response.text.substring(response.text.indexOf('<option value="">Válasszon járást!</option>'),response.text.lastIndexOf('</option></select></div></div></form><form role="form" name="telepules"'));
                jaras = jaras.substring(jaras.indexOf('selected >'));
                jaras = jaras.replace('selected >','');
                var jaras_selected_hossz = jaras.search("</option>");
                if (jaras_selected_hossz != '-1') {
                    jaras = jaras.slice(0,jaras_selected_hossz);
                }
                //console.log(jaras); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                // ----------------------------- --------- -----------------------------
                // ----------------------------- TELEPÜLÉS -----------------------------
                // ----------------------------- --------- -----------------------------
                var data = response.text.substring(response.text.indexOf('<div class="col-md-8"><div class="row"><div class="col-md-12"><h2>'),response.text.lastIndexOf('</h2></div><div class="col-md-6"><p>'));
                var varos = data.replace('<div class="col-md-8"><div class="row"><div class="col-md-12"><h2>','');

                //console.log(varos); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                // ----------------------------- ------------ -----------------------------
                // ----------------------------- POLGÁRMESTER -----------------------------
                // ----------------------------- ------------ -----------------------------
                data = response.text.substring(response.text.indexOf('polgármestere: </span><br />'),response.text.lastIndexOf('</a></p></div><div class="col-md-6"><p>'));
                data = data.replace('polgármestere: </span><br />','');
                var polgimail_data = data.substring(data.indexOf('">'));
                var polgimail = polgimail_data.replace('">','');
                var polgi = data.substring(0, data.lastIndexOf('<br />'));

                //console.log (polgi); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------
                //console.log (polgimail); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                // ----------------------------- ------------ -----------------------------
                // ----------------------------- ÖNKORMÁNYZAT -----------------------------
                // ----------------------------- ------------ -----------------------------
                data = response.text.substring(response.text.indexOf('<span class="stronger">Önkormányzat: </span><br />'),response.text.lastIndexOf('</p></div><div class="col-md-12"><hr />'));
                data = data.replace('<span class="stronger">Önkormányzat: </span><br />Cím: ','');

                // - --- -
                // - CÍM -
                // - --- -
                var cim = data.substring(0, data.indexOf('<br />Telefon:'));
                //console.log(cim); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                // - ------- -
                // - TELEFON -
                // - ------- -
                var telefon = data.substring(data.indexOf('<br />Telefon:'));
                telefon = telefon.replace('<br />Telefon: ','');
                var van_fax = telefon.search("Fax:");
                if (van_fax == '-1'){
                    telefon = telefon.substring(0, telefon.lastIndexOf('<br />E-mail: '));
                } else {
                    telefon = telefon.substring(0, telefon.lastIndexOf('<br />Fax: '));
                }
                //console.log(telefon); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------
                
                // - -------------------------------- -
                // - DATA VÁLTOZÓ TARTALOM RÖVIDITÉSE -
                // - -------------------------------- -
                if (van_fax == '-1'){
                    data = data.split("<br />E-mail: ").pop();
                } else {
                    data = data.split("<br />Fax: ").pop();
                }

                // - --- -
                // - FAX -
                // - --- -
                var fax
                if (van_fax != '-1'){
                    fax = data.substring(0, data.lastIndexOf('<br />E-mail: '));
                } else {
                    fax = "nincs fax";
                }
                //console.log(fax); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                // - ------ -
                // - E-MAIL -
                // - ------ -
                var email = data.substring(data.indexOf('">'));
                email = email.replace('">','');
                email = email.substring(0, email.lastIndexOf('</a><br />'));
                //console.log(email); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                // - -------- -
                // - LAKOSSÁG -
                // - -------- -
                var lakossag = data.substring(data.indexOf('Lakosság: '));
                lakossag = lakossag.replace('Lakosság: ','');
                //console.log(lakossag); // ADATBÁZISBA ÍRHATÓ ----------------------------------------------------------

                require("./db.js").DatabaseQuery(megye, jaras, varos, polgi, polgimail, cim, telefon, fax, email, lakossag);
                log(chalk.bgWhite.blue.bold(chalk.magenta(id +  ": ") + varos + ": "  + chalk.green('KÉSZ!')));
              } catch(e) {
                console.log('\n\n' + e + '\n')
                console.log('\n' + response + '\n\n')
              }});
        }
            await fetch(id, element);
        
    });