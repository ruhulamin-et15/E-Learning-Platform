import { replaceMongoIdInObject } from "@/lib/convertData";
import { Module } from "@/model/module.model";

export async function create(moduleData) {
  try {
    const modules = await Module.create(moduleData);
    return JSON.parse(JSON.stringify(modules));
  } catch (error) {
    throw new Error(error);
  }
}

export async function getModule(moduleId) {
  try {
    const singleModule = await Module.findById(moduleId).lean();
    return replaceMongoIdInObject(singleModule);
  } catch (error) {
    throw new Error(error);
  }
}
