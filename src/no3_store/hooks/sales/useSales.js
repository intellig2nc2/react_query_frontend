import { useQuery } from "@tanstack/react-query"

import { useAllGetUser } from "../useUser"
import { useAllGetProduct } from "./useProduct"
import { salesAllGetApi } from "../../apis/sales/sales.api"

export const useAllGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: salesAllGetApi
  })
}

export const useGetSales = () => {
  const { data: userData } = useAllGetUser()
  const { data: productData } = useAllGetProduct()
  const { data: salesData } = useAllGetSales()

  const userList = Array.isArray(userData) ? userData : []
  const productList = Array.isArray(productData) ? productData : []
  const salesList = Array.isArray(salesData) ? salesData : []

  const userObj = {}

  userList?.forEach(item => {
    userObj[item.id] = item
  })

  const productObj = {}

  productList?.forEach(item => {
    productObj[item.id] = item
  })

  const rowData = salesList.map(item => ({
    ...item,
    user_name: userObj[String(item.user_id)]?.name || "알수없음",
    product_name: productObj[String(item.product_id)]?.product_name || "알수없음"
  }))

  return rowData
}