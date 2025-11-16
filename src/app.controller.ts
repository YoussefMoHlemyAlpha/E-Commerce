import { Controller, Get, Req, Res,Param } from "@nestjs/common";
import { AppService } from "./app.service";
import type{ Request, Response } from "express";
import { PassThrough } from "stream";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  


}
