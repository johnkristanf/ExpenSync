
export const getIcons = async () => {
    const response = await fetch('https://api.iconify.design/collection?prefix=fa&pretty=1');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
};
  