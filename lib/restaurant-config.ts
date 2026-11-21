/**
 * Restaurant details are kept here so the whole website can be updated from one place.
 */
export const restaurantConfig = {
  restaurantName: "BANGUS VALLEY RESTAURANT",
  displayHeading: "WELCOME TO BANGUS VALLEY RESTAURANT",
  address: "CHOWKIBAL ROAD KRALPORA",
  phone: "+916005368113",
  whatsappNumber: "916005368113",
  openingHours: "Open daily · 09:00 AM – 09:00 PM"
} as const;

export const whatsappUrl = (
  message = "Hello! I would like to know more about your menu."
) => {
  const number = restaurantConfig.whatsappNumber.replace(/\D/g, "");
  const text = encodeURIComponent(message);

  return `https://wa.me/${number}?text=${text}`;
};