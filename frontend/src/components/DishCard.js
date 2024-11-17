// src/components/DishCard.js
import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";  // Import Link to route to the dish detail page

const DishCard = ({ dish }) => {
  return (
    <Card sx={{ maxWidth: 345, height: 380, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Link to={`/dish/${dish._id}`} style={{ textDecoration: 'none' }}> {/* Route to DishDetail page */}
        <CardMedia
          component="img"
          height="200"
          image="https://via.placeholder.com/300"
          alt={dish.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap>
            {dish.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {dish.description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default DishCard;
