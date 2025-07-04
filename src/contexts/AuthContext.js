// Ficheiro completo: src/contexts/AuthContext.js (VERSÃO COM ROLES)

import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tenant, setTenant] = useState(null);
  // NOVO ESTADO PARA GUARDAR A FUNÇÃO DO UTILIZADOR
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    let unsubscribeTenant = () => {};
    let unsubscribeUser = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      unsubscribeTenant();
      unsubscribeUser();

      if (currentUser) {
        setUser(currentUser);

        // --- LÓGICA PARA BUSCAR O PERFIL DO UTILIZADOR (E A SUA FUNÇÃO) ---
        const userDocRef = doc(db, "users", currentUser.uid);
        unsubscribeUser = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUserRole(doc.data().role); // Ex: 'superadmin'
          } else {
            setUserRole('lojista'); // Padrão se não tiver uma função definida
          }
        });

        // --- LÓGICA PARA BUSCAR O TENANT (LOJA) ---
        const tenantsRef = collection(db, "tenants");
        const q = query(tenantsRef, where("ownerId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const tenantDocRef = querySnapshot.docs[0].ref;
          unsubscribeTenant = onSnapshot(tenantDocRef, (doc) => {
            setTenant({ id: doc.id, ...doc.data() });
            setLoading(false);
          });
        } else {
          setTenant(null);
          setLoading(false);
        }
      } else {
        setUser(null);
        setTenant(null);
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeTenant();
      unsubscribeUser();
    };
  }, []);

  const login = async (email, password) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    // Disponibilizamos a userRole para toda a aplicação
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, tenant, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);