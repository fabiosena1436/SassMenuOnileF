import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tenant, setTenant] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        let unsubscribeTenant = () => {};
        let unsubscribeUser = () => {};

        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            unsubscribeTenant();
            unsubscribeUser();

            if (currentUser) {
                setUser(currentUser);

                const userDocRef = doc(db, "users", currentUser.uid);
                unsubscribeUser = onSnapshot(userDocRef, (doc) => {
                    setUserRole(doc.exists() ? doc.data().role || 'lojista' : 'lojista');
                });

                const tenantsQuery = query(collection(db, "tenants"), where("ownerId", "==", currentUser.uid));
                
                unsubscribeTenant = onSnapshot(tenantsQuery, (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        const tenantDoc = querySnapshot.docs[0];
                        setTenant({ id: tenantDoc.id, ...tenantDoc.data() });
                    } else {
                        setTenant(null);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Erro ao observar o tenant:", error);
                    setTenant(null);
                    setLoading(false);
                });

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

    const login = (email, password) => {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        const auth = getAuth();
        return signOut(auth);
    };

    const value = {
        user,
        tenant,
        userRole,
        isAuthenticated: !!user,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);