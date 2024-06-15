import { Category } from "@/model/category-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";

export async function getCategories() {
  await dbConnect();
  const categories = await Category.find({}).lean();
  return replaceMongoIdInArray(categories);
}

export async function getCategoryDetails(categoryId) {
  await dbConnect();
  try {
    const category = await Category.findById(categoryId).lean();
    return replaceMongoIdInObject(category);
  } catch (error) {
    throw new Error(error);
  }
}

