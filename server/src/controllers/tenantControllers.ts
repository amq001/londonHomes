import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;

    if (typeof cognitoId !== "string") {
      res.status(400).json({ message: "Invalid cognitoId" });
      return;
    }

    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: {
        favorites: true,
      },
    });

    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error finding tenant: ${error.message}` });
  }
};

export const createTenant = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const tenant = await prisma.tenant.create({
      data: { cognitoId, name, email, phoneNumber },
    });

    res.status(201).json(tenant);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating tenant: ${error.message}` });
  }
};

export const updateTenant = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    if (typeof cognitoId !== "string") {
      res.status(400).json({ message: "Invalid cognitoId" });
      return;
    }
    const { name, email, phoneNumber } = req.body;
    const updateTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: { name, email, phoneNumber },
    });

    res.json(updateTenant);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating tenant: ${error.message}` });
  }
};
