import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  Box,
  CircularProgress,
  Pagination,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import Slider from "react-slick";
import DishCard from "../components/DishCard";

// Sample categories with icons
const categories = [
  { name: "South Indian", icon: "🥘" },
  { name: "Chinese", icon: "🥡" },
  { name: "Mexican", icon: "🌮" },
  { name: "Italian", icon: "🍝" },
];

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
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

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch dishes from API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/menu/dishes", {
          params: { page: currentPage },
        });
        const dishesData = response.data.data.data;
        setDishes(dishesData);
        setFilteredDishes(dishesData);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [currentPage]);

  // Filter dishes by category
  const handleCategoryClick = (category) => {
    setActiveCategory(category.name);
    if (category.name === "All") {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter((dish) =>
        dish.category.toLowerCase().includes(category.name.toLowerCase())
      );
      setFilteredDishes(filtered);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const searchedDishes = dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(term) ||
        dish.description.toLowerCase().includes(term)
    );
    setFilteredDishes(searchedDishes);
  };

  // Reset filter and search
  const handleResetFilter = () => {
    setFilteredDishes(dishes);
    setActiveCategory(null);
    setSearchTerm("");
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Category Slider */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Browse by Categories
        </Typography>
        <Slider {...sliderSettings}>
          {categories.map((category) => (
            <Box
              key={category.name}
              onClick={() => handleCategoryClick(category)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                padding: "20px",
                backgroundColor:
                  activeCategory === category.name ? "#ffe0b2" : "#f5f5f5",
                borderRadius: "10px",
                fontWeight: "bold",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#ffe0b2",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  display: "block",
                  fontSize: "3rem",
                  mb: 1,
                }}
              >
                {category.icon}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "1rem",
                  textTransform: "capitalize",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search Dishes"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2 }}
        />
        {activeCategory || searchTerm ? (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleResetFilter}
            sx={{ height: "56px" }}
          >
            Reset Filter
          </Button>
        ) : null}
      </Box>

      {/* Dishes Grid */}
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {Array.isArray(filteredDishes) && filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={dish._id}>
                  <DishCard dish={dish} />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ mt: 4 }}>
                No dishes found
              </Typography>
            )}
          </Grid>

          {/* Pagination */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Menu;
