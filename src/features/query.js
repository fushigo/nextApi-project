import { API } from "@/common/api";
import { exportPathMap } from "../../next.config";

export async function getProduct(skip) {
  const data = await API.get(`/get-products?skip=${skip}`);
  return data;
}

export async function addProduct(params){
  const data = await API.post(`/add-product`, params);
}