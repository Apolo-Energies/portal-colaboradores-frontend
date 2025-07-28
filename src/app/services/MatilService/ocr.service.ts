import axios from "axios";

const MATIL_API_URL = "https://api.matil.ai/v3/structurer/";
const STRUCTURE_ID = "0197a39d-164d-7766-a3d0-4290a0f0741f";
const API_KEY = "src_RranAuJ-HUP72tSsCwiNOChCXfSvOQ9aXHH4tNWtMwk";

export const analizarDocumentoMatil = async (urlDocumento: string) => {
  try {
    const response = await axios.post(
      `${MATIL_API_URL}?structure_id=${STRUCTURE_ID}`,
      {
        documents: [
          {
            type: "pdf",
            url: urlDocumento,
            metadata: { filename: "documento.pdf" },
          },
        ],
      },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al analizar documento:", error);
    throw error;
  }
};
