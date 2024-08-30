export const fetchData = async (token: string) => {
  try {
    const response = await fetch('https://hiring.reachinbox.xyz/api/v1/mails', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};