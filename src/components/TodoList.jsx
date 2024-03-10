import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  IconButton,
  Modal,
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Add, Delete, Clear } from '@mui/icons-material';
import Header from './Header';

const TodoList = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [newItemTexts, setNewItemTexts] = useState([]);
  const [editingListIndex, setEditingListIndex] = useState(null);
  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListItems, setNewListItems] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    listIndex: null,
    itemIndex: null,
  });
  const [deleteListConfirmation, setDeleteListConfirmation] = useState({
    isOpen: false,
    listIndex: null,
  });

  const generateListName = () => {
    const index = todoLists.length + 1;
    return `List ${index}`;
  };

  const handleNewList = () => {
    setModalOpen(true);
  };

  const handleSaveList = () => {
    const index = todoLists.length + 1;
    const name = newListName || `List ${index}`;
    const items = newListItems ? newListItems.split(',').map((item) => ({ text: item.trim(), completed: false })) : [];

    const newList = {
      name,
      items,
    };

    setTodoLists([...todoLists, newList]);

    setNewItemTexts([...newItemTexts, '']);

    setNewListName('');
    setNewListItems('');
    setModalOpen(false);
  };

  const handleDeleteList = (listIndex) => {
    setDeleteListConfirmation({
      isOpen: true,
      listIndex,
    });
  };

  const handleCloseDeleteListConfirmation = () => {
    setDeleteListConfirmation({
      isOpen: false,
      listIndex: null,
    });
  };

  const handleConfirmDeleteList = (listIndex) => {
    setTodoLists((prevLists) => prevLists.filter((_, index) => index !== listIndex));
    handleCloseDeleteListConfirmation();
  };

  const handleAddItem = (listIndex) => {
    setTodoLists((prevLists) =>
      prevLists.map((list, index) =>
        index === listIndex
          ? { ...list, items: [...list.items, { text: newItemTexts[listIndex], completed: false }] }
          : list
      )
    );


    const updatedItemTexts = [...newItemTexts];
    updatedItemTexts[listIndex] = '';
    setNewItemTexts(updatedItemTexts);
  };

  const handleDeleteItem = (listIndex, itemIndex) => {
    setDeleteConfirmation({
      isOpen: true,
      listIndex,
      itemIndex,
    });
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({
      isOpen: false,
      listIndex: null,
      itemIndex: null,
    });
  };

  const handleConfirmDelete = () => {
    const { listIndex, itemIndex } = deleteConfirmation;
    if (listIndex !== null && itemIndex !== null) {
      const updatedLists = [...todoLists];
      updatedLists[listIndex].items.splice(itemIndex, 1);
      setTodoLists(updatedLists);
      handleCloseDeleteConfirmation();
    }
  };

  const handleToggleCheckbox = (listIndex, itemIndex) => {
    setTodoLists((prevLists) =>
      prevLists.map((list, lIndex) =>
        lIndex === listIndex
          ? {
            ...list,
            items: list.items.map((item, iIndex) =>
              iIndex === itemIndex ? { ...item, completed: !item.completed } : item
            ),
          }
          : list
      )
    );
  };

  const handleStartEditingList = (listIndex) => {
    setEditingListIndex(listIndex);
  };

  const handleFinishEditingList = () => {
    setEditingListIndex(null);
  };

  const handleListNameClick = (listIndex) => {
    handleStartEditingList(listIndex);
  };

  const handleListNameChange = (listIndex, newName) => {
    setTodoLists((prevLists) =>
      prevLists.map((list, index) =>
        index === listIndex ? { ...list, name: newName } : list
      )
    );
  };

  const handleStartEditingItem = (listIndex, itemIndex) => {
    setEditingItemIndex({ listIndex, itemIndex });
  };

  const handleFinishEditingItem = () => {
    setEditingItemIndex(null);
  };

  const handleItemTextClick = (listIndex, itemIndex) => {
    if (!todoLists[listIndex].items[itemIndex].completed) {
      handleStartEditingItem(listIndex, itemIndex);
    }
  };

  const handleItemTextChange = (listIndex, itemIndex, newText) => {
    setTodoLists((prevLists) =>
      prevLists.map((list, lIndex) =>
        lIndex === listIndex
          ? {
            ...list,
            items: list.items.map((item, iIndex) =>
              iIndex === itemIndex ? { ...item, text: newText } : item
            ),
          }
          : list
      )
    );
  };

  return (
    <div>
      <Header />
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewList}
        startIcon={<Add />}
        style={{ marginBottom: '16px', marginLeft: '16px', marginTop: '10px' }}
      >
        New List
      </Button>

      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 300,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            New List
          </Typography>
          <TextField
            label="List Name"
            variant="outlined"
            fullWidth
            size="small"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            style={{ marginBottom: '8px' }}
          />
          <TextField
            label="Items (comma-separated)"
            variant="outlined"
            fullWidth
            size="small"
            value={newListItems}
            onChange={(e) => setNewListItems(e.target.value)}
            style={{ marginBottom: '8px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveList}>
            Save
          </Button>
        </Box>
      </Modal>

      <Grid container spacing={2}>
        {todoLists.map((list, listIndex) => (
          <Grid item key={listIndex} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent style={{ flexGrow: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {editingListIndex === listIndex ? (
                    <TextField
                      label="Edit List Name"
                      variant="outlined"
                      size="small"
                      value={list.name}
                      onChange={(e) => handleListNameChange(listIndex, e.target.value)}
                      onBlur={handleFinishEditingList}
                      autoFocus
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      gutterBottom
                      onClick={() => handleListNameClick(listIndex)}
                    >
                      {list.name || generateListName()}
                    </Typography>
                  )}
                  <IconButton
                    aria-label="delete-list"
                    onClick={() => handleDeleteList(listIndex)}
                  >
                    <Delete />
                  </IconButton>
                </div>
                <div>
                  {list.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4px 0',
                        backgroundColor: item.completed ? '#f0f0f0' : 'inherit',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {editingItemIndex?.listIndex === listIndex &&
                          editingItemIndex?.itemIndex === itemIndex ? (
                          <TextField
                            size="small"
                            value={item.text}
                            onChange={(e) =>
                              handleItemTextChange(listIndex, itemIndex, e.target.value)
                            }
                            onBlur={handleFinishEditingItem}
                            autoFocus
                          />
                        ) : (
                          <>
                            <Checkbox
                              checked={item.completed}
                              onChange={() => handleToggleCheckbox(listIndex, itemIndex)}
                              disabled={item.completed}
                            />
                            <Typography
                              style={{ color: item.completed ? '#888888' : 'inherit' }}
                              onClick={() => handleItemTextClick(listIndex, itemIndex)}
                            >
                              {item.text}
                            </Typography>
                          </>
                        )}
                      </div>
                      <IconButton
                        aria-label="delete-item"
                        onClick={() => handleDeleteItem(listIndex, itemIndex)}
                      >
                        <Clear />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div style={{ borderTop: '1px solid #ccc', padding: '8px' }}>
                <TextField
                  label="Add Item"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={newItemTexts[listIndex]}
                  onChange={(e) => {
                    const updatedItemTexts = [...newItemTexts];
                    updatedItemTexts[listIndex] = e.target.value;
                    setNewItemTexts(updatedItemTexts);
                  }}
                  InputProps={{
                    endAdornment: (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleAddItem(listIndex)}
                      >
                        Add
                      </Button>
                    ),
                  }}
                />
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={deleteConfirmation.isOpen} onClose={handleCloseDeleteConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteListConfirmation.isOpen} onClose={handleCloseDeleteListConfirmation}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteListConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmDeleteList(deleteListConfirmation.listIndex)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
