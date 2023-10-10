function PerfilCliente(){
    const db = getFirestore();
    const querySnapshot =  getDocs(collection(db, "usuario/tabela/cliente"));
    const dataArray = [];

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        dataArray.push({ id: doc.id, ...userData });

     setnameUser(userData.nome)
    });

}
function PerfilEmpresa(){
    const db = getFirestore();
    const querySnapshot =  getDocs(collection(db, "usuario/tabela/cliente"));
    const dataArray = [];

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        dataArray.push({ id: doc.id, ...userData });

     setnameUser(userData.nome)
    });

}
function PerfilEntregador(){
    const db = getFirestore();
    const querySnapshot =  getDocs(collection(db, "usuario/tabela/cliente"));
    const dataArray = [];

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        dataArray.push({ id: doc.id, ...userData });

     setnameUser(userData.nome)
    });

}