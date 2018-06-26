// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchBar from "../SearchBar"
// import { mailFolderListItems, otherMailFolderListItems } from './../tileData';

// const styles = {
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   }
// };


// class DrawerLeft extends React.Component {
//   state = {
//     open: false,
//     anchor: 'left',
//   };

//   handleDrawerOpen = () => {
//     this.setState({ open: true });
//   };

//   handleDrawerClose = () => {
//     this.setState({ open: false });
//   };

//   handleChangeAnchor = event => {
//     this.setState({
//       anchor: event.target.value,
//     });
//   };



//   render() {
//     const { classes, theme } = this.props;
//     const { anchor, open } = this.state;
    
//     const drawer = (
//     <Drawer
//         variant="persistent"
//         anchor={anchor}
//         open={open}
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//       >
//         <div className={classes.drawerHeader}>

//         <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
//           <MenuIcon />
//         </IconButton>
//         </div>
//         <Divider />
//         <List>{mailFolderListItems}</List>
//         <Divider />
//         <List>{otherMailFolderListItems}</List>
//       </Drawer>
//     );

//     let before = null;
//     let after = null;

//     if (anchor === 'left') {
//       before = drawer;
//     } else {
//       after = drawer;
//     }

//     return (
//             // <Toolbar disableGutters={!open}>
//               <IconButton
//                 color="inherit"
//                 aria-label="open drawer"
//                 onClick={this.handleDrawerOpen}
//                 // className={classNames(classes.menuButton, open && classes.hide)}
//               >
//                 <MenuIcon />
//               </IconButton>
//             // </Toolbar>
//     );
//   }
// }

// DrawerLeft.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(DrawerLeft);