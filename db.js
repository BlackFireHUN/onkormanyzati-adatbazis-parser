const DataBaseQuery = (a, b, c, d, e, f, g, h, i, j) => {

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'onkormanyzat'
    });

    connection.connect();
    connection.query(`INSERT INTO onkormanyzat (megye, jaras, telepules, polgarmester, polgarmester_email, cim, telefon, fax, email, lakossag) VALUES ('${a}', '${b}', '${c}', '${d}', '${e}', '${f}', '${g}', '${h}', '${i}', '${j}')`, function (error) {
        if (error) throw error;
    });
    connection.end();
};

exports.DatabaseQuery = DataBaseQuery;