import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardActionArea } from "@mui/material";

// Sample categories
const categories = [
  { id: "1", name: "Pizza", image: "/images/pizza.jpg" },
  { id: "2", name: "Burgers", image: "/images/burgers.jpg" },
  { id: "3", name: "Desserts", image: "/images/desserts.jpg" },
  { id: "4", name: "Drinks", image: "/images/drinks.jpg" },
];

// Slider settings
const sliderSettings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 500,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const CategorySlider = ({ onCategorySelect }) => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>
      <Slider {...sliderSettings}>
        {categories.map((category) => (
          <Card key={category.id} sx={{ mx: 2 }}>
            <CardActionArea onClick={() => onCategorySelect(category.name)}>
              <img
                src={category.image}
                alt={category.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", py: 1 }}
              >
                {category.name}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default CategorySlider;
