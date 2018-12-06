import {Connection, ConnectionConfig,Request} from "tedious";
import {Request as ExpressRequest} from "express";
import {proc_param} from '../../shared/models'
export async function connect(): Promise<Connection> {


    var config: ConnectionConfig = {
        userName: 'lior',
        password: 'lM8%px35',
        server: '184.168.194.78',

        options: {
            rowCollectionOnDone: true,
            rowCollectionOnRequestCompletion: true,
            useColumnNames: true,
            encrypt: true
        }
    };

    var connection = new Connection(config);
    const con = await connectAsync(connection);

    return con;

}

export async function callProc<T>(req: ExpressRequest, con: Connection, proc: string, ...params: proc_param[]): Promise<T[]> {

    return new Promise<T[]>((res, rej) => {
            var request = new Request(proc, function (err, rowCount, rows) {
            });
            for (let param of params)
                request.addParameter(param.name, param.type, param.value)
            request.on('doneInProc', (error: Error, more: boolean, rows: any[]) => {
                for (let row of rows)
                    for (let key in row)
                        row[key] = row[key].value
                res(rows);
            });
            con.callProcedure(request);
        }
    )
}

async function connectAsync(connection): Promise<Connection> {
    return new Promise<Connection>((res, rej) => {
        connection.on('connect', function (err) {
                if (err) rej(err)
                res(connection)
            }
        );
    })
}
