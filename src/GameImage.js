import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function GameImage(props) {
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null,
    );
  };

  const handleSelection = (e) => {
    handleClose(null);
    let char = e.target.getAttribute('character')
    props.checkCoords(char)
  }

  const handleClose = () => {
    setContextMenu(null);
  };

  const style = {
    height:'100px',
    width:'100px',
    backgroundColor:'transparent',
    border:'2px solid black',
    position:'absolute',
    left:530 - 50,
    top:396 - 50,
    pointerEvents:'none'
  }

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
        <img src={props.image} className='waldo canvas' onClick={props.handleClick}></img>
        <div className='target' style={style} onClick={props.handleClick}></div>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleSelection} character='Waldo'>Waldo</MenuItem>
        <MenuItem onClick={handleSelection} character='Wizard'>The Wizard</MenuItem>
        <MenuItem onClick={handleSelection} character='Odlaw'>Odlaw</MenuItem>
      </Menu>
    </div>
  );
}