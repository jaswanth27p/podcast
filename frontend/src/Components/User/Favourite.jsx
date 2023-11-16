/* eslint-disable react/prop-types */

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const favourites = ["Play list 1", "favourites", "Old songs", <i class="fa-solid fa-plus"></i>];

export default function Favourite() {
  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 128 + 100);
    const green = Math.floor(Math.random() * 128 + 100);
    const blue = Math.floor(Math.random() * 128 + 100);
    // Convert the components to a CSS color string
    const color = `rgb(${red}, ${green}, ${blue})`;
    return color;
  };

  return (
    <div className="w-full">
      <Accordion className="mx-5 my-3 hover:bg-blue-50">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="font-semibold text-xl">
            Favourites / Playlists
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container mx-auto overflow-x-auto">
            <div className="flex flex-wrap gap-5">
              {favourites.map((item, index) => (
                <Cards
                  key={index}
                  title={item}
                  backgroundColor={getRandomColor()}
                />
              ))}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const Cards = ({ title, backgroundColor }) => (
  <Card
    sx={{
      width: { xs: 100, sm: 120, md: 150 },
      height: { xs: 100, sm: 120, md: 150 },
      backgroundColor: backgroundColor,
    }}
  >
    <CardContent className="flex items-center justify-center h-full">
      {title}
    </CardContent>
  </Card>
);
