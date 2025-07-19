import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tenant, setTenant] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true); // Permanece 'true' até termos uma resposta definitiva

    useEffect(() => {
        const auth = getAuth();
        let unsubscribeTenant = () => {};
        let unsubscribeUser = () => {};

        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            // Limpa os listeners anteriores para evitar fugas de memória
            unsubscribeTenant();
            unsubscribeUser();

            if (currentUser) {
                setUser(currentUser);

                // Listener para o perfil do utilizador (obter a 'role')
                const userDocRef = doc(db, "users", currentUser.uid);
                unsubscribeUser = onSnapshot(userDocRef, (doc) => {
                    if (doc.exists()) {
                        setUserRole(doc.data().role || 'lojista');
                    } else {
                        // Se o documento do user não existir ainda (pode acontecer durante o registo),
                        // assume 'lojista' temporariamente.
                        setUserRole('lojista');
                    }
                });

                // --- CORREÇÃO PRINCIPAL ---
                // Usamos onSnapshot na query para reagir à criação do tenant.
                const tenantsQuery = query(collection(db, "tenants"), where("ownerId", "==", currentUser.uid));
                
                unsubscribeTenant = onSnapshot(tenantsQuery, (querySnapshot) => {
                    if (!querySnapshot.empty) {
                        // Tenant encontrado, atualiza o estado
                        const tenantDoc = querySnapshot.docs[0];
                        setTenant({ id: tenantDoc.id, ...tenantDoc.data() });
                    } else {
                        // Tenant ainda não existe na base de dados
                        setTenant(null);
                    }
                    // Marca o carregamento como concluído apenas depois de receber a primeira resposta do listener
                    setLoading(false);
                }, (error) => {
                    console.error("Erro ao observar o tenant:", error);
                    setTenant(null);
                    setLoading(false);
                });

            } else {
                // Utilizador fez logout
                setUser(null);
                setTenant(null);
                setUserRole(null);
                setLoading(false);
            }
        });

        // Função de limpeza ao desmontar o componente
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

    const value = {
        user,
        tenant,
        userRole,
        isAuthenticated: !!user,
        loading, // O estado de loading agora é mais fiável
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