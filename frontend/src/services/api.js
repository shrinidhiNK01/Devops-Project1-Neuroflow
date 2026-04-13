import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

export const createWorkflow = async (name, description, natural_language, file) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('natural_language', natural_language);
  if (file) {
    formData.append('file', file);
  }

  try {
    const response = await axios.post(`${BASE_URL}/workflows`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating workflow:', error);
    throw error;
  }
};
