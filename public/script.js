const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const description = document.getElementById('itemDescription').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const imageFile = document.getElementById('itemImage').files[0];

  const formData = new FormData();
  formData.append('description', description);
  formData.append('location', location);
  formData.append('price', price);
  formData.append('image', imageFile);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const result = await response.json();
    messageDiv.innerText = result.message || 'Upload successful!';
  } catch (error) {
    console.error('Error:', error);
    messageDiv.innerText = 'An error occurred: ' + error.message;
  }
});