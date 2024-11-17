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

// Sample categories for slider
const categories = ["South Indian", "Chinese", "Mexican", "Italian"];

// Slider settings
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null); // Track active category
  const [searchTerm, setSearchTerm] = useState(""); // Track search term

  // Fetch dishes from API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/menu/dishes", {
          params: { page: currentPage },
        });
        console.log("API Response:", response.data);
        const dishesData = response.data.data.data; // Extract dishes array
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
    setActiveCategory(category); // Set active category
    if (category === "All") {
      setFilteredDishes(dishes);
    } else {
      const filtered = dishes.filter((dish) =>
        dish.category.toLowerCase().includes(category.toLowerCase())
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
    setFilteredDishes(dishes); // Reset to all dishes
    setActiveCategory(null); // Clear active category
    setSearchTerm(""); // Clear search term
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
              key={category}
              onClick={() => handleCategoryClick(category)}
              sx={{
                cursor: "pointer",
                textAlign: "center",
                padding: "10px",
                backgroundColor: activeCategory === category ? "#ddd" : "#eee",
                borderRadius: "10px",
                fontWeight: "bold",
                transition: "background-color 0.3s",
              }}
            >
              <Typography>{category}</Typography>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
              count={totalPages} // Total number of pages
              page={currentPage} // Current page
              onChange={handlePageChange} // Handle page change
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Menu;
