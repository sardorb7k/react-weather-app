import "./App.css";
import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorMode,
  Text,
  Button,
} from "@chakra-ui/react";
import {
  ExternalLinkIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import img from "./assets/Rectangle 2.png";
import clearSky from "./assets/sun.png";
import fewClouds from "./assets/clouds.png";
import mist from "./assets/mist.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import location from "./assets/location.png";
import temperature from "./assets/temperature.png";
import thunderstorm from "./assets/thunderstorm.png";
import weatherIcon from "./assets/weather.png";
import axios from "axios";

function App() {
  const API_KEY = "1284dbe35cc8d7c4fcbe7969a0434a83";
  const [weatherData, setWeatherData] = useState(null);
  const [inputValue, setInputValue] = useState("tashkent");
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  const weatherIcons = {
    Clear: clearSky,
    Clouds: fewClouds,
    Mist: mist,
    Rain: rain,
    Snow: snow,
    Thunderstorm: thunderstorm,
  };

  const weatherMain = weatherData?.weather[0].main;
  const temp = weatherData?.main.temp;
  const weather = weatherData?.weather[0].description;
  const now = new Date().getFullYear();
  const lon = weatherData?.coord.lon;
  const lat = weatherData?.coord.lat;

  function getLatitudeDirection(lat) {
    return lat >= 0 ? "N" : "S";
  }

  function getLongitudeDirection(lon) {
    return lon >= 0 ? "E" : "W";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleData();
  };

  return (
    <Box
      h={"100vh"}
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }} // Column on small screens and row on large screens
      alignItems={"center"}
      justifyContent={"center"}
      p={4}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        w={{ base: "full", lg: "auto" }}
        maxW="md"
        mx={4}
        mb={{ base: 4, lg: 0 }} // Margin bottom on small screens
      >
        {isLoading ? (
          <Box
            bgImage={`url(${img})`}
            bgSize="cover"
            bgPosition="center"
            w={{ base: "full", lg: "493px" }}
            h={{ base: "auto", lg: "666px" }}
            borderRadius={"30px"}
            transform={"translateX(1px)"}
            p={"50px"}
            color={"white"}
          >
            <SkeletonCircle size="200px" mb="20px" />
            <Skeleton height="40px" width="40px" mb="20px" />
            <Skeleton height="25px" width="150px" />
            <SkeletonText mt="4" noOfLines={2} spacing="4" />
          </Box>
        ) : (
          <Box
            bgImage={`url(${img})`}
            bgSize="cover"
            bgPosition="center"
            w={{ base: "full", lg: "493px" }}
            h={{ base: "auto", lg: "666px" }}
            borderRadius={"30px"}
            transform={"translateX(1px)"}
            p={"50px"}
            pl={"30px"}
            color={"white"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
          >
            <Box>
              <Image
                src={weatherIcons[weatherMain] || clearSky}
                w={{ base: "120px", lg: "200px" }} // Smaller on small screens
                alt="Weather icon"
              />
              <Box ml={{ base: "10px", lg: "25px" }} mt={{ base: "5px", lg: "10px" }}>
                <Box
                  display={"flex"}
                  gap={"8px"}
                  alignItems={"flex-start"}
                  mb={{ base: "5px", lg: "10px" }}
                >
                  <Image src={location} w={{ base: "20px", lg: "30px" }} alt="Location icon" />
                  <Text>{weatherData.name}</Text>
                </Box>
                <Box
                  display={"flex"}
                  gap={"8px"}
                  alignItems={"flex-start"}
                  mb={{ base: "5px", lg: "10px" }}
                >
                  <Image src={temperature} w={{ base: "20px", lg: "30px" }} alt="Temperature icon" />
                  <Text>{Math.round(temp)}°C</Text>
                </Box>
                <Box display={"flex"} gap={"8px"} alignItems={"flex-start"}>
                  <Image src={weatherIcon} w={{ base: "20px", lg: "30px" }} alt="Weather icon" />
                  <Text textTransform={"capitalize"}>{weather}</Text>
                </Box>
              </Box>
            </Box>
            <Link href="https://sardorbek.ru" fontSize={{ base: "sm", lg: "md" }} mt={{ base: "25px", lg: "0" }}>
              &copy; {now} Sardorbek <ExternalLinkIcon mx="2px" />
            </Link>
          </Box>
        )}
      </Box>

      <Box
        w={{ base: "full", lg: "490px" }}
        h={{ base: "auto", lg: "623px" }}
        bg={"#222831"}
        color={"white"}
        borderRightRadius={{ base: 0, lg: 25 }}
        p={"35px"}
        mt={{ base: 4, lg: 0 }} // Margin top on small screens
      >
        <Box display={"flex"} alignItems="center" mb={{ base: "20px", lg: "50px" }}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <InputGroup w={"100%"}>
              <Input
                placeholder="Search here"
                onChange={(e) => setInputValue(e.target.value)}
                required
                border={"1px solid #FFFFFF26"}
              />
              <InputRightAddon
                bg={"#FFFFFF26"}
                onClick={handleSubmit}
                cursor={"pointer"}
                border={"1px solid transparent"}
                children={<SearchIcon />}
              />
            </InputGroup>
          </form>
          <Button
            onClick={toggleColorMode}
            colorScheme={"darkAlpha"}
            color={"white"}
            ml={4}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          h={'80%'}
        >
          <Box>
            <Box className="gradient-text-box" mb={{ base: "4", lg: "6" }}>
              <Text>Pressure</Text>
              <Text>{weatherData?.main.pressure} hPa</Text>
            </Box>
            <Box className="gradient-text-box" mb={{ base: "4", lg: "6" }}>
              <Text>Humidity</Text>
              <Text>{weatherData?.main.humidity}%</Text>
            </Box>
            <Box className="gradient-text-box" mb={{ base: "4", lg: "6" }}>
              <Text>Wind Speed</Text>
              <Text>{weatherData?.wind.speed} m/s</Text>
            </Box>
            <Box className="gradient-text-box" mb={{ base: "4", lg: "6" }}>
              <Text>Wind Degree</Text>
              <Text>{weatherData?.wind.deg}°</Text>
            </Box>
            <Box className="gradient-text-box" mb={{ base: "4", lg: "6" }}>
              <Text>Longitude</Text>
              <Text>
                {Math.abs(lon).toFixed(1)}° {getLongitudeDirection(lon)}
              </Text>
            </Box>
            <Box className="gradient-text-box" mb={{ base: "4", lg: "6" }}>
              <Text>Latitude</Text>
              <Text>
                {Math.abs(lat).toFixed(1)}° {getLatitudeDirection(lat)}
              </Text>
            </Box>
          </Box>
        </Box>
        <Link href="https://openweathermap.org/" fontSize={{ base: "sm", lg: "md" }}>
          Visit to Openweathermap <ExternalLinkIcon mx="2px" />
        </Link>
      </Box>
    </Box>
  );
}

export default App;
