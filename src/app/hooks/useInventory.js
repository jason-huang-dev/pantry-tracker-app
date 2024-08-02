import { useState, useEffect } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc, getDoc, query } from 'firebase/firestore';
import { firestore } from '../firebase';

const useInventory = () => {
  const [inventory, setInventory] = useState([]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ id: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    if (!item.id) {
      console.error('Invalid item ID');
      return;
    }
    const docRef = doc(collection(firestore, 'inventory'), item.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data();
      await setDoc(docRef, { ...existingData, quantity: (existingData.quantity || 0) + item.quantity });
    } else {
      await setDoc(docRef, { ...item, quantity: item.quantity });
    }
    await updateInventory();
  };

  const removeItem = async (id, quantityToRemove) => {
    if (!id || quantityToRemove <= 0) {
      console.error('Invalid item ID or quantity');
      return;
    }
    try {
      const docRef = doc(collection(firestore, 'inventory'), id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const existingData = docSnap.data();
        const newQuantity = (existingData.quantity || 0) - quantityToRemove;
        if (newQuantity <= 0) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { ...existingData, quantity: newQuantity });
        }
        await updateInventory();
      } else {
        console.warn('Document does not exist');
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return {
    inventory,
    addItem,
    removeItem,
  };
};

export default useInventory;
