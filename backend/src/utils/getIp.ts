import {Request} from "express";
import assert from "node:assert";

export function getIp(req: Request): string | undefined {
    if (req.ip)
        return req.ip;

    let ip = req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.socket.remoteAddress;

    return Array.isArray(ip) ? ip[0] : ip;
}
