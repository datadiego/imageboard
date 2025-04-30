import morgan from "morgan";
import chalk from "chalk";
// Middleware de logging
const loggerBasic = morgan("dev");
const loggerCustom = morgan((tokens, req, res) => {
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const body = JSON.stringify(req.body);
    const headers = JSON.stringify(req.headers);
    const params = JSON.stringify(req.params);
    const responseTime = tokens["response-time"](req, res);
    const date = new Date().toISOString();
    let log = "";
    if (method === "GET") log += `${chalk.blue("►")} ${chalk.blue(method)} ${chalk.blue(url)} ${chalk.cyan(ip)} ${chalk.yellow(status)}\n`;
    if (method === "POST") log += `${chalk.red("►")} ${chalk.red(method)} ${chalk.red(url)} ${chalk.cyan(ip)} ${chalk.yellow(status)}\n`;
    if (method === "PUT") log += `${chalk.yellow("►")} ${chalk.yellow(method)} ${chalk.yellow(url)} ${chalk.cyan(ip)} ${chalk.yellow(status)}\n`;
    if (method === "DELETE") log += `${chalk.magenta("►")} ${chalk.magenta(method)} ${chalk.magenta(url)} ${chalk.cyan(ip)} ${chalk.yellow(status)}\n`;
    log += `${chalk.blue("►")} ${chalk.blue(method)} ${chalk.blue(url)} ${chalk.cyan(ip)} ${chalk.yellow(status)}\n`;
    log += `User-Agent: ${userAgent} \n`;
    log += `Body: ${body} \n`;
    // log += `Headers: ${headers} \n`;
    log += `Params: ${params} \n`;
    log += `Time:${responseTime}ms ${date}`;
    return log;
});

export { loggerBasic, loggerCustom }; 