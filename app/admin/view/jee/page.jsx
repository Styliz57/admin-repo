'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getFirestore, collection, getDocs, query, limit, startAfter, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { app } from '@/firebase';
import PdfCard from '@/app/_components/PdfCard';
import { Skeleton } from '@/components/ui/skeleton';
import LoadMore from '@/app/_components/LoadMore';

const IIT = () => {
  const [firebaseItems, setFirebaseItems] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const itemLimit = 20;

  const fetchFirebaseItems = async (isLoadMore = false) => {
    try {
      const db = getFirestore(app);
      let itemsQuery = query(collection(db, 'jee'), limit(itemLimit));

      if (lastDoc && isLoadMore) {
        itemsQuery = query(collection(db, 'jee'), startAfter(lastDoc), limit(itemLimit));
      }

      const itemsSnapshot = await getDocs(itemsQuery);
      const items = itemsSnapshot.docs.map((doc) => ({ 
        id: doc.id,
        ...doc.data(),
      }));
      const lastVisible = itemsSnapshot.docs[itemsSnapshot.docs.length - 1];

      if (items.length < itemLimit) {
        setAllItemsLoaded(true);
      }

      if (isLoadMore) {
        setFirebaseItems((prevItems) => [...prevItems, ...items]);
      } else {
        setFirebaseItems(items);
      }
      setLastDoc(lastVisible);
    } catch (error) {
      console.error('Error fetching Firebase items:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchFirebaseItems();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, 'jee', id));

      setFirebaseItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = async (id, updatedData) => {
    try {
      const db = getFirestore(app);
      const itemRef = doc(db, 'jee', id);
      await updateDoc(itemRef, {
        folderName: updatedData.folderName,
        folderYear: updatedData.folderYear,
        selectedCourse: updatedData.selectedCourse,
        selectedInstitution: updatedData.selectedInstitution,
        tags: updatedData.tags,
        uploadedFiles: updatedData.uploadedFiles,
      });

      setFirebaseItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleLoadMore = useCallback(async () => {
    if (lastDoc) {
      setLoadingMore(true);
      await fetchFirebaseItems(true);
      setLoadingMore(false);
    }
  }, [lastDoc]);

  return (
    <div>
      <div className="flex items-center mt-2 content-center justify-center flex-wrap gap-2 w-full">
        {firebaseItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <PdfCard
              id={item.id}
              title={item.folderName}
              year={item.folderYear}
              course={item.selectedCourse}
              institution={item.selectedInstitution}
              tags={item.tags}
              uploadedFiles={item.uploadedFiles || []}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </motion.div>
        ))}
        {!loading && !allItemsLoaded && (
          <LoadMore onInView={handleLoadMore} loadingMore={loadingMore} />
        )}
        {loading &&
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="w-[23em] h-[12.5em] rounded-lg" />
          ))}
      </div>
    </div>
  );
};

export default IIT;
