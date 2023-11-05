/* eslint-disable react/prop-types */

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
 
const favourites = ["Play list 1", "favourites", "Old songs"];

export default function Favourite() {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <div>
      <Accordion className="container mx-auto my-2">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="font-semibold text-xl">favourites / Playlists</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="container mx-auto p-4 overflow-x-auto">
            <div className="flex gap-4 min-w-max">
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
  <Card sx={{ width: 120, height: 120, backgroundColor: backgroundColor }}>
    <CardContent className="flex items-center justify-center h-full">
      {title}
    </CardContent>
  </Card>
);
