import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Dan",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "14K Rose Gold Ring",
      slug: "14k-rose-gold-ring-with-agate-and-zirconium",
      displayCategory: "Rings",
      category: "rings",
      image: "/rose-gold-ring-1.jpg",
      price: 345,
      countInStock: 12,
      brand: "Tiffany",
      rating: 4,
      numReviews: 10,
      description:
        "14K rose gold ring, for women. A beautiful piece, made by Tiffany for an utmost elegant lady.",
    },
    {
      name: "Rolex DATEJUST",
      slug: "rolex-datejust",
      displayCategory: "Watches",
      category: "watches",
      image: "/rolex-datejust-4.webp",
      price: 7500,
      countInStock: 0,
      brand: "Rolex",
      rating: 4.9,
      numReviews: 4,
      description: "High quality watch, made by Rolex, for elegant men.",
    },
    {
      name: "Rose Gold Necklace",
      slug: "rose-gold-necklace-with-ceramics-and-diamonds",
      displayCategory: "Necklaces",
      category: "necklaces",
      image: "/rose-gold-necklace-1.jpg",
      price: 510,
      countInStock: 9,
      brand: "Cartier",
      rating: 3.5,
      numReviews: 4,
      description:
        "Masterfully made necklace, built for elegance and select luxury.",
    },
    {
      name: "White Gold Earrings",
      slug: "white-gold-earrings-with-topaz-and-zirconium",
      displayCategory: "Earrings",
      category: "earrings",
      image: "/white-gold-earrings-1.jpg",
      price: 830,
      countInStock: 8,
      brand: "Piaget",
      rating: 2,
      numReviews: 7,
      description: "An interesting piece from Piaget to enjoy every day.",
    },
  ],
};

export default data;
