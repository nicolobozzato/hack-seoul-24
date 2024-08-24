import { defineEventHandler } from "h3";
import { DatabaseProductGeoLocationRepository } from "@/repository/DatabaseProductGeoLocationRepository";

export default defineEventHandler(async (event) => {
  try {
    const data =
      await DatabaseProductGeoLocationRepository.Instance.getInventoryShortageSituation();
    return data;
  } catch (error) {
    return {
      statusCode: 500,
      statusMessage: "Internal Server Error" + error,
    };
  }
});
