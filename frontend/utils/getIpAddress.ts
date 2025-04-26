import axios from "axios";

const getIpAddress = async (): Promise<string> => {
  try {
    // Using a public IP API service
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return "unknown";
  }
};

export default getIpAddress;
