import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  LightbulbOutlined as Lightbulb,
  AccessAlarmOutlined as Reminder,
  PlaylistAddCheckOutlined as PlaylistAddCheck,
  LocalOfferOutlined as LocalOffer,
  DeleteOutlineOutlined as Delete,
  HouseOutlined as House,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 24px;
  flex-grow: 1; /* This makes Heading occupy the remaining space in the Toolbar */
  display: flex;
  align-items: center; /* Vertically center-align the content */
  margin-left: 570px; /* Adjust the margin for better spacing */
`;

function NavList() {
  const { userId } = useParams();
  console.log("a", userId);

  const navList = [
    { id: 1, name: "Home", icon: <House />, route: `/home/${userId}` },
    { id: 2, name: "Notas", icon: <Lightbulb />, route: `/note/${userId}` },
    {
      id: 3,
      name: "Lembretes",
      icon: <Reminder />,
      route: `/reminder/${userId}`,
    },
    {
      id: 4,
      name: "Listas de Tarefas",
      icon: <PlaylistAddCheck />,
      route: `/tracklist/${userId}`,
    },
    {
      id: 5,
      name: "Etiquetas",
      icon: <LocalOffer />,
      route: `/label/${userId}`,
    },
    { id: 6, name: "Lixeira", icon: <Delete />, route: `/trash/${userId}` },
  ];

  return (
    <List>
      {navList.map((list) => (
        <ListItem button key={list.id}>
          <Link
            to={`${list.route}`}
            style={{
              textDecoration: "none",
              display: "flex",
              color: "inherit",
            }}
          >
            <ListItemIcon style={{ alignItems: "center" }}>
              {list.icon}
            </ListItemIcon>
            <ListItemText primary={list.name} />
          </Link>
        </ListItem>
      ))}
    </List>
  );
}

export default NavList;
