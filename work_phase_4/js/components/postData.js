const postFormData = async (formEl, endpointUrl, customHeaders = {}) => {
  const formData = new FormData(formEl);

  // Append custom fields (like student_number, etc.)
  for (const key in customHeaders) {
    formData.append(key, customHeaders[key]);
  }

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    return {
      success: response.ok && data.status === 'success',
      data,
    };
  } catch (error) {
    return {
      success: false,
      data: { message: 'Network or server error.', error },
    };
  }
};

export { postFormData };