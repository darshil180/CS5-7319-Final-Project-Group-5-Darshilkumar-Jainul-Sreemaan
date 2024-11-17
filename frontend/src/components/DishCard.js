import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const DishCard = ({ dish }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={dish.imageUrl} // Ensure the URL is valid or use a placeholder
        alt={dish.name}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {dish.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dish.description}
        </Typography>
        <Typography variant="body2" color="text.primary">
          ${dish.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DishCard;
