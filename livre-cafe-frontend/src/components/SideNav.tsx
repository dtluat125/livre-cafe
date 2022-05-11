import React, { useRef, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import navList from '@app/components/navListItems';
import { useTheme } from '@mui/material/styles';
import { Logo } from '@app/assets/images/index';

const drawerWidth = 240;
const drawerWidthOpen = 240;
const paddingIconButton = 10;
const marginIconButton = 14;
const iconFontSize = 20;
const drawerWidthClose =
  (paddingIconButton + marginIconButton) * 2 + iconFontSize;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: 'nowrap',
//   boxSizing: 'border-box',
//   ...(open && {
//     ...openedMixin(theme),
//     '& .MuiDrawer-paper': openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     '& .MuiDrawer-paper': closedMixin(theme),
//   }),
// }));

function SideNav() {
  const matchsMD = useMediaQuery('(max-width: 768px)');
  const theme = useTheme();
  const [open, setOpen] = useState(!matchsMD);
  const refFocus = useRef<any>(null);
  const handleDrawerClose = () => {
    setOpen(!open);
  };

  function toogleOpenSearch() {
    setOpen(false);
    setTimeout(() => {
      if (refFocus?.current) refFocus.current.focus();
    }, 500);
  }
  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '42px',
          width: 'auto',
          backgroundColor: 'transparent',
          margin: '14px 14px',
          padding: '12px 0px',
          borderBottom: '1px solid lightgray',
          alignItems: 'flex-end',
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: open ? 'none' : { xs: 'none', sm: 'initial' },
            marginBottom: '9px',
          }}
        >
          <Logo width={24} height={24} color="white" />
        </Box>
        <Typography
          variant="h1"
          noWrap={true}
          gutterBottom
          sx={{
            display: { xs: 'none', sm: 'initial' },
            fontSize: '18px',
            fontWeight: 600,
            color: 'lightgray',
            width: '154px',
            marginLeft: open ? '0px' : '8px',
            paddingBottom: '3px',
          }}
        >
          MuiMakeStyles
        </Typography>

        <Button
          onClick={handleDrawerClose}
          sx={{
            minWidth: 'initial',
            padding: '10px',
            color: 'gray',
            borderRadius: '8px',
            backgroundColor: open ? 'transparent' : 'transparent',
            '&:hover': {
              backgroundColor: '#26284687',
            },
          }}
        >
          <MenuIcon
            sx={{ fontSize: '20px', color: open ? 'lightgray' : 'lightGray' }}
          ></MenuIcon>
        </Button>
      </Box>

      <List dense={true}>
        {navList.map((key, index) => (
          <div key={`list-item-${index}`}>
            {index === 0 ? (
              <div>
                <Tooltip
                  title={open ? key.desc : ''}
                  placement={'right'}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: 'gray',
                        color: 'white',
                        marginLeft: '22px !important',
                        boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                      },
                    },
                  }}
                >
                  <ListItemButton
                    onClick={toogleOpenSearch}
                    sx={{
                      margin: '6px 14px',
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: '#26284687',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: '46px' }}>
                      <Badge
                        badgeContent={key.badge}
                        color="secondary"
                        variant="dot"
                      >
                        <key.icon
                          sx={{ fontSize: '20px', color: 'lightgray' }}
                        />
                      </Badge>
                    </ListItemIcon>

                    <InputBase
                      inputRef={refFocus}
                      margin="dense"
                      fullWidth={true}
                      placeholder="Search"
                      sx={{
                        fontSize: '0.875rem',
                        lineHeight: '1.43em',
                        '& .MuiInputBase-input': {
                          color: 'lightgray',
                          padding: 0,
                        },
                      }}
                      componentsProps={{
                        input: {
                          style: {
                            padding: 0,
                          },
                        },
                      }}
                    ></InputBase>
                  </ListItemButton>
                </Tooltip>
                <Divider variant="middle" light={true} />
              </div>
            ) : (
              <Tooltip
                title={open ? key.desc : ''}
                key={index}
                placement={'right'}
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: 'gray',
                      color: 'white',
                      marginLeft: '22px !important',
                      boxShadow: '0px 0px 22px -2px rgba(0,0,0,0.20)',
                    },
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    margin: '6px 14px',
                    padding: '10px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#26284687',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: '46px' }}>
                    <Badge
                      badgeContent={key.badge}
                      color="secondary"
                      variant="dot"
                    >
                      <key.icon sx={{ fontSize: '20px', color: 'lightgray' }} />
                    </Badge>
                  </ListItemIcon>

                  <ListItemText
                    primary={key.desc}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                    sx={{
                      display: 'inline',
                      margin: '0px',
                      overflowX: 'hidden',
                      color: 'lightgray',
                      whiteSpace: 'nowrap',
                      minWidth: '126px',
                    }}
                  />
                  {key.badge !== 0 && (
                    <Chip
                      label={key.badge}
                      color={'secondary'}
                      size="small"
                      sx={{ height: 'auto' }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            )}
          </div>
        ))}
        <Divider variant="middle" light={true} />
      </List>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContents: 'center',
          margin: '14px 14px',
          padding: '12px 4px',
          borderTop: '1px solid lightgray',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            marginRight: '18px',
            paddingLeft: '0px',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Avatar />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography
            component="span"
            variant="body2"
            sx={{
              fontFamily: 'inherit',
              display: 'block',
              whiteSpace: 'nowrap',
              lineHeight: 'inherit',
              fontWeight: 500,
              color: 'lightgray',
            }}
          >
            Arrofi Reza S.
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              lineHeight: 'inherit',
              color: 'lightgray',
            }}
          >
            Web Designer
          </Typography>
        </Box>
      </Box>
    </>
  );

  return (
    <div className="sidebar-container">
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        hideBackdrop
        sx={{
          width: open
            ? { xs: '0px', sm: drawerWidthClose }
            : { xs: drawerWidthClose, sm: drawerWidthOpen },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.leavingScreen
              : theme.transitions.duration.enteringScreen,
          }),
          '& .MuiDrawer-paper': {
            justifyContent: 'space-between',
            overflowX: 'hidden',
            width: open
              ? { xs: '0px', sm: drawerWidthClose }
              : { xs: drawerWidthClose, sm: drawerWidthOpen },
            borderRight: '0px',
            borderRadius: '0px 16px 16px 0px',
            boxShadow: theme.shadows[8],
            backgroundColor: open ? '#11101D' : '#11101D',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: open
                ? theme.transitions.duration.leavingScreen
                : theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
}

export default SideNav;
