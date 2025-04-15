import axios from "axios";
import { BASEURL } from "../constant";

export const recordInteraction = async (
  serviceId: String,
  actionType: string
) => {
  if (!serviceId || !actionType) return;

  try {
    const response = await axios.post(
      BASEURL + "/api/v1/recommend/record",
      {
        serviceId: serviceId,
        actionType,
      },
      { withCredentials: true }
    );

    console.log("Interaction recorded:", response.data);
  } catch (error: any) {
    console.error(
      "Error recording interaction:",
      error.response?.data || error.message
    );
  }
};
