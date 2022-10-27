import diskspace from "diskspace";
import bytes from "bytes";
import { Request, Response } from "express";

export const getDataDisk = async (req: Request, res: Response) => {
  try {
    diskspace.check("/", function (err: any, result: any) {
      const data = {
        total: String(bytes(result.total)),
        used: String(bytes(result.used)),
        free: String(bytes(result.free)),
      };
      return res.status(200).send(data);
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
