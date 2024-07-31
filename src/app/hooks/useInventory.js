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
      await setDoc(docRef, { ...existingData, quantity: (existingData.quantity || 0) + 1 });
    } else {
      await setDoc(docRef, { ...item, quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (id) => {
    if (!id) {
      console.error('Invalid item ID');
      return;
    }
    try {
      const docRef = doc(collection(firestore, 'inventory'), id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity } = docSnap.data();
        if (quantity <= 1) {
          await deleteDoc(docRef);
        } else {
          await setDoc(docRef, { ...docSnap.data(), quantity: quantity - 1 });
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
