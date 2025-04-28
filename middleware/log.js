import morgan from "morgan";
import chalk from "chalk";
const loggerBasic = morgan("dev");
const loggerCustom = morgan((tokens, req, res) => {
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const params = JSON.stringify(req.params);
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const responseTime = tokens["response-time"](req, res);
    const date = new Date().toISOString();
    let log = ""
    log += `${chalk.blue(method)} ${url} ${status} \n`
    log += `${responseTime}ms ${date} \n`
    log += `IP: ${ip} \n`
    log += `User-Agent: ${userAgent} \n`
    log += `Params: ${params} \n`
    log += `Body: ${body} \n`
    log += `Query: ${query} \n`
    return log;

})

export { loggerBasic, loggerCustom };
